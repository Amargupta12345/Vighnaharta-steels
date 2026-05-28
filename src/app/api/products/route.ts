import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Product from '@/models/Product';

// Fallback mock data shown when DB is empty (before admin adds real products)
const mockProducts = [
  { id: '1', name: 'Steel I-Beams', image: '/assets/images/steel-beam.png', description: 'High-strength structural steel I-beams perfect for construction projects.', price: 'From ₹45/kg', specifications: [{ label: 'Grade', value: 'IS 2062, IS 800' }, { label: 'Size', value: '100mm-600mm' }], slug: 'steel-i-beams', category: 'Structural Steel', featured: true },
  { id: '2', name: 'Steel Rods (TMT Bars)', image: '/assets/images/steel-rod.png', description: 'Premium quality TMT steel rods for reinforcement in concrete structures.', price: 'From ₹52/kg', specifications: [{ label: 'Grade', value: 'Fe 500D, Fe 550D' }, { label: 'Diameter', value: '8mm-32mm' }], slug: 'steel-rods', category: 'Reinforcement Steel', featured: true },
  { id: '3', name: 'Steel Sheets', image: '/assets/images/steel-sheet.png', description: 'High-quality steel sheets for roofing, cladding, and industrial applications.', price: 'From ₹65/kg', specifications: [{ label: 'Thickness', value: '0.5mm-6mm' }, { label: 'Grade', value: 'IS 277, IS 513' }], slug: 'steel-sheets', category: 'Sheet & Plates', featured: true },
  { id: '4', name: 'Steel Pipes', image: '/assets/images/steel-pipe.png', description: 'Seamless and welded steel pipes for water supply and structural applications.', price: 'From ₹58/kg', specifications: [{ label: 'Size', value: '15mm-600mm' }, { label: 'Grade', value: 'IS 1239, IS 3589' }], slug: 'steel-pipes', category: 'Tubular Products', featured: true },
  { id: '5', name: 'Steel Angles', image: '/assets/images/steel-beam.png', description: 'L-shaped steel angles for construction and fabrication work.', price: 'From ₹48/kg', specifications: [{ label: 'Size', value: '20x20mm to 200x200mm' }, { label: 'Grade', value: 'IS 2062' }], slug: 'steel-angles', category: 'Structural Steel', featured: false },
  { id: '6', name: 'Steel Channels', image: '/assets/images/steel-beam.png', description: 'C-shaped steel channels for structural applications and frameworks.', price: 'From ₹50/kg', specifications: [{ label: 'Size', value: '75mm-400mm' }, { label: 'Grade', value: 'IS 808' }], slug: 'steel-channels', category: 'Structural Steel', featured: false },
  { id: '7', name: 'Steel Plates', image: '/assets/images/steel-sheet.png', description: 'Heavy-duty steel plates for industrial machinery and heavy construction.', price: 'From ₹55/kg', specifications: [{ label: 'Thickness', value: '6mm-100mm' }, { label: 'Grade', value: 'IS 2062' }], slug: 'steel-plates', category: 'Sheet & Plates', featured: false },
  { id: '8', name: 'Steel Wire', image: '/assets/images/steel-rod.png', description: 'High-tensile steel wire for binding, fencing, and reinforcement work.', price: 'From ₹60/kg', specifications: [{ label: 'Diameter', value: '0.5mm-12mm' }, { label: 'Grade', value: 'IS 280, IS 4454' }], slug: 'steel-wire', category: 'Reinforcement Steel', featured: false },
];

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const featured = searchParams.get('featured');

    await connectDB();
    let query: Record<string, unknown> = {};
    if (category) query.category = { $regex: new RegExp(category, 'i') };
    if (featured === 'true') query.featured = true;

    const dbProducts = await Product.find(query).sort({ createdAt: -1 }).lean();

    if (dbProducts.length > 0) {
      const products = dbProducts.map((p: any) => ({ ...p, id: p._id.toString() }));
      return NextResponse.json({ success: true, data: products, total: products.length });
    }

    // Fall back to mock data if DB is empty
    let filtered = [...mockProducts];
    if (category) filtered = filtered.filter((p) => p.category.toLowerCase() === category.toLowerCase());
    if (featured === 'true') filtered = filtered.filter((p) => p.featured);

    return NextResponse.json({ success: true, data: filtered, total: filtered.length });
  } catch {
    return NextResponse.json({ success: false, error: 'Failed to fetch products' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body.name || !body.description || !body.price) {
      return NextResponse.json({ success: false, error: 'Name, description, and price are required' }, { status: 400 });
    }
    await connectDB();
    const slug = body.slug || body.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const product = await Product.create({ ...body, slug });
    return NextResponse.json({ success: true, data: product }, { status: 201 });
  } catch {
    return NextResponse.json({ success: false, error: 'Failed to create product' }, { status: 500 });
  }
}
