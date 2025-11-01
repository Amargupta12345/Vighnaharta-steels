import { NextResponse } from 'next/server';

// Extended product data with full details
const productDetails: Record<string, any> = {
  'steel-i-beams': {
    id: '1',
    name: 'Steel I-Beams',
    image: '/assets/images/steel-beam.svg',
    description: 'High-strength structural steel I-beams perfect for construction projects. These beams are manufactured using premium quality steel and are designed to provide excellent structural support for buildings, bridges, and industrial structures.',
    price: 'From ₹45/kg',
    specifications: [
      { label: 'Grade', value: 'IS 2062, IS 800' },
      { label: 'Size Range', value: '100mm - 600mm' },
      { label: 'Length', value: 'Up to 12 meters' },
      { label: 'Weight', value: '8.4 kg/m to 87.4 kg/m' },
      { label: 'Surface Finish', value: 'Hot Rolled' },
      { label: 'Tensile Strength', value: '410-540 N/mm²' }
    ],
    features: [
      'High tensile strength and durability',
      'Excellent corrosion resistance',
      'Easy to weld and fabricate',
      'Uniform cross-section throughout',
      'Meets all international standards'
    ],
    applications: [
      'Building construction and infrastructure',
      'Bridge construction and flyovers',
      'Industrial buildings and warehouses',
      'Heavy machinery frameworks',
      'Multi-story residential complexes'
    ],
    category: 'Structural Steel',
    slug: 'steel-i-beams',
    metadata: {
      title: 'Steel I-Beams - High Strength Construction Steel | Vighnaharta Steel',
      description: 'Premium quality steel I-beams for construction projects. Available in sizes 100mm-600mm. IS 2062 grade with excellent strength and durability.'
    }
  },
  'steel-rods': {
    id: '2',
    name: 'Steel Rods (TMT Bars)',
    image: '/assets/images/steel-rod.svg',
    description: 'Premium quality TMT (Thermo Mechanically Treated) steel rods for reinforcement in concrete structures. Our TMT bars offer superior strength, ductility, and corrosion resistance.',
    price: 'From ₹52/kg',
    specifications: [
      { label: 'Grade', value: 'Fe 500D, Fe 550D' },
      { label: 'Diameter', value: '8mm - 32mm' },
      { label: 'Length', value: '12 meters (standard)' },
      { label: 'Tensile Strength', value: '500-600 N/mm²' },
      { label: 'Elongation', value: 'Min 14.5%' },
      { label: 'Yield Strength', value: '500-550 N/mm²' }
    ],
    features: [
      'Superior strength and ductility',
      'Excellent bendability',
      'High corrosion resistance',
      'Better bonding with concrete',
      'Earthquake resistant properties'
    ],
    applications: [
      'Reinforced concrete construction',
      'High-rise building construction',
      'Bridge and flyover construction',
      'Industrial structures',
      'Residential construction projects'
    ],
    category: 'Reinforcement Steel',
    slug: 'steel-rods',
    metadata: {
      title: 'TMT Steel Rods - Fe 500D/550D Grade | Vighnaharta Steel',
      description: 'High-quality TMT bars for concrete reinforcement. Fe 500D and Fe 550D grade with superior strength and corrosion resistance.'
    }
  },
  'steel-sheets': {
    id: '3',
    name: 'Steel Sheets',
    image: '/assets/images/steel-sheet.svg',
    description: 'High-quality steel sheets suitable for roofing, cladding, and various industrial applications. Available in galvanized and cold-rolled options with excellent corrosion resistance.',
    price: 'From ₹65/kg',
    specifications: [
      { label: 'Thickness', value: '0.5mm - 6mm' },
      { label: 'Width', value: 'Up to 1500mm' },
      { label: 'Length', value: 'As per requirement' },
      { label: 'Coating', value: 'Galvanized/CR/HR' },
      { label: 'Grade', value: 'IS 277, IS 513' },
      { label: 'Surface', value: 'Smooth, Embossed' }
    ],
    features: [
      'Excellent corrosion resistance',
      'Lightweight yet strong',
      'Easy to install and handle',
      'Weather resistant coating',
      'Long service life'
    ],
    applications: [
      'Roofing and wall cladding',
      'Industrial shed construction',
      'Automotive industry',
      'Appliance manufacturing',
      'Construction formwork'
    ],
    category: 'Sheet & Plates',
    slug: 'steel-sheets',
    metadata: {
      title: 'Steel Sheets - Galvanized & Cold Rolled | Vighnaharta Steel',
      description: 'Quality steel sheets for roofing and industrial applications. Available in various thicknesses with galvanized coating.'
    }
  },
  'steel-pipes': {
    id: '4',
    name: 'Steel Pipes',
    image: '/assets/images/steel-pipe.svg',
    description: 'Seamless and welded steel pipes for water supply, gas lines, and structural applications. Manufactured to meet international standards with excellent durability.',
    price: 'From ₹58/kg',
    specifications: [
      { label: 'Size Range', value: '15mm - 600mm' },
      { label: 'Grade', value: 'IS 1239, IS 3589' },
      { label: 'Type', value: 'ERW, Seamless' },
      { label: 'Pressure Rating', value: 'Up to 40 kg/cm²' },
      { label: 'Length', value: '6m standard' },
      { label: 'Wall Thickness', value: '2mm - 25mm' }
    ],
    features: [
      'High pressure resistance',
      'Corrosion resistant coating',
      'Smooth internal surface',
      'Precision manufacturing',
      'Long service life'
    ],
    applications: [
      'Water supply and plumbing',
      'Gas distribution systems',
      'Oil and petroleum industry',
      'Structural applications',
      'Industrial piping systems'
    ],
    category: 'Tubular Products',
    slug: 'steel-pipes',
    metadata: {
      title: 'Steel Pipes - ERW & Seamless | Vighnaharta Steel',
      description: 'Quality steel pipes for plumbing and industrial use. IS 1239 grade with excellent pressure resistance.'
    }
  }
};

// GET /api/products/[slug] - Get single product by slug
export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const product = productDetails[slug];

    if (!product) {
      return NextResponse.json(
        { success: false, error: 'Product not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: product
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch product' },
      { status: 500 }
    );
  }
}
