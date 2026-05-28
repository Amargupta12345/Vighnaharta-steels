'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { toggleMobileMenu, setMobileMenuOpen } from '../store/slices/uiSlice';

interface NavCategory { _id: string; name: string; slug: string; icon: string; }
interface NavBrand { _id: string; name: string; slug: string; logo: string; }

function NavDropdown({
  label,
  href,
  isActive,
  children,
}: {
  label: string;
  href: string;
  isActive: boolean;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div ref={ref} className="relative" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <Link
        href={href}
        className={`relative px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 group inline-flex items-center gap-1 ${
          isActive ? 'text-accent-orange' : 'text-white/80 hover:text-white hover:bg-white/10'
        }`}
      >
        {label}
        <svg className={`w-3.5 h-3.5 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
        <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-accent-orange rounded-full transition-all duration-300 ${isActive ? 'w-6' : 'w-0 group-hover:w-4'}`} />
      </Link>
      <div className={`absolute top-full left-0 mt-1 min-w-[220px] bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden transition-all duration-200 z-50 ${open ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'}`}>
        {children}
      </div>
    </div>
  );
}

const Navbar = () => {
  const isMenuOpen = useAppSelector((state) => state.ui.mobileMenuOpen);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [navCategories, setNavCategories] = useState<NavCategory[]>([]);
  const [navBrands, setNavBrands] = useState<NavBrand[]>([]);
  const [mobileSection, setMobileSection] = useState<'categories' | 'brands' | null>(null);
  const aboutRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (aboutRef.current && !aboutRef.current.contains(e.target as Node)) setAboutOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  useEffect(() => {
    fetch('/api/categories')
      .then((r) => r.json())
      .then((d) => { if (d.success) setNavCategories(d.data); })
      .catch(() => {});
    fetch('/api/brands')
      .then((r) => r.json())
      .then((d) => { if (d.success) setNavBrands(d.data); })
      .catch(() => {});
  }, []);

  const toggleMenu = () => dispatch(toggleMobileMenu());
  const closeMenu = () => dispatch(setMobileMenuOpen(false));

  const isActive = (path: string) => {
    if (path === '/') return router.pathname === '/';
    return router.pathname.startsWith(path);
  };

  const isProductActive = router.pathname.startsWith('/product');
  const currentCategory = typeof router.query.category === 'string' ? router.query.category : '';
  const currentBrand = typeof router.query.brand === 'string' ? router.query.brand : '';

  const aboutLinks = [
    { href: '/about', label: 'Company Overview' },
    { href: '/testimonials', label: 'Testimonials' },
  ];

  return (
    <>
      {/* Top Contact Bar */}
      <div className={`fixed top-0 left-0 right-0 z-[60] bg-steel-blue-900 text-white transition-all duration-500 ${scrolled ? 'h-0 overflow-hidden opacity-0' : 'h-auto opacity-100'}`}>
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-2 text-xs md:text-sm">
            <div className="flex items-center gap-4 md:gap-6">
              <a href="tel:+919876543210" className="flex items-center gap-1.5 hover:text-accent-orange transition-colors">
                <svg className="w-3.5 h-3.5 text-accent-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                </svg>
                <span>(+91) 98765 43210</span>
              </a>
              <a href="mailto:info@vighnahartasteel.com" className="hidden md:flex items-center gap-1.5 hover:text-accent-orange transition-colors">
                <svg className="w-3.5 h-3.5 text-accent-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
                <span>info@vighnahartasteel.com</span>
              </a>
            </div>
            <div className="flex items-center gap-4">
              <span className="hidden md:flex items-center gap-1.5 text-gray-300">
                <svg className="w-3.5 h-3.5 text-accent-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                Mon-Sat: 9AM - 6PM
              </span>
              <div className="flex gap-2">
                <a href="#" className="w-6 h-6 bg-white/10 hover:bg-accent-orange rounded-md flex items-center justify-center transition-colors" aria-label="Facebook">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </a>
                <a href="#" className="w-6 h-6 bg-white/10 hover:bg-accent-orange rounded-md flex items-center justify-center transition-colors" aria-label="LinkedIn">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.771v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                </a>
                <a href="#" className="w-6 h-6 bg-white/10 hover:bg-accent-orange rounded-md flex items-center justify-center transition-colors" aria-label="Instagram">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className={`fixed left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'top-0 bg-steel-blue/95 backdrop-blur-xl shadow-2xl shadow-steel-blue/20 py-1'
          : 'top-[36px] bg-steel-blue/80 backdrop-blur-md py-2'
      }`}>
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3 hover:opacity-90 transition-all duration-300 group">
              <div className="bg-white/20 backdrop-blur-sm p-2 rounded-xl group-hover:bg-white/30 transition-colors duration-300">
                <Image
                  src="/assets/images/vighnaharta-steels-logo.svg"
                  alt="Vighnaharta Steels"
                  width={80}
                  height={80}
                  className="h-10 w-10"
                  priority
                />
              </div>
              <div>
                <h2 className="text-white text-xl font-bold leading-tight">Vighnaharta</h2>
                <p className="text-accent-orange-light text-xs font-medium tracking-wider">STEELS</p>
              </div>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center space-x-1">
              {/* Home */}
              <Link
                href="/"
                className={`relative px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 group ${
                  isActive('/') ? 'text-accent-orange' : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
              >
                Home
                <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-accent-orange rounded-full transition-all duration-300 ${isActive('/') ? 'w-6' : 'w-0 group-hover:w-4'}`} />
              </Link>

              {/* About */}
              <div ref={aboutRef} className="relative" onMouseEnter={() => setAboutOpen(true)} onMouseLeave={() => setAboutOpen(false)}>
                <Link
                  href="/about"
                  className={`relative px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 group inline-flex items-center gap-1 ${
                    isActive('/about') ? 'text-accent-orange' : 'text-white/80 hover:text-white hover:bg-white/10'
                  }`}
                >
                  About Us
                  <svg className={`w-3.5 h-3.5 transition-transform duration-200 ${aboutOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
                  </svg>
                  <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-accent-orange rounded-full transition-all duration-300 ${isActive('/about') ? 'w-6' : 'w-0 group-hover:w-4'}`} />
                </Link>
                <div className={`absolute top-full left-0 mt-1 w-52 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden transition-all duration-200 z-50 ${aboutOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'}`}>
                  {aboutLinks.map((link) => (
                    <Link key={link.href} href={link.href} className="block px-4 py-3 text-sm text-gray-700 hover:bg-accent-orange/10 hover:text-accent-orange transition-colors font-medium border-b border-gray-50 last:border-0">
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Products — plain link */}
              <Link
                href="/product"
                className={`relative px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 group ${
                  isProductActive && !currentCategory && !currentBrand ? 'text-accent-orange' : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
              >
                Products
                <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-accent-orange rounded-full transition-all duration-300 ${isProductActive && !currentCategory && !currentBrand ? 'w-6' : 'w-0 group-hover:w-4'}`} />
              </Link>

              {/* Categories dropdown */}
              <NavDropdown
                label="Categories"
                href="/product"
                isActive={isProductActive && !!currentCategory}
              >
                <Link href="/product" className="block px-4 py-3 text-sm text-accent-orange font-bold bg-accent-orange/5 border-b border-gray-100">
                  All Categories →
                </Link>
                {navCategories.length === 0 ? (
                  <div className="px-4 py-3 text-sm text-gray-400">Loading…</div>
                ) : (
                  navCategories.map((cat) => (
                    <Link
                      key={cat._id}
                      href={`/product?category=${encodeURIComponent(cat.name)}`}
                      className={`flex items-center gap-2.5 px-4 py-2.5 text-sm font-medium border-b border-gray-50 last:border-0 transition-colors ${
                        currentCategory === cat.name
                          ? 'bg-accent-orange/10 text-accent-orange'
                          : 'text-gray-700 hover:bg-accent-orange/10 hover:text-accent-orange'
                      }`}
                    >
                      <span className="text-base flex-shrink-0">{cat.icon}</span>
                      {cat.name}
                    </Link>
                  ))
                )}
              </NavDropdown>

              {/* Brands dropdown */}
              <NavDropdown
                label="Brands"
                href="/product"
                isActive={isProductActive && !!currentBrand}
              >
                <Link href="/product" className="block px-4 py-3 text-sm text-accent-orange font-bold bg-accent-orange/5 border-b border-gray-100">
                  All Brands →
                </Link>
                {navBrands.length === 0 ? (
                  <div className="px-4 py-3 text-sm text-gray-400">Loading…</div>
                ) : (
                  navBrands.map((brand) => (
                    <Link
                      key={brand._id}
                      href={`/product?brand=${encodeURIComponent(brand.name)}`}
                      className={`flex items-center gap-3 px-3 py-2.5 border-b border-gray-50 last:border-0 transition-colors ${
                        currentBrand === brand.name
                          ? 'bg-accent-orange/10 text-accent-orange'
                          : 'text-gray-700 hover:bg-accent-orange/10 hover:text-accent-orange'
                      }`}
                    >
                      <div className="w-10 h-10 rounded-lg border border-gray-100 bg-white flex items-center justify-center flex-shrink-0 overflow-hidden shadow-sm">
                        {brand.logo ? (
                          <img src={brand.logo} alt={brand.name} className="w-9 h-9 object-contain p-1" />
                        ) : (
                          <span className="text-steel-blue font-bold text-sm">{brand.name.charAt(0)}</span>
                        )}
                      </div>
                      <span className="text-sm font-medium">{brand.name}</span>
                    </Link>
                  ))
                )}
              </NavDropdown>

              <Link
                href="/contact"
                className={`relative px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 group ${
                  isActive('/contact') ? 'text-accent-orange' : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
              >
                Contact
                <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-accent-orange rounded-full transition-all duration-300 ${isActive('/contact') ? 'w-6' : 'w-0 group-hover:w-4'}`} />
              </Link>

              <Link
                href="/quote"
                className="ml-2 bg-accent-orange hover:bg-accent-orange-dark px-5 py-2.5 rounded-xl transition-all duration-300 font-semibold text-sm text-white shadow-lg shadow-accent-orange/25 hover:shadow-xl hover:shadow-accent-orange/35 hover:-translate-y-0.5"
              >
                Get Quote
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="lg:hidden flex flex-col justify-center items-center w-10 h-10 rounded-lg hover:bg-white/10 transition-colors"
              aria-label="Toggle mobile menu"
            >
              <span className={`bg-white block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${isMenuOpen ? 'rotate-45 translate-y-1' : '-translate-y-0.5'}`}></span>
              <span className={`bg-white block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm my-0.5 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
              <span className={`bg-white block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${isMenuOpen ? '-rotate-45 -translate-y-1' : 'translate-y-0.5'}`}></span>
            </button>
          </div>

          {/* Mobile Menu */}
          <div className={`lg:hidden overflow-hidden transition-all duration-400 ${isMenuOpen ? 'max-h-[700px] pb-6 pt-4' : 'max-h-0'}`}>
            <div className="flex flex-col space-y-1 bg-white/5 backdrop-blur-lg rounded-xl p-3">
              <Link href="/" className={`px-4 py-3 rounded-lg font-medium transition-all duration-300 ${isActive('/') ? 'bg-accent-orange/20 text-accent-orange' : 'text-white/80 hover:bg-white/10 hover:text-white'}`} onClick={closeMenu}>Home</Link>
              <Link href="/about" className={`px-4 py-3 rounded-lg font-medium transition-all duration-300 ${isActive('/about') ? 'bg-accent-orange/20 text-accent-orange' : 'text-white/80 hover:bg-white/10 hover:text-white'}`} onClick={closeMenu}>About Us</Link>

              {/* Products */}
              <Link href="/product" className={`px-4 py-3 rounded-lg font-medium transition-all duration-300 ${isProductActive && !currentCategory && !currentBrand ? 'bg-accent-orange/20 text-accent-orange' : 'text-white/80 hover:bg-white/10 hover:text-white'}`} onClick={closeMenu}>
                Products
              </Link>

              {/* Categories section */}
              <button
                onClick={() => setMobileSection(mobileSection === 'categories' ? null : 'categories')}
                className="flex items-center justify-between px-4 py-3 rounded-lg font-medium text-white/80 hover:bg-white/10 hover:text-white transition-all duration-300 text-left w-full"
              >
                <span className={isProductActive && !!currentCategory ? 'text-accent-orange' : ''}>Categories</span>
                <svg className={`w-4 h-4 transition-transform duration-200 ${mobileSection === 'categories' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
                </svg>
              </button>
              {mobileSection === 'categories' && (
                <div className="pl-4 space-y-1">
                  {navCategories.map((cat) => (
                    <Link
                      key={cat._id}
                      href={`/product?category=${encodeURIComponent(cat.name)}`}
                      className={`flex items-center gap-2 px-4 py-2 text-sm rounded-lg transition-colors ${currentCategory === cat.name ? 'text-accent-orange bg-accent-orange/10' : 'text-white/60 hover:text-accent-orange'}`}
                      onClick={closeMenu}
                    >
                      <span>{cat.icon}</span>
                      {cat.name}
                    </Link>
                  ))}
                </div>
              )}

              {/* Brands section */}
              <button
                onClick={() => setMobileSection(mobileSection === 'brands' ? null : 'brands')}
                className="flex items-center justify-between px-4 py-3 rounded-lg font-medium text-white/80 hover:bg-white/10 hover:text-white transition-all duration-300 text-left w-full"
              >
                <span className={isProductActive && !!currentBrand ? 'text-accent-orange' : ''}>Brands</span>
                <svg className={`w-4 h-4 transition-transform duration-200 ${mobileSection === 'brands' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
                </svg>
              </button>
              {mobileSection === 'brands' && (
                <div className="pl-4 space-y-1">
                  {navBrands.map((brand) => (
                    <Link
                      key={brand._id}
                      href={`/product?brand=${encodeURIComponent(brand.name)}`}
                      className={`flex items-center gap-2 px-4 py-2 text-sm rounded-lg transition-colors ${currentBrand === brand.name ? 'text-accent-orange bg-accent-orange/10' : 'text-white/60 hover:text-accent-orange'}`}
                      onClick={closeMenu}
                    >
                      {brand.logo ? (
                        <img src={brand.logo} alt={brand.name} className="w-4 h-4 object-contain rounded" />
                      ) : (
                        <span className="w-4 h-4 rounded bg-white/20 flex items-center justify-center text-xs font-bold">{brand.name.charAt(0)}</span>
                      )}
                      {brand.name}
                    </Link>
                  ))}
                </div>
              )}

              <Link href="/contact" className={`px-4 py-3 rounded-lg font-medium transition-all duration-300 ${isActive('/contact') ? 'bg-accent-orange/20 text-accent-orange' : 'text-white/80 hover:bg-white/10 hover:text-white'}`} onClick={closeMenu}>Contact</Link>
              <Link href="/quote" className="bg-accent-orange hover:bg-accent-orange-dark px-4 py-3 rounded-lg transition-colors font-semibold text-center text-white mt-2" onClick={closeMenu}>Get Quote</Link>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
