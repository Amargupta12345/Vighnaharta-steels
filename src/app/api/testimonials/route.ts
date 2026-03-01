import { NextResponse } from 'next/server';

interface Testimonial {
  id: string;
  name: string;
  designation: string;
  company: string;
  rating: number;
  comment: string;
  image?: string;
  location?: string;
  project?: string;
  date: string;
  featured?: boolean;
}

// Mock testimonials data - Replace with your actual backend/database integration
const testimonialsData: Testimonial[] = [
  {
    id: '1',
    name: 'Rajesh Kumar',
    designation: 'Project Manager',
    company: 'Premier Construction Pvt. Ltd.',
    rating: 5,
    comment: 'Vighnaharta Steels has been our trusted partner for over 5 years. Their steel beams and rods have never disappointed us. The quality is exceptional, and their customer service is top-notch. We\'ve used their products in multiple high-rise projects with zero quality issues.',
    location: 'Mumbai, Maharashtra',
    project: 'Commercial Complex Development',
    date: '2024-01-15',
    featured: true
  },
  {
    id: '2',
    name: 'Priya Sharma',
    designation: 'Chief Engineer',
    company: 'Modern Infrastructure Group',
    rating: 5,
    comment: 'Outstanding quality and timely delivery! We ordered steel sheets for a major industrial project, and they exceeded our expectations. The galvanized coating is perfect, and the pricing is very competitive. Highly recommend Vighnaharta Steels for all steel requirements.',
    location: 'Delhi NCR',
    project: 'Industrial Warehouse Project',
    date: '2024-02-20',
    featured: true
  },
  {
    id: '3',
    name: 'Amit Patel',
    designation: 'Founder & CEO',
    company: 'Patel Builders',
    rating: 5,
    comment: 'Best steel supplier in the region! Their TMT bars are of superior quality and meet all IS standards. The team is professional, responsive, and always ready to help with custom requirements. Our partnership with Vighnaharta Steels has been crucial for our growth.',
    location: 'Ahmedabad, Gujarat',
    project: 'Residential Complex',
    date: '2024-03-10',
    featured: true
  },
  {
    id: '4',
    name: 'Sneha Reddy',
    designation: 'Structural Designer',
    company: 'Architectural Solutions Inc.',
    rating: 5,
    comment: 'As a structural designer, I\'ve worked with many steel suppliers, but Vighnaharta Steels stands out. Their steel pipes are precisely manufactured and perfect for our plumbing and gas line installations. The technical support team is knowledgeable and always available.',
    location: 'Bangalore, Karnataka',
    project: 'Mixed-Use Development',
    date: '2024-01-28',
    featured: false
  },
  {
    id: '5',
    name: 'Vikram Singh',
    designation: 'Operations Director',
    company: 'Mega Projects Corporation',
    rating: 5,
    comment: 'We\'ve been sourcing steel products from Vighnaharta Steels for our bridge construction projects. Their I-beams are incredibly strong and reliable. The logistics team ensures on-time delivery even for large orders. Very satisfied with their service!',
    location: 'Pune, Maharashtra',
    project: 'Bridge Construction',
    date: '2023-12-05',
    featured: false
  },
  {
    id: '6',
    name: 'Kavita Mehta',
    designation: 'Procurement Head',
    company: 'Green Buildings Ltd.',
    rating: 5,
    comment: 'Excellent quality control and consistent product quality. We use Vighnaharta Steels for all our sustainable building projects. Their commitment to quality and environmental standards aligns perfectly with our company values. Highly recommended!',
    location: 'Hyderabad, Telangana',
    project: 'Eco-Friendly Residential Project',
    date: '2024-02-14',
    featured: false
  },
  {
    id: '7',
    name: 'Rahul Desai',
    designation: 'Site Manager',
    company: 'Infrastructure Developers',
    rating: 5,
    comment: 'Quick delivery, competitive prices, and excellent product quality. We\'ve ordered multiple times and never faced any issues. Their steel sheets are perfect for our roofing requirements. The best part is their transparent pricing - no hidden costs!',
    location: 'Surat, Gujarat',
    project: 'Industrial Plant',
    date: '2024-03-22',
    featured: false
  },
  {
    id: '8',
    name: 'Meera Nair',
    designation: 'Quality Assurance Manager',
    company: 'National Builders Consortium',
    rating: 5,
    comment: 'As someone who tests materials extensively, I can confidently say that Vighnaharta Steels products meet and often exceed industry standards. Their steel rods show excellent tensile strength and durability. Quality is consistently maintained across all batches.',
    location: 'Chennai, Tamil Nadu',
    project: 'High-Rise Residential Towers',
    date: '2024-01-08',
    featured: true
  },
  {
    id: '9',
    name: 'Anil Joshi',
    designation: 'Managing Director',
    company: 'Joshi Constructions',
    rating: 5,
    comment: 'Professional service from start to finish. From initial consultation to final delivery, the team at Vighnaharta Steels has been supportive. Their steel products have contributed significantly to the success of our projects. Looking forward to continued partnership!',
    location: 'Jaipur, Rajasthan',
    project: 'Commercial Mall',
    date: '2023-11-30',
    featured: false
  },
  {
    id: '10',
    name: 'Sunita Agarwal',
    designation: 'Business Development Manager',
    company: 'Urban Development Corp.',
    rating: 5,
    comment: 'We\'ve been working with Vighnaharta Steels for the past 3 years across multiple projects. Their product range is extensive, quality is uncompromising, and their team understands our business needs. The best steel supplier we\'ve worked with!',
    location: 'Kolkata, West Bengal',
    project: 'Smart City Initiative',
    date: '2024-02-28',
    featured: true
  }
];

// GET /api/testimonials - Get all testimonials
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const featured = searchParams.get('featured');
    const limit = searchParams.get('limit');

    let testimonials = [...testimonialsData];

    // Filter by featured if requested
    if (featured === 'true') {
      testimonials = testimonials.filter(t => t.featured === true);
    }

    // Sort by date (most recent first)
    testimonials.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    // Limit results if requested
    if (limit) {
      const limitNum = parseInt(limit, 10);
      if (!isNaN(limitNum) && limitNum > 0) {
        testimonials = testimonials.slice(0, limitNum);
      }
    }

    return NextResponse.json({
      success: true,
      data: testimonials,
      total: testimonialsData.length
    });
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch testimonials' },
      { status: 500 }
    );
  }
}

