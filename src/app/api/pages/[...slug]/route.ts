import { NextRequest, NextResponse } from 'next/server';

// This API route demonstrates how you can manage dynamic pages from your backend
// You can integrate this with your CMS, database, or any backend system

interface PageData {
  title: string;
  content: string;
  metadata: {
    title: string;
    description: string;
  };
}

// Mock backend data - replace this with your actual backend integration
const mockBackendPages: Record<string, PageData> = {
  'privacy': {
    title: 'Privacy Policy',
    content: `
      <div class="prose max-w-none">
        <h1>Privacy Policy</h1>
        <p>Last updated: ${new Date().toLocaleDateString()}</p>

        <h2>Information We Collect</h2>
        <p>We collect information you provide directly to us, such as when you create an account, make a purchase, or contact us for support.</p>

        <h2>How We Use Your Information</h2>
        <p>We use the information we collect to provide, maintain, and improve our services.</p>

        <h2>Information Sharing</h2>
        <p>We do not sell, trade, or otherwise transfer your personal information to third parties without your consent.</p>

        <h2>Contact Us</h2>
        <p>If you have any questions about this Privacy Policy, please contact us at info@vighnahartasteel.com</p>
      </div>
    `,
    metadata: {
      title: 'Privacy Policy - Vighnaharta Steel Industries',
      description: 'Privacy policy for Vighnaharta Steel Industries website and services.'
    }
  },
  'terms': {
    title: 'Terms of Service',
    content: `
      <div class="prose max-w-none">
        <h1>Terms of Service</h1>
        <p>Last updated: ${new Date().toLocaleDateString()}</p>

        <h2>Acceptance of Terms</h2>
        <p>By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement.</p>

        <h2>Product Information</h2>
        <p>We strive to provide accurate product information, but we do not warrant that product descriptions or other content is accurate, complete, reliable, current, or error-free.</p>

        <h2>Pricing</h2>
        <p>All prices are subject to change without notice. We reserve the right to modify or discontinue products at any time.</p>

        <h2>Contact Information</h2>
        <p>For questions about these Terms of Service, please contact us at info@vighnahartasteel.com</p>
      </div>
    `,
    metadata: {
      title: 'Terms of Service - Vighnaharta Steel Industries',
      description: 'Terms of service for Vighnaharta Steel Industries website and products.'
    }
  },
  'company/history': {
    title: 'Our Company History',
    content: `
      <div class="prose max-w-none">
        <h1>Our Company History</h1>

        <h2>1998 - The Beginning</h2>
        <p>Vighnaharta Steel Industries was founded with a vision to provide high-quality steel products to the construction industry.</p>

        <h2>2005 - Expansion</h2>
        <p>We expanded our manufacturing capacity and introduced new product lines to serve a wider range of industrial needs.</p>

        <h2>2015 - Technology Upgrade</h2>
        <p>Major investment in modern manufacturing technology and quality control systems.</p>

        <h2>Today</h2>
        <p>We continue to grow and innovate, serving thousands of customers across the region with premium steel products.</p>
      </div>
    `,
    metadata: {
      title: 'Company History - Vighnaharta Steel Industries',
      description: 'Learn about the history and growth of Vighnaharta Steel Industries since 1998.'
    }
  }
};

// GET endpoint to fetch page data
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string[] }> }
) {
  const { slug } = await params;
  const slugString = slug.join('/');

  try {
    // In a real application, you would fetch this data from your backend
    // Example: const pageData = await fetchFromDatabase(slugString);

    const pageData = mockBackendPages[slugString];

    if (!pageData) {
      return NextResponse.json(
        { error: 'Page not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(pageData);
  } catch (error) {
    console.error('Error fetching page data:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST endpoint to create/update pages (for CMS integration)
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string[] }> }
) {
  const { slug } = await params;
  const slugString = slug.join('/');

  try {
    const body = await request.json();
    const { title, content, metadata } = body;

    // Validate required fields
    if (!title || !content) {
      return NextResponse.json(
        { error: 'Title and content are required' },
        { status: 400 }
      );
    }

    // In a real application, you would save this to your database
    // Example: await saveToDatabase(slugString, { title, content, metadata });

    const pageData: PageData = {
      title,
      content,
      metadata: metadata || {
        title: title,
        description: content.substring(0, 160) + '...'
      }
    };

    // For demo purposes, we'll just return the data
    // In production, you'd save to database and return success

    return NextResponse.json({
      message: 'Page created/updated successfully',
      data: pageData
    });
  } catch (error) {
    console.error('Error creating/updating page:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE endpoint to remove pages
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string[] }> }
) {
  const { slug } = await params;
  const slugString = slug.join('/');

  try {
    // In a real application, you would delete from your database
    // Example: await deleteFromDatabase(slugString);

    return NextResponse.json({
      message: 'Page deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting page:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
