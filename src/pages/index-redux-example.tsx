import React, { useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Banner from '../components/Banner';
import ProductGrid from '../components/ProductGrid';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { fetchFeaturedProducts } from '../store/slices/productsSlice';
import { fetchFeaturedTestimonials } from '../store/slices/testimonialsSlice';
import { fetchHomeData } from '../store/slices/homeSlice';

/**
 * EXAMPLE: Home Page using Redux (no prop drilling!)
 *
 * This demonstrates how to use Redux instead of local state.
 * Replace src/pages/index.tsx with this pattern.
 */
export default function HomeReduxExample() {
  const dispatch = useAppDispatch();

  // Get data from Redux store (no props needed!)
  const featuredProducts = useAppSelector((state) => state.products.featuredProducts);
  const productsLoading = useAppSelector((state) => state.products.loading);
  const productsError = useAppSelector((state) => state.products.error);

  const testimonials = useAppSelector((state) => state.testimonials.featuredTestimonials);
  const testimonialsLoading = useAppSelector((state) => state.testimonials.loading);

  const homeData = useAppSelector((state) => state.home.data);
  const homeLoading = useAppSelector((state) => state.home.loading);

  // Fetch data on component mount
  useEffect(() => {
    dispatch(fetchFeaturedProducts());
    dispatch(fetchFeaturedTestimonials(3));
    dispatch(fetchHomeData());
  }, [dispatch]);

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
    primaryButtonLink: "/product",
    secondaryButtonText: "Get Quote",
    secondaryButtonLink: "/quote"
  };

  const loading = productsLoading || homeLoading;

  return (
    <>
      <Head>
        <title>Vighnaharta Steel Industries - Quality Steel Products</title>
        <meta
          name="description"
          content="Leading manufacturer and supplier of high-quality steel products including beams, rods, sheets, and pipes. Trusted steel industry partner for construction and industrial needs."
        />
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
        {productsError && !loading && (
          <div className="container mx-auto px-4 py-16">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
              <p className="text-yellow-800">{productsError}</p>
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
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {features.map((feature: any, index: number) => (
                    <div key={index} className="text-center bg-white p-8 rounded-lg shadow-md">
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

            {/* Testimonials Preview */}
            {testimonials.length > 0 && (
              <section className="py-16 bg-gradient-to-br from-gray-50 to-silver-gray-light">
                <div className="container mx-auto px-4">
                  <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-steel-blue mb-4">
                      What Our Customers Say
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial: any) => (
                      <div key={testimonial.id} className="bg-white p-6 rounded-xl shadow-lg">
                        <p className="text-gray-700 mb-4 italic">"{testimonial.comment.substring(0, 150)}..."</p>
                        <div className="font-bold text-steel-blue">{testimonial.name}</div>
                        <div className="text-sm text-gray-600">{testimonial.company}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            )}
          </>
        )}

        <Footer />
      </div>
    </>
  );
}

