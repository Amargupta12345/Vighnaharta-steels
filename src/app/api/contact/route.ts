import { NextRequest, NextResponse } from 'next/server';
import connectDB from '../../../../lib/mongodb';
import ContactSubmission from '../../../../models/ContactSubmission';

// POST /api/contact - Submit contact form
export async function POST(request: NextRequest) {
  try {
    await connectDB();

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

    // Save to MongoDB
    const contactSubmission = await ContactSubmission.create({
      name,
      email,
      phone: phone || '',
      company: company || '',
      subject,
      message,
      status: 'pending',
    });

    console.log('✅ Contact saved to MongoDB:', contactSubmission._id);

    return NextResponse.json({
      success: true,
      message: 'Thank you for your message. We will get back to you soon!',
      data: {
        id: contactSubmission._id,
        submittedAt: contactSubmission.createdAt
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

// GET /api/contact - Get contact information or all submissions
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const listSubmissions = searchParams.get('submissions');

    // If ?submissions=true, return all contact submissions from DB
    if (listSubmissions === 'true') {
      await connectDB();
      const submissions = await ContactSubmission.find().sort({ createdAt: -1 });
      return NextResponse.json({
        success: true,
        count: submissions.length,
        data: submissions
      });
    }

    // Default: return contact information (no DB needed)
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
      { success: false, error: 'Failed to fetch data' },
      { status: 500 }
    );
  }
}
