import React from 'react';
import Head from 'next/head';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Image from 'next/image';

export default function About() {
  return (
    <>
      <Head>
        <title>About Us - Vighnaharta Steel Industries</title>
        <meta
          name="description"
          content="Learn about Vighnaharta Steel Industries, our history, values, and commitment to delivering quality steel products for construction and industrial needs."
        />
      </Head>

      <div className="min-h-screen">
        <Navbar />

        {/* Hero Section */}
        <section className="relative pt-32 bg-gradient-to-br from-steel-blue via-steel-blue-dark to-steel-blue-900 text-white py-28 overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <Image
              src="/assets/images/steel-factory.png"
              alt="Steel factory"
              fill
              className="object-cover"
              sizes="100vw"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-steel-blue/90 to-steel-blue-dark/70"></div>
          {/* Decorative shapes */}
          <div className="absolute top-20 right-10 w-64 h-64 bg-accent-orange/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-20 w-48 h-48 bg-white/5 rounded-full blur-3xl"></div>
          <div className="relative container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="animate-fade-in inline-flex items-center gap-2 bg-accent-orange/20 backdrop-blur-sm border border-accent-orange/30 rounded-full px-5 py-2 mb-6">
                <span className="w-2 h-2 bg-accent-orange rounded-full animate-pulse"></span>
                <span className="text-sm font-semibold text-accent-orange-light tracking-wider uppercase">Our Story</span>
              </div>
              <h1 className="animate-slide-up text-4xl md:text-6xl font-extrabold mb-6">About <span className="text-accent-orange">Us</span></h1>
              <p className="animate-slide-up text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Building the future with quality steel solutions since decades
              </p>
              <div className="flex justify-center gap-6 text-sm text-gray-300">
                <div className="flex items-center gap-2"><span className="w-2 h-2 bg-accent-orange rounded-full"></span> ISO Certified</div>
                <div className="flex items-center gap-2"><span className="w-2 h-2 bg-accent-orange rounded-full"></span> 25+ Years</div>
                <div className="flex items-center gap-2"><span className="w-2 h-2 bg-accent-orange rounded-full"></span> 1000+ Clients</div>
              </div>
            </div>
          </div>
        </section>

        {/* Company Story - Two Column */}
        <section className="py-24">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <div className="inline-flex items-center gap-2 bg-steel-blue/10 border border-steel-blue/20 rounded-full px-5 py-2 mb-6">
                  <span className="w-2 h-2 bg-steel-blue rounded-full animate-pulse"></span>
                  <span className="text-sm font-semibold text-steel-blue tracking-wider uppercase">Who We Are</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-extrabold text-steel-blue mb-6">
                  Building <span className="text-accent-orange">Trust</span> Since 2009
                </h2>
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                  Founded with a vision to provide high-quality steel products, Vighnaharta Steel Industries
                  has grown to become a trusted name in the steel manufacturing industry. Our journey began
                  with a simple commitment: to deliver excellence in every product we manufacture.
                </p>
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                  Over the years, we have built strong relationships with our customers by consistently
                  delivering superior quality products, maintaining competitive pricing, and ensuring
                  timely delivery.
                </p>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  Today, we stand proud as one of the leading steel manufacturers, known for our reliability,
                  quality assurance, and customer-centric approach.
                </p>
                {/* Key highlights */}
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: 'Founded', value: '2009' },
                    { label: 'Products', value: '50+' },
                    { label: 'Clients', value: '1000+' },
                    { label: 'Satisfaction', value: '99%' }
                  ].map((item, i) => (
                    <div key={i} className="group bg-gray-50 hover:bg-steel-blue p-4 rounded-xl transition-all duration-300 cursor-default">
                      <div className="text-2xl font-extrabold text-accent-orange group-hover:text-accent-orange-light transition-colors">{item.value}</div>
                      <div className="text-sm text-gray-500 group-hover:text-gray-300 transition-colors font-medium">{item.label}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl group">
                <Image
                  src="/assets/images/steel-factory.png"
                  alt="Steel manufacturing"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-steel-blue/60 via-transparent to-transparent"></div>
                {/* Floating badge */}
                <div className="absolute bottom-6 left-6 right-6 glass rounded-2xl p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-accent-orange rounded-2xl flex items-center justify-center shadow-lg">
                      <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
                      </svg>
                    </div>
                    <div>
                      <div className="text-white font-bold text-lg">State-of-the-Art Facility</div>
                      <div className="text-gray-300 text-sm">Modern manufacturing with latest technology</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-accent-orange/10 border border-accent-orange/20 rounded-full px-5 py-2 mb-6">
                <span className="w-2 h-2 bg-accent-orange rounded-full animate-pulse"></span>
                <span className="text-sm font-semibold text-accent-orange tracking-wider uppercase">Our Purpose</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-extrabold text-steel-blue mb-4">
                Mission & <span className="text-accent-orange">Vision</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <div className="group relative bg-white p-10 rounded-3xl shadow-sm border border-gray-100 hover:shadow-2xl hover:border-accent-orange/20 transition-all duration-500 hover:-translate-y-2 overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-steel-blue to-steel-blue-dark rounded-t-3xl"></div>
                <div className="w-16 h-16 bg-gradient-to-br from-steel-blue to-steel-blue-dark rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-500">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-extrabold text-steel-blue mb-4">Our Mission</h3>
                <p className="text-gray-600 leading-relaxed text-lg">
                  To provide high-quality steel products that meet international standards while
                  maintaining competitive pricing and exceptional customer service. We strive to
                  be the preferred choice for all steel requirements.
                </p>
              </div>

              <div className="group relative bg-white p-10 rounded-3xl shadow-sm border border-gray-100 hover:shadow-2xl hover:border-accent-orange/20 transition-all duration-500 hover:-translate-y-2 overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-accent-orange to-accent-orange-light rounded-t-3xl"></div>
                <div className="w-16 h-16 bg-gradient-to-br from-accent-orange to-accent-orange-dark rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-500">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-extrabold text-steel-blue mb-4">Our Vision</h3>
                <p className="text-gray-600 leading-relaxed text-lg">
                  To become the leading steel manufacturer in the region, known for innovation,
                  sustainability, and excellence. We envision a future where our products
                  contribute to building stronger, more resilient infrastructure.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-steel-blue/10 border border-steel-blue/20 rounded-full px-5 py-2 mb-6">
                <span className="w-2 h-2 bg-steel-blue rounded-full animate-pulse"></span>
                <span className="text-sm font-semibold text-steel-blue tracking-wider uppercase">What Drives Us</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-extrabold text-steel-blue mb-4">
                Our Core <span className="text-accent-orange">Values</span>
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                These values guide everything we do and define who we are as a company.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                {
                  title: 'Quality',
                  description: 'We never compromise on quality. Every product undergoes rigorous testing to ensure it meets the highest industry standards.',
                  icon: (
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                  ),
                  color: 'from-steel-blue to-steel-blue-dark',
                  emoji: '🏆'
                },
                {
                  title: 'Integrity',
                  description: 'Honesty and transparency in all our business dealings. We build trust through consistent and ethical business practices.',
                  icon: (
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"/>
                    </svg>
                  ),
                  color: 'from-accent-orange to-accent-orange-dark',
                  emoji: '🤝'
                },
                {
                  title: 'Innovation',
                  description: 'Continuously improving our processes and products to meet evolving market demands and technological advancements.',
                  icon: (
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                    </svg>
                  ),
                  color: 'from-steel-blue to-steel-blue-dark',
                  emoji: '💡'
                }
              ].map((value, index) => (
                <div key={index} className="group text-center bg-white p-10 rounded-3xl shadow-sm border border-gray-100 hover:shadow-2xl hover:border-accent-orange/20 transition-all duration-500 hover:-translate-y-2 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-accent-orange/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative">
                    <div className="text-4xl mb-4">{value.emoji}</div>
                    <div className={`w-16 h-16 bg-gradient-to-br ${value.color} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                      {value.icon}
                    </div>
                    <h3 className="text-xl font-extrabold text-steel-blue mb-3 group-hover:text-accent-orange transition-colors duration-300">{value.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{value.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Statistics */}
        <section className="py-24 bg-gradient-to-br from-steel-blue via-steel-blue-dark to-steel-blue-900 text-white relative overflow-hidden">
          <div className="absolute top-10 right-10 w-64 h-64 bg-accent-orange/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-10 w-48 h-48 bg-white/5 rounded-full blur-3xl"></div>
          <div className="relative container mx-auto px-4">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-accent-orange/20 backdrop-blur-sm border border-accent-orange/30 rounded-full px-5 py-2 mb-6">
                <span className="w-2 h-2 bg-accent-orange rounded-full animate-pulse"></span>
                <span className="text-sm font-semibold text-accent-orange-light tracking-wider uppercase">Our Impact</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-extrabold mb-4">
                Numbers That <span className="text-accent-orange">Speak</span>
              </h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center max-w-4xl mx-auto">
              {[
                { value: '25+', label: 'Years Experience', icon: '📅' },
                { value: '1000+', label: 'Happy Clients', icon: '👥' },
                { value: '50,000+', label: 'Tons Produced', icon: '⚙️' },
                { value: '99%', label: 'Customer Satisfaction', icon: '⭐' },
              ].map((stat, index) => (
                <div key={index} className="group cursor-default hover:scale-110 transition-transform duration-500">
                  <div className="text-3xl mb-3 group-hover:scale-125 transition-transform duration-300">{stat.icon}</div>
                  <div className="text-4xl md:text-5xl font-extrabold mb-2 text-accent-orange">{stat.value}</div>
                  <div className="text-gray-300 text-sm md:text-base font-medium">{stat.label}</div>
                  <div className="w-12 h-1 bg-accent-orange/40 rounded-full mx-auto mt-3 group-hover:w-20 group-hover:bg-accent-orange transition-all duration-500"></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}