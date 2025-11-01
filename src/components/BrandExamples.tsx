import React from 'react';

/**
 * Brand Style Guide Examples Component
 * Demonstrates proper usage of Vighnaharta Steel brand colors
 */

// Button Examples
export const ButtonExamples = () => {
  return (
    <div className="space-y-8 p-8">
      <div>
        <h3 className="text-steel-blue font-bold mb-4">Primary Button (Orange)</h3>
        <button className="bg-accent-orange hover:bg-accent-orange-dark text-white px-8 py-3 rounded-lg font-semibold transition-colors shadow-lg">
          Get Quote
        </button>
      </div>

      <div>
        <h3 className="text-steel-blue font-bold mb-4">Secondary Button (Steel Blue)</h3>
        <button className="bg-steel-blue hover:bg-steel-blue-dark text-white px-8 py-3 rounded-lg font-semibold transition-colors">
          Contact Us
        </button>
      </div>

      <div>
        <h3 className="text-steel-blue font-bold mb-4">Outline Button</h3>
        <button className="border-2 border-steel-blue text-steel-blue hover:bg-steel-blue hover:text-white px-8 py-3 rounded-lg font-semibold transition-colors">
          Learn More
        </button>
      </div>
    </div>
  );
};

// Header Examples
export const HeaderExamples = () => {
  return (
    <div className="space-y-6">
      <header className="bg-steel-blue text-white py-4">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold">Vighnaharta Steel Corporation</h1>
        </div>
      </header>

      <div className="bg-silver-gray py-8">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-steel-blue mb-4">
            Section Heading in Steel Blue
          </h2>
          <p className="text-gray-700">
            Content with Silver Gray background for excellent readability.
          </p>
        </div>
      </div>
    </div>
  );
};

// Product Card Example
export const ProductCardExample = () => {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow border border-silver-gray overflow-hidden max-w-sm">
      <div className="h-48 bg-silver-gray flex items-center justify-center">
        <div className="text-4xl">🏗️</div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-steel-blue mb-2">
          Steel I-Beams
        </h3>
        <p className="text-gray-600 mb-4">
          High-strength structural steel for construction projects.
        </p>
        <div className="flex items-center justify-between">
          <span className="text-lg font-semibold text-steel-blue">
            From ₹45/kg
          </span>
          <button className="bg-accent-orange hover:bg-accent-orange-dark text-white px-4 py-2 rounded-lg font-medium transition-colors">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

// Navigation Bar Example
export const NavigationExample = () => {
  return (
    <nav className="bg-steel-blue text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="text-xl font-bold">Vighnaharta Steel</div>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-accent-orange transition-colors font-medium">
              Home
            </a>
            <a href="#" className="hover:text-accent-orange transition-colors font-medium">
              Products
            </a>
            <a href="#" className="hover:text-accent-orange transition-colors font-medium">
              About
            </a>
            <button className="bg-accent-orange hover:bg-accent-orange-dark px-4 py-2 rounded-lg font-semibold transition-colors">
              Get Quote
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

// Hero Section Example
export const HeroExample = () => {
  return (
    <section className="bg-gradient-to-br from-steel-blue to-steel-blue-dark text-white py-20">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-5xl font-extrabold mb-6">
          Premium Steel Solutions
        </h1>
        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
          Leading manufacturer of high-quality steel products for construction and industry.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-accent-orange hover:bg-accent-orange-dark text-white px-8 py-4 rounded-lg font-bold text-lg transition-colors shadow-lg">
            View Products
          </button>
          <button className="border-2 border-white hover:bg-white hover:text-steel-blue text-white px-8 py-4 rounded-lg font-bold text-lg transition-colors">
            Get Quote
          </button>
        </div>
      </div>
    </section>
  );
};

// Feature Card Example
export const FeatureCardExample = () => {
  return (
    <div className="bg-silver-gray-light p-8 rounded-lg border-l-4 border-accent-orange">
      <div className="w-16 h-16 bg-steel-blue rounded-full flex items-center justify-center mb-4 shadow-md">
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
      </div>
      <h3 className="text-xl font-bold text-steel-blue mb-2">
        Quality Assurance
      </h3>
      <p className="text-gray-700">
        All products undergo rigorous quality testing to ensure they meet industry standards.
      </p>
    </div>
  );
};

// Complete Brand Examples Page
export default function BrandExamples() {
  return (
    <div className="min-h-screen bg-gray-50">
      <NavigationExample />
      <div className="container mx-auto px-4 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-extrabold text-steel-blue mb-4">
            Brand Style Guide Examples
          </h1>
          <p className="text-lg text-gray-600">
            Visual examples of Vighnaharta Steel brand color usage
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          <div>
            <h2 className="text-2xl font-bold text-steel-blue mb-6">Buttons</h2>
            <ButtonExamples />
          </div>

          <div>
            <h2 className="text-2xl font-bold text-steel-blue mb-6">Headers & Sections</h2>
            <HeaderExamples />
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-bold text-steel-blue mb-6">Hero Section</h2>
          <HeroExample />
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-bold text-steel-blue mb-6">Product Card</h2>
          <div className="flex justify-center">
            <ProductCardExample />
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-steel-blue mb-6">Feature Card</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FeatureCardExample />
            <FeatureCardExample />
            <FeatureCardExample />
          </div>
        </div>
      </div>
    </div>
  );
}
