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

export default function Home() {
  const dispatch = useAppDispatch();

  const featuredProducts = useAppSelector((state) => state.products.featuredProducts);
  const productsLoading = useAppSelector((state) => state.products.loading);
  const testimonials = useAppSelector((state) => state.testimonials.featuredTestimonials);

  useEffect(() => {
    dispatch(fetchFeaturedProducts());
    dispatch(fetchFeaturedTestimonials(3));
  }, [dispatch]);

  const partnerBrands = ['TATA Steel', 'JSW Steel', 'SAIL', 'JINDAL Steel', 'RINL (Vizag)', 'ESSAR Steel', 'POSCO India', 'AM/NS India'];

  const productCategories = [
    { name: 'TMT Rebars', description: 'High-strength deformed bars for RCC', image: '/assets/images/steel-rod.png', href: '/product?category=Reinforcement Steel' },
    { name: 'Structural Steel', description: 'I-beams, channels, angles for construction', image: '/assets/images/steel-beam.png', href: '/product?category=Structural Steel' },
    { name: 'Sheets & Plates', description: 'Hot/cold rolled sheets for industrial use', image: '/assets/images/steel-sheet.png', href: '/product?category=Sheet & Plates' },
    { name: 'Steel Pipes', description: 'Seamless & welded pipes for all applications', image: '/assets/images/steel-pipe.png', href: '/product?category=Tubular Products' },
  ];

  const whyUs = [
    { icon: '🏭', title: 'Direct from Mills', body: 'We source from TATA, JSW, SAIL & JINDAL — so you always get mill-certified, authentic material at wholesale rates.' },
    { icon: '💰', title: 'Best Market Rates', body: 'Our direct procurement model eliminates middlemen and passes the savings straight to you.' },
    { icon: '🚚', title: 'Pan-India Delivery', body: 'Efficient logistics ensure your material reaches your site on time — anywhere across India.' },
    { icon: '📋', title: 'Mill Test Reports', body: 'Every batch comes with mill test certificates so your quality team has full traceability.' },
    { icon: '📦', title: 'Bulk & Retail', body: 'Whether it is 1 MT or 1000 MT, we cater to all order sizes with flexible payment options.' },
    { icon: '🤝', title: 'Dedicated Support', body: 'A single point of contact for all your orders — from enquiry to delivery follow-up.' },
  ];

  const howItWorks = [
    { step: '01', icon: '📞', title: 'Share Your Requirement', desc: 'Tell us the grade, size, and quantity you need. Our team will confirm availability instantly.' },
    { step: '02', icon: '📄', title: 'Get a Competitive Quote', desc: 'We send you a detailed quote with current market prices within 24 hours.' },
    { step: '03', icon: '✅', title: 'Confirm & Book', desc: 'Approve the quote, make an advance, and your order is locked at the agreed rate.' },
    { step: '04', icon: '🚛', title: 'Delivery to Your Site', desc: 'Material dispatched directly from our yard or mill — tracked from loading to delivery.' },
  ];

  return (
    <>
      <Head>
        <title>Vighnaharta Steel — Authorized Steel Wholesaler | TATA · JSW · SAIL · JINDAL</title>
        <meta name="description" content="Vighnaharta Steel is an authorized wholesale dealer of TATA Steel, JSW, SAIL & JINDAL. Best market prices, mill-certified stock, pan-India delivery. Get a quote today." />
        <meta name="keywords" content="steel wholesaler, TMT bars, structural steel, TATA steel dealer, JSW dealer, SAIL dealer, steel wholesale, construction material" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="min-h-screen">
        <Navbar />

        {/* ── HERO ── */}
        <Banner />

        {/* ── BRAND MARQUEE ── */}
        <section className="py-12 bg-white border-b border-gray-100 overflow-hidden">
          <div className="container mx-auto px-4 mb-8 text-center">
            <p className="text-xs font-bold text-gray-400 tracking-[0.2em] uppercase">Authorized Wholesale Dealer Of India's Top Steel Manufacturers</p>
          </div>
          <div className="relative">
            <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
            <div className="flex marquee-track" style={{ width: 'max-content' }}>
              {[...partnerBrands, ...partnerBrands].map((brand, i) => (
                <div key={i} className="flex-shrink-0 mx-5 px-8 py-4 border border-gray-200 rounded-xl hover:border-accent-orange/40 hover:shadow-md transition-all duration-300 bg-white cursor-default group">
                  <span className="text-steel-blue font-extrabold text-base group-hover:text-accent-orange transition-colors duration-300 whitespace-nowrap">{brand}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── WHO WE ARE ── */}
        <section className="py-24 bg-white relative overflow-hidden">
          <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-gray-50 to-transparent pointer-events-none" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              {/* Image */}
              <div className="relative order-2 lg:order-1">
                <div className="relative h-[480px] rounded-3xl overflow-hidden shadow-2xl">
                  <Image src="/assets/images/steel-factory.png" alt="Steel warehouse and yard" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
                  <div className="absolute inset-0 bg-gradient-to-t from-steel-blue-900/50 to-transparent" />
                </div>
                {/* Floating badge */}
                <div className="absolute -bottom-5 -right-4 md:right-4 bg-white rounded-2xl shadow-2xl border border-gray-100 p-5">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-accent-orange rounded-xl flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-extrabold text-lg">15+</span>
                    </div>
                    <div>
                      <p className="font-extrabold text-steel-blue text-sm leading-tight">Years of</p>
                      <p className="text-gray-500 text-xs">Trusted Service</p>
                    </div>
                  </div>
                </div>
                {/* Second badge */}
                <div className="absolute -top-5 -left-4 md:left-4 bg-steel-blue text-white rounded-2xl shadow-2xl p-5">
                  <p className="text-accent-orange font-extrabold text-lg leading-none">500+</p>
                  <p className="text-gray-300 text-xs mt-1">Clients Served</p>
                </div>
              </div>

              {/* Text */}
              <div className="order-1 lg:order-2">
                <div className="inline-flex items-center gap-2 bg-accent-orange/10 border border-accent-orange/20 rounded-full px-5 py-2 mb-6">
                  <span className="w-2 h-2 bg-accent-orange rounded-full animate-pulse" />
                  <span className="text-sm font-bold text-accent-orange tracking-wider uppercase">Who We Are</span>
                </div>
                <h2 className="font-display font-black text-4xl md:text-6xl text-steel-blue mb-6 leading-[0.95] uppercase tracking-tight">
                  India&apos;s Trusted <br /><span className="text-accent-orange">Steel Wholesaler</span>
                </h2>
                <div className="space-y-4 text-gray-600 leading-relaxed text-[17px] mb-8">
                  <p>
                    <strong className="text-steel-blue">Vighnaharta Steel</strong> is an authorized wholesale dealer of India's top steel manufacturers — TATA Steel, JSW, SAIL, and JINDAL. We don't just sell steel; we source it directly from the mill and deliver it straight to your project.
                  </p>
                  <p>
                    With over <strong className="text-steel-blue">15 years</strong> of experience, we have become the preferred procurement partner for builders, contractors, fabricators, and dealers across the country — trusted for our transparent pricing, genuine material, and on-time delivery.
                  </p>
                </div>

                {/* Trust points */}
                <div className="grid grid-cols-2 gap-3 mb-8">
                  {[
                    'Mill-certified, BIS-marked stock',
                    'Live market rate pricing',
                    'Pan-India delivery network',
                    'Dedicated account manager',
                  ].map((p) => (
                    <div key={p} className="flex items-center gap-2 text-sm text-gray-700">
                      <div className="w-5 h-5 rounded-full bg-green-50 border border-green-200 flex items-center justify-center flex-shrink-0">
                        <svg className="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      {p}
                    </div>
                  ))}
                </div>

                <Link href="/about" className="group inline-flex items-center gap-2 bg-steel-blue hover:bg-steel-blue-dark text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:-translate-y-0.5">
                  Our Story
                  <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── WHY BUY FROM US ── */}
        <section className="py-24 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-14">
              <div className="inline-flex items-center gap-2 bg-steel-blue/10 border border-steel-blue/20 rounded-full px-5 py-2 mb-5">
                <span className="w-2 h-2 bg-steel-blue rounded-full animate-pulse" />
                <span className="text-sm font-bold text-steel-blue tracking-wider uppercase">Why Choose Us</span>
              </div>
              <h2 className="font-display font-black text-4xl md:text-6xl text-steel-blue mb-4 uppercase tracking-tight">
                The Wholesale <span className="text-accent-orange">Advantage</span>
              </h2>
              <p className="text-lg text-gray-500 max-w-2xl mx-auto">
                We sit between the mill and your site — cutting out every unnecessary step so you get more value.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {whyUs.map((item, i) => (
                <div key={i} className="group bg-white rounded-2xl p-7 border border-gray-100 hover:border-accent-orange/30 hover:shadow-xl transition-all duration-400 hover:-translate-y-1 relative overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-accent-orange scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                  <div className="text-3xl mb-4">{item.icon}</div>
                  <h3 className="text-lg font-bold text-steel-blue mb-2 group-hover:text-accent-orange transition-colors duration-300">{item.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PRODUCT CATEGORIES ── */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-14">
              <div className="inline-flex items-center gap-2 bg-accent-orange/10 border border-accent-orange/20 rounded-full px-5 py-2 mb-5">
                <span className="w-2 h-2 bg-accent-orange rounded-full animate-pulse" />
                <span className="text-sm font-bold text-accent-orange tracking-wider uppercase">What We Stock</span>
              </div>
              <h2 className="font-display font-black text-4xl md:text-6xl text-steel-blue mb-4 uppercase tracking-tight">
                Product <span className="text-accent-orange">Categories</span>
              </h2>
              <p className="text-lg text-gray-500 max-w-2xl mx-auto">
                Full range of steel products sourced directly from certified mills — ready for immediate dispatch.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {productCategories.map((cat, i) => (
                <Link key={i} href={cat.href} className="group relative h-[360px] rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 block">
                  <Image src={cat.image} alt={cat.name} fill className="object-cover group-hover:scale-110 transition-transform duration-700" sizes="(max-width: 768px) 100vw, 25vw" />
                  <div className="absolute inset-0 bg-gradient-to-t from-steel-blue-900/95 via-steel-blue/50 to-transparent group-hover:from-steel-blue-900 transition-all duration-500" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-xl font-extrabold mb-1 group-hover:text-accent-orange transition-colors duration-300">{cat.name}</h3>
                    <p className="text-gray-300 text-sm mb-3 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-400">{cat.description}</p>
                    <span className="inline-flex items-center gap-1.5 text-accent-orange text-sm font-bold opacity-0 group-hover:opacity-100 transition-all duration-400 delay-75">
                      Browse Products
                      <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </Link>
              ))}
            </div>

            <div className="text-center mt-10">
              <Link href="/product" className="group inline-flex items-center gap-2 border-2 border-steel-blue text-steel-blue hover:bg-steel-blue hover:text-white px-8 py-3.5 rounded-xl font-semibold transition-all duration-300 hover:-translate-y-0.5">
                View All Products
                <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </section>

        {/* ── STATS ── */}
        <section className="py-20 bg-gradient-to-br from-steel-blue via-steel-blue-dark to-steel-blue-900 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: 'linear-gradient(white 1px,transparent 1px),linear-gradient(90deg,white 1px,transparent 1px)', backgroundSize: '40px 40px' }} />
          <div className="absolute top-0 left-1/4 w-72 h-72 bg-accent-orange/10 rounded-full blur-3xl" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { value: '500+', label: 'Happy Customers', sub: 'Contractors · Builders · Dealers' },
                { value: '15+', label: 'Years of Service', sub: 'Established & Trusted' },
                { value: '50+', label: 'Product Variants', sub: 'All grades & sizes' },
                { value: '24hr', label: 'Quote Turnaround', sub: 'Fast response guaranteed' },
              ].map((s, i) => (
                <div key={i} className="text-center group">
                  <div className="font-display font-black text-5xl md:text-6xl text-accent-orange mb-1 group-hover:scale-110 transition-transform duration-300">{s.value}</div>
                  <div className="text-white font-bold text-base mb-1">{s.label}</div>
                  <div className="text-gray-400 text-xs">{s.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── HOW WE WORK ── */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-14">
              <div className="inline-flex items-center gap-2 bg-accent-orange/10 border border-accent-orange/20 rounded-full px-5 py-2 mb-5">
                <span className="w-2 h-2 bg-accent-orange rounded-full animate-pulse" />
                <span className="text-sm font-bold text-accent-orange tracking-wider uppercase">Ordering Process</span>
              </div>
              <h2 className="font-display font-black text-4xl md:text-6xl text-steel-blue mb-4 uppercase tracking-tight">
                How to <span className="text-accent-orange">Order</span>
              </h2>
              <p className="text-lg text-gray-500 max-w-xl mx-auto">Simple, transparent, and fast — from enquiry to delivery in 4 steps.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
              {/* connector line */}
              <div className="hidden md:block absolute top-10 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-accent-orange/20 via-accent-orange to-accent-orange/20" style={{ top: '2.5rem' }} />

              {howItWorks.map((h, i) => (
                <div key={i} className="relative group text-center">
                  <div className="w-16 h-16 bg-white border-2 border-accent-orange/30 group-hover:border-accent-orange rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-sm group-hover:shadow-lg transition-all duration-300 relative z-10 bg-white">
                    <span className="text-2xl">{h.icon}</span>
                  </div>
                  <div className="text-xs font-bold text-accent-orange/60 mb-1 tracking-widest">STEP {h.step}</div>
                  <h3 className="text-lg font-bold text-steel-blue mb-2 group-hover:text-accent-orange transition-colors duration-300">{h.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{h.desc}</p>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link href="/quote" className="group inline-flex items-center gap-2 bg-accent-orange hover:bg-accent-orange-dark text-white px-10 py-4 rounded-xl font-bold transition-all duration-300 shadow-lg shadow-accent-orange/25 hover:-translate-y-0.5 hover:shadow-xl">
                Start Your Order Now
                <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </section>

        {/* ── INDUSTRIES ── */}
        <section className="py-24 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-14">
              <div className="inline-flex items-center gap-2 bg-steel-blue/10 border border-steel-blue/20 rounded-full px-5 py-2 mb-5">
                <span className="w-2 h-2 bg-steel-blue rounded-full animate-pulse" />
                <span className="text-sm font-bold text-steel-blue tracking-wider uppercase">Who We Serve</span>
              </div>
              <h2 className="font-display font-black text-4xl md:text-6xl text-steel-blue mb-4 uppercase tracking-tight">
                Industries We <span className="text-accent-orange">Serve</span>
              </h2>
              <p className="text-lg text-gray-500 max-w-xl mx-auto">Our steel reaches projects across every major sector in India.</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              {[
                { name: 'Construction', icon: '🏗️', desc: 'Residential & commercial buildings' },
                { name: 'Infrastructure', icon: '🌉', desc: 'Bridges, highways & metro' },
                { name: 'Manufacturing', icon: '🏭', desc: 'Fabrication & industrial plants' },
                { name: 'Real Estate', icon: '🏢', desc: 'Developers & housing projects' },
              ].map((ind, i) => (
                <div key={i} className="group bg-white rounded-2xl p-7 text-center border border-gray-100 hover:border-accent-orange/20 hover:shadow-xl transition-all duration-400 hover:-translate-y-2 cursor-default">
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">{ind.icon}</div>
                  <h3 className="text-base font-bold text-steel-blue mb-1 group-hover:text-accent-orange transition-colors duration-300">{ind.name}</h3>
                  <p className="text-gray-400 text-xs">{ind.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FEATURED PRODUCTS ── */}
        {!productsLoading && featuredProducts.length > 0 && (
          <ProductGrid
            products={featuredProducts}
            title="Featured Products"
            description="Handpicked products from our live inventory — all sourced directly from certified mills."
            columns={4}
            showViewAll
          />
        )}

        {/* ── TESTIMONIALS ── */}
        {testimonials.length > 0 && (
          <section className="py-24 bg-gray-50">
            <div className="container mx-auto px-4">
              <div className="text-center mb-14">
                <div className="inline-flex items-center gap-2 bg-accent-orange/10 border border-accent-orange/20 rounded-full px-5 py-2 mb-5">
                  <span className="w-2 h-2 bg-accent-orange rounded-full animate-pulse" />
                  <span className="text-sm font-bold text-accent-orange tracking-wider uppercase">Client Reviews</span>
                </div>
                <h2 className="text-3xl md:text-5xl font-extrabold text-steel-blue mb-4">
                  What Our Clients <span className="text-accent-orange">Say</span>
                </h2>
                <p className="text-lg text-gray-500 max-w-xl mx-auto">Trusted by builders, contractors, and dealers across India.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-7 mb-10">
                {testimonials.slice(0, 3).map((t: any) => (
                  <div key={t.id} className="group bg-white rounded-2xl p-7 border border-gray-100 hover:border-accent-orange/20 hover:shadow-xl transition-all duration-400 hover:-translate-y-1 relative">
                    {/* Quote mark */}
                    <div className="absolute -top-3 left-6 w-9 h-9 bg-accent-orange rounded-xl flex items-center justify-center shadow-md">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H0z" />
                      </svg>
                    </div>

                    <div className="flex gap-1 mt-3 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className={`w-4 h-4 ${i < t.rating ? 'text-amber-400' : 'text-gray-200'}`} fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>

                    <p className="text-gray-600 text-sm leading-relaxed italic mb-5">&ldquo;{t.comment.substring(0, 160)}&hellip;&rdquo;</p>

                    <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                      <div className="w-9 h-9 bg-gradient-to-br from-steel-blue to-steel-blue-dark rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                        {t.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold text-steel-blue text-sm">{t.name}</p>
                        <p className="text-gray-400 text-xs">{t.designation}, {t.company}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-center">
                <Link href="/testimonials" className="group inline-flex items-center gap-2 border-2 border-steel-blue/20 hover:border-steel-blue text-steel-blue px-7 py-3 rounded-xl font-semibold text-sm transition-all duration-300 hover:-translate-y-0.5">
                  Read All Reviews
                  <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* ── CTA ── */}
        <section className="py-28 bg-gradient-to-br from-steel-blue via-steel-blue-dark to-steel-blue-900 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'linear-gradient(white 1px,transparent 1px),linear-gradient(90deg,white 1px,transparent 1px)', backgroundSize: '50px 50px' }} />
          <div className="absolute top-1/2 left-1/4 w-80 h-80 bg-accent-orange/10 rounded-full blur-3xl pointer-events-none" />
          <div className="container mx-auto px-4 text-center relative z-10">
            <div className="inline-flex items-center gap-2 bg-accent-orange/20 border border-accent-orange/30 rounded-full px-5 py-2 mb-8">
              <span className="w-2 h-2 bg-accent-orange rounded-full animate-pulse" />
              <span className="text-xs font-bold text-accent-orange tracking-widest uppercase">Get Started Today</span>
            </div>
            <h2 className="font-display font-black text-4xl md:text-6xl mb-5 max-w-3xl mx-auto leading-[0.95] uppercase tracking-tight">
              Need Steel for Your Next <span className="text-accent-orange">Project?</span>
            </h2>
            <p className="text-lg text-gray-300 mb-10 max-w-xl mx-auto">
              Share your material list and we&apos;ll send you a competitive quote within 24 hours — no obligation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/quote" className="group bg-accent-orange hover:bg-accent-orange-dark text-white px-10 py-4 rounded-xl font-bold transition-all duration-300 inline-flex items-center justify-center gap-2 shadow-xl shadow-accent-orange/30 hover:-translate-y-1">
                Request a Quote
                <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              <Link href="/contact" className="group border-2 border-white/30 hover:bg-white hover:text-steel-blue text-white px-10 py-4 rounded-xl font-semibold transition-all duration-300 inline-flex items-center justify-center gap-2 hover:-translate-y-1">
                Talk to Our Team
                <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
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
