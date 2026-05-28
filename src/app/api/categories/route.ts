import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Category from '@/models/Category';

const FALLBACK_CATEGORIES = [
  { _id: '1', name: 'Structural Steel', slug: 'structural-steel', description: 'I-beams, channels, angles for construction', icon: '🏗️', color: 'from-blue-50 to-blue-100', order: 1 },
  { _id: '2', name: 'Reinforcement Steel', slug: 'reinforcement-steel', description: 'TMT bars, wire mesh for concrete reinforcement', icon: '🔩', color: 'from-orange-50 to-orange-100', order: 2 },
  { _id: '3', name: 'Sheet & Plates', slug: 'sheet-plates', description: 'Steel sheets and plates for various applications', icon: '📐', color: 'from-green-50 to-green-100', order: 3 },
  { _id: '4', name: 'Tubular Products', slug: 'tubular-products', description: 'Pipes and tubes for structural and fluid applications', icon: '🔧', color: 'from-purple-50 to-purple-100', order: 4 },
];

export async function GET() {
  try {
    await connectDB();
    const categories = await Category.find({ active: true }).sort({ order: 1, name: 1 }).lean();
    if (categories.length === 0) {
      return NextResponse.json({ success: true, data: FALLBACK_CATEGORIES });
    }
    return NextResponse.json({ success: true, data: categories });
  } catch {
    return NextResponse.json({ success: true, data: FALLBACK_CATEGORIES });
  }
}
