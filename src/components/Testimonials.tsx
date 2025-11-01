import React from 'react';
import Image from 'next/image';

interface Testimonial {
  id: string;
  name: string;
  designation: string;
  company: string;
  rating: number;
  comment: string;
  image?: string;
  location?: string;
  project?: string;
  date: string;
  featured?: boolean;
}

interface TestimonialsProps {
  testimonials: Testimonial[];
  title?: string;
  subtitle?: string;
  showAll?: boolean;
}

const Testimonials: React.FC<TestimonialsProps> = ({
  testimonials,
  title = "What Our Customers Say",
  subtitle = "Trusted by leading construction companies and builders across India",
  showAll = false
}) => {
  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className={`w-5 h-5 ${i < rating ? 'text-accent-orange' : 'text-gray-300'}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    );
  };

  const displayedTestimonials = showAll ? testimonials : testimonials.slice(0, 6);

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-silver-gray-light">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-steel-blue mb-4">
            {title}
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedTestimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 relative overflow-hidden group"
            >
              {/* Decorative gradient overlay */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-steel-blue/5 to-accent-orange/5 rounded-full -mr-16 -mt-16 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              {/* Featured Badge */}
              {testimonial.featured && (
                <div className="absolute top-4 right-4 bg-accent-orange text-white text-xs font-semibold px-2 py-1 rounded-full">
                  Featured
                </div>
              )}

              {/* Rating */}
              <div className="mb-4">
                {renderStars(testimonial.rating)}
              </div>

              {/* Comment */}
              <p className="text-gray-700 mb-6 leading-relaxed relative z-10">
                "{testimonial.comment}"
              </p>

              {/* Divider */}
              <div className="border-t border-gray-200 mb-4"></div>

              {/* Customer Info */}
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gradient-to-br from-steel-blue to-steel-blue-dark rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {testimonial.name.charAt(0)}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-steel-blue text-sm truncate">
                    {testimonial.name}
                  </h4>
                  <p className="text-gray-600 text-xs truncate">
                    {testimonial.designation}
                  </p>
                  <p className="text-gray-500 text-xs truncate">
                    {testimonial.company}
                  </p>
                </div>
              </div>

              {/* Project & Location */}
              {(testimonial.project || testimonial.location) && (
                <div className="mt-4 pt-4 border-t border-gray-100">
                  {testimonial.project && (
                    <div className="flex items-center text-xs text-gray-600 mb-1">
                      <svg className="w-4 h-4 mr-1.5 text-steel-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                      {testimonial.project}
                    </div>
                  )}
                  {testimonial.location && (
                    <div className="flex items-center text-xs text-gray-600">
                      <svg className="w-4 h-4 mr-1.5 text-steel-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {testimonial.location}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-4xl font-bold text-steel-blue mb-2">500+</div>
            <div className="text-gray-600 text-sm">Happy Customers</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-steel-blue mb-2">4.9/5</div>
            <div className="text-gray-600 text-sm">Average Rating</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-steel-blue mb-2">1000+</div>
            <div className="text-gray-600 text-sm">Projects Completed</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-steel-blue mb-2">15+</div>
            <div className="text-gray-600 text-sm">Years Experience</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

