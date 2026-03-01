import { NextRequest, NextResponse } from 'next/server';
import connectDB from '../../../../lib/mongodb';
import QuoteRequest from '../../../../models/QuoteRequest';

// POST /api/quote - Submit quote request
export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();
    const {
      name,
      email,
      phone,
      company,
      productType,
      specifications,
      quantity,
      deliveryDate,
      deliveryLocation,
      message
    } = body;

    // Validate required fields
    if (!name || !email || !phone || !productType || !specifications || !quantity || !deliveryLocation) {
      return NextResponse.json(
        {
          success: false,
          error: 'All required fields must be filled'
        },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Phone validation
    const phoneRegex = /^[\d\s\+\-\(\)]+$/;
    if (!phoneRegex.test(phone)) {
      return NextResponse.json(
        { success: false, error: 'Invalid phone number' },
        { status: 400 }
      );
    }

    // Save to MongoDB
    const quoteRequest = await QuoteRequest.create({
      name,
      email,
      phone,
      company: company || '',
      productType,
      specifications,
      quantity,
      deliveryDate: deliveryDate || null,
      deliveryLocation,
      message: message || '',
      status: 'pending',
    });

    console.log('✅ Quote saved to MongoDB:', quoteRequest._id);

    return NextResponse.json({
      success: true,
      message: 'Thank you for your quote request. Our sales team will contact you within 24 hours!',
      data: {
        quoteId: quoteRequest._id,
        submittedAt: quoteRequest.createdAt,
        estimatedResponseTime: '24 hours'
      }
    }, { status: 201 });
  } catch (error) {
    console.error('Quote submission error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to submit quote request' },
      { status: 500 }
    );
  }
}

// GET /api/quote - Get all quote requests (admin) or single by ID
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const quoteId = searchParams.get('id');

    if (quoteId) {
      // Fetch single quote
      const quote = await QuoteRequest.findById(quoteId);
      if (!quote) {
        return NextResponse.json(
          { success: false, error: 'Quote not found' },
          { status: 404 }
        );
      }
      return NextResponse.json({ success: true, data: quote });
    }

    // Fetch all quotes (sorted newest first)
    const quotes = await QuoteRequest.find().sort({ createdAt: -1 });
    return NextResponse.json({
      success: true,
      count: quotes.length,
      data: quotes
    });
  } catch (error) {
    console.error('Quote fetch error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch quotes' },
      { status: 500 }
    );
  }
}
