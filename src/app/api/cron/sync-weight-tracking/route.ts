import { supabase } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";

const GOOGLE_SHEETS_API_KEY = process.env.GOOGLE_SHEETS_API_KEY;
const GOOGLE_SHEET_ID = process.env.GOOGLE_SHEET_ID;
const CRON_SECRET = process.env.CRON_SECRET;

export async function GET(request: NextRequest) {
  // Authorization check (vercel cron needs to have correct secret)
  const authHeader = request.headers.get("authorization");

  if (authHeader !== `Bearer ${CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Get sheet data
    const sheetRange = "Weight!A1:A1000";
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${GOOGLE_SHEET_ID}/values/${sheetRange}?key=${GOOGLE_SHEETS_API_KEY}`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Google Sheets API error: ${response.statusText}`);
    }

    const data = await response.json();

    if (!data.values || data.values.length === 0) {
      return NextResponse.json({ message: "No data found in sheet" });
    }

    // Get the latest date in the database
    const { data: latestEntry, error: queryError } = await supabase
      .from("weight_tracking")
      .select("date")
      .order("date", { ascending: false })
      .limit(1)
      .single();

    if (queryError && queryError.code !== "PGRST116") {
      // PGRST116 = no rows found
      throw queryError;
    }

    const latestDate = latestEntry ? new Date(latestEntry.date) : null;

    // Transform all rows from sheet to include dates
    const startDate = new Date("2025-11-24");
    const allRows = data.values
      .filter((row: string[]) => row[0] && !isNaN(parseFloat(row[0])))
      .map((row: string[], index: number) => {
        const date = new Date(startDate);
        date.setDate(date.getDate() + index);

        return {
          date: date.toISOString().split("T")[0],
          weight: parseFloat(row[0]),
        };
      });

    // Filter to only new rows (after latest date)
    const newRows = latestDate
      ? allRows.filter(
          (row: { date: string; weight: number }) =>
            new Date(row.date) > latestDate
        )
      : allRows; // If no data exists, insert all

    if (newRows.length === 0) {
      return NextResponse.json({
        success: true,
        message: "No new data to insert",
        timestamp: new Date().toISOString(),
      });
    }

    // Insert only new rows
    const { error: insertError } = await supabase
      .from("weight_tracking")
      .insert(newRows);

    if (insertError) throw insertError;

    return NextResponse.json({
      success: true,
      rowsInserted: newRows.length,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error syncing weight tracking data:", error);
    return NextResponse.json(
      { error: "Failed to sync weight tracking data" },
      { status: 500 }
    );
  }
}
