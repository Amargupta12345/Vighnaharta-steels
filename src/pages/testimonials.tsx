import React, { useEffect } from 'react';
import Head from 'next/head';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Testimonials from '../components/Testimonials';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { fetchTestimonials } from '../store/slices/testimonialsSlice';

export default function TestimonialsPage() {
  const dispatch = useAppDispatch();

  // Get data from Redux store
  const testimonials = useAppSelector((state) => state.testimonials.testimonials);
  const loading = useAppSelector((state) => state.testimonials.loading);
  const error = useAppSelector((state) => state.testimonials.error);

  // Fetch testimonials from Redux store on mount
  useEffect(() => {
    dispatch(fetchTestimonials());
  }, [dispatch]);

  return (
    <>
      <Head>
        <title>Customer Testimonials - Vighnaharta Steel Industries</title>
        <meta
          name="description"
          content="Read what our customers say about Vighnaharta Steel Industries. Trusted by leading construction companies and builders across India for quality steel products."
        />
        <meta name="keywords" content="testimonials, customer reviews, steel supplier reviews, construction testimonials, Vighnaharta Steel" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="min-h-screen">
        <Navbar />

        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-steel-blue via-steel-blue-dark to-steel-blue-900 text-white py-20">
          <div className="absolute inset-0 bg-black opacity-30"></div>
          <div className="relative container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Customer Testimonials
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto">
              Discover what our clients say about working with Vighnaharta Steel Industries
            </p>
          </div>
        </section>

        {/* Loading State */}
        {loading && (
          <div className="container mx-auto px-4 py-16 text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-steel-blue"></div>
            <p className="mt-4 text-gray-600">Loading testimonials...</p>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="container mx-auto px-4 py-16">
            <div className="bg-red-50 border border-red-200 rounded-lg p-8 text-center max-w-2xl mx-auto">
              <h2 className="text-2xl font-bold text-red-800 mb-4">Error Loading Testimonials</h2>
              <p className="text-red-600 mb-6">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        )}

        {/* Testimonials Section */}
        {!loading && !error && testimonials.length > 0 && (
          <Testimonials testimonials={testimonials} showAll={true} />
        )}

        {/* CTA Section */}
        {!loading && !error && (
          <section className="py-16 bg-gradient-to-br from-steel-blue to-steel-blue-dark text-white">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Join Our Satisfied Customers?
              </h2>
              <p className="text-xl mb-8 opacity-90">
                Get in touch with us today and experience the Vighnaharta Steel difference.
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
        )}

        <Footer />
      </div>
    </>
  );
}

