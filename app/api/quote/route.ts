import { NextRequest, NextResponse } from 'next/server';

// POST /api/quote - Submit quote request
export async function POST(request: NextRequest) {
  try {
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

    const quoteRequest = {
      id: `QR-${Date.now()}`,
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
      submittedAt: new Date().toISOString(),
      status: 'pending',
      estimatedResponseTime: '24 hours'
    };

    // In production, you would:
    // 1. Save to database
    // 2. Send email notification to sales team
    // 3. Send confirmation email to customer
    // 4. Create quote estimate based on specifications

    // Mock: Save to database
    // await saveQuoteRequest(quoteRequest);

    // Mock: Send notifications
    // await sendQuoteNotification(quoteRequest);

    console.log('Quote request submission:', quoteRequest);

    return NextResponse.json({
      success: true,
      message: 'Thank you for your quote request. Our sales team will contact you within 24 hours!',
      data: {
        quoteId: quoteRequest.id,
        submittedAt: quoteRequest.submittedAt,
        estimatedResponseTime: quoteRequest.estimatedResponseTime
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

// GET /api/quote - Get quote request by ID (for tracking)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const quoteId = searchParams.get('id');

    if (!quoteId) {
      return NextResponse.json(
        { success: false, error: 'Quote ID is required' },
        { status: 400 }
      );
    }

    // In production, fetch from database
    // const quote = await getQuoteById(quoteId);

    // Mock response
    return NextResponse.json({
      success: true,
      message: 'Quote requests will be tracked here in production'
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch quote' },
      { status: 500 }
    );
  }
}
