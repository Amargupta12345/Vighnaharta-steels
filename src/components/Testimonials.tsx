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
    <section className="relative py-20 bg-gradient-to-br from-gray-50 to-silver-gray-light overflow-hidden">
      {/* Decorative blur orbs */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-accent-orange/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-20 left-10 w-72 h-72 bg-steel-blue/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-accent-orange/10 border border-accent-orange/20 rounded-full px-5 py-2 mb-6">
            <span className="w-2 h-2 bg-accent-orange rounded-full animate-pulse"></span>
            <span className="text-sm font-semibold text-accent-orange tracking-wider uppercase">Voices of Trust</span>
          </div>
          <h2 className="font-display font-black text-4xl md:text-6xl uppercase tracking-tight text-steel-blue mb-4">
            {title}
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedTestimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className="card-premium relative bg-white rounded-3xl shadow-sm hover:shadow-2xl p-7 border border-gray-100 hover:border-accent-orange/20 overflow-hidden group animate-slide-up-fade opacity-0"
              style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}
            >
              {/* Top gradient accent border */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-steel-blue via-accent-orange to-steel-blue rounded-t-3xl opacity-60 group-hover:opacity-100 transition-opacity duration-500"></div>

              {/* Decorative gradient blob */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-accent-orange/10 to-steel-blue/10 rounded-full -mr-20 -mt-20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              {/* Quote mark badge */}
              <div className="absolute -top-2 -left-2 w-14 h-14 bg-gradient-to-br from-accent-orange to-accent-orange-dark rounded-2xl shadow-lg flex items-center justify-center transform -rotate-6 group-hover:rotate-0 transition-transform duration-500">
                <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9.983 3v7.391c0 5.704-3.731 9.57-8.983 10.609l-.995-2.151c2.432-.917 3.995-3.638 3.995-5.849h-4v-10h9.983zm14.017 0v7.391c0 5.704-3.748 9.571-9 10.609l-.996-2.151c2.433-.917 3.996-3.638 3.996-5.849h-3.983v-10h9.983z"/>
                </svg>
              </div>

              {/* Featured Badge */}
              {testimonial.featured && (
                <div className="absolute top-4 right-4 bg-gradient-to-r from-accent-orange to-accent-orange-dark text-white text-[10px] font-bold tracking-wider uppercase px-3 py-1 rounded-full shadow-md">
                  ★ Featured
                </div>
              )}

              {/* Rating */}
              <div className="mb-4 mt-6 relative z-10">
                {renderStars(testimonial.rating)}
              </div>

              {/* Comment */}
              <p className="text-gray-700 mb-6 leading-relaxed relative z-10 italic">
                "{testimonial.comment}"
              </p>

              {/* Divider */}
              <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent mb-4"></div>

              {/* Customer Info */}
              <div className="flex items-start space-x-4 relative z-10">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gradient-to-br from-steel-blue to-steel-blue-dark rounded-2xl flex items-center justify-center text-white font-bold text-lg shadow-md group-hover:scale-110 transition-transform duration-300">
                    {testimonial.name.charAt(0)}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-steel-blue text-sm truncate group-hover:text-accent-orange transition-colors duration-300">
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
                <div className="mt-4 pt-4 border-t border-gray-100 relative z-10">
                  {testimonial.project && (
                    <div className="flex items-center text-xs text-gray-600 mb-1">
                      <svg className="w-4 h-4 mr-1.5 text-accent-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                      {testimonial.project}
                    </div>
                  )}
                  {testimonial.location && (
                    <div className="flex items-center text-xs text-gray-600">
                      <svg className="w-4 h-4 mr-1.5 text-accent-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { value: '500+', label: 'Happy Customers', icon: '👥' },
            { value: '4.9/5', label: 'Average Rating', icon: '⭐' },
            { value: '1000+', label: 'Projects Completed', icon: '🏗️' },
            { value: '15+', label: 'Years Experience', icon: '📅' },
          ].map((stat, i) => (
            <div key={i} className="group text-center bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/60 hover:bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="text-2xl mb-2 group-hover:scale-110 transition-transform duration-300">{stat.icon}</div>
              <div className="text-3xl md:text-4xl font-extrabold bg-gradient-to-br from-steel-blue to-accent-orange bg-clip-text text-transparent mb-1">{stat.value}</div>
              <div className="text-gray-600 text-sm font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

