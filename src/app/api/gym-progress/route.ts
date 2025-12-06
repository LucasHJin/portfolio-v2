import { supabase } from '@/lib/supabase';
import { NextResponse } from 'next/server';

// Get all percentage changes in sorted order
export async function GET() {
  try {
    const { data, error } = await supabase
      .from('gym_progress')
      .select('session_id, total_change_percent')
      .order('session_id', { ascending: true });
    
    if (error) throw error;
    
    return NextResponse.json({ data });
  } catch (error) {
    console.error('Error fetching gym progress:', error);
    return NextResponse.json(
      { error: 'Failed to fetch gym progress' },
      { status: 500 }
    );
  }
}