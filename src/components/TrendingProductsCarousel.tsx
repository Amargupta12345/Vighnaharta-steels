'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '../types/product';
import { ImageSizes } from '../utils/imageUtils';

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
          <div className="inline-flex items-center gap-2 bg-accent-orange/20 backdrop-blur-sm border border-accent-orange/30 rounded-full px-4 py-1 mb-3">
            <span className="w-1.5 h-1.5 bg-accent-orange rounded-full animate-pulse"></span>
            <span className="text-[11px] font-semibold text-accent-orange-light tracking-wider uppercase">Hot Picks</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-1">
            Trending <span className="text-accent-orange">Products</span>
          </h2>
          <p className="text-gray-300 text-sm">
            Most popular steel products in high demand
          </p>
        </div>
        {/* Navigation Arrows */}
        <div className="hidden md:flex gap-2">
          <button
            onClick={goToPrevious}
            className="group w-11 h-11 bg-white/10 hover:bg-accent-orange rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-sm border border-white/20 hover:border-accent-orange hover:scale-110 hover:shadow-lg hover:shadow-accent-orange/40"
            aria-label="Previous products"
          >
            <svg className="w-5 h-5 text-white transform group-hover:-translate-x-0.5 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={goToNext}
            className="group w-11 h-11 bg-white/10 hover:bg-accent-orange rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-sm border border-white/20 hover:border-accent-orange hover:scale-110 hover:shadow-lg hover:shadow-accent-orange/40"
            aria-label="Next products"
          >
            <svg className="w-5 h-5 text-white transform group-hover:translate-x-0.5 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
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
                {slideProducts.map((product, idx) => (
                  <div
                    key={product.id}
                    className="group relative bg-white/10 backdrop-blur-md rounded-2xl p-5 hover:bg-white/15 hover:-translate-y-2 transition-all duration-500 border border-white/20 hover:border-accent-orange/50 shadow-lg hover:shadow-2xl hover:shadow-accent-orange/20 overflow-hidden animate-slide-up-fade opacity-0"
                    style={{ animationDelay: `${idx * 100}ms`, animationFillMode: 'forwards' }}
                  >
                    {/* Hover gradient glow */}
                    <div className="absolute inset-0 bg-gradient-to-br from-accent-orange/0 to-accent-orange/0 group-hover:from-accent-orange/10 group-hover:to-transparent transition-all duration-500 rounded-2xl pointer-events-none"></div>

                    {/* Product Image */}
                    <div className="relative h-48 w-full mb-4 bg-white/20 rounded-xl overflow-hidden">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover rounded-xl transition-transform duration-700 group-hover:scale-110"
                        sizes={ImageSizes.carousel.sizes}
                        quality={85}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-steel-blue/40 via-transparent to-transparent"></div>
                      {/* Trending badge */}
                      <div className="absolute top-2 right-2 bg-gradient-to-r from-accent-orange to-accent-orange-dark text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-lg flex items-center gap-1">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"/>
                        </svg>
                        Hot
                      </div>
                    </div>

                    {/* Product Info */}
                    <div className="relative">
                      <h3 className="text-lg font-bold text-white mb-2 line-clamp-1 group-hover:text-accent-orange-light transition-colors duration-300">
                        {product.name}
                      </h3>
                      <p className="text-gray-200 text-sm mb-3 line-clamp-2">
                        {product.description}
                      </p>

                      {product.price && (
                        <div className="inline-flex items-center gap-1.5 bg-accent-orange/15 border border-accent-orange/30 rounded-lg px-3 py-1 mb-4">
                          <span className="text-accent-orange font-bold text-sm">{product.price}</span>
                        </div>
                      )}

                      {/* Action Buttons */}
                      <div className="flex gap-2">
                        <Link
                          href={`/product/${product.slug}`}
                          className="flex-1 bg-white/10 hover:bg-white border border-white/30 hover:border-white text-white hover:text-steel-blue px-4 py-2 rounded-lg transition-all duration-300 font-semibold text-sm text-center backdrop-blur-sm"
                        >
                          View Details
                        </Link>
                        <Link
                          href="/quote"
                          className="flex-1 bg-gradient-to-r from-accent-orange to-accent-orange-dark hover:shadow-lg hover:shadow-accent-orange/40 text-white px-4 py-2 rounded-lg transition-all duration-300 font-semibold text-sm text-center"
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
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'bg-gradient-to-r from-accent-orange to-accent-orange-light w-10 shadow-md shadow-accent-orange/40'
                  : 'bg-white/40 w-2 hover:bg-white/70 hover:w-4 hover:scale-125'
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

