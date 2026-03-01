import { NextResponse } from 'next/server';

// Mock product data - Replace with your actual backend/database later
const mockProducts = [
  {
    id: '1',
    name: 'Steel I-Beams',
    image: '/assets/images/steel-beam.png',
    description: 'High-strength structural steel I-beams perfect for construction projects. Available in various sizes and specifications to meet diverse structural requirements.',
    price: 'From ₹45/kg',
    specifications: [
      'Grade: IS 2062, IS 800',
      'Size: 100mm-600mm',
      'Length: Up to 12m',
      'Weight: 8.4 kg/m to 87.4 kg/m'
    ],
    slug: 'steel-i-beams',
    category: 'Structural Steel',
    featured: true
  },
  {
    id: '2',
    name: 'Steel Rods (TMT Bars)',
    image: '/assets/images/steel-rod.png',
    description: 'Premium quality TMT (Thermo Mechanically Treated) steel rods for reinforcement in concrete structures. Superior strength and corrosion resistance.',
    price: 'From ₹52/kg',
    specifications: [
      'Grade: Fe 500D, Fe 550D',
      'Diameter: 8mm-32mm',
      'Length: 12m standard',
      'Tensile Strength: 500-600 N/mm²'
    ],
    slug: 'steel-rods',
    category: 'Reinforcement Steel',
    featured: true
  },
  {
    id: '3',
    name: 'Steel Sheets',
    image: '/assets/images/steel-sheet.png',
    description: 'High-quality steel sheets suitable for roofing, cladding, and various industrial applications. Available in galvanized and cold-rolled options.',
    price: 'From ₹65/kg',
    specifications: [
      'Thickness: 0.5mm-6mm',
      'Width: Up to 1500mm',
      'Coating: Galvanized/CR/HR',
      'Grade: IS 277, IS 513'
    ],
    slug: 'steel-sheets',
    category: 'Sheet & Plates',
    featured: true
  },
  {
    id: '4',
    name: 'Steel Pipes',
    image: '/assets/images/steel-pipe.png',
    description: 'Seamless and welded steel pipes for water supply, gas lines, and structural applications. Compliant with international standards.',
    price: 'From ₹58/kg',
    specifications: [
      'Size: 15mm-600mm',
      'Grade: IS 1239, IS 3589',
      'Type: ERW, Seamless',
      'Pressure: Up to 40 kg/cm²'
    ],
    slug: 'steel-pipes',
    category: 'Tubular Products',
    featured: true
  },
  {
    id: '5',
    name: 'Steel Angles',
    image: '/assets/images/steel-beam.png',
    description: 'L-shaped steel angles used in construction and fabrication work. Available in equal and unequal angle configurations.',
    price: 'From ₹48/kg',
    specifications: [
      'Size: 20x20mm to 200x200mm',
      'Thickness: 3mm-20mm',
      'Length: 6m, 12m',
      'Grade: IS 2062'
    ],
    slug: 'steel-angles',
    category: 'Structural Steel',
    featured: false
  },
  {
    id: '6',
    name: 'Steel Channels',
    image: '/assets/images/steel-beam.png',
    description: 'C-shaped steel channels for structural applications. Ideal for framework, supports, and general construction purposes.',
    price: 'From ₹50/kg',
    specifications: [
      'Size: 75mm-400mm',
      'Weight: 6.8 kg/m to 50.1 kg/m',
      'Length: 12m standard',
      'Grade: IS 808'
    ],
    slug: 'steel-channels',
    category: 'Structural Steel',
    featured: false
  },
  {
    id: '7',
    name: 'Steel Plates',
    image: '/assets/images/steel-sheet.png',
    description: 'Heavy-duty steel plates for industrial machinery, shipbuilding, and heavy construction. Available in various grades and thicknesses.',
    price: 'From ₹55/kg',
    specifications: [
      'Thickness: 6mm-100mm',
      'Size: Up to 3000x12000mm',
      'Grade: IS 2062, IS 2025',
      'Surface: Hot Rolled, Shot Blasted'
    ],
    slug: 'steel-plates',
    category: 'Sheet & Plates',
    featured: false
  },
  {
    id: '8',
    name: 'Steel Wire',
    image: '/assets/images/steel-rod.png',
    description: 'High-tensile steel wire for various applications including binding, fencing, and reinforcement work. Available in different gauges.',
    price: 'From ₹60/kg',
    specifications: [
      'Diameter: 0.5mm-12mm',
      'Tensile Strength: 300-1800 N/mm²',
      'Coating: Galvanized, Black',
      'Grade: IS 280, IS 4454'
    ],
    slug: 'steel-wire',
    category: 'Reinforcement Steel',
    featured: false
  }
];

// GET /api/products - Get all products
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const featured = searchParams.get('featured');

    let filteredProducts = [...mockProducts];

    // Filter by category if provided
    if (category) {
      filteredProducts = filteredProducts.filter(p =>
        p.category.toLowerCase() === category.toLowerCase()
      );
    }

    // Filter featured products if requested
    if (featured === 'true') {
      filteredProducts = filteredProducts.filter(p => p.featured === true);
    }

    return NextResponse.json({
      success: true,
      data: filteredProducts,
      total: filteredProducts.length
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

// POST /api/products - Create new product (for admin)
export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate required fields
    if (!body.name || !body.description || !body.price) {
      return NextResponse.json(
        { success: false, error: 'Name, description, and price are required' },
        { status: 400 }
      );
    }

    // Generate new ID
    const newProduct = {
      id: String(mockProducts.length + 1),
      ...body,
      createdAt: new Date().toISOString()
    };

    // In production, save to database here
    // await saveProductToDatabase(newProduct);

    return NextResponse.json({
      success: true,
      data: newProduct,
      message: 'Product created successfully'
    }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to create product' },
      { status: 500 }
    );
  }
}
