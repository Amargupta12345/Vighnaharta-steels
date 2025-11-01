'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '../types/product';

interface TrendingProductsCarouselProps {
  products: Product[];
}

const TrendingProductsCarousel: React.FC<TrendingProductsCarouselProps> = ({ products }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  // Filter or use first 6 products as trending
  const trendingProducts = products.slice(0, 6);

  useEffect(() => {
    if (!autoPlay || trendingProducts.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === trendingProducts.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000); // Change slide every 4 seconds

    return () => clearInterval(interval);
  }, [autoPlay, trendingProducts.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setAutoPlay(false);
    // Resume autoplay after 10 seconds
    setTimeout(() => setAutoPlay(true), 10000);
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? trendingProducts.length - 1 : prevIndex - 1
    );
    setAutoPlay(false);
    setTimeout(() => setAutoPlay(true), 10000);
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === trendingProducts.length - 1 ? 0 : prevIndex + 1
    );
    setAutoPlay(false);
    setTimeout(() => setAutoPlay(true), 10000);
  };

  if (trendingProducts.length === 0) {
    return null;
  }

  // Show 3 products per slide on desktop, 1 on mobile
  const productsPerSlide = 3;
  const totalSlides = Math.ceil(trendingProducts.length / productsPerSlide);

  // Get current slide products
  const getCurrentSlideProducts = () => {
    const start = currentIndex * productsPerSlide;
    return trendingProducts.slice(start, start + productsPerSlide);
  };

  return (
    <div className="relative mt-12">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
            Trending Products
          </h2>
          <p className="text-gray-300">
            Most popular steel products in high demand
          </p>
        </div>
        {/* Navigation Arrows */}
        <div className="hidden md:flex gap-2">
          <button
            onClick={goToPrevious}
            className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors backdrop-blur-sm"
            aria-label="Previous products"
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={goToNext}
            className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors backdrop-blur-sm"
            aria-label="Next products"
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Carousel Container */}
      <div className="relative overflow-hidden rounded-xl">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {Array.from({ length: totalSlides }).map((_, slideIndex) => {
            const slideProducts = trendingProducts.slice(
              slideIndex * productsPerSlide,
              (slideIndex + 1) * productsPerSlide
            );

            return (
              <div
                key={slideIndex}
                className="w-full flex-shrink-0 grid grid-cols-1 md:grid-cols-3 gap-6 px-2"
              >
                {slideProducts.map((product) => (
                  <div
                    key={product.id}
                    className="bg-white/10 backdrop-blur-md rounded-lg p-6 hover:bg-white/20 transition-all duration-300 border border-white/20 shadow-lg"
                  >
                    {/* Product Image */}
                    <div className="relative h-48 w-full mb-4 bg-white/20 rounded-lg overflow-hidden">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-contain p-4 filter brightness-0 invert"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>

                    {/* Product Info */}
                    <div>
                      <h3 className="text-lg font-bold text-white mb-2 line-clamp-1">
                        {product.name}
                      </h3>
                      <p className="text-gray-200 text-sm mb-3 line-clamp-2">
                        {product.description}
                      </p>

                      {product.price && (
                        <div className="text-accent-orange font-semibold mb-4">
                          {product.price}
                        </div>
                      )}

                      {/* Action Buttons */}
                      <div className="flex gap-2">
                        <Link
                          href={`/products/${product.slug}`}
                          className="flex-1 bg-steel-blue hover:bg-steel-blue-dark text-white px-4 py-2 rounded-lg transition-colors font-medium text-sm text-center"
                        >
                          View Details
                        </Link>
                        <Link
                          href="/quote"
                          className="flex-1 bg-accent-orange hover:bg-accent-orange-dark text-white px-4 py-2 rounded-lg transition-colors font-medium text-sm text-center"
                        >
                          Get Quote
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden flex items-center justify-center gap-2 mt-6">
        <button
          onClick={goToPrevious}
          className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
          aria-label="Previous"
        >
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Dots Indicator */}
        <div className="flex gap-2">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2 rounded-full transition-all ${
                index === currentIndex
                  ? 'bg-accent-orange w-8'
                  : 'bg-white/40 w-2 hover:bg-white/60'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        <button
          onClick={goToNext}
          className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
          aria-label="Next"
        >
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Desktop Dots Indicator */}
      <div className="hidden md:flex items-center justify-center gap-2 mt-6">
        {Array.from({ length: totalSlides }).map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-2 rounded-full transition-all ${
              index === currentIndex
                ? 'bg-accent-orange w-8'
                : 'bg-white/40 w-2 hover:bg-white/60'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default TrendingProductsCarousel;

