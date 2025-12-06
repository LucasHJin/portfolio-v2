import { supabase } from '@/lib/supabase';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { count } = await request.json();
    
    // Call incrementer function defined in postgres
    const { error } = await supabase.rpc('increment_clicks', { 
      amount: count 
    });
    
    if (error) {
        throw error;
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error incrementing clicks:', error);
    return NextResponse.json(
      { error: 'Failed to increment clicks' }, 
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    // Get amount of clicks
    const { data, error } = await supabase
      .from('pet_stats')
      .select('clicks')
      .eq('id', 1)
      .single();
    
    if (error) {
        throw error;
    }
    
    return NextResponse.json({ clicks: data.clicks });
  } catch (error) {
    console.error('Error getting clicks:', error);
    return NextResponse.json(
      { error: 'Failed to get clicks' }, 
      { status: 500 }
    );
  }
}