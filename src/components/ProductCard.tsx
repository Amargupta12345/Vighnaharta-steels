import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface ProductCardProps {
  id: string;
  name: string;
  image: string;
  description: string;
  price?: string;
  specifications?: string[];
  slug: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  image,
  description,
  price,
  specifications,
  slug
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-silver-gray-dark">
      <div className="relative h-64 w-full">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-steel-blue mb-2">{name}</h3>
        <p className="text-gray-600 mb-4 line-clamp-3">{description}</p>

        {specifications && specifications.length > 0 && (
          <div className="mb-4">
            <h4 className="font-medium text-gray-800 mb-2">Key Specifications:</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              {specifications.slice(0, 3).map((spec, index) => (
                <li key={index} className="flex items-center">
                  <span className="w-1.5 h-1.5 bg-accent-orange rounded-full mr-2"></span>
                  {spec}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="flex items-center justify-between">
          {price && (
            <div className="text-lg font-semibold text-steel-blue">
              {price}
            </div>
          )}
          <div className="flex space-x-2">
            <Link
              href={`/products/${slug}`}
              className="bg-steel-blue hover:bg-steel-blue-dark text-white px-4 py-2 rounded-md transition-colors font-medium text-sm"
            >
              View Details
            </Link>
            <button
              onClick={() => window.location.href = '/quote'}
              className="bg-accent-orange hover:bg-accent-orange-dark text-white px-4 py-2 rounded-md transition-colors font-medium text-sm"
            >
              Get Quote
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;