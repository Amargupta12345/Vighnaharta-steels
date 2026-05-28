import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Brand from '@/models/Brand';

const FALLBACK_BRANDS = [
  { _id: '1', name: 'TATA Steel', slug: 'tata-steel', description: "India's largest steel producer", logo: '', order: 1 },
  { _id: '2', name: 'JSW Steel', slug: 'jsw-steel', description: 'Premium quality steel products', logo: '', order: 2 },
  { _id: '3', name: 'SAIL', slug: 'sail', description: 'Steel Authority of India', logo: '', order: 3 },
  { _id: '4', name: 'Essar Steel', slug: 'essar-steel', description: 'High-grade steel solutions', logo: '', order: 4 },
];

export async function GET() {
  try {
    await connectDB();
    const brands = await Brand.find({ active: true }).sort({ order: 1, name: 1 }).lean();
    if (brands.length === 0) {
      return NextResponse.json({ success: true, data: FALLBACK_BRANDS });
    }
    return NextResponse.json({ success: true, data: brands });
  } catch {
    return NextResponse.json({ success: true, data: FALLBACK_BRANDS });
  }
}
