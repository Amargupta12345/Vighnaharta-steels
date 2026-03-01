import { NextResponse } from 'next/server';

// Extended product data with full details
const productDetails: Record<string, any> = {
  'steel-i-beams': {
    id: '1',
    name: 'Steel I-Beams',
    image: '/assets/images/steel-beam.png',
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
    image: '/assets/images/steel-rod.png',
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
    image: '/assets/images/steel-sheet.png',
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
    image: '/assets/images/steel-pipe.png',
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
  },
  'steel-angles': {
    id: '5',
    name: 'Steel Angles',
    image: '/assets/images/steel-beam.png',
    description: 'L-shaped steel angles used in construction and fabrication work. Available in equal and unequal angle configurations with precise dimensions and consistent quality.',
    price: 'From ₹48/kg',
    specifications: [
      { label: 'Size Range', value: '20x20mm to 200x200mm' },
      { label: 'Thickness', value: '3mm - 20mm' },
      { label: 'Length', value: '6m, 12m' },
      { label: 'Grade', value: 'IS 2062' },
      { label: 'Type', value: 'Equal & Unequal' },
      { label: 'Surface Finish', value: 'Hot Rolled' }
    ],
    features: [
      'High structural strength',
      'Precise dimensional accuracy',
      'Easy to weld and cut',
      'Versatile for multiple applications',
      'IS certified quality'
    ],
    applications: [
      'Structural framework construction',
      'Tower and transmission line fabrication',
      'Industrial shelving and racks',
      'Machine and equipment frames',
      'Bridge components and supports'
    ],
    category: 'Structural Steel',
    slug: 'steel-angles',
    metadata: {
      title: 'Steel Angles - Equal & Unequal L-Angles | Vighnaharta Steel',
      description: 'Premium quality L-shaped steel angles for construction and fabrication. Available in 20x20mm to 200x200mm sizes.'
    }
  },
  'steel-channels': {
    id: '6',
    name: 'Steel Channels',
    image: '/assets/images/steel-beam.png',
    description: 'C-shaped steel channels for structural applications. Ideal for framework, supports, and general construction purposes with excellent load-bearing capacity.',
    price: 'From ₹50/kg',
    specifications: [
      { label: 'Size Range', value: '75mm - 400mm' },
      { label: 'Weight', value: '6.8 kg/m to 50.1 kg/m' },
      { label: 'Length', value: '12m standard' },
      { label: 'Grade', value: 'IS 808' },
      { label: 'Type', value: 'Parallel Flange / Tapered' },
      { label: 'Surface Finish', value: 'Hot Rolled' }
    ],
    features: [
      'High load-bearing capacity',
      'Uniform dimensions throughout',
      'Excellent weldability',
      'Versatile C-shape profile',
      'Compliant with IS standards'
    ],
    applications: [
      'Building framework and purlins',
      'Vehicle chassis and body frames',
      'Industrial conveyor structures',
      'Platform and walkway supports',
      'General fabrication work'
    ],
    category: 'Structural Steel',
    slug: 'steel-channels',
    metadata: {
      title: 'Steel Channels - C-Section Structural Steel | Vighnaharta Steel',
      description: 'Quality C-shaped steel channels for structural applications. IS 808 grade, available in 75mm to 400mm sizes.'
    }
  },
  'steel-plates': {
    id: '7',
    name: 'Steel Plates',
    image: '/assets/images/steel-sheet.png',
    description: 'Heavy-duty steel plates for industrial machinery, shipbuilding, and heavy construction. Available in various grades and thicknesses with excellent mechanical properties.',
    price: 'From ₹55/kg',
    specifications: [
      { label: 'Thickness', value: '6mm - 100mm' },
      { label: 'Size', value: 'Up to 3000x12000mm' },
      { label: 'Grade', value: 'IS 2062, IS 2025' },
      { label: 'Surface', value: 'Hot Rolled, Shot Blasted' },
      { label: 'Tensile Strength', value: '410-540 N/mm²' },
      { label: 'Yield Strength', value: '250-350 N/mm²' }
    ],
    features: [
      'High tensile and yield strength',
      'Excellent impact resistance',
      'Superior surface quality',
      'Wide range of thicknesses',
      'Multiple grade options'
    ],
    applications: [
      'Pressure vessel manufacturing',
      'Shipbuilding and marine structures',
      'Heavy machinery bases',
      'Structural steel fabrication',
      'Industrial storage tanks'
    ],
    category: 'Sheet & Plates',
    slug: 'steel-plates',
    metadata: {
      title: 'Steel Plates - Heavy Duty Industrial Grade | Vighnaharta Steel',
      description: 'Heavy-duty steel plates for industrial and construction applications. Available in 6mm-100mm thickness with multiple grade options.'
    }
  },
  'steel-wire': {
    id: '8',
    name: 'Steel Wire',
    image: '/assets/images/steel-rod.png',
    description: 'High-tensile steel wire for various applications including binding, fencing, and reinforcement work. Available in different gauges and coatings for diverse requirements.',
    price: 'From ₹60/kg',
    specifications: [
      { label: 'Diameter', value: '0.5mm - 12mm' },
      { label: 'Tensile Strength', value: '300-1800 N/mm²' },
      { label: 'Coating', value: 'Galvanized, Black' },
      { label: 'Grade', value: 'IS 280, IS 4454' },
      { label: 'Type', value: 'HB, MS, GI' },
      { label: 'Packing', value: 'Coils, Bundles' }
    ],
    features: [
      'High tensile strength',
      'Excellent flexibility',
      'Corrosion resistant options',
      'Consistent diameter throughout',
      'Available in multiple gauges'
    ],
    applications: [
      'Binding wire for construction',
      'Fencing and barbed wire',
      'Spring manufacturing',
      'Reinforcement in masonry',
      'Industrial fastening applications'
    ],
    category: 'Reinforcement Steel',
    slug: 'steel-wire',
    metadata: {
      title: 'Steel Wire - High Tensile Binding & Fencing Wire | Vighnaharta Steel',
      description: 'Premium steel wire for binding, fencing and reinforcement. Available in 0.5mm-12mm diameter with galvanized coating options.'
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
