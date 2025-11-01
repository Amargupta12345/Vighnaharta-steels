import React from 'react';
import ProductCard from './ProductCard';

interface Product {
  id: string;
  name: string;
  image: string;
  description: string;
  price?: string;
  specifications?: string[];
  slug: string;
}

interface ProductGridProps {
  products: Product[];
  title?: string;
  description?: string;
  columns?: 2 | 3 | 4;
}

const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  title = "Our Products",
  description = "Explore our range of high-quality steel products",
  columns = 3
}) => {
  const gridCols = {
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
  };

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-200 mb-4">
            {title}
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            {description}
          </p>
        </div>

        <div className={`grid ${gridCols[columns]} gap-6`}>
          {products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;