import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Banner from '../components/Banner';
import ProductGrid from '../components/ProductGrid';
import { productsAPI, homeAPI } from '../lib/api';

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState<any[]>([]);
  const [homeData, setHomeData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch featured products and home data in parallel
        const [productsResponse, homeResponse] = await Promise.all([
          productsAPI.getFeatured(),
          homeAPI.getData()
        ]);

        if (productsResponse.success) {
          setFeaturedProducts(productsResponse.data);
        }

        if (homeResponse.success) {
          setHomeData(homeResponse.data);
        }

        setError(null);
      } catch (err: any) {
        console.error('Error fetching home page data:', err);
        setError('Failed to load page data. Please try again later.');

        // Fallback to mock data if API fails
        setFeaturedProducts([
          {
            id: '1',
            name: 'Steel I-Beams',
            image: '/assets/images/steel-beam.svg',
            description: 'High-strength structural steel I-beams perfect for construction projects.',
            price: 'From ₹45/kg',
            specifications: ['Grade: IS 2062', 'Size: 100mm-600mm', 'Length: Up to 12m'],
            slug: 'steel-i-beams'
          },
          {
            id: '2',
            name: 'Steel Rods',
            image: '/assets/images/steel-rod.svg',
            description: 'Premium quality steel rods for reinforcement and construction applications.',
            price: 'From ₹52/kg',
            specifications: ['Grade: Fe 500D/550D', 'Diameter: 8mm-32mm', 'Length: 12m standard'],
            slug: 'steel-rods'
          },
          {
            id: '3',
            name: 'Steel Sheets',
            image: '/assets/images/steel-sheet.svg',
            description: 'Corrosion-resistant steel sheets suitable for roofing and cladding.',
            price: 'From ₹65/kg',
            specifications: ['Thickness: 0.5mm-6mm', 'Width: Up to 1500mm', 'Coating: Galvanized/CR'],
            slug: 'steel-sheets'
          },
          {
            id: '4',
            name: 'Steel Pipes',
            image: '/assets/images/steel-pipe.svg',
            description: 'Seamless and welded steel pipes for water supply and gas lines.',
            price: 'From ₹58/kg',
            specifications: ['Size: 15mm-600mm', 'Grade: IS 1239', 'Type: ERW/Seamless'],
            slug: 'steel-pipes'
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const features = homeData?.features || [
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
  ];

  const heroData = homeData?.hero || {
    title: "Premium Steel Solutions",
    subtitle: "Vighnaharta Steel Industries",
    description: "Leading manufacturer and supplier of high-quality steel products for construction and industrial applications.",
    primaryButtonText: "View Products",
    primaryButtonLink: "/products",
    secondaryButtonText: "Get Quote",
    secondaryButtonLink: "/quote"
  };

  return (
    <>
      <Head>
        <title>Vighnaharta Steel Industries - Quality Steel Products</title>
        <meta
          name="description"
          content="Leading manufacturer and supplier of high-quality steel products including beams, rods, sheets, and pipes. Trusted steel industry partner for construction and industrial needs."
        />
        <meta name="keywords" content="steel, steel products, steel beams, steel rods, steel sheets, steel pipes, construction materials, industrial steel, Vighnaharta Steel" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="min-h-screen">
        <Navbar />

        {/* Hero Section */}
        <Banner
          title={heroData.title}
          subtitle={heroData.subtitle}
          description={heroData.description}
          primaryButtonText={heroData.primaryButtonText}
          primaryButtonLink={heroData.primaryButtonLink}
          secondaryButtonText={heroData.secondaryButtonText}
          secondaryButtonLink={heroData.secondaryButtonLink}
        />

        {/* Loading State */}
        {loading && (
          <div className="container mx-auto px-4 py-16 text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-gray-600">Loading...</p>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="container mx-auto px-4 py-16">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
              <p className="text-yellow-800">{error}</p>
            </div>
          </div>
        )}

        {/* Features Section */}
        {!loading && (
          <>
            <section className="py-16 bg-silver-gray">
              <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold text-steel-blue mb-4">
                    Why Choose Vighnaharta Steel?
                  </h2>
                  <p className="text-lg text-gray-700 max-w-2xl mx-auto">
                    With decades of experience in the steel industry, we deliver quality products
                    that meet the highest standards of durability and performance.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {features.map((feature: any, index: number) => (
                    <div key={index} className="text-center bg-white p-8 rounded-lg shadow-md border border-silver-gray-dark">
                      <div className="w-16 h-16 bg-steel-blue rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                        {feature.icon === 'checkmark' && (
                          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                          </svg>
                        )}
                        {feature.icon === 'clock' && (
                          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                          </svg>
                        )}
                        {feature.icon === 'money' && (
                          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"/>
                          </svg>
                        )}
                      </div>
                      <h3 className="text-xl font-bold text-steel-blue mb-2">{feature.title}</h3>
                      <p className="text-gray-700">{feature.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Featured Products Section */}
            <ProductGrid
              products={featuredProducts}
              title="Featured Products"
              description="Explore our range of high-quality steel products designed to meet your construction and industrial requirements."
              columns={4}
            />

            {/* CTA Section */}
            <section className="py-16 bg-gradient-to-br from-steel-blue to-steel-blue-dark text-white">
              <div className="container mx-auto px-4 text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Ready to Start Your Project?
                </h2>
                <p className="text-xl mb-8 opacity-90">
                  Get in touch with our experts for customized steel solutions.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="/quote"
                    className="bg-accent-orange hover:bg-accent-orange-dark text-white px-8 py-3 rounded-lg font-semibold transition-colors inline-flex items-center justify-center shadow-lg"
                  >
                    Get Free Quote
                  </a>
                  <a
                    href="/contact"
                    className="border-2 border-white hover:bg-white hover:text-steel-blue px-8 py-3 rounded-lg font-semibold transition-colors inline-flex items-center justify-center"
                  >
                    Contact Us
                  </a>
                </div>
              </div>
            </section>
          </>
        )}

        <Footer />
      </div>
    </>
  );
}