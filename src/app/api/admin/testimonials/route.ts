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

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    await connectDB();
    const testimonials = await Testimonial.find().sort({ createdAt: -1 }).lean();
    return NextResponse.json({ success: true, data: testimonials });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: dbError(err) }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await request.json();
    if (!body.name || !body.comment) {
      return NextResponse.json({ success: false, error: 'Name and comment are required' }, { status: 400 });
    }
    await connectDB();
    const testimonial = await Testimonial.create(body);
    return NextResponse.json({ success: true, data: testimonial }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: dbError(err) }, { status: 500 });
  }
}
