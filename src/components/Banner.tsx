import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface BannerProps {
  title?: string;
  subtitle?: string;
  description?: string;
  primaryButtonText?: string;
  primaryButtonLink?: string;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
  backgroundImage?: string;
  showProducts?: boolean;
}

const Banner: React.FC<BannerProps> = ({
  subtitle = "Vighnaharta Steel Industries",
  description = "Leading manufacturer and supplier of high-quality steel products for construction and industrial applications. Trusted by thousands of clients worldwide.",
  primaryButtonText = "View Products",
  primaryButtonLink = "/product",
  secondaryButtonText = "Get Quote",
  secondaryButtonLink = "/quote",
  backgroundImage = "/assets/images/hero-banner.png",
  showProducts = true
}) => {
  const products = [
    { name: "Steel Beams", image: "/assets/images/steel-beam.png", slug: "steel-i-beams" },
    { name: "Steel Rods", image: "/assets/images/steel-rod.png", slug: "steel-rods" },
    { name: "Steel Sheets", image: "/assets/images/steel-sheet.png", slug: "steel-sheets" },
    { name: "Steel Pipes", image: "/assets/images/steel-pipe.png", slug: "steel-pipes" }
  ];

  const taglines = [
    "Premium Steel Solutions",
    "Building India's Future",
    "Quality You Can Trust",
  ];

  return (
    <div className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={backgroundImage}
          alt="Steel manufacturing facility"
          fill
          className="object-cover"
          priority
          quality={90}
          sizes="100vw"
        />
        {/* Gradient overlays for depth */}
        <div className="absolute inset-0 bg-gradient-to-r from-steel-blue-900/95 via-steel-blue/80 to-steel-blue-dark/60"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-steel-blue-900/50 via-transparent to-transparent"></div>
      </div>

      {/* Animated decorative elements */}
      <div className="absolute top-20 left-10 w-32 h-32 border border-accent-orange/20 rounded-full animate-float"></div>
      <div className="absolute bottom-20 right-20 w-24 h-24 border border-white/10 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/3 right-10 w-16 h-16 border border-accent-orange/15 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
      <div className="absolute top-10 right-1/3 w-2 h-2 bg-accent-orange rounded-full animate-pulse"></div>
      <div className="absolute bottom-1/3 left-20 w-3 h-3 bg-accent-orange/50 rounded-full animate-pulse" style={{ animationDelay: '1.5s' }}></div>

      {/* Main Content */}
      <div className="relative container mx-auto px-4 py-24">
        <div className="max-w-4xl mx-auto text-center">
          {/* Subtitle badge */}
          <div className="animate-fade-in inline-flex items-center gap-2 bg-accent-orange/20 backdrop-blur-sm border border-accent-orange/30 rounded-full px-6 py-2 mb-6">
            <span className="w-2 h-2 bg-accent-orange rounded-full animate-pulse"></span>
            <span className="text-sm font-semibold text-accent-orange-light tracking-wider uppercase">
              {subtitle}
            </span>
          </div>

          {/* Rotating Taglines */}
          <div className="animate-slide-up h-[80px] md:h-[100px] lg:h-[120px] overflow-hidden relative mb-6">
            <div className="tagline-slider">
              {taglines.map((tagline, i) => (
                <h1
                  key={i}
                  className="h-[80px] md:h-[100px] lg:h-[120px] flex items-center justify-center text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight text-white"
                >
                  {tagline.split(' ').map((word, j) => (
                    <span key={j}>
                      {j === tagline.split(' ').length - 1 ? (
                        <span className="text-accent-orange">{word}</span>
                      ) : (
                        <span>{word} </span>
                      )}
                    </span>
                  ))}
                </h1>
              ))}
            </div>
          </div>

          {/* Description */}
          <p className="animate-slide-up delay-200 text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
            {description}
          </p>

          {/* Buttons */}
          <div className="animate-slide-up delay-300 flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link
              href={primaryButtonLink}
              className="group bg-accent-orange hover:bg-accent-orange-dark text-white px-8 py-4 rounded-xl font-bold transition-all duration-300 inline-flex items-center justify-center shadow-lg shadow-accent-orange/30 hover:shadow-xl hover:shadow-accent-orange/40 hover:-translate-y-0.5"
            >
              {primaryButtonText}
              <svg className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
              </svg>
            </Link>
            <Link
              href={secondaryButtonLink}
              className="group border-2 border-white/30 hover:border-white hover:bg-white hover:text-steel-blue text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 inline-flex items-center justify-center backdrop-blur-sm hover:-translate-y-0.5"
            >
              {secondaryButtonText}
              <svg className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
              </svg>
            </Link>
          </div>

          {/* Product Quick Links */}
          {showProducts && (
            <div className="animate-slide-up delay-400 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
              {products.map((product, index) => (
                <Link
                  key={index}
                  href={`/product/${product.slug}`}
                  className="group glass-card rounded-xl p-4 hover:bg-white/15 transition-all duration-300 cursor-pointer"
                >
                  <div className="relative h-20 w-full mb-3 rounded-lg overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-steel-blue/60 to-transparent"></div>
                  </div>
                  <h3 className="text-sm font-semibold text-white group-hover:text-accent-orange transition-colors">{product.name}</h3>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent"></div>
    </div>
  );
};

export default Banner;