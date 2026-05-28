import React, { useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
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
        <section className="relative pt-32 bg-gradient-to-br from-steel-blue via-steel-blue-dark to-steel-blue-900 text-white py-28 overflow-hidden">
          {/* Industrial grid pattern */}
          <div className="absolute inset-0 bg-industrial-grid opacity-40"></div>
          {/* Animated blur orbs */}
          <div className="absolute top-20 right-10 w-72 h-72 bg-accent-orange/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 left-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-steel-blue-500/20 rounded-full blur-3xl"></div>
          <div className="relative container mx-auto px-4 text-center">
            <div className="animate-fade-in inline-flex items-center gap-2 bg-accent-orange/20 backdrop-blur-sm border border-accent-orange/30 rounded-full px-5 py-2 mb-6">
              <span className="w-2 h-2 bg-accent-orange rounded-full animate-pulse"></span>
              <span className="text-sm font-semibold text-accent-orange-light tracking-wider uppercase">Client Reviews</span>
            </div>
            <h1 className="animate-slide-up font-display font-black text-5xl md:text-7xl uppercase tracking-tight mb-6">
              Customer <span className="text-accent-orange">Testimonials</span>
            </h1>
            <p className="animate-slide-up text-xl text-gray-300 max-w-2xl mx-auto mb-10" style={{ animationDelay: '150ms' }}>
              Discover what our clients say about working with Vighnaharta Steel Industries
            </p>
            {/* Rating summary */}
            <div className="animate-slide-up inline-flex items-center gap-4 glass rounded-2xl px-8 py-5 shadow-2xl hover:shadow-accent-orange/20 hover:-translate-y-1 transition-all duration-500" style={{ animationDelay: '300ms' }}>
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-6 h-6 text-accent-orange drop-shadow-[0_0_8px_rgba(255,111,0,0.5)] animate-slide-up-fade opacity-0"
                    style={{ animationDelay: `${400 + i * 80}ms`, animationFillMode: 'forwards' }}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <div className="text-left">
                <div className="text-2xl font-extrabold bg-gradient-to-r from-white to-accent-orange-light bg-clip-text text-transparent">4.9 / 5.0</div>
                <div className="text-gray-300 text-sm">Based on 500+ reviews</div>
              </div>
            </div>
          </div>
        </section>

        {/* Loading State */}
        {loading && (
          <div className="container mx-auto px-4 py-16 text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-accent-orange"></div>
            <p className="mt-4 text-gray-600">Loading testimonials...</p>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="container mx-auto px-4 py-16">
            <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center max-w-2xl mx-auto">
              <span className="text-4xl mb-4 block">❌</span>
              <h2 className="text-2xl font-extrabold text-red-800 mb-4">Error Loading Testimonials</h2>
              <p className="text-red-600 mb-6">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="bg-red-600 text-white px-6 py-3 rounded-xl hover:bg-red-700 transition-all duration-300 font-semibold hover:-translate-y-0.5"
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
          <section className="py-24 bg-gradient-to-br from-steel-blue via-steel-blue-dark to-steel-blue-900 text-white relative overflow-hidden">
            <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-accent-orange/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-accent-orange/5 rounded-full blur-2xl"></div>
            <div className="container mx-auto px-4 text-center relative z-10">
              <div className="inline-flex items-center gap-2 bg-accent-orange/20 backdrop-blur-sm border border-accent-orange/30 rounded-full px-5 py-2 mb-8">
                <span className="w-2 h-2 bg-accent-orange rounded-full animate-pulse"></span>
                <span className="text-sm font-semibold text-accent-orange-light tracking-wider uppercase">Join Us</span>
              </div>
              <h2 className="font-display font-black text-4xl md:text-6xl uppercase tracking-tight mb-4">
                Ready to Join Our <span className="text-accent-orange">Satisfied</span> Customers?
              </h2>
              <p className="text-xl mb-10 opacity-80 max-w-2xl mx-auto">
                Get in touch with us today and experience the Vighnaharta Steel difference.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/quote"
                  className="group bg-accent-orange hover:bg-accent-orange-dark text-white px-10 py-4 rounded-xl font-semibold transition-all duration-300 inline-flex items-center justify-center shadow-lg shadow-accent-orange/30 hover:shadow-xl hover:-translate-y-1"
                >
                  Get Free Quote
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
        )}

        <Footer />
      </div>
    </>
  );
}
