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

            {/* Stats Section */}
            <section className="py-16 bg-gradient-to-br from-steel-blue to-steel-blue-dark text-white">
              <div className="container mx-auto px-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                  <div className="text-center">
                    <div className="text-4xl md:text-5xl font-bold mb-2 text-accent-orange">500+</div>
                    <div className="text-gray-300 text-sm md:text-base">Happy Customers</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl md:text-5xl font-bold mb-2 text-accent-orange">1000+</div>
                    <div className="text-gray-300 text-sm md:text-base">Projects Completed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl md:text-5xl font-bold mb-2 text-accent-orange">15+</div>
                    <div className="text-gray-300 text-sm md:text-base">Years Experience</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl md:text-5xl font-bold mb-2 text-accent-orange">50+</div>
                    <div className="text-gray-300 text-sm md:text-base">Product Variants</div>
                  </div>
                </div>
              </div>
            </section>

            {/* Industries Served Section */}
            <section className="py-16 bg-white">
              <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold text-steel-blue mb-4">
                    Industries We Serve
                  </h2>
                  <p className="text-lg text-gray-700 max-w-2xl mx-auto">
                    Providing high-quality steel solutions across diverse sectors
                  </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {[
                    { name: 'Construction', icon: '🏗️', description: 'Building & Infrastructure' },
                    { name: 'Manufacturing', icon: '🏭', description: 'Industrial Applications' },
                    { name: 'Infrastructure', icon: '🌉', description: 'Bridges & Highways' },
                    { name: 'Energy', icon: '⚡', description: 'Power & Utilities' }
                  ].map((industry, index) => (
                    <div key={index} className="bg-gradient-to-br from-silver-gray-light to-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow text-center border border-silver-gray">
                      <div className="text-4xl mb-3">{industry.icon}</div>
                      <h3 className="text-lg font-bold text-steel-blue mb-1">{industry.name}</h3>
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
            />

            {/* How We Work Section */}
            <section className="py-16 bg-silver-gray">
              <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold text-steel-blue mb-4">
                    How We Work
                  </h2>
                  <p className="text-lg text-gray-700 max-w-2xl mx-auto">
                    Our streamlined process ensures you get the best steel products with maximum efficiency
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                  {[
                    {
                      step: '01',
                      title: 'Consultation',
                      description: 'Discuss your requirements with our expert team',
                      icon: '💬'
                    },
                    {
                      step: '02',
                      title: 'Customization',
                      description: 'We tailor solutions to meet your specific needs',
                      icon: '⚙️'
                    },
                    {
                      step: '03',
                      title: 'Quality Assurance',
                      description: 'Rigorous testing ensures highest quality standards',
                      icon: '✅'
                    },
                    {
                      step: '04',
                      title: 'Delivery',
                      description: 'Timely delivery to your location',
                      icon: '🚚'
                    }
                  ].map((process, index) => (
                    <div key={index} className="relative">
                      <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow border-l-4 border-accent-orange">
                        <div className="flex items-center justify-between mb-4">
                          <div className="text-3xl">{process.icon}</div>
                          <div className="text-2xl font-bold text-steel-blue/20">{process.step}</div>
                        </div>
                        <h3 className="text-xl font-bold text-steel-blue mb-2">{process.title}</h3>
                        <p className="text-gray-600 text-sm">{process.description}</p>
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

            {/* Certifications & Standards Section */}
            <section className="py-16 bg-white">
              <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold text-steel-blue mb-4">
                    Certifications & Standards
                  </h2>
                  <p className="text-lg text-gray-700 max-w-2xl mx-auto">
                    Our commitment to quality is backed by industry certifications and standards
                  </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {[
                    { name: 'IS 2062', description: 'Structural Steel' },
                    { name: 'IS 800', description: 'Design Code' },
                    { name: 'IS 1239', description: 'Steel Pipes' },
                    { name: 'ISO 9001', description: 'Quality Management' }
                  ].map((cert, index) => (
                    <div key={index} className="bg-gradient-to-br from-steel-blue to-steel-blue-dark text-white p-6 rounded-xl text-center shadow-lg hover:shadow-xl transition-shadow">
                      <div className="text-2xl font-bold mb-2">{cert.name}</div>
                      <div className="text-sm text-gray-200">{cert.description}</div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Testimonials Preview Section */}
            {testimonials.length > 0 && (
              <section className="py-16 bg-gradient-to-br from-gray-50 to-silver-gray-light">
                <div className="container mx-auto px-4">
                  <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-steel-blue mb-4">
                      What Our Customers Say
                    </h2>
                    <p className="text-lg text-gray-700 max-w-2xl mx-auto">
                      Trusted by leading construction companies and builders
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                    {testimonials.slice(0, 3).map((testimonial: any) => (
                      <div key={testimonial.id} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                        <div className="flex gap-1 mb-4">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              className={`w-5 h-5 ${i < testimonial.rating ? 'text-accent-orange' : 'text-gray-300'}`}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                        <p className="text-gray-700 mb-4 italic">"{testimonial.comment.substring(0, 150)}..."</p>
                        <div className="border-t pt-4">
                          <div className="font-bold text-steel-blue">{testimonial.name}</div>
                          <div className="text-sm text-gray-600">{testimonial.designation}, {testimonial.company}</div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="text-center">
                    <Link
                      href="/testimonials"
                      className="inline-flex items-center text-steel-blue hover:text-steel-blue-dark font-semibold transition-colors"
                    >
                      View All Testimonials
                      <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </section>
            )}

            {/* Company Milestones Section */}
            <section className="py-16 bg-white">
              <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold text-steel-blue mb-4">
                    Our Journey
                  </h2>
                  <p className="text-lg text-gray-700 max-w-2xl mx-auto">
                    Key milestones in our growth and excellence
                  </p>
                </div>

                <div className="relative">
                  {/* Timeline Line */}
                  <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-accent-orange to-steel-blue"></div>

                  <div className="space-y-12">
                    {[
                      { year: '2009', title: 'Company Founded', description: 'Started with a vision to provide quality steel products' },
                      { year: '2015', title: 'Major Expansion', description: 'Expanded manufacturing capacity and product range' },
                      { year: '2019', title: 'Quality Certification', description: 'Achieved ISO 9001:2015 certification' },
                      { year: '2024', title: 'Industry Leader', description: 'Recognized as one of the top steel suppliers in the region' }
                    ].map((milestone, index) => (
                      <div key={index} className={`flex flex-col md:flex-row items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                        <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:pr-8 md:text-right' : 'md:pl-8'}`}>
                          <div className="bg-gradient-to-br from-steel-blue to-steel-blue-dark text-white p-6 rounded-xl shadow-lg">
                            <div className="text-accent-orange font-bold text-lg mb-2">{milestone.year}</div>
                            <h3 className="text-xl font-bold mb-2">{milestone.title}</h3>
                            <p className="text-gray-200">{milestone.description}</p>
                          </div>
                        </div>
                        <div className="hidden md:flex w-12 h-12 bg-accent-orange rounded-full items-center justify-center z-10 border-4 border-white shadow-lg">
                          <div className="w-4 h-4 bg-white rounded-full"></div>
                        </div>
                        <div className="md:w-1/2"></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

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