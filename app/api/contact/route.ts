import { NextRequest, NextResponse } from 'next/server';

// POST /api/contact - Submit contact form
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, company, subject, message } = body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        {
          success: false,
          error: 'Name, email, subject, and message are required'
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

    // In production, you would:
    // 1. Save to database
    // 2. Send email notification
    // 3. Send auto-reply to customer

    const contactSubmission = {
      id: Date.now().toString(),
      name,
      email,
      phone: phone || '',
      company: company || '',
      subject,
      message,
      submittedAt: new Date().toISOString(),
      status: 'pending'
    };

    // Mock: Save to database (replace with actual database call)
    // await saveContactSubmission(contactSubmission);

    // Mock: Send email (replace with actual email service)
    // await sendContactEmail(contactSubmission);

    console.log('Contact form submission:', contactSubmission);

    return NextResponse.json({
      success: true,
      message: 'Thank you for your message. We will get back to you soon!',
      data: {
        id: contactSubmission.id,
        submittedAt: contactSubmission.submittedAt
      }
    }, { status: 201 });
  } catch (error) {
    console.error('Contact submission error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to submit contact form' },
      { status: 500 }
    );
  }
}

// GET /api/contact - Get contact information
export async function GET() {
  try {
    const contactInfo = {
      address: {
        street: "123 Industrial Area, Sector 45",
        city: "Steel City",
        state: "Maharashtra",
        zip: "12345",
        country: "India"
      },
      phone: {
        primary: "+91 98765 43210",
        sales: "+91 98765 43211",
        tollFree: "1800-123-4567"
      },
      email: {
        info: "info@vighnahartasteel.com",
        sales: "sales@vighnahartasteel.com",
        support: "support@vighnahartasteel.com"
      },
      hours: {
        weekdays: "Monday - Saturday: 9:00 AM - 6:00 PM",
        sunday: "Closed",
        emergency: "24/7 Support"
      }
    };

    return NextResponse.json({
      success: true,
      data: contactInfo
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch contact information' },
      { status: 500 }
    );
  }
}
