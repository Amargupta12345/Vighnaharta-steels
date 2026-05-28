import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface BannerProps {
  subtitle?: string;
  description?: string;
  primaryButtonText?: string;
  primaryButtonLink?: string;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
}

const taglines = [
  { line1: 'Direct from Top', highlight: 'Steel Mills' },
  { line1: 'Wholesale Prices,', highlight: 'Zero Compromise' },
  { line1: 'Trusted by 500+', highlight: 'Builders & Dealers' },
];

const stats = [
  { value: '500+', label: 'Happy Clients' },
  { value: '15+', label: 'Years in Business' },
  { value: '50+', label: 'Product Variants' },
  { value: '24hr', label: 'Quote Turnaround' },
];

const brands = ['TATA Steel', 'JSW', 'SAIL', 'JINDAL', 'RINL', 'ESSAR'];

const Banner: React.FC<BannerProps> = ({
  subtitle = 'Authorized Steel Wholesaler',
  description = 'We source directly from TATA, JSW, SAIL & JINDAL — delivering premium-grade steel to contractors, builders, and dealers at the best market rates.',
  primaryButtonText = 'Browse Products',
  primaryButtonLink = '/product',
  secondaryButtonText = 'Get a Quote',
  secondaryButtonLink = '/quote',
}) => {
  const [active, setActive] = useState(0);
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setInterval(() => setActive((p) => (p + 1) % taglines.length), 3500);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div ref={ref} className="relative min-h-[96vh] flex items-center overflow-hidden bg-[#0a0f1e]">

      {/* Background — dramatic steel mill photo */}
      <div className="absolute inset-0">
        <Image
          src="/assets/images/steel-factory.png"
          alt="Steel manufacturing facility"
          fill
          className="object-cover object-center"
          priority
          quality={90}
          sizes="100vw"
        />
        {/* Left-heavy overlay — text side is dark, right side shows the photo */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#050a14]/90 via-[#050a14]/65 to-[#050a14]/20" />
        {/* Subtle top/bottom vignette only */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050a14]/50 via-transparent to-transparent" />
      </div>

      {/* Industrial grid overlay */}
      <div className="absolute inset-0 bg-industrial-grid" />

      {/* Animated scan line */}
      <div className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-orange/50 to-transparent animate-scan pointer-events-none" />

      {/* Accent glow orbs */}
      <div className="absolute top-1/3 right-1/3 w-[500px] h-[500px] bg-accent-orange/8 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Content */}
      <div className="relative container mx-auto px-4 py-32 z-10">
        <div className={`max-w-3xl transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>

          {/* Badge */}
          <div className="inline-flex items-center gap-2.5 bg-accent-orange/15 backdrop-blur border border-accent-orange/35 rounded-full px-5 py-2 mb-8">
            <span className="w-2 h-2 bg-accent-orange rounded-full animate-pulse flex-shrink-0" />
            <span className="text-xs font-bold text-accent-orange tracking-[0.2em] uppercase">{subtitle}</span>
          </div>

          {/* Animated headline — Barlow Condensed */}
          <div className="h-[110px] md:h-[140px] lg:h-[170px] relative overflow-hidden mb-6">
            {taglines.map((t, i) => (
              <div
                key={i}
                className={`absolute inset-0 flex flex-col justify-center transition-all duration-700 ease-in-out ${
                  i === active ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
                }`}
              >
                <h1 className="font-display font-black text-5xl md:text-7xl lg:text-8xl leading-[0.95] tracking-tight uppercase text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
                  {t.line1}
                  <br />
                  <span className="text-accent-orange">{t.highlight}</span>
                </h1>
              </div>
            ))}
          </div>

          {/* Progress dots */}
          <div className="flex gap-2 mb-9">
            {taglines.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`h-1 rounded-full transition-all duration-500 ${
                  i === active ? 'w-10 bg-accent-orange' : 'w-2.5 bg-white/40 hover:bg-white/70'
                }`}
              />
            ))}
          </div>

          {/* Divider line */}
          <div className="w-16 h-px bg-gradient-to-r from-accent-orange to-transparent mb-7" />

          {/* Description */}
          <p className="text-lg md:text-xl text-white/90 mb-10 max-w-lg leading-relaxed font-light drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">
            {description}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 mb-14">
            <Link
              href={primaryButtonLink}
              className="group bg-accent-orange hover:bg-accent-orange-dark text-white px-9 py-4 rounded-xl font-bold transition-all duration-300 inline-flex items-center justify-center gap-3 shadow-lg shadow-accent-orange/25 hover:-translate-y-1 hover:shadow-xl hover:shadow-accent-orange/30"
            >
              {primaryButtonText}
              <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <Link
              href={secondaryButtonLink}
              className="group border-2 border-white/20 hover:border-accent-orange text-white hover:text-accent-orange px-9 py-4 rounded-xl font-semibold transition-all duration-300 inline-flex items-center justify-center gap-3 backdrop-blur-sm hover:-translate-y-1"
            >
              {secondaryButtonText}
              <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          {/* Brand strip */}
          <div>
            <p className="text-[10px] text-white/50 uppercase tracking-[0.25em] font-bold mb-3">Authorized Dealer Of</p>
            <div className="flex flex-wrap gap-2.5">
              {brands.map((b) => (
                <span
                  key={b}
                  className="bg-white/10 backdrop-blur border border-white/20 text-white/80 text-xs font-bold px-4 py-2 rounded-lg hover:border-accent-orange/50 hover:text-accent-orange hover:bg-accent-orange/10 transition-all duration-300 cursor-default"
                >
                  {b}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Right side stats panel (desktop) */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden xl:flex flex-col gap-3 z-10">
        {stats.map((s, i) => (
          <div
            key={s.label}
            className="bg-white/6 backdrop-blur-md border border-white/10 rounded-2xl px-6 py-5 text-center min-w-[140px] hover:border-accent-orange/40 hover:bg-white/10 transition-all duration-300 group"
            style={{ animationDelay: `${i * 150}ms` }}
          >
            <div className="font-display font-black text-3xl text-accent-orange group-hover:scale-110 transition-transform duration-300">{s.value}</div>
            <div className="text-[11px] text-gray-400 mt-1.5 font-medium tracking-wide">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Bottom mobile stats bar */}
      <div className="absolute bottom-0 left-0 right-0 xl:hidden">
        <div className="bg-[#050a14]/90 backdrop-blur border-t border-white/8 px-4 py-3">
          <div className="flex justify-around">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <div className="font-display font-black text-lg text-accent-orange">{s.value}</div>
                <div className="text-[9px] text-gray-500 font-medium tracking-wide uppercase">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom fade into page */}
      <div className="absolute bottom-[56px] xl:bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent" />
    </div>
  );
};

export default Banner;
