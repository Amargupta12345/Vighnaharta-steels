import React, { useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Banner from '../components/Banner';
import ProductGrid from '../components/ProductGrid';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { fetchFeaturedProducts } from '../store/slices/productsSlice';
import { fetchFeaturedTestimonials } from '../store/slices/testimonialsSlice';
import { fetchHomeData } from '../store/slices/homeSlice';

export default function Home() {
  const dispatch = useAppDispatch();

  // Get data from Redux store (no prop drilling needed!)
  const featuredProducts = useAppSelector((state) => state.products.featuredProducts);
  const productsLoading = useAppSelector((state) => state.products.loading);
  const productsError = useAppSelector((state) => state.products.error);

  const homeData = useAppSelector((state) => state.home.data);
  const homeLoading = useAppSelector((state) => state.home.loading);

  const testimonials = useAppSelector((state) => state.testimonials.featuredTestimonials);
  const testimonialsLoading = useAppSelector((state) => state.testimonials.loading);

  const loading = productsLoading || homeLoading || testimonialsLoading;
  const error = productsError;

  // Fetch data from Redux store on mount
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

  const partnerBrands = [
    'SAIL', 'TATA Steel', 'JSW Steel', 'JINDAL', 'RINL (VIZAG)', 'ESSAR', 'POSCO', 'AM/NS India'
  ];

  const productCategories = [
    { name: 'TMT Rebars', description: 'High-strength deformed bars for reinforced concrete', image: '/assets/images/steel-rod.png', link: '/product/steel-rods' },
    { name: 'Steel Plates', description: 'Hot rolled steel plates for structural applications', image: '/assets/images/steel-sheet.png', link: '/product/steel-plates' },
    { name: 'Structural Steel', description: 'I-beams, channels, angles for construction', image: '/assets/images/steel-beam.png', link: '/product/steel-i-beams' },
    { name: 'Steel Pipes', description: 'Seamless & welded pipes for industrial use', image: '/assets/images/steel-pipe.png', link: '/product/steel-pipes' },
  ];

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
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-accent-orange"></div>
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

        {/* Main Content */}
        {!loading && (
          <>
            {/* ====== FOUNDER / LEADERSHIP SECTION (SM Steels inspired) ====== */}
            <section className="py-24 bg-gradient-to-br from-white via-gray-50 to-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-96 h-96 bg-accent-orange/5 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-72 h-72 bg-steel-blue/5 rounded-full blur-3xl"></div>
              <div className="container mx-auto px-4 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                  {/* Founder Image */}
                  <div className="relative">
                    <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl group">
                      <Image
                        src="/assets/images/hero-banner.png"
                        alt="Vighnaharta Steel Industries Facility"
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-steel-blue/60 via-transparent to-transparent"></div>
                    </div>
                    {/* Floating stats badge */}
                    <div className="absolute -bottom-6 -right-6 md:right-6 bg-white rounded-2xl shadow-2xl p-6 border border-gray-100">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 bg-gradient-to-br from-accent-orange to-accent-orange-dark rounded-xl flex items-center justify-center shadow-lg">
                          <span className="text-white text-2xl font-extrabold">15+</span>
                        </div>
                        <div>
                          <div className="text-steel-blue font-extrabold text-lg">Years of</div>
                          <div className="text-gray-500 text-sm">Excellence</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Founder Story */}
                  <div>
                    <div className="inline-flex items-center gap-2 bg-accent-orange/10 border border-accent-orange/20 rounded-full px-5 py-2 mb-6">
                      <span className="w-2 h-2 bg-accent-orange rounded-full animate-pulse"></span>
                      <span className="text-sm font-semibold text-accent-orange tracking-wider uppercase">About Us</span>
                    </div>
                    <h2 className="text-3xl md:text-5xl font-extrabold text-steel-blue mb-6 leading-tight">
                      Building India&apos;s <span className="text-accent-orange">Future</span> with Steel
                    </h2>

                    <div className="space-y-4 text-gray-600 leading-relaxed text-lg mb-8">
                      <p>
                        Vighnaharta Steel Industries is a leading name in the steel supply and distribution business, with an experience of over <strong className="text-steel-blue">15 years</strong> serving the construction and industrial sectors across India.
                      </p>
                      <p>
                        Our journey started with a vision to deliver high-quality steel products with unmatched service. Today, we are trusted by hundreds of dealers, architects, fabricators, and builders across the country.
                      </p>
                      <p>
                        The fundamental pillar of our success is our talented, motivated workforce, which continues to harness diverse synergies &mdash; making Vighnaharta Steel a top company in steel distribution.
                      </p>
                    </div>

                    {/* Quick facts */}
                    <div className="grid grid-cols-3 gap-4 mb-8">
                      {[
                        { value: '500+', label: 'Clients' },
                        { value: '1000+', label: 'Projects' },
                        { value: '50+', label: 'Team Members' }
                      ].map((stat, i) => (
                        <div key={i} className="text-center p-4 bg-gradient-to-br from-steel-blue to-steel-blue-dark rounded-2xl text-white">
                          <div className="text-2xl font-extrabold text-accent-orange">{stat.value}</div>
                          <div className="text-xs text-gray-300 mt-1">{stat.label}</div>
                        </div>
                      ))}
                    </div>

                    <Link
                      href="/about"
                      className="group inline-flex items-center gap-2 bg-accent-orange hover:bg-accent-orange-dark text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg shadow-accent-orange/25 hover:shadow-xl hover:-translate-y-0.5"
                    >
                      Read Our Full Story
                      <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </section>

            {/* ====== PRODUCT CATEGORIES (SM Steels inspired - large cards) ====== */}
            <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
              <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                  <div className="inline-flex items-center gap-2 bg-accent-orange/10 border border-accent-orange/20 rounded-full px-5 py-2 mb-6">
                    <span className="w-2 h-2 bg-accent-orange rounded-full animate-pulse"></span>
                    <span className="text-sm font-semibold text-accent-orange tracking-wider uppercase">Our Products</span>
                  </div>
                  <h2 className="text-3xl md:text-5xl font-extrabold text-steel-blue mb-4">
                    Product <span className="text-accent-orange">Categories</span>
                  </h2>
                  <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    Comprehensive range of steel products for every construction and industrial need
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {productCategories.map((cat, index) => (
                    <Link key={index} href={cat.link} className="group relative h-[400px] rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 block">
                      <Image
                        src={cat.image}
                        alt={cat.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      />
                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-steel-blue-900/90 via-steel-blue/40 to-transparent group-hover:from-steel-blue-900/95 transition-all duration-500"></div>
                      {/* Content */}
                      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                        <h3 className="text-2xl font-extrabold mb-2 group-hover:text-accent-orange transition-colors duration-300">{cat.name}</h3>
                        <p className="text-gray-300 text-sm mb-4 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-500">{cat.description}</p>
                        <div className="inline-flex items-center gap-2 text-accent-orange font-semibold text-sm opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-500 delay-100">
                          Know More
                          <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
                          </svg>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>

                <div className="text-center mt-12">
                  <Link
                    href="/product"
                    className="group inline-flex items-center gap-2 bg-steel-blue hover:bg-steel-blue-dark text-white px-10 py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                  >
                    View All Products
                    <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
                    </svg>
                  </Link>
                </div>
              </div>
            </section>

            {/* ====== PARTNER BRANDS / "WE WORK WITH" (SM Steels inspired) ====== */}
            <section className="py-16 bg-white border-y border-gray-100">
              <div className="container mx-auto px-4">
                <div className="text-center mb-10">
                  <div className="inline-flex items-center gap-2 bg-steel-blue/10 border border-steel-blue/20 rounded-full px-5 py-2 mb-4">
                    <span className="w-2 h-2 bg-steel-blue rounded-full animate-pulse"></span>
                    <span className="text-sm font-semibold text-steel-blue tracking-wider uppercase">We Work With</span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-extrabold text-steel-blue">
                    Authorized Dealers & <span className="text-accent-orange">Partners</span>
                  </h2>
                </div>

                {/* Marquee of partner brands */}
                <div className="overflow-hidden relative">
                  <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10"></div>
                  <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10"></div>
                  <div className="flex marquee-track" style={{ width: 'max-content' }}>
                    {[...partnerBrands, ...partnerBrands].map((brand, i) => (
                      <div key={i} className="flex-shrink-0 mx-6 px-10 py-6 bg-gray-50 rounded-2xl border border-gray-100 hover:border-accent-orange/30 hover:shadow-lg transition-all duration-300 group cursor-default">
                        <span className="text-steel-blue font-extrabold text-lg md:text-xl group-hover:text-accent-orange transition-colors duration-300 whitespace-nowrap">{brand}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Features Section */}
            <section className="py-20 bg-gradient-to-b from-white to-gray-50">
              <div className="container mx-auto px-4">
                <div className="text-center mb-16 animate-fade-in">
                  <div className="inline-flex items-center gap-2 bg-accent-orange/10 border border-accent-orange/20 rounded-full px-5 py-2 mb-6">
                    <span className="w-2 h-2 bg-accent-orange rounded-full animate-pulse"></span>
                    <span className="text-sm font-semibold text-accent-orange tracking-wider uppercase">Why Choose Us</span>
                  </div>
                  <h2 className="text-3xl md:text-5xl font-extrabold text-steel-blue mb-4">
                    Why Choose <span className="text-accent-orange">Vighnaharta</span> Steel?
                  </h2>
                  <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    With decades of experience in the steel industry, we deliver quality products
                    that meet the highest standards of durability and performance.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {features.map((feature: any, index: number) => (
                    <div
                      key={index}
                      className="group relative bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-2xl hover:border-accent-orange/30 transition-all duration-500 hover:-translate-y-2 cursor-pointer animate-slide-up"
                      style={{ animationDelay: `${index * 150}ms` }}
                    >
                      {/* Gradient accent line */}
                      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent-orange to-accent-orange-light rounded-t-2xl transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>

                      <div className="w-16 h-16 bg-gradient-to-br from-steel-blue to-steel-blue-dark rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:shadow-accent-orange/20 group-hover:scale-110 transition-all duration-500">
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
                      <h3 className="text-xl font-bold text-steel-blue mb-3 group-hover:text-accent-orange transition-colors duration-300">{feature.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{feature.description}</p>

                      {/* Arrow icon on hover */}
                      <div className="mt-4 flex items-center text-accent-orange opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all duration-300">
                        <span className="text-sm font-semibold">Learn More</span>
                        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
                        </svg>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Stats Section */}
            <section className="py-20 bg-gradient-to-br from-steel-blue via-steel-blue-dark to-steel-blue-900 text-white relative overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute top-0 left-0 w-72 h-72 bg-accent-orange/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
              <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent-orange/5 rounded-full blur-3xl translate-x-1/3 translate-y-1/3"></div>

              <div className="container mx-auto px-4 relative z-10">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                  {[
                    { value: '500+', label: 'Happy Customers', icon: '👥' },
                    { value: '1000+', label: 'Projects Completed', icon: '🏗️' },
                    { value: '15+', label: 'Years Experience', icon: '📅' },
                    { value: '50+', label: 'Product Variants', icon: '📦' }
                  ].map((stat, index) => (
                    <div
                      key={index}
                      className="text-center group cursor-default hover:scale-110 transition-transform duration-500"
                    >
                      <div className="text-3xl mb-3 group-hover:scale-125 transition-transform duration-300">{stat.icon}</div>
                      <div className="text-4xl md:text-5xl font-extrabold mb-2 text-accent-orange">{stat.value}</div>
                      <div className="text-gray-300 text-sm md:text-base font-medium tracking-wide">{stat.label}</div>
                      <div className="w-12 h-1 bg-accent-orange/40 rounded-full mx-auto mt-3 group-hover:w-20 group-hover:bg-accent-orange transition-all duration-500"></div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Industries We Serve */}
            <section className="py-20 bg-white">
              <div className="container mx-auto px-4">
                <div className="text-center mb-16 animate-fade-in">
                  <div className="inline-flex items-center gap-2 bg-steel-blue/10 border border-steel-blue/20 rounded-full px-5 py-2 mb-6">
                    <span className="w-2 h-2 bg-steel-blue rounded-full animate-pulse"></span>
                    <span className="text-sm font-semibold text-steel-blue tracking-wider uppercase">Our Reach</span>
                  </div>
                  <h2 className="text-3xl md:text-5xl font-extrabold text-steel-blue mb-4">
                    Industries We <span className="text-accent-orange">Serve</span>
                  </h2>
                  <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    Providing high-quality steel solutions across diverse sectors
                  </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {[
                    { name: 'Construction', icon: '🏗️', description: 'Building & Infrastructure', color: 'from-orange-50 to-orange-100' },
                    { name: 'Manufacturing', icon: '🏭', description: 'Industrial Applications', color: 'from-blue-50 to-blue-100' },
                    { name: 'Infrastructure', icon: '🌉', description: 'Bridges & Highways', color: 'from-green-50 to-green-100' },
                    { name: 'Energy', icon: '⚡', description: 'Power & Utilities', color: 'from-yellow-50 to-yellow-100' }
                  ].map((industry, index) => (
                    <div
                      key={index}
                      className={`group relative bg-gradient-to-br ${industry.color} p-8 rounded-2xl hover:shadow-2xl transition-all duration-500 text-center border border-transparent hover:border-accent-orange/20 hover:-translate-y-3 cursor-pointer`}
                    >
                      <div className="text-5xl mb-4 group-hover:scale-125 group-hover:-rotate-12 transition-all duration-500">{industry.icon}</div>
                      <h3 className="text-lg font-bold text-steel-blue mb-1 group-hover:text-accent-orange transition-colors duration-300">{industry.name}</h3>
                      <p className="text-sm text-gray-600">{industry.description}</p>
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
              showViewAll={true}
            />

            {/* How We Work */}
            <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
              <div className="container mx-auto px-4">
                <div className="text-center mb-16 animate-fade-in">
                  <div className="inline-flex items-center gap-2 bg-accent-orange/10 border border-accent-orange/20 rounded-full px-5 py-2 mb-6">
                    <span className="w-2 h-2 bg-accent-orange rounded-full animate-pulse"></span>
                    <span className="text-sm font-semibold text-accent-orange tracking-wider uppercase">Our Process</span>
                  </div>
                  <h2 className="text-3xl md:text-5xl font-extrabold text-steel-blue mb-4">
                    How We <span className="text-accent-orange">Work</span>
                  </h2>
                  <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    Our streamlined process ensures you get the best steel products with maximum efficiency
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                  {[
                    { step: '01', title: 'Consultation', description: 'Discuss your requirements with our expert team to find the ideal steel solution', icon: '💬' },
                    { step: '02', title: 'Customization', description: 'We tailor solutions precisely to meet your specific project needs and standards', icon: '⚙️' },
                    { step: '03', title: 'Quality Check', description: 'Rigorous testing at every stage ensures highest quality standards are met', icon: '✅' },
                    { step: '04', title: 'Delivery', description: 'Timely and secure delivery to your project location across India', icon: '🚚' }
                  ].map((process, index) => (
                    <div key={index} className="relative group">
                      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-2xl hover:border-accent-orange/20 transition-all duration-500 hover:-translate-y-2">
                        <div className="flex items-center justify-between mb-4">
                          <div className="text-4xl group-hover:scale-110 transition-transform duration-300">{process.icon}</div>
                          <div className="text-3xl font-extrabold text-steel-blue/10 group-hover:text-accent-orange/30 transition-colors duration-300">{process.step}</div>
                        </div>
                        <h3 className="text-xl font-bold text-steel-blue mb-2 group-hover:text-accent-orange transition-colors duration-300">{process.title}</h3>
                        <p className="text-gray-600 text-sm leading-relaxed">{process.description}</p>
                      </div>
                      {index < 3 && (
                        <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                          <svg className="w-8 h-8 text-accent-orange" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Certifications & Standards */}
            <section className="py-20 bg-white">
              <div className="container mx-auto px-4">
                <div className="text-center mb-16 animate-fade-in">
                  <div className="inline-flex items-center gap-2 bg-steel-blue/10 border border-steel-blue/20 rounded-full px-5 py-2 mb-6">
                    <span className="w-2 h-2 bg-steel-blue rounded-full animate-pulse"></span>
                    <span className="text-sm font-semibold text-steel-blue tracking-wider uppercase">Trust & Quality</span>
                  </div>
                  <h2 className="text-3xl md:text-5xl font-extrabold text-steel-blue mb-4">
                    Certifications & <span className="text-accent-orange">Standards</span>
                  </h2>
                  <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    Our commitment to quality is backed by industry certifications and standards
                  </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {[
                    { name: 'IS 2062', description: 'Structural Steel', icon: '🛡️' },
                    { name: 'IS 800', description: 'Design Code', icon: '📐' },
                    { name: 'IS 1239', description: 'Steel Pipes', icon: '🔧' },
                    { name: 'ISO 9001', description: 'Quality Management', icon: '⭐' }
                  ].map((cert, index) => (
                    <div
                      key={index}
                      className="group relative bg-gradient-to-br from-steel-blue to-steel-blue-dark text-white p-8 rounded-2xl text-center shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden cursor-default"
                    >
                      {/* Shimmer effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

                      <div className="text-3xl mb-3 group-hover:scale-125 transition-transform duration-500">{cert.icon}</div>
                      <div className="text-2xl font-extrabold mb-2 group-hover:text-accent-orange transition-colors duration-300">{cert.name}</div>
                      <div className="text-sm text-gray-300">{cert.description}</div>
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-accent-orange transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Testimonials Preview */}
            {testimonials.length > 0 && (
              <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-gray-50">
                <div className="container mx-auto px-4">
                  <div className="text-center mb-16 animate-fade-in">
                    <div className="inline-flex items-center gap-2 bg-accent-orange/10 border border-accent-orange/20 rounded-full px-5 py-2 mb-6">
                      <span className="w-2 h-2 bg-accent-orange rounded-full animate-pulse"></span>
                      <span className="text-sm font-semibold text-accent-orange tracking-wider uppercase">Client Reviews</span>
                    </div>
                    <h2 className="text-3xl md:text-5xl font-extrabold text-steel-blue mb-4">
                      What Our Customers <span className="text-accent-orange">Say</span>
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                      Trusted by leading construction companies and builders
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
                    {testimonials.slice(0, 3).map((testimonial: any) => (
                      <div
                        key={testimonial.id}
                        className="group relative bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-2xl hover:border-accent-orange/20 transition-all duration-500 hover:-translate-y-2"
                      >
                        {/* Quote icon */}
                        <div className="absolute -top-3 -left-3 w-10 h-10 bg-accent-orange rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H0z"/>
                          </svg>
                        </div>

                        <div className="flex gap-1 mb-4 mt-2">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              className={`w-5 h-5 ${i < testimonial.rating ? 'text-accent-orange' : 'text-gray-200'}`}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                        <p className="text-gray-700 mb-6 italic leading-relaxed">&quot;{testimonial.comment.substring(0, 150)}...&quot;</p>
                        <div className="border-t border-gray-100 pt-4 flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-steel-blue to-steel-blue-dark rounded-full flex items-center justify-center text-white font-bold text-sm">
                            {testimonial.name.charAt(0)}
                          </div>
                          <div>
                            <div className="font-bold text-steel-blue">{testimonial.name}</div>
                            <div className="text-sm text-gray-500">{testimonial.designation}, {testimonial.company}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="text-center">
                    <Link
                      href="/testimonials"
                      className="group inline-flex items-center gap-2 bg-steel-blue/10 hover:bg-steel-blue text-steel-blue hover:text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300"
                    >
                      View All Testimonials
                      <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </section>
            )}

            {/* CTA Section */}
            <section className="py-24 bg-gradient-to-br from-steel-blue via-steel-blue-dark to-steel-blue-900 text-white relative overflow-hidden">
              {/* Animated background shapes */}
              <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-accent-orange/10 rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-accent-orange/5 rounded-full blur-2xl animate-float"></div>

              <div className="container mx-auto px-4 text-center relative z-10">
                <div className="inline-flex items-center gap-2 bg-accent-orange/20 backdrop-blur-sm border border-accent-orange/30 rounded-full px-5 py-2 mb-8">
                  <span className="w-2 h-2 bg-accent-orange rounded-full animate-pulse"></span>
                  <span className="text-sm font-semibold text-accent-orange-light tracking-wider uppercase">Get Started</span>
                </div>
                <h2 className="text-3xl md:text-5xl font-extrabold mb-4">
                  Ready to Start Your <span className="text-accent-orange">Project</span>?
                </h2>
                <p className="text-xl mb-10 opacity-80 max-w-2xl mx-auto">
                  Get in touch with our experts for customized steel solutions and competitive pricing.
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
          </>
        )}

        <Footer />
      </div>
    </>
  );
}