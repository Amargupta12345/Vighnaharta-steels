import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import ProductGrid from '../../components/ProductGrid';
import { productsAPI } from '../../lib/api';

export default function Products() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await productsAPI.getAll();

        if (response.success) {
          setProducts(response.data);
        } else {
          setError('Failed to load products');
        }
      } catch (err: any) {
        console.error('Error fetching products:', err);
        setError('Failed to load products. Please try again later.');

        // Fallback to mock data
        setProducts([
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
      name: 'Steel Rods (TMT Bars)',
      image: '/assets/images/steel-rod.svg',
      description: 'Premium quality TMT (Thermo Mechanically Treated) steel rods for reinforcement in concrete structures. Superior strength and corrosion resistance.',
      price: 'From ₹52/kg',
      specifications: [
        'Grade: Fe 500D, Fe 550D',
        'Diameter: 8mm-32mm',
        'Length: 12m standard',
        'Tensile Strength: 500-600 N/mm²'
      ],
      slug: 'steel-rods'
    },
    {
      id: '3',
      name: 'Steel Sheets',
      image: '/assets/images/steel-sheet.svg',
      description: 'High-quality steel sheets suitable for roofing, cladding, and various industrial applications. Available in galvanized and cold-rolled options.',
      price: 'From ₹65/kg',
      specifications: [
        'Thickness: 0.5mm-6mm',
        'Width: Up to 1500mm',
        'Coating: Galvanized/CR/HR',
        'Grade: IS 277, IS 513'
      ],
      slug: 'steel-sheets'
    },
    {
      id: '4',
      name: 'Steel Pipes',
      image: '/assets/images/steel-pipe.svg',
      description: 'Seamless and welded steel pipes for water supply, gas lines, and structural applications. Compliant with international standards.',
      price: 'From ₹58/kg',
      specifications: [
        'Size: 15mm-600mm',
        'Grade: IS 1239, IS 3589',
        'Type: ERW, Seamless',
        'Pressure: Up to 40 kg/cm²'
      ],
      slug: 'steel-pipes'
    },
    {
      id: '5',
      name: 'Steel Angles',
      image: '/assets/images/steel-beam.svg',
      description: 'L-shaped steel angles used in construction and fabrication work. Available in equal and unequal angle configurations.',
      price: 'From ₹48/kg',
      specifications: [
        'Size: 20x20mm to 200x200mm',
        'Thickness: 3mm-20mm',
        'Length: 6m, 12m',
        'Grade: IS 2062'
      ],
      slug: 'steel-angles'
    },
    {
      id: '6',
      name: 'Steel Channels',
      image: '/assets/images/steel-beam.svg',
      description: 'C-shaped steel channels for structural applications. Ideal for framework, supports, and general construction purposes.',
      price: 'From ₹50/kg',
      specifications: [
        'Size: 75mm-400mm',
        'Weight: 6.8 kg/m to 50.1 kg/m',
        'Length: 12m standard',
        'Grade: IS 808'
      ],
      slug: 'steel-channels'
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const categories = [
    {
      name: 'Structural Steel',
      description: 'I-beams, channels, angles for construction',
      count: 4
    },
    {
      name: 'Reinforcement Steel',
      description: 'TMT bars, wire mesh for concrete reinforcement',
      count: 1
    },
    {
      name: 'Sheet & Plates',
      description: 'Steel sheets and plates for various applications',
      count: 1
    }
  ];

  return (
    <>
      <Head>
        <title>Products - Vighnaharta Steel Industries</title>
        <meta
          name="description"
          content="Explore our comprehensive range of high-quality steel products including beams, rods, sheets, and pipes for construction and industrial applications."
        />
      </Head>

      <div className="min-h-screen">
        <Navbar />

        {/* Hero Section */}
        <section className="bg-gradient-to-r from-gray-900 to-blue-900 text-white py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">Our Products</h1>
              <p className="text-xl text-gray-300 mb-8">
                Comprehensive range of high-quality steel products for all your construction and industrial needs
              </p>
            </div>
          </div>
        </section>

        {/* Product Categories */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Product Categories
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                We offer a wide range of steel products across different categories to meet your specific requirements.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {categories.map((category, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{category.name}</h3>
                  <p className="text-gray-600 mb-3">{category.description}</p>
                  <div className="text-sm text-blue-600 font-medium">
                    {category.count} Products
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Loading State */}
        {loading && (
          <div className="container mx-auto px-4 py-16 text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-gray-600">Loading products...</p>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="container mx-auto px-4 py-8">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
              <p className="text-yellow-800">{error}</p>
            </div>
          </div>
        )}

        {/* Products Grid */}
        {!loading && !error && (
          <ProductGrid
          products={products}
          title="All Products"
          description="Explore our complete range of steel products with detailed specifications and competitive pricing."
          columns={3}
          />
        )}

        {/* Quality Assurance */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Quality Assurance
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Every product undergoes rigorous quality testing to ensure it meets the highest industry standards.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">IS Standards Compliance</h3>
                <p className="text-gray-600">All products comply with Indian Standards (IS) and international quality norms.</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Laboratory Testing</h3>
                <p className="text-gray-600">In-house laboratory for chemical composition and mechanical property testing.</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Expert Team</h3>
                <p className="text-gray-600">Experienced quality control team ensures consistent product quality.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-blue-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Need Custom Steel Solutions?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Contact our experts for customized steel products and bulk orders.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/quote"
                className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition-colors inline-flex items-center justify-center"
              >
                Get Quote
              </a>
              <a
                href="/contact"
                className="border-2 border-white hover:bg-white hover:text-blue-600 px-8 py-3 rounded-lg font-semibold transition-colors inline-flex items-center justify-center"
              >
                Contact Sales
              </a>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}