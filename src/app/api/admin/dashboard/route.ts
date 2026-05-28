import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import connectDB from '@/lib/mongodb';
import Product from '@/models/Product';
import Testimonial from '@/models/Testimonial';
import ContactSubmission from '@/models/ContactSubmission';
import QuoteRequest from '@/models/QuoteRequest';

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    await connectDB();

    const [products, testimonials, pendingContacts, pendingQuotes, recentContacts, recentQuotes] =
      await Promise.all([
        Product.countDocuments(),
        Testimonial.countDocuments(),
        ContactSubmission.countDocuments({ status: 'pending' }),
        QuoteRequest.countDocuments({ status: 'pending' }),
        ContactSubmission.find().sort({ createdAt: -1 }).limit(5).lean(),
        QuoteRequest.find().sort({ createdAt: -1 }).limit(5).lean(),
      ]);

    return NextResponse.json({
      success: true,
      data: {
        stats: { products, testimonials, pendingContacts, pendingQuotes },
        recentContacts,
        recentQuotes,
      },
    });
  } catch (err: any) {
    const isNetwork = err?.code === 'ENOTFOUND' || err?.message?.includes('ENOTFOUND');
    return NextResponse.json(
      {
        success: false,
        error: isNetwork
          ? 'Cannot reach the database. Please check your MongoDB Atlas cluster.'
          : err?.message || 'Database error',
      },
      { status: 500 }
    );
  }
}
