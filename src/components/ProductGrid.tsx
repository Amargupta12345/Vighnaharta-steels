import React from 'react';
import ProductCard from './ProductCard';
import { Product } from '../types/product';
import Link from 'next/link';

interface ProductGridProps {
  products: Product[];
  title?: string;
  description?: string;
  columns?: 2 | 3 | 4;
  showViewAll?: boolean;
}

const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  title = "Our Products",
  description = "Explore our range of high-quality steel products",
  columns = 3,
  showViewAll = false
}) => {
  const gridCols = {
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
  };

  return (
    <section className="relative py-20 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      {/* Decorative blur orbs */}
      <div className="absolute top-32 right-0 w-96 h-96 bg-accent-orange/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-32 left-0 w-96 h-96 bg-steel-blue/5 rounded-full blur-3xl pointer-events-none"></div>
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(46,58,89,1) 1px, transparent 1px), linear-gradient(90deg, rgba(46,58,89,1) 1px, transparent 1px)', backgroundSize: '60px 60px' }}></div>

      <div className="relative container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-accent-orange/10 border border-accent-orange/20 rounded-full px-5 py-2 mb-6">
            <span className="w-2 h-2 bg-accent-orange rounded-full animate-pulse"></span>
            <span className="text-sm font-semibold text-accent-orange tracking-wider uppercase">Our Catalog</span>
          </div>
          <h2 className="font-display font-black text-4xl md:text-6xl uppercase tracking-tight text-steel-blue mb-4">
            {title}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {description}
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-accent-orange to-steel-blue rounded-full mx-auto mt-6"></div>
        </div>

        <div className={`grid ${gridCols[columns]} gap-8`}>
          {products.map((product, idx) => (
            <ProductCard key={product.id} index={idx} {...product} />
          ))}
        </div>

        {showViewAll && (
          <div className="text-center mt-12">
            <Link
              href="/product"
              className="group inline-flex items-center gap-2 bg-steel-blue hover:bg-steel-blue-dark text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              View All Products
              <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductGrid;