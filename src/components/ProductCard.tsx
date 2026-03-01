import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '../types/product';
import { ImageSizes } from '../utils/imageUtils';

interface ProductCardProps extends Product {}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  image,
  description,
  price,
  specifications,
  slug,
  category
}) => {
  return (
    <div className="group bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 card-premium">
      {/* Image Container */}
      <div className="relative h-56 w-full overflow-hidden">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes={ImageSizes.productCard.sizes}
          quality={85}
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-steel-blue/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

        {/* Category badge */}
        {category && (
          <div className="absolute top-3 left-3 bg-steel-blue/90 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1.5 rounded-full">
            {category}
          </div>
        )}

        {/* Quick view overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
          <Link
            href={`/product/${slug}`}
            className="bg-white/95 backdrop-blur-sm text-steel-blue px-5 py-2.5 rounded-xl font-semibold text-sm shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 hover:bg-white"
          >
            Quick View →
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-lg font-bold text-steel-blue mb-2 group-hover:text-accent-orange transition-colors duration-300">{name}</h3>
        <p className="text-gray-500 text-sm mb-4 line-clamp-2 leading-relaxed">{description}</p>

        {specifications && specifications.length > 0 && (
          <div className="mb-4 bg-gray-50 rounded-xl p-3">
            <ul className="text-xs text-gray-600 space-y-1.5">
              {specifications.slice(0, 3).map((spec, index) => {
                const specText = typeof spec === 'string'
                  ? spec
                  : `${spec.label}: ${spec.value}`;
                return (
                  <li key={index} className="flex items-center">
                    <span className="w-1.5 h-1.5 bg-accent-orange rounded-full mr-2 flex-shrink-0"></span>
                    <span className="truncate">{specText}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        )}

        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          {price && (
            <div className="text-lg font-bold text-steel-blue">
              {price}
            </div>
          )}
          <div className="flex gap-2">
            <Link
              href={`/product/${slug}`}
              className="bg-steel-blue hover:bg-steel-blue-dark text-white px-4 py-2 rounded-lg transition-all duration-300 font-medium text-sm hover:shadow-lg"
            >
              Details
            </Link>
            <Link
              href="/quote"
              className="bg-accent-orange hover:bg-accent-orange-dark text-white px-4 py-2 rounded-lg transition-all duration-300 font-medium text-sm hover:shadow-lg hover:shadow-accent-orange/25"
            >
              Quote
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;