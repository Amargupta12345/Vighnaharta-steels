import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import connectDB from '@/lib/mongodb';
import Product from '@/models/Product';

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    await connectDB();
    const products = await Product.find().sort({ createdAt: -1 }).lean();
    return NextResponse.json({ success: true, data: products });
  } catch (err: any) {
    console.error('Admin products GET error:', err);
    return NextResponse.json(
      { success: false, error: dbError(err) },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await request.json();

    if (!body.name || !body.description || !body.category) {
      return NextResponse.json(
        { success: false, error: 'Name, description, and category are required' },
        { status: 400 }
      );
    }

    await connectDB();

    const slug =
      body.slug ||
      body.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');

    const existing = await Product.findOne({ slug });
    if (existing) {
      return NextResponse.json(
        { success: false, error: 'A product with this slug already exists' },
        { status: 400 }
      );
    }

    const product = await Product.create({ ...body, slug });
    return NextResponse.json({ success: true, data: product }, { status: 201 });
  } catch (err: any) {
    console.error('Admin products POST error:', err);
    return NextResponse.json(
      { success: false, error: dbError(err) },
      { status: 500 }
    );
  }
}

function dbError(err: any): string {
  if (err?.code === 'ENOTFOUND' || err?.message?.includes('ENOTFOUND')) {
    return 'Cannot reach the database. Please check your MongoDB Atlas cluster — it may be paused or your IP may not be whitelisted.';
  }
  return err?.message || 'Database error';
}
