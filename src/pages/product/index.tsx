import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import ProductGrid from '../../components/ProductGrid';
import TrendingProductsCarousel from '../../components/TrendingProductsCarousel';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { fetchProducts } from '../../store/slices/productsSlice';

interface Category {
  _id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  color: string;
  order: number;
}

export default function Products() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { category: queryCategory, brand: queryBrand } = router.query;

  const products = useAppSelector((state) => state.products.products);
  const loading = useAppSelector((state) => state.products.loading);
  const error = useAppSelector((state) => state.products.error);

  const [categories, setCategories] = useState<Category[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('');
  const [activeBrand, setActiveBrand] = useState<string>('');

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    fetch('/api/categories')
      .then((r) => r.json())
      .then((d) => { if (d.success) setCategories(d.data); })
      .catch(() => {});
  }, []);

  useEffect(() => {
    setActiveCategory(typeof queryCategory === 'string' ? queryCategory : '');
    setActiveBrand(typeof queryBrand === 'string' ? queryBrand : '');
  }, [queryCategory, queryBrand]);

  const filteredProducts = products.filter((p: any) => {
    if (activeCategory && p.category !== activeCategory) return false;
    if (activeBrand && p.brand !== activeBrand) return false;
    return true;
  });

  const handleCategorySelect = (name: string) => {
    const next = activeCategory === name ? '' : name;
    setActiveCategory(next);
    const query: any = {};
    if (next) query.category = next;
    if (activeBrand) query.brand = activeBrand;
    router.replace({ pathname: '/product', query }, undefined, { shallow: true });
  };

  const handleBrandSelect = (name: string) => {
    const next = activeBrand === name ? '' : name;
    setActiveBrand(next);
    const query: any = {};
    if (activeCategory) query.category = activeCategory;
    if (next) query.brand = next;
    router.replace({ pathname: '/product', query }, undefined, { shallow: true });
  };

  const clearFilters = () => {
    setActiveCategory('');
    setActiveBrand('');
    router.replace('/product', undefined, { shallow: true });
  };

  return (
    <>
      <Head>
        <title>{activeCategory || activeBrand ? `${[activeCategory, activeBrand].filter(Boolean).join(' · ')} - ` : ''}Products - Vighnaharta Steel Industries</title>
        <meta
          name="description"
          content="Explore our comprehensive range of high-quality steel products including beams, rods, sheets, and pipes for construction and industrial applications."
        />
      </Head>

      <div className="min-h-screen">
        <Navbar />

        {/* Hero Section */}
        <section className="pt-32 bg-gradient-to-br from-steel-blue via-steel-blue-dark to-steel-blue-900 text-white py-28 relative overflow-hidden">
          <div className="absolute top-20 right-10 w-64 h-64 bg-accent-orange/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-20 w-48 h-48 bg-white/5 rounded-full blur-3xl"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center mb-10">
              <div className="animate-fade-in inline-flex items-center gap-2 bg-accent-orange/20 backdrop-blur-sm border border-accent-orange/30 rounded-full px-5 py-2 mb-6">
                <span className="w-2 h-2 bg-accent-orange rounded-full animate-pulse"></span>
                <span className="text-sm font-semibold text-accent-orange-light tracking-wider uppercase">Our Catalog</span>
              </div>
              <h1 className="animate-slide-up font-display font-black text-5xl md:text-7xl uppercase tracking-tight mb-6">Our <span className="text-accent-orange">Products</span></h1>
              <p className="animate-slide-up text-xl text-gray-300 mb-10 max-w-2xl mx-auto" style={{ animationDelay: '150ms' }}>
                Comprehensive range of high-quality steel products for all your construction and industrial needs
              </p>

              {/* Stat row */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto mb-2">
                {[
                  { value: '50+', label: 'Products' },
                  { value: 'IS', label: 'Certified' },
                  { value: '24h', label: 'Quote Reply' },
                  { value: '15+', label: 'Years' },
                ].map((s, i) => (
                  <div
                    key={i}
                    className="glass rounded-xl px-4 py-3 hover:bg-white/15 hover:-translate-y-1 transition-all duration-300 animate-slide-up-fade opacity-0"
                    style={{ animationDelay: `${300 + i * 80}ms`, animationFillMode: 'forwards' }}
                  >
                    <div className="text-2xl font-extrabold text-accent-orange">{s.value}</div>
                    <div className="text-xs text-gray-300 uppercase tracking-wider font-medium">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Trending Products Carousel */}
            {!loading && products.length > 0 && (
              <TrendingProductsCarousel products={products} />
            )}
          </div>
        </section>

        {/* Product Categories */}
        {categories.length > 0 && (
          <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 bg-steel-blue/10 border border-steel-blue/20 rounded-full px-5 py-2 mb-6">
                  <span className="w-2 h-2 bg-steel-blue rounded-full animate-pulse"></span>
                  <span className="text-sm font-semibold text-steel-blue tracking-wider uppercase">Browse by Type</span>
                </div>
                <h2 className="font-display font-black text-4xl md:text-6xl uppercase tracking-tight text-steel-blue mb-4">
                  Product <span className="text-accent-orange">Categories</span>
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Click a category to filter products
                </p>
              </div>

              <div className={`grid grid-cols-1 gap-6 ${categories.length <= 2 ? 'md:grid-cols-2 max-w-2xl mx-auto' : categories.length === 3 ? 'md:grid-cols-3' : 'md:grid-cols-2 lg:grid-cols-4'}`}>
                {categories.map((category, idx) => {
                  const isSelected = activeCategory === category.name;
                  const count = products.filter((p: any) => p.category === category.name).length;
                  return (
                    <button
                      key={category._id}
                      onClick={() => handleCategorySelect(category.name)}
                      style={{ animationDelay: `${idx * 80}ms`, animationFillMode: 'forwards' }}
                      className={`group relative bg-gradient-to-br ${category.color} p-8 rounded-2xl transition-all duration-500 border-2 text-left overflow-hidden animate-slide-up-fade opacity-0 ${
                        isSelected
                          ? 'border-accent-orange shadow-2xl -translate-y-2 scale-105'
                          : 'border-transparent hover:shadow-2xl hover:border-accent-orange/30 hover:-translate-y-2 hover:scale-105 cursor-pointer'
                      }`}
                    >
                      {/* Top gradient bar */}
                      <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-steel-blue via-accent-orange to-steel-blue-dark transition-opacity duration-500 ${isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}></div>

                      {/* Hover shine overlay */}
                      <div className={`absolute inset-0 transition-colors duration-500 ${isSelected ? 'bg-accent-orange/5' : 'bg-white/0 group-hover:bg-white/40'}`}></div>

                      {/* Decorative glow blob */}
                      <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-gradient-to-br from-accent-orange/0 to-accent-orange/0 group-hover:from-accent-orange/20 group-hover:to-transparent rounded-full blur-2xl transition-all duration-500"></div>

                      {isSelected && (
                        <div className="absolute top-3 right-3 w-7 h-7 bg-gradient-to-br from-accent-orange to-accent-orange-dark rounded-full flex items-center justify-center shadow-lg shadow-accent-orange/40 z-10">
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      )}
                      <div className="relative">
                        <div className="text-4xl mb-4 group-hover:scale-125 group-hover:-rotate-6 transition-transform duration-500">{category.icon}</div>
                        <h3 className={`text-xl font-extrabold mb-2 transition-colors duration-300 ${isSelected ? 'text-accent-orange' : 'text-steel-blue group-hover:text-accent-orange'}`}>{category.name}</h3>
                        {category.description && <p className="text-gray-600 mb-4 text-sm leading-relaxed">{category.description}</p>}
                        <div className="inline-flex items-center gap-2 text-accent-orange font-semibold text-sm">
                          <span className="border-b-2 border-transparent group-hover:border-accent-orange transition-colors duration-300">
                            {count > 0 ? `${count} Product${count !== 1 ? 's' : ''}` : 'View Products'}
                          </span>
                          <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
                          </svg>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Active filter chips */}
              {(activeCategory || activeBrand) && (
                <div className="mt-8 flex items-center justify-center flex-wrap gap-2">
                  <span className="text-sm text-gray-500">Showing:</span>
                  {activeCategory && (
                    <span className="inline-flex items-center gap-2 bg-accent-orange/10 text-accent-orange border border-accent-orange/30 px-4 py-1.5 rounded-full text-sm font-semibold">
                      {activeCategory}
                      <button onClick={() => handleCategorySelect(activeCategory)}>
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </span>
                  )}
                  {activeBrand && (
                    <span className="inline-flex items-center gap-2 bg-steel-blue/10 text-steel-blue border border-steel-blue/30 px-4 py-1.5 rounded-full text-sm font-semibold">
                      {activeBrand}
                      <button onClick={() => handleBrandSelect(activeBrand)}>
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </span>
                  )}
                  <button onClick={clearFilters} className="text-sm text-gray-400 hover:text-gray-600 underline">Clear all</button>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Loading State */}
        {loading && (
          <div className="container mx-auto px-4 py-16 text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-accent-orange"></div>
            <p className="mt-4 text-gray-600">Loading products...</p>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="container mx-auto px-4 py-8">
            <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-4 text-center">
              <p className="text-yellow-800">{error}</p>
            </div>
          </div>
        )}

        {/* Products Grid or No Results */}
        {!loading && !error && (
          (activeCategory || activeBrand) && filteredProducts.length === 0 ? (
            <div className="container mx-auto px-4 py-20 text-center">
              <div className="text-6xl mb-5">📦</div>
              <h3 className="text-xl font-bold text-gray-700 mb-2">No products found</h3>
              <p className="text-gray-500 mb-6">
                We don&apos;t have any products
                {activeCategory && <> in <strong className="text-gray-700">{activeCategory}</strong></>}
                {activeBrand && <> by <strong className="text-gray-700">{activeBrand}</strong></>} yet.
              </p>
              <button
                onClick={clearFilters}
                className="bg-accent-orange hover:bg-accent-orange-dark text-white px-6 py-2.5 rounded-xl font-semibold text-sm transition-colors"
              >
                View All Products
              </button>
            </div>
          ) : (
            <ProductGrid
              products={filteredProducts}
              title={
                activeCategory && activeBrand
                  ? `${activeBrand} · ${activeCategory}`
                  : activeCategory
                  ? `${activeCategory} Products`
                  : activeBrand
                  ? `${activeBrand} Products`
                  : 'All Products'
              }
              description={
                (activeCategory || activeBrand)
                  ? `Showing ${filteredProducts.length} product${filteredProducts.length !== 1 ? 's' : ''}${activeCategory ? ` in ${activeCategory}` : ''}${activeBrand ? ` by ${activeBrand}` : ''}`
                  : 'Explore our complete range of steel products with detailed specifications and competitive pricing.'
              }
              columns={3}
            />
          )
        )}

        {/* Quality Assurance */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-accent-orange/10 border border-accent-orange/20 rounded-full px-5 py-2 mb-6">
                <span className="w-2 h-2 bg-accent-orange rounded-full animate-pulse"></span>
                <span className="text-sm font-semibold text-accent-orange tracking-wider uppercase">Quality First</span>
              </div>
              <h2 className="font-display font-black text-4xl md:text-6xl uppercase tracking-tight text-steel-blue mb-4">
                Quality <span className="text-accent-orange">Assurance</span>
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Every product undergoes rigorous quality testing to ensure it meets the highest industry standards.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {[
                {
                  icon: (
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                  ),
                  title: 'IS Standards Compliance',
                  description: 'All products comply with Indian Standards (IS) and international quality norms.',
                  emoji: '🛡️'
                },
                {
                  icon: (
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"/>
                    </svg>
                  ),
                  title: 'Laboratory Testing',
                  description: 'In-house laboratory for chemical composition and mechanical property testing.',
                  emoji: '🔬'
                },
                {
                  icon: (
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                    </svg>
                  ),
                  title: 'Expert Team',
                  description: 'Experienced quality control team ensures consistent product quality.',
                  emoji: '👨‍🔧'
                }
              ].map((item, index) => (
                <div key={index} className="group text-center bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-2xl hover:border-accent-orange/20 transition-all duration-500 hover:-translate-y-2">
                  <div className="text-3xl mb-3">{item.emoji}</div>
                  <div className="w-16 h-16 bg-gradient-to-br from-steel-blue to-steel-blue-dark rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-lg group-hover:scale-110 transition-transform duration-500">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-bold text-steel-blue mb-2 group-hover:text-accent-orange transition-colors duration-300">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              ))}
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
              <span className="text-sm font-semibold text-accent-orange-light tracking-wider uppercase">Custom Solutions</span>
            </div>
            <h2 className="font-display font-black text-4xl md:text-6xl uppercase tracking-tight mb-4">
              Need Custom Steel <span className="text-accent-orange">Solutions</span>?
            </h2>
            <p className="text-xl mb-10 opacity-80 max-w-2xl mx-auto">
              Contact our experts for customized steel products and bulk orders.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/quote"
                className="group bg-accent-orange hover:bg-accent-orange-dark text-white px-10 py-4 rounded-xl font-semibold transition-all duration-300 inline-flex items-center justify-center shadow-lg shadow-accent-orange/30 hover:shadow-xl hover:-translate-y-1"
              >
                Get Quote
                <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
                </svg>
              </Link>
              <Link
                href="/contact"
                className="group border-2 border-white/50 hover:bg-white hover:text-steel-blue px-10 py-4 rounded-xl font-semibold transition-all duration-300 inline-flex items-center justify-center hover:-translate-y-1"
              >
                Contact Sales
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
