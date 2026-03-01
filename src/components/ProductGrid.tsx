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
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-accent-orange/10 border border-accent-orange/20 rounded-full px-5 py-2 mb-6">
            <span className="w-2 h-2 bg-accent-orange rounded-full animate-pulse"></span>
            <span className="text-sm font-semibold text-accent-orange tracking-wider uppercase">Our Catalog</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-steel-blue mb-4">
            {title}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {description}
          </p>
        </div>

        <div className={`grid ${gridCols[columns]} gap-8`}>
          {products.map((product) => (
            <ProductCard key={product.id} {...product} />
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