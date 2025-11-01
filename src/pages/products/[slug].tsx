import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Image from 'next/image';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { productsAPI } from '../../lib/api';

export default function ProductDetail() {
  const router = useRouter();
  const { slug } = router.query;

  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!slug || typeof slug !== 'string') {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await productsAPI.getBySlug(slug);

        if (response.success) {
          setProduct(response.data);
          setError(null);
        } else {
          setError('Product not found');
        }
      } catch (err: any) {
        console.error('Error fetching product:', err);
        setError('Failed to load product. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [slug]);

  // Loading state
  if (loading) {
    return (
      <>
        <Head>
          <title>Loading... - Vighnaharta Steel Industries</title>
        </Head>
        <div className="min-h-screen">
          <Navbar />
          <div className="container mx-auto px-4 py-16 text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-gray-600">Loading product details...</p>
          </div>
          <Footer />
        </div>
      </>
    );
  }

  // Error state
  if (error || !product) {
    return (
      <>
        <Head>
          <title>Product Not Found - Vighnaharta Steel Industries</title>
        </Head>
        <div className="min-h-screen">
          <Navbar />
          <div className="container mx-auto px-4 py-16">
            <div className="bg-red-50 border border-red-200 rounded-lg p-8 text-center max-w-2xl mx-auto">
              <h1 className="text-2xl font-bold text-red-800 mb-4">Product Not Found</h1>
              <p className="text-red-600 mb-6">{error || 'The product you are looking for does not exist.'}</p>
              <a
                href="/products"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors inline-block"
              >
                Browse All Products
              </a>
            </div>
          </div>
          <Footer />
        </div>
      </>
    );
  }

  const metadata = product.metadata || {
    title: `${product.name} - Vighnaharta Steel Industries`,
    description: product.description
  };

  return (
    <>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </Head>

      <div className="min-h-screen">
        <Navbar />

        {/* Product Hero */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="relative h-96 bg-white rounded-lg overflow-hidden shadow-md">
                <Image
                  src={product.image || '/assets/images/steel-beam.svg'}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-4">{product.name}</h1>
                <p className="text-lg text-gray-600 mb-6">{product.description}</p>
                <div className="text-3xl font-bold text-blue-600 mb-8">{product.price}</div>

                <div className="flex space-x-4">
                  <a
                    href="/quote"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors inline-flex items-center"
                  >
                    Get Quote
                  </a>
                  <a
                    href="/contact"
                    className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-3 rounded-lg font-semibold transition-colors inline-flex items-center"
                  >
                    Contact Sales
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Product Details */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Specifications */}
              {product.specifications && product.specifications.length > 0 && (
                <div className="bg-white p-8 rounded-lg shadow-md">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Technical Specifications</h2>
                  <div className="space-y-4">
                    {product.specifications.map((spec: any, index: number) => (
                      <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="font-medium text-gray-700">
                          {typeof spec === 'object' ? spec.label : 'Specification'}:
                        </span>
                        <span className="text-gray-600">
                          {typeof spec === 'object' ? spec.value : spec}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Features */}
              {product.features && product.features.length > 0 && (
                <div className="bg-white p-8 rounded-lg shadow-md">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Key Features</h2>
                  <ul className="space-y-3">
                    {product.features.map((feature: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <svg className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                        </svg>
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Applications */}
              {product.applications && product.applications.length > 0 && (
                <div className="bg-white p-8 rounded-lg shadow-md">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Applications</h2>
                  <ul className="space-y-3">
                    {product.applications.map((application: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <svg className="w-5 h-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"/>
                        </svg>
                        <span className="text-gray-600">{application}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-blue-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Interested in {product.name}?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Contact our experts for detailed specifications and competitive pricing.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/quote"
                className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition-colors"
              >
                Request Quote
              </a>
              <a
                href="/contact"
                className="border-2 border-white hover:bg-white hover:text-blue-600 px-8 py-3 rounded-lg font-semibold transition-colors"
              >
                Contact Us
              </a>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}