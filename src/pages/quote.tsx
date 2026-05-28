'use client';

import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { company } from '../lib/company';

export default function Quote() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    productType: '',
    specifications: '',
    quantity: '',
    deliveryDate: '',
    deliveryLocation: '',
    message: ''
  });
  const [consent, setConsent] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const [submitting, setSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ type: 'success' | 'error'; message: string; quoteId?: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!consent) {
      setSubmitStatus({
        type: 'error',
        message: 'Please accept the Privacy Policy and quote terms to submit the request.'
      });
      return;
    }
    setSubmitting(true);
    setSubmitStatus(null);

    try {
      const { quoteAPI } = await import('../lib/api');
      const response = await quoteAPI.submit({ ...formData, consent: true, consentAt: new Date().toISOString() } as any);

      if (response.success) {
        setSubmitStatus({
          type: 'success',
          message: response.message || 'Thank you for your quote request. Our sales team will contact you within 24 hours!',
          quoteId: response.data?.quoteId
        });
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          productType: '',
          specifications: '',
          quantity: '',
          deliveryDate: '',
          deliveryLocation: '',
          message: ''
        });
        setConsent(false);
      }
    } catch (error: any) {
      console.error('Quote submission error:', error);
      setSubmitStatus({
        type: 'error',
        message: error.message || 'Failed to submit quote request. Please try again.'
      });
    } finally {
      setSubmitting(false);
    }
  };

  const inputClasses = "w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-accent-orange/30 focus:border-accent-orange outline-none transition-all duration-300 text-gray-800 placeholder-gray-400 hover:border-gray-300";

  return (
    <>
      <Head>
        <title>Get Quote - Vighnaharta Steel Industries</title>
        <meta
          name="description"
          content="Request a customized quote for your steel requirements. Get competitive pricing from Vighnaharta Steel Industries."
        />
      </Head>

      <div className="min-h-screen">
        <Navbar />

        {/* Hero Section */}
        <section className="pt-32 bg-gradient-to-br from-steel-blue via-steel-blue-dark to-steel-blue-900 text-white py-28 relative overflow-hidden">
          <div className="absolute top-20 right-10 w-64 h-64 bg-accent-orange/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-20 w-48 h-48 bg-white/5 rounded-full blur-3xl"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <div className="animate-fade-in inline-flex items-center gap-2 bg-accent-orange/20 backdrop-blur-sm border border-accent-orange/30 rounded-full px-5 py-2 mb-6">
                <span className="w-2 h-2 bg-accent-orange rounded-full animate-pulse"></span>
                <span className="text-sm font-semibold text-accent-orange-light tracking-wider uppercase">Request Pricing</span>
              </div>
              <h1 className="font-display font-black text-5xl md:text-7xl uppercase tracking-tight mb-6">Get a <span className="text-accent-orange">Quote</span></h1>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Request a customized quote for your steel requirements
              </p>
              <div className="flex justify-center gap-6 text-sm text-gray-300">
                <div className="flex items-center gap-2"><span className="w-2 h-2 bg-green-400 rounded-full"></span> Free Quotation</div>
                <div className="flex items-center gap-2"><span className="w-2 h-2 bg-accent-orange rounded-full"></span> 24hr Response</div>
              </div>
            </div>
          </div>
        </section>

        {/* Quote Form */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="bg-white shadow-lg rounded-3xl p-8 md:p-12 border border-gray-100 relative overflow-hidden">
                {/* Accent bar */}
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-accent-orange via-accent-orange-light to-accent-orange"></div>

                <div className="mb-10">
                  <h2 className="font-display font-black text-3xl md:text-4xl uppercase tracking-tight text-steel-blue mb-3">Request a Quote</h2>
                  <p className="text-gray-500 text-lg">
                    Fill out the form below with your requirements, and our sales team will provide you
                    with a competitive quote within 24 hours.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Section 1: Your Details */}
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-8 h-8 bg-gradient-to-br from-steel-blue to-steel-blue-dark rounded-lg flex items-center justify-center text-white text-sm font-bold shadow">1</div>
                      <h3 className="text-lg font-bold text-steel-blue">Your Details</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pl-11">
                      <div>
                        <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">Full Name *</label>
                        <input type="text" id="name" name="name" required value={formData.name} onChange={handleChange} placeholder="John Doe" className={inputClasses} />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">Email Address *</label>
                        <input type="email" id="email" name="email" required value={formData.email} onChange={handleChange} placeholder="john@company.com" className={inputClasses} />
                      </div>
                      <div>
                        <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">Phone Number *</label>
                        <input type="tel" id="phone" name="phone" required value={formData.phone} onChange={handleChange} placeholder="+91 98765 43210" className={inputClasses} />
                      </div>
                      <div>
                        <label htmlFor="company" className="block text-sm font-semibold text-gray-700 mb-2">Company Name</label>
                        <input type="text" id="company" name="company" value={formData.company} onChange={handleChange} placeholder="Your Company" className={inputClasses} />
                      </div>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="border-t border-gray-100"></div>

                  {/* Section 2: Product Requirements */}
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-8 h-8 bg-gradient-to-br from-accent-orange to-accent-orange-dark rounded-lg flex items-center justify-center text-white text-sm font-bold shadow">2</div>
                      <h3 className="text-lg font-bold text-steel-blue">Product Requirements</h3>
                    </div>
                    <div className="space-y-5 pl-11">
                      <div>
                        <label htmlFor="productType" className="block text-sm font-semibold text-gray-700 mb-2">Product Type *</label>
                        <select id="productType" name="productType" required value={formData.productType} onChange={handleChange} className={inputClasses}>
                          <option value="">Select product type</option>
                          <option value="steel-beams">Steel I-Beams</option>
                          <option value="steel-rods">Steel Rods (TMT Bars)</option>
                          <option value="steel-sheets">Steel Sheets</option>
                          <option value="steel-pipes">Steel Pipes</option>
                          <option value="steel-angles">Steel Angles</option>
                          <option value="steel-channels">Steel Channels</option>
                          <option value="steel-plates">Steel Plates</option>
                          <option value="steel-wire">Steel Wire</option>
                          <option value="custom">Custom Product</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor="specifications" className="block text-sm font-semibold text-gray-700 mb-2">Product Specifications *</label>
                        <textarea id="specifications" name="specifications" rows={4} required value={formData.specifications} onChange={handleChange} placeholder="Please specify dimensions, grade, quantity, and any special requirements..." className={inputClasses + " resize-none"}></textarea>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                          <label htmlFor="quantity" className="block text-sm font-semibold text-gray-700 mb-2">Quantity Required *</label>
                          <input type="text" id="quantity" name="quantity" required value={formData.quantity} onChange={handleChange} placeholder="e.g., 10 tons, 500 pieces" className={inputClasses} />
                        </div>
                        <div>
                          <label htmlFor="deliveryDate" className="block text-sm font-semibold text-gray-700 mb-2">Required Delivery Date</label>
                          <input type="date" id="deliveryDate" name="deliveryDate" value={formData.deliveryDate} onChange={handleChange} className={inputClasses} />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="border-t border-gray-100"></div>

                  {/* Section 3: Delivery & Notes */}
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-8 h-8 bg-gradient-to-br from-steel-blue to-steel-blue-dark rounded-lg flex items-center justify-center text-white text-sm font-bold shadow">3</div>
                      <h3 className="text-lg font-bold text-steel-blue">Delivery & Additional Info</h3>
                    </div>
                    <div className="space-y-5 pl-11">
                      <div>
                        <label htmlFor="deliveryLocation" className="block text-sm font-semibold text-gray-700 mb-2">Delivery Location *</label>
                        <input type="text" id="deliveryLocation" name="deliveryLocation" required value={formData.deliveryLocation} onChange={handleChange} placeholder="Complete delivery address" className={inputClasses} />
                      </div>
                      <div>
                        <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">Additional Requirements</label>
                        <textarea id="message" name="message" rows={3} value={formData.message} onChange={handleChange} placeholder="Any additional information or special requirements..." className={inputClasses + " resize-none"}></textarea>
                      </div>
                    </div>
                  </div>

                  {/* What happens next */}
                  <div className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-2xl border border-gray-100">
                    <h3 className="font-bold text-steel-blue mb-3 flex items-center gap-2">
                      <span className="text-lg">📋</span> What happens next?
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {[
                        { icon: '✅', text: 'Our sales team reviews your requirements' },
                        { icon: '📧', text: 'Detailed quote within 24 hours' },
                        { icon: '📞', text: 'Call to discuss your project' },
                        { icon: '🚚', text: 'Delivery timeline & payment terms' }
                      ].map((item, i) => (
                        <div key={i} className="flex items-center gap-2 text-gray-600 text-sm">
                          <span>{item.icon}</span> {item.text}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Non-binding disclaimer */}
                  <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 text-sm text-amber-900">
                    <p className="font-semibold mb-1 flex items-center gap-2">
                      <span>ℹ️</span> Important Notice
                    </p>
                    <p>
                      This is a <strong>request for quotation</strong> and not a confirmed order. Prices,
                      availability and delivery dates are indicative, subject to change based on market rates
                      and stock, and become binding only upon issue of our proforma / tax invoice. All prices
                      are exclusive of GST and applicable transport / handling charges. Please review our{' '}
                      <Link href="/terms" className="font-semibold underline">
                        Terms &amp; Conditions
                      </Link>
                      .
                    </p>
                  </div>

                  {/* Consent */}
                  <div className="flex items-start gap-3 p-4 bg-gray-50 border border-gray-200 rounded-2xl">
                    <input
                      type="checkbox"
                      id="consent"
                      checked={consent}
                      onChange={(e) => setConsent(e.target.checked)}
                      className="mt-1 w-4 h-4 accent-accent-orange flex-shrink-0 cursor-pointer"
                      required
                    />
                    <label htmlFor="consent" className="text-sm text-gray-600 leading-relaxed cursor-pointer">
                      I agree to Vighnaharta Steels processing my personal data for the purpose of preparing
                      and sending a quotation, and I have read and accept the{' '}
                      <Link href="/privacy" className="text-accent-orange font-semibold underline">
                        Privacy Policy
                      </Link>{' '}
                      and{' '}
                      <Link href="/terms" className="text-accent-orange font-semibold underline">
                        Terms &amp; Conditions
                      </Link>
                      . I understand this is a request for quotation, not a binding order. *
                    </label>
                  </div>

                  {submitStatus && (
                    <div className={`p-5 rounded-2xl flex items-start gap-3 ${
                      submitStatus.type === 'success'
                        ? 'bg-green-50 text-green-800 border border-green-200'
                        : 'bg-red-50 text-red-800 border border-red-200'
                    }`}>
                      <span className="text-xl flex-shrink-0">{submitStatus.type === 'success' ? '✅' : '❌'}</span>
                      <div>
                        {submitStatus.message}
                        {submitStatus.quoteId && (
                          <p className="mt-2 text-sm">Quote ID: <strong>{submitStatus.quoteId}</strong></p>
                        )}
                      </div>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={submitting || !consent}
                    className="group w-full bg-gradient-to-r from-accent-orange to-accent-orange-dark text-white py-4 px-6 rounded-xl hover:shadow-lg hover:shadow-accent-orange/30 transition-all duration-300 font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 hover:-translate-y-0.5"
                  >
                    {submitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Submitting...
                      </>
                    ) : (
                      <>
                        Request Quote
                        <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                        </svg>
                      </>
                    )}
                  </button>
                </form>
              </div>

              {/* Bottom Info Cards */}
              <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { icon: '📞', title: 'Call Us', detail: company.phone1, sub: company.hours },
                  { icon: '✉️', title: 'Email Us', detail: company.email, sub: 'Quick response guaranteed' },
                  { icon: '⏰', title: 'Response Time', detail: 'Within 24 Hours', sub: 'Business days' }
                ].map((item, i) => (
                  <div key={i} className="group text-center p-6 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-500">
                    <div className="text-3xl mb-3 group-hover:scale-125 transition-transform duration-300">{item.icon}</div>
                    <h3 className="font-bold text-steel-blue mb-1">{item.title}</h3>
                    <p className="text-accent-orange font-semibold text-sm">{item.detail}</p>
                    <p className="text-gray-400 text-xs mt-1">{item.sub}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
