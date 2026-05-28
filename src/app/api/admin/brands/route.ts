import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import connectDB from '@/lib/mongodb';
import Brand from '@/models/Brand';

function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

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
    const brands = await Brand.find().sort({ order: 1, name: 1 }).lean();
    return NextResponse.json({ success: true, data: brands });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: dbError(err) }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await request.json();
    const { name, description = '', logo = '', order = 0, active = true } = body;

    if (!name?.trim()) return NextResponse.json({ error: 'Name is required' }, { status: 400 });

    await connectDB();
    const slug = body.slug?.trim() || slugify(name);
    const existing = await Brand.findOne({ slug });
    if (existing) return NextResponse.json({ error: 'A brand with this slug already exists' }, { status: 400 });

    const brand = await Brand.create({ name: name.trim(), slug, description, logo, order, active });
    return NextResponse.json({ success: true, data: brand }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: dbError(err) }, { status: 500 });
  }
}
