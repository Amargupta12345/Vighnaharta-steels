import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import connectDB from '@/lib/mongodb';
import Category from '@/models/Category';

function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

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
    const { id } = await params;
    const body = await request.json();
    const { name, description, icon, color, order, active } = body;
    const slug = body.slug?.trim() || (name ? slugify(name) : undefined);

    await connectDB();

    if (slug) {
      const conflict = await Category.findOne({ slug, _id: { $ne: id } });
      if (conflict) return NextResponse.json({ error: 'Slug already used by another category' }, { status: 400 });
    }

    const update: any = {};
    if (name !== undefined) update.name = name;
    if (slug !== undefined) update.slug = slug;
    if (description !== undefined) update.description = description;
    if (icon !== undefined) update.icon = icon;
    if (color !== undefined) update.color = color;
    if (order !== undefined) update.order = order;
    if (active !== undefined) update.active = active;

    const category = await Category.findByIdAndUpdate(id, update, { new: true });
    if (!category) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json({ success: true, data: category });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: dbError(err) }, { status: 500 });
  }
}

export async function DELETE(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { id } = await params;
    await connectDB();
    const category = await Category.findByIdAndDelete(id);
    if (!category) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: dbError(err) }, { status: 500 });
  }
}
