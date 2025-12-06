import { supabase } from '@/lib/supabase';
import { NextResponse } from 'next/server';

// Get all weight values in sorted order
export async function GET() {
  try {
    const { data, error } = await supabase
      .from('weight_tracking')
      .select('*')
      .order('date', { ascending: true });
    
    if (error) throw error;
    
    return NextResponse.json({ data });
  } catch (error) {
    console.error('Error fetching weight tracking data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch weight tracking data' },
      { status: 500 }
    );
  }
}