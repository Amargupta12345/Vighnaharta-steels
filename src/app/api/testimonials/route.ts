import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Testimonial from '@/models/Testimonial';

const mockTestimonials = [
  { id: '1', name: 'Rajesh Kumar', designation: 'Project Manager', company: 'Premier Construction Pvt. Ltd.', rating: 5, comment: 'Vighnaharta Steels has been our trusted partner for over 5 years. Their steel beams and rods have never disappointed us. The quality is exceptional, and their customer service is top-notch.', location: 'Mumbai, Maharashtra', project: 'Commercial Complex Development', date: '2024-01-15', featured: true },
  { id: '2', name: 'Priya Sharma', designation: 'Chief Engineer', company: 'Modern Infrastructure Group', rating: 5, comment: 'Outstanding quality and timely delivery! We ordered steel sheets for a major industrial project, and they exceeded our expectations. Highly recommend Vighnaharta Steels.', location: 'Delhi NCR', project: 'Industrial Warehouse Project', date: '2024-02-20', featured: true },
  { id: '3', name: 'Amit Patel', designation: 'Founder & CEO', company: 'Patel Builders', rating: 5, comment: 'Best steel supplier in the region! Their TMT bars are of superior quality and meet all IS standards. Our partnership with Vighnaharta Steels has been crucial for our growth.', location: 'Ahmedabad, Gujarat', project: 'Residential Complex', date: '2024-03-10', featured: true },
  { id: '4', name: 'Meera Nair', designation: 'Quality Assurance Manager', company: 'National Builders Consortium', rating: 5, comment: 'I can confidently say that Vighnaharta Steels products meet and often exceed industry standards. Quality is consistently maintained across all batches.', location: 'Chennai, Tamil Nadu', project: 'High-Rise Residential Towers', date: '2024-01-08', featured: true },
];

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const featured = searchParams.get('featured');
    const limit = searchParams.get('limit');

    await connectDB();
    let query: Record<string, unknown> = { approved: true };
    if (featured === 'true') query.featured = true;

    const dbTestimonials = await Testimonial.find(query).sort({ createdAt: -1 }).lean();

    let results: any[] = dbTestimonials.length > 0
      ? dbTestimonials.map((t: any) => ({ ...t, id: t._id.toString() }))
      : mockTestimonials.filter((t) => featured !== 'true' || t.featured);

    if (limit) {
      const n = parseInt(limit, 10);
      if (!isNaN(n) && n > 0) results = results.slice(0, n);
    }

    return NextResponse.json({ success: true, data: results, total: results.length });
  } catch {
    return NextResponse.json({ success: false, error: 'Failed to fetch testimonials' }, { status: 500 });
  }
}
