import { NextResponse } from 'next/server';

// Mock home page data
const homeData = {
  hero: {
    title: "Premium Steel Solutions",
    subtitle: "Vighnaharta Steel Industries",
    description: "Leading manufacturer and supplier of high-quality steel products for construction and industrial applications. Trusted by thousands of clients worldwide.",
    primaryButtonText: "View Products",
    primaryButtonLink: "/products",
    secondaryButtonText: "Get Quote",
    secondaryButtonLink: "/quote"
  },
  features: [
    {
      icon: "checkmark",
      title: "Quality Assurance",
      description: "All products undergo rigorous quality testing to ensure they meet industry standards."
    },
    {
      icon: "clock",
      title: "Timely Delivery",
      description: "We ensure on-time delivery of your orders with our efficient logistics network."
    },
    {
      icon: "money",
      title: "Competitive Pricing",
      description: "Best market prices without compromising on quality and service excellence."
    }
  ],
  statistics: [
    {
      value: "25+",
      label: "Years Experience"
    },
    {
      value: "1000+",
      label: "Happy Clients"
    },
    {
      value: "50,000+",
      label: "Tons Produced"
    },
    {
      value: "99%",
      label: "Customer Satisfaction"
    }
  ],
  cta: {
    title: "Ready to Start Your Project?",
    description: "Get in touch with our experts for customized steel solutions.",
    primaryButtonText: "Get Free Quote",
    primaryButtonLink: "/quote",
    secondaryButtonText: "Contact Us",
    secondaryButtonLink: "/contact"
  }
};

// GET /api/home - Get home page data
export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      data: homeData
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch home data' },
      { status: 500 }
    );
  }
}
