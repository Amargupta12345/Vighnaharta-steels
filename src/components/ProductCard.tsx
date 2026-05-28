import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '../types/product';
import { ImageSizes } from '../utils/imageUtils';

interface ProductCardProps extends Product {
  index?: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ id, name, image, description, price, specifications, slug, category, index = 0 }) => {
  return (
    <div
      className="group relative bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-accent-orange/30 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 flex flex-col animate-slide-up-fade opacity-0"
      style={{ animationDelay: `${Math.min(index, 11) * 80}ms`, animationFillMode: 'forwards' }}
    >
      {/* Top gradient accent border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-steel-blue via-accent-orange to-steel-blue-dark opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>

      {/* Image */}
      <div className="relative h-52 w-full overflow-hidden bg-gray-50 flex-shrink-0">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes={ImageSizes.productCard.sizes}
          quality={85}
        />
        {/* Brand-tinted gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-steel-blue/70 via-steel-blue/10 to-transparent group-hover:from-steel-blue/40 transition-all duration-500" />

        {/* Subtle orange glow on hover */}
        <div className="absolute inset-0 bg-gradient-to-tr from-accent-orange/0 to-accent-orange/0 group-hover:from-accent-orange/10 group-hover:to-transparent transition-all duration-500" />

        {/* Category pill */}
        {category && (
          <div className="absolute top-3 left-3">
            <span className="inline-flex items-center gap-1.5 bg-gradient-to-r from-accent-orange to-accent-orange-dark text-white text-[10px] font-bold px-3 py-1.5 rounded-full tracking-wider uppercase shadow-lg shadow-accent-orange/40 backdrop-blur-sm">
              <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span>
              {category}
            </span>
          </div>
        )}

        {/* Hover quick-view */}
        <div className="absolute inset-0 flex items-end justify-center pb-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
          <Link
            href={`/product/${slug}`}
            className="bg-white text-steel-blue text-xs font-bold px-5 py-2.5 rounded-full shadow-xl hover:bg-accent-orange hover:text-white hover:scale-105 transition-all duration-200 translate-y-3 group-hover:translate-y-0 inline-flex items-center gap-1.5"
          >
            Quick View
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-base font-bold text-steel-blue mb-1.5 group-hover:text-accent-orange transition-colors duration-300 line-clamp-1">
          {name}
        </h3>
        <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 mb-4 flex-1">{description}</p>

        {/* Specs */}
        {specifications && specifications.length > 0 && (
          <div className="bg-gradient-to-br from-gray-50 to-silver-gray-light/40 rounded-xl px-3.5 py-3 mb-4 space-y-1.5 border border-gray-100 group-hover:border-accent-orange/20 transition-colors duration-300">
            {specifications.slice(0, 2).map((spec, i) => {
              const text = typeof spec === 'string' ? spec : `${spec.label}: ${spec.value}`;
              return (
                <div key={i} className="flex items-center gap-2 text-xs text-gray-600">
                  <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-br from-accent-orange to-accent-orange-dark flex-shrink-0 group-hover:scale-150 transition-transform duration-300" />
                  <span className="truncate">{text}</span>
                </div>
              );
            })}
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100 mt-auto">
          {price ? (
            <span className="text-sm font-bold text-steel-blue">{price}</span>
          ) : (
            <span className="text-xs text-gray-400 italic">Contact for price</span>
          )}
          <div className="flex gap-2">
            <Link
              href={`/product/${slug}`}
              className="text-xs font-semibold text-steel-blue border border-steel-blue/20 px-3 py-1.5 rounded-lg hover:bg-steel-blue hover:text-white hover:-translate-y-0.5 transition-all duration-200"
            >
              Details
            </Link>
            <Link
              href={`/quote?product=${encodeURIComponent(name)}`}
              className="text-xs font-semibold bg-gradient-to-r from-accent-orange to-accent-orange-dark text-white px-3 py-1.5 rounded-lg hover:shadow-lg hover:shadow-accent-orange/40 hover:-translate-y-0.5 transition-all duration-200"
            >
              Get Quote
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
