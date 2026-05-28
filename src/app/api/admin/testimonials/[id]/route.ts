import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import connectDB from '@/lib/mongodb';
import Testimonial from '@/models/Testimonial';

function dbError(err: any): string {
  if (err?.code === 'ENOTFOUND' || err?.message?.includes('ENOTFOUND')) {
    return 'Cannot reach the database. Please check your MongoDB Atlas cluster.';
  }
  return err?.message || 'Database error';
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    await connectDB();
    const { id } = await params;
    const body = await request.json();
    const testimonial = await Testimonial.findByIdAndUpdate(id, body, { new: true });
    if (!testimonial) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json({ success: true, data: testimonial });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: dbError(err) }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    await connectDB();
    const { id } = await params;
    const testimonial = await Testimonial.findByIdAndDelete(id);
    if (!testimonial) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json({ success: true, message: 'Testimonial deleted' });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: dbError(err) }, { status: 500 });
  }
}
