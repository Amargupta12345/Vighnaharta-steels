import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { fetchProductBySlug, clearCurrentProduct } from '../../store/slices/productsSlice';
import { ImageSizes } from '../../utils/imageUtils';

export default function ProductDetail() {
  const router = useRouter();
  const { slug } = router.query;
  const dispatch = useAppDispatch();

  // Get data from Redux store
  const product = useAppSelector((state) => state.products.currentProduct);
  const loading = useAppSelector((state) => state.products.loading);
  const error = useAppSelector((state) => state.products.error);

  useEffect(() => {
    if (slug && typeof slug === 'string') {
      dispatch(fetchProductBySlug(slug));
    }

    // Cleanup on unmount
    return () => {
      dispatch(clearCurrentProduct());
    };
  }, [slug, dispatch]);

  // Loading state
  if (loading) {
    return (
      <>
        <Head>
          <title>Loading... - Vighnaharta Steel Industries</title>
        </Head>
        <div className="min-h-screen">
          <Navbar />
          <div className="container mx-auto px-4 py-32 text-center">
            <div className="inline-block animate-spin rounded-full h-10 w-10 border-b-2 border-accent-orange"></div>
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
          <div className="container mx-auto px-4 py-32">
            <div className="bg-red-50 border border-red-200 rounded-2xl p-10 text-center max-w-2xl mx-auto">
              <span className="text-5xl block mb-4">🔍</span>
              <h1 className="text-2xl font-extrabold text-red-800 mb-4">Product Not Found</h1>
              <p className="text-red-600 mb-6">{error || 'The product you are looking for does not exist.'}</p>
              <Link
                href="/product"
                className="group bg-accent-orange text-white px-8 py-3 rounded-xl hover:bg-accent-orange-dark transition-all duration-300 inline-flex items-center gap-2 font-semibold hover:-translate-y-0.5 shadow-lg"
              >
                Browse All Products
                <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
                </svg>
              </Link>
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

        {/* Breadcrumb */}
        <div className="pt-32 bg-gray-50 border-b border-gray-100">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex items-center gap-2 text-sm text-gray-500">
              <Link href="/" className="hover:text-accent-orange transition-colors">Home</Link>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
              </svg>
              <Link href="/product" className="hover:text-accent-orange transition-colors">Products</Link>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
              </svg>
              <span className="text-steel-blue font-semibold">{product.name}</span>
            </nav>
          </div>
        </div>

        {/* Product Hero */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="relative h-[450px] bg-white rounded-3xl overflow-hidden shadow-xl group">
                <Image
                  src={product.image || '/assets/images/steel-beam.png'}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes={ImageSizes.productDetail.sizes}
                  priority={true}
                  quality={90}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-steel-blue/20 via-transparent to-transparent"></div>
                {/* Category badge */}
                {product.category && (
                  <div className="absolute top-4 left-4 bg-steel-blue/90 backdrop-blur-sm text-white text-sm font-semibold px-4 py-2 rounded-xl">
                    {product.category}
                  </div>
                )}
              </div>

              <div>
                <div className="inline-flex items-center gap-2 bg-accent-orange/10 border border-accent-orange/20 rounded-full px-5 py-2 mb-4">
                  <span className="w-2 h-2 bg-accent-orange rounded-full animate-pulse"></span>
                  <span className="text-sm font-semibold text-accent-orange tracking-wider uppercase">Product Details</span>
                </div>
                <h1 className="font-display font-black text-4xl md:text-5xl tracking-tight text-steel-blue mb-4">{product.name}</h1>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">{product.description}</p>

                {/* Price tag */}
                <div className="inline-flex items-center gap-3 bg-gradient-to-r from-accent-orange/10 to-accent-orange/5 border border-accent-orange/20 rounded-2xl px-6 py-3 mb-8">
                  <span className="text-sm text-gray-500 font-medium">Starting from</span>
                  <span className="text-2xl font-extrabold text-accent-orange">{product.price}</span>
                </div>

                <div className="flex flex-wrap gap-4">
                  <Link
                    href="/quote"
                    className="group bg-gradient-to-r from-accent-orange to-accent-orange-dark text-white px-8 py-3.5 rounded-xl font-semibold transition-all duration-300 inline-flex items-center shadow-lg shadow-accent-orange/30 hover:shadow-xl hover:-translate-y-0.5"
                  >
                    Get Quote
                    <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
                    </svg>
                  </Link>
                  <Link
                    href="/contact"
                    className="group border-2 border-steel-blue text-steel-blue hover:bg-steel-blue hover:text-white px-8 py-3.5 rounded-xl font-semibold transition-all duration-300 inline-flex items-center hover:-translate-y-0.5"
                  >
                    Contact Sales
                    <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Product Details - Specs, Features, Applications */}
        <section className="relative py-20 bg-gradient-to-b from-white to-gray-50 overflow-hidden">
          {/* Decorative orbs */}
          <div className="absolute top-20 right-10 w-72 h-72 bg-accent-orange/5 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-20 left-10 w-72 h-72 bg-steel-blue/5 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Specifications */}
              {product.specifications && product.specifications.length > 0 && (
                <div
                  className="group bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-2xl hover:border-steel-blue/20 transition-all duration-500 hover:-translate-y-2 overflow-hidden relative animate-slide-up-fade opacity-0"
                  style={{ animationDelay: '0ms', animationFillMode: 'forwards' }}
                >
                  <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-steel-blue to-steel-blue-dark rounded-t-3xl"></div>
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-steel-blue/10 to-transparent rounded-full -mr-16 -mt-16 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  <div className="flex items-center gap-3 mb-6 relative">
                    <div className="w-12 h-12 bg-gradient-to-br from-steel-blue to-steel-blue-dark rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                      <span className="text-white text-xl">📊</span>
                    </div>
                    <div>
                      <h2 className="text-xl font-extrabold text-steel-blue">Technical Specs</h2>
                      <div className="text-xs text-gray-500 font-medium">Detailed parameters</div>
                    </div>
                  </div>
                  <div className="space-y-2 relative">
                    {product.specifications.map((spec: any, index: number) => (
                      <div
                        key={index}
                        className="flex justify-between items-center py-3 px-3 -mx-1 border-b border-gray-100 last:border-0 hover:bg-gradient-to-r hover:from-steel-blue/5 hover:to-transparent rounded-lg transition-all duration-300 animate-slide-up-fade opacity-0"
                        style={{ animationDelay: `${150 + index * 60}ms`, animationFillMode: 'forwards' }}
                      >
                        <span className="font-semibold text-gray-700 text-sm">
                          {typeof spec === 'object' ? spec.label : 'Specification'}
                        </span>
                        <span className="text-steel-blue text-sm font-bold bg-gradient-to-br from-gray-100 to-gray-50 border border-gray-200 px-3 py-1 rounded-lg">
                          {typeof spec === 'object' ? spec.value : spec}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Features */}
              {product.features && product.features.length > 0 && (
                <div
                  className="group bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-2xl hover:border-accent-orange/20 transition-all duration-500 hover:-translate-y-2 overflow-hidden relative animate-slide-up-fade opacity-0"
                  style={{ animationDelay: '120ms', animationFillMode: 'forwards' }}
                >
                  <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-accent-orange to-accent-orange-light rounded-t-3xl"></div>
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-accent-orange/10 to-transparent rounded-full -mr-16 -mt-16 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  <div className="flex items-center gap-3 mb-6 relative">
                    <div className="w-12 h-12 bg-gradient-to-br from-accent-orange to-accent-orange-dark rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                      <span className="text-white text-xl">✨</span>
                    </div>
                    <div>
                      <h2 className="text-xl font-extrabold text-steel-blue">Key Features</h2>
                      <div className="text-xs text-gray-500 font-medium">What makes it premium</div>
                    </div>
                  </div>
                  <ul className="space-y-3 relative">
                    {product.features.map((feature: string, index: number) => (
                      <li
                        key={index}
                        className="flex items-start gap-3 animate-slide-up-fade opacity-0"
                        style={{ animationDelay: `${270 + index * 60}ms`, animationFillMode: 'forwards' }}
                      >
                        <div className="w-7 h-7 bg-gradient-to-br from-green-100 to-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-300 shadow-sm">
                          <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                          </svg>
                        </div>
                        <span className="text-gray-700 leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Applications */}
              {product.applications && product.applications.length > 0 && (
                <div
                  className="group bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-2xl hover:border-accent-orange/20 transition-all duration-500 hover:-translate-y-2 overflow-hidden relative animate-slide-up-fade opacity-0"
                  style={{ animationDelay: '240ms', animationFillMode: 'forwards' }}
                >
                  <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-steel-blue via-accent-orange to-steel-blue rounded-t-3xl"></div>
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-steel-blue/5 via-accent-orange/5 to-transparent rounded-full -mr-16 -mt-16 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  <div className="flex items-center gap-3 mb-6 relative">
                    <div className="w-12 h-12 bg-gradient-to-br from-steel-blue via-steel-blue-dark to-accent-orange rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                      <span className="text-white text-xl">🏗️</span>
                    </div>
                    <div>
                      <h2 className="text-xl font-extrabold text-steel-blue">Applications</h2>
                      <div className="text-xs text-gray-500 font-medium">Where it&apos;s used</div>
                    </div>
                  </div>
                  <ul className="space-y-3 relative">
                    {product.applications.map((application: string, index: number) => (
                      <li
                        key={index}
                        className="flex items-start gap-3 animate-slide-up-fade opacity-0"
                        style={{ animationDelay: `${390 + index * 60}ms`, animationFillMode: 'forwards' }}
                      >
                        <div className="w-7 h-7 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-300 shadow-sm">
                          <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"/>
                          </svg>
                        </div>
                        <span className="text-gray-700 leading-relaxed">{application}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-gradient-to-br from-steel-blue via-steel-blue-dark to-steel-blue-900 text-white relative overflow-hidden">
          <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-accent-orange/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-accent-orange/5 rounded-full blur-2xl"></div>
          <div className="container mx-auto px-4 text-center relative z-10">
            <div className="inline-flex items-center gap-2 bg-accent-orange/20 backdrop-blur-sm border border-accent-orange/30 rounded-full px-5 py-2 mb-8">
              <span className="w-2 h-2 bg-accent-orange rounded-full animate-pulse"></span>
              <span className="text-sm font-semibold text-accent-orange-light tracking-wider uppercase">Get Started</span>
            </div>
            <h2 className="font-display font-black text-4xl md:text-6xl uppercase tracking-tight mb-4">
              Interested in <span className="text-accent-orange">{product.name}</span>?
            </h2>
            <p className="text-xl mb-10 opacity-80 max-w-2xl mx-auto">
              Contact our experts for detailed specifications and competitive pricing.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/quote"
                className="group bg-accent-orange hover:bg-accent-orange-dark text-white px-10 py-4 rounded-xl font-semibold transition-all duration-300 inline-flex items-center justify-center shadow-lg shadow-accent-orange/30 hover:shadow-xl hover:-translate-y-1"
              >
                Request Quote
                <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
                </svg>
              </Link>
              <Link
                href="/contact"
                className="group border-2 border-white/50 hover:bg-white hover:text-steel-blue px-10 py-4 rounded-xl font-semibold transition-all duration-300 inline-flex items-center justify-center hover:-translate-y-1"
              >
                Contact Us
                <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
              </Link>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}