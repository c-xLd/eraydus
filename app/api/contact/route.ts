import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    // TODO: process body (e.g., insert into Supabase)
    // For now, just return success
    return NextResponse.json({ success: true, message: 'Contact submitted' }, { status: 200 });
  } catch (error) {
    console.error('Error in POST /api/contact:', error);
    return NextResponse.json({ success: false, message: 'Failed to submit contact' }, { status: 500 });
  }
}

// Optional: handle other HTTP methods
export async function GET() {
  return NextResponse.json({ success: true, message: 'Contact API is running' }, { status: 200 });
}