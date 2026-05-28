'use client';

import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { company } from '../lib/company';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
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
  const [submitStatus, setSubmitStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!consent) {
      setSubmitStatus({
        type: 'error',
        message: 'Please accept the Privacy Policy to submit the form.'
      });
      return;
    }
    setSubmitting(true);
    setSubmitStatus(null);

    try {
      const { contactAPI } = await import('../lib/api');
      const response = await contactAPI.submit({ ...formData, consent: true, consentAt: new Date().toISOString() } as any);

      if (response.success) {
        setSubmitStatus({
          type: 'success',
          message: response.message || 'Thank you for your message. We will get back to you soon!'
        });
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          subject: '',
          message: ''
        });
        setConsent(false);
      }
    } catch (error: any) {
      console.error('Contact form error:', error);
      setSubmitStatus({
        type: 'error',
        message: error.message || 'Failed to submit form. Please try again.'
      });
    } finally {
      setSubmitting(false);
    }
  };

  const inputClasses = "w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-accent-orange/30 focus:border-accent-orange outline-none transition-all duration-300 text-gray-800 placeholder-gray-400 hover:border-gray-300";

  return (
    <>
      <Head>
        <title>Contact Us - Vighnaharta Steel Industries</title>
        <meta
          name="description"
          content="Get in touch with Vighnaharta Steel Industries. Contact us for steel product inquiries, quotes, and support."
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
                <span className="text-sm font-semibold text-accent-orange-light tracking-wider uppercase">Get In Touch</span>
              </div>
              <h1 className="font-display font-black text-5xl md:text-7xl uppercase tracking-tight mb-6">Contact <span className="text-accent-orange">Us</span></h1>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Get in touch with our team for all your steel requirements
              </p>
              <div className="flex justify-center gap-6 text-sm text-gray-300">
                <div className="flex items-center gap-2"><span className="w-2 h-2 bg-green-400 rounded-full"></span> Available Now</div>
                <div className="flex items-center gap-2"><span className="w-2 h-2 bg-accent-orange rounded-full"></span> Quick Response</div>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Contact Cards */}
        <section className="py-8 -mt-10 relative z-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {[
                { icon: '📞', title: 'Call Us', detail: company.phone1, sub: company.hours },
                { icon: '✉️', title: 'Email Us', detail: company.email, sub: 'Reply within 24hrs' },
                { icon: '📍', title: 'Visit Us', detail: `${company.address.city}, ${company.address.state}`, sub: company.address.line2 }
              ].map((item, i) => (
                <div key={i} className="group bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 border border-gray-100 text-center">
                  <div className="text-3xl mb-3 group-hover:scale-125 transition-transform duration-300">{item.icon}</div>
                  <h3 className="text-lg font-bold text-steel-blue mb-1">{item.title}</h3>
                  <p className="text-accent-orange font-semibold text-sm mb-1">{item.detail}</p>
                  <p className="text-gray-400 text-xs">{item.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Information & Form */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              {/* Contact Information */}
              <div>
                <div className="inline-flex items-center gap-2 bg-steel-blue/10 border border-steel-blue/20 rounded-full px-5 py-2 mb-6">
                  <span className="w-2 h-2 bg-steel-blue rounded-full animate-pulse"></span>
                  <span className="text-sm font-semibold text-steel-blue tracking-wider uppercase">Contact Details</span>
                </div>
                <h2 className="font-display font-black text-3xl md:text-5xl uppercase tracking-tight text-steel-blue mb-4">Get in <span className="text-accent-orange">Touch</span></h2>
                <p className="text-gray-600 mb-10 text-lg">We&apos;re here to help. Reach out through any of the channels below.</p>

                <div className="space-y-6">
                  {[
                    {
                      icon: (
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                        </svg>
                      ),
                      title: 'Address',
                      lines: [company.name, `${company.address.line1}, ${company.address.line2}`, company.address.line3, company.address.line4]
                    },
                    {
                      icon: (
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                        </svg>
                      ),
                      title: 'Phone',
                      lines: [company.phone1, `${company.phone2} (Sales)`]
                    },
                    {
                      icon: (
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                        </svg>
                      ),
                      title: 'Email',
                      lines: [company.email]
                    },
                    {
                      icon: (
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                      ),
                      title: 'Business Hours',
                      lines: [company.hours, company.holiday]
                    }
                  ].map((item, index) => (
                    <div key={index} className="group flex items-start gap-4 p-4 rounded-2xl hover:bg-gray-50 transition-colors duration-300">
                      <div className="w-12 h-12 bg-gradient-to-br from-steel-blue to-steel-blue-dark rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300">
                        {item.icon}
                      </div>
                      <div>
                        <h3 className="font-bold text-steel-blue mb-1 text-lg">{item.title}</h3>
                        {item.lines.map((line, i) => (
                          <p key={i} className="text-gray-600 text-sm">{line}</p>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact Form */}
              <div className="relative">
                <div className="bg-white p-10 rounded-3xl shadow-lg border border-gray-100 relative overflow-hidden">
                  {/* Decorative accent */}
                  <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-accent-orange via-accent-orange-light to-accent-orange"></div>

                  <h2 className="font-display font-black text-2xl md:text-3xl uppercase tracking-tight text-steel-blue mb-2">Send us a Message</h2>
                  <p className="text-gray-500 mb-8">Fill out the form and our team will get back to you within 24 hours.</p>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="John Doe"
                          className={inputClasses}
                        />
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="john@company.com"
                          className={inputClasses}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+91 98765 43210"
                          className={inputClasses}
                        />
                      </div>

                      <div>
                        <label htmlFor="company" className="block text-sm font-semibold text-gray-700 mb-2">
                          Company Name
                        </label>
                        <input
                          type="text"
                          id="company"
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          placeholder="Your Company"
                          className={inputClasses}
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-2">
                        Subject *
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        required
                        value={formData.subject}
                        onChange={handleChange}
                        className={inputClasses}
                      >
                        <option value="">Select a subject</option>
                        <option value="general">General Inquiry</option>
                        <option value="quote">Request Quote</option>
                        <option value="product">Product Information</option>
                        <option value="support">Technical Support</option>
                        <option value="partnership">Partnership</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                        Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={5}
                        required
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Please provide details about your requirements..."
                        className={inputClasses + " resize-none"}
                      ></textarea>
                    </div>

                    <div className="flex items-start gap-3 p-4 bg-gray-50 border border-gray-200 rounded-xl">
                      <input
                        type="checkbox"
                        id="consent"
                        checked={consent}
                        onChange={(e) => setConsent(e.target.checked)}
                        className="mt-1 w-4 h-4 accent-accent-orange flex-shrink-0 cursor-pointer"
                        required
                      />
                      <label htmlFor="consent" className="text-sm text-gray-600 leading-relaxed cursor-pointer">
                        I consent to Vighnaharta Steels collecting and processing the personal data I have
                        provided above for the purpose of responding to my enquiry, in accordance with the{' '}
                        <Link href="/privacy" className="text-accent-orange font-semibold underline">
                          Privacy Policy
                        </Link>{' '}
                        and{' '}
                        <Link href="/terms" className="text-accent-orange font-semibold underline">
                          Terms &amp; Conditions
                        </Link>
                        . *
                      </label>
                    </div>

                    {submitStatus && (
                      <div className={`p-4 rounded-xl flex items-center gap-3 ${
                        submitStatus.type === 'success'
                          ? 'bg-green-50 text-green-800 border border-green-200'
                          : 'bg-red-50 text-red-800 border border-red-200'
                      }`}>
                        <span className="text-xl">{submitStatus.type === 'success' ? '✅' : '❌'}</span>
                        {submitStatus.message}
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={submitting || !consent}
                      className="group w-full bg-gradient-to-r from-accent-orange to-accent-orange-dark text-white py-4 px-6 rounded-xl hover:shadow-lg hover:shadow-accent-orange/30 transition-all duration-300 font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 hover:-translate-y-0.5"
                    >
                      {submitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message
                          <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                          </svg>
                        </>
                      )}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}