import { supabase } from '@/lib/supabase';
import { NextRequest, NextResponse } from 'next/server';

const GOOGLE_SHEETS_API_KEY = process.env.GOOGLE_SHEETS_API_KEY;
const GOOGLE_SHEET_ID = process.env.GOOGLE_SHEET_ID;
const CRON_SECRET = process.env.CRON_SECRET;

// Exercise name mapping (sheet name -> database column)
const EXERCISE_MAP: Record<string, string> = {
  'Leg curls': 'leg_curls',
  'Calves': 'calves',
  'Leg Press': 'leg_press',
  'Adductors': 'adductors',
  'Leg extensions': 'leg_extensions',
  'Back extension': 'back_extension',
  'Abs': 'abs',
  'chest flies': 'chest_flies',
  'tricep push dow': 'tricep_push_down',
  'jm chest press': 'jm_chest_press',
  'cable lat raises': 'cable_lat_raises',
  'lat pull downs': 'lat_pull_downs',
  'kelso shrugs be': 'kelso_shrugs_bench',
  'bicep curls': 'bicep_curls',
  'rear delts': 'rear_delts',
  'hammer curl': 'hammer_curls',
  'wrist curls': 'wrist_curls',
};

type ParsedSet = {
  weight: number;
  reps: number;
};

// Helper to parse weight with "multiplication dot" logic
function parseWeight(text: string): number {
  text = text.trim();

  // Multiplication pattern: number . number (with optional spaces)
  const multiplyMatch = text.match(/^(\d+(?:\.\d+)?)\s*\.\s*(\d+(?:\.\d+)?)$/);
  if (multiplyMatch) {
    const left = parseFloat(multiplyMatch[1]);
    const right = parseFloat(multiplyMatch[2]);
    return left * right;
  }

  // Otherwise, parse normally (decimal)
  return parseFloat(text);
}

// Helper to split exercise into weight and rep
// Patterns:
    // W x R
    // W x R1, R2
    // N . W1 + W2 x 
function parseSet(text: string): ParsedSet | null {
  if (!text || text.trim() === '') return null;

  try {
    // Remove spaces for easier splitting (except for multiplication dots)
    text = text.replace(/\s*(?<!\d)\.(?!\d)\s*/g, '.'); 
    const parts = text.split('x');
    if (parts.length !== 2) return null;

    const weightPart = parts[0];
    let weight = 0;

    if (weightPart.includes('+')) {
      const addParts = weightPart.split('+');
      weight = addParts.reduce((sum, part) => sum + parseWeight(part), 0);
    } else {
      weight = parseWeight(weightPart);
    }

    const repsPart = parts[1];
    let reps = 0;

    // Average out the reps
    if (repsPart.includes(',')) {
      const repValues = repsPart.split(',').map(r => parseFloat(r));
      reps = repValues.reduce((sum, r) => sum + r, 0) / repValues.length;
    } else {
      reps = parseFloat(repsPart);
    }

    if (isNaN(weight) || isNaN(reps)) return null;

    return { weight, reps };
  } catch (error) {
    console.log('ParseSet error:', error);
    return null;
  }
}

// Helper to calculate total volume (how good the set was)
function calculateVolume(set: ParsedSet): number {
  return (set.weight * 1.5) + set.reps;
}

// Syncing when API route is called
export async function GET(request: NextRequest) {
  // Cron for auth again (update once per day)
  const authHeader = request.headers.get('authorization');
  
  if (authHeader !== `Bearer ${CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  try {
    // Get the latest session_id from database
    const { data: latestSession, error: queryError } = await supabase
      .from('gym_progress')
      .select('session_id')
      .order('session_id', { ascending: false })
      .limit(1)
      .single();
    
    if (queryError && queryError.code !== 'PGRST116') {
      throw queryError;
    }
    
    const lastSessionId = latestSession ? latestSession.session_id : 0;
    
    // Fetch gym data from Google Sheets
    const sheetRange = 'New!A1:BF32';
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${GOOGLE_SHEET_ID}/values/${sheetRange}?key=${GOOGLE_SHEETS_API_KEY}`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Google Sheets API error: ${response.statusText}`);
    }
    
    const data = await response.json();
    
    if (!data.values || data.values.length === 0) {
      return NextResponse.json({ message: 'No data found in sheet' });
    }
    
    const rows = data.values;
    const numSessions = rows[0].length - 1;
    
    // Only process new sessions
    if (numSessions <= lastSessionId) {
      return NextResponse.json({ 
        success: true, 
        message: 'No new sessions to process' 
      });
    }
    
    // Get previous (single) session data for comparison
    const { data: previousSessionData } = await supabase
      .from('gym_progress')
      .select('*')
      .eq('session_id', lastSessionId)
      .single();
    
    // Parse only new sessions
    const newSessions: Array<Record<string, number | null> & { session_id: number; total_change_percent: number }> = [];
    
    // Preproces new sessions
        // Normalize name, parse set values, calculates volumes, fill in empty data
    for (let sessionIdx = lastSessionId; sessionIdx < numSessions; sessionIdx++) {
      const columnIdx = sessionIdx + 1;
      const session: Record<string, number | null> = {};
      
      for (let rowIdx = 0; rowIdx < rows.length; rowIdx++) {
        const exerciseName = rows[rowIdx][0];
        const normalizedName = EXERCISE_MAP[exerciseName];
        
        if (!normalizedName) continue;
        if (session[normalizedName] !== undefined) continue;
        
        const cellValue = rows[rowIdx][columnIdx];
        const parsed = parseSet(cellValue);
        
        if (parsed) {
          session[normalizedName] = calculateVolume(parsed);
        } else {
          session[normalizedName] = null;
        }
      }
      
      // Calculate change percentage
      let totalChangePercent = 0;
      let validComparisons = 0;
      
      const previousSession = sessionIdx === lastSessionId 
        ? previousSessionData 
        : newSessions[newSessions.length - 1];
      
      for (const exercise in session) {
        let currentValue = session[exercise];
        
        // Handle missing data -> fill with previous session
        if (currentValue === null && previousSession) {
          currentValue = previousSession[exercise as keyof typeof previousSession] as number;
          session[exercise] = currentValue;
        }
        
        if (currentValue === null) continue;
        
        if (!previousSession) {
          continue;
        }
        
        const previousValue = previousSession[exercise as keyof typeof previousSession] as number | null;
        
        if (previousValue === null || previousValue === 0) {
          validComparisons++;
          continue;
        }
        
        const percentChange = ((currentValue - previousValue) / previousValue) * 100;
        
        if (Math.abs(percentChange) > 50) {
          validComparisons++;
          continue;
        }
        
        totalChangePercent += percentChange;
        validComparisons++;
      }
      
      const avgChangePercent = validComparisons > 0 ? totalChangePercent / validComparisons : 0;
      
      const cumulativeChange = previousSession 
        ? (previousSession.total_change_percent || 0) + avgChangePercent
        : 0;
      
      newSessions.push({
        session_id: sessionIdx + 1,
        ...session,
        total_change_percent: cumulativeChange,
      });
    }
    
    // Insert new sessions
    for (const session of newSessions) {
      const { error } = await supabase
        .from('gym_progress')
        .insert(session);
      
      if (error) throw error;
    }
    
    return NextResponse.json({ 
      success: true, 
      sessionsProcessed: newSessions.length,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error syncing gym progress:', error);
    return NextResponse.json(
      { error: 'Failed to sync gym progress' },
      { status: 500 }
    );
  }
}