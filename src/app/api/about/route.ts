import { NextResponse } from 'next/server';

// Mock about page data
const aboutData = {
  company: {
    name: "Vighnaharta Steel Industries",
    founded: "1998",
    description: "Founded with a vision to provide high-quality steel products, Vighnaharta Steel Industries has grown to become a trusted name in the steel manufacturing industry."
  },
  mission: {
    title: "Our Mission",
    description: "To provide high-quality steel products that meet international standards while maintaining competitive pricing and exceptional customer service. We strive to be the preferred choice for all steel requirements in the construction and industrial sectors."
  },
  vision: {
    title: "Our Vision",
    description: "To become the leading steel manufacturer in the region, known for innovation, sustainability, and excellence. We envision a future where our products contribute to building stronger, more resilient infrastructure across the nation."
  },
  values: [
    {
      title: "Quality",
      description: "We never compromise on quality. Every product undergoes rigorous testing to ensure it meets the highest industry standards."
    },
    {
      title: "Integrity",
      description: "Honesty and transparency in all our business dealings. We build trust through consistent and ethical business practices."
    },
    {
      title: "Innovation",
      description: "Continuously improving our processes and products to meet evolving market demands and technological advancements."
    }
  ],
  statistics: [
    { value: "25+", label: "Years Experience" },
    { value: "1000+", label: "Happy Clients" },
    { value: "50,000+", label: "Tons Produced" },
    { value: "99%", label: "Customer Satisfaction" }
  ],
  team: [
    {
      name: "Managing Director",
      experience: "25+ years in steel industry",
      description: "Leading the company with vision and expertise"
    },
    {
      name: "Production Head",
      experience: "20+ years in manufacturing",
      description: "Ensuring quality and efficiency in production"
    },
    {
      name: "Sales Director",
      experience: "15+ years in sales",
      description: "Building strong customer relationships"
    }
  ]
};

// GET /api/about - Get about page data
export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      data: aboutData
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch about data' },
      { status: 500 }
    );
  }
}
