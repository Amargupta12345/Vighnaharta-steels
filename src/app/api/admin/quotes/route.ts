import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import connectDB from '@/lib/mongodb';
import QuoteRequest from '@/models/QuoteRequest';

function dbError(err: any): string {
  if (err?.code === 'ENOTFOUND' || err?.message?.includes('ENOTFOUND')) {
    return 'Cannot reach the database. Please check your MongoDB Atlas cluster.';
  }
  return err?.message || 'Database error';
}

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    await connectDB();
    const quotes = await QuoteRequest.find().sort({ createdAt: -1 }).lean();
    return NextResponse.json({ success: true, data: quotes });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: dbError(err) }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { id, status } = await request.json();
    await connectDB();
    const quote = await QuoteRequest.findByIdAndUpdate(id, { status }, { new: true });
    if (!quote) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json({ success: true, data: quote });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: dbError(err) }, { status: 500 });
  }
}
