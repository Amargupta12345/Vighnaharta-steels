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
  title = "Premium Steel Solutions",
  subtitle = "Vighnaharta Steel Industries",
  description = "Leading manufacturer and supplier of high-quality steel products for construction and industrial applications. Trusted by thousands of clients worldwide.",
  primaryButtonText = "View Products",
  primaryButtonLink = "/products",
  secondaryButtonText = "Get Quote",
  secondaryButtonLink = "/quote",
  showProducts = true
}) => {
  const products = [
    { name: "Steel Beams", image: "/assets/images/steel-beam.svg" },
    { name: "Steel Rods", image: "/assets/images/steel-rod.svg" },
    { name: "Steel Sheets", image: "/assets/images/steel-sheet.svg" },
    { name: "Steel Pipes", image: "/assets/images/steel-pipe.svg" }
  ];

  return (
    <div className="relative bg-gradient-to-br from-steel-blue via-steel-blue-dark to-steel-blue-900 text-white">
      <div className="absolute inset-0 bg-black opacity-30"></div>

      <div className="relative container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-sm font-semibold text-accent-orange-light mb-2 tracking-wider uppercase">
            {subtitle}
          </h2>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
            {title}
          </h1>
          <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            {description}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link
              href={primaryButtonLink}
              className="bg-accent-orange hover:bg-accent-orange-dark text-white px-8 py-3 rounded-lg font-bold transition-colors inline-flex items-center justify-center shadow-lg"
            >
              {primaryButtonText}
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
              </svg>
            </Link>
            <Link
              href={secondaryButtonLink}
              className="border-2 border-white hover:bg-white hover:text-steel-blue text-white px-8 py-3 rounded-lg font-semibold transition-colors inline-flex items-center justify-center"
            >
              {secondaryButtonText}
            </Link>
          </div>

          {showProducts && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
              {products.map((product, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-sm rounded-lg p-4 hover:bg-white/20 transition-colors">
                  <div className="relative h-16 w-full mb-2">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-contain filter brightness-0 invert"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                  </div>
                  <h3 className="text-sm font-medium">{product.name}</h3>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-10 left-10 w-20 h-20 border border-blue-500/30 rounded-full"></div>
      <div className="absolute bottom-10 right-10 w-16 h-16 border border-blue-500/30 rounded-full"></div>
      <div className="absolute top-1/2 left-5 w-2 h-2 bg-blue-500 rounded-full"></div>
      <div className="absolute top-1/4 right-20 w-1 h-1 bg-blue-400 rounded-full"></div>
    </div>
  );
};

export default Banner;