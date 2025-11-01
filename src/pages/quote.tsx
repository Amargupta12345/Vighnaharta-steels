'use client';

import React, { useState } from 'react';
import Head from 'next/head';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

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
    setSubmitting(true);
    setSubmitStatus(null);

    try {
      const { quoteAPI } = await import('../lib/api');
      const response = await quoteAPI.submit(formData);

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
        <section className="bg-gradient-to-r from-gray-900 to-blue-900 text-white py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">Get Quote</h1>
              <p className="text-xl text-gray-300 mb-8">
                Request a customized quote for your steel requirements
              </p>
            </div>
          </div>
        </section>

        {/* Quote Form */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="bg-white shadow-lg rounded-lg p-8">
                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">Request a Quote</h2>
                  <p className="text-gray-600">
                    Fill out the form below with your requirements, and our sales team will provide you
                    with a competitive quote within 24 hours.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Personal Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                      />
                    </div>

                    <div>
                      <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                        Company Name
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                      />
                    </div>
                  </div>

                  {/* Product Information */}
                  <div>
                    <label htmlFor="productType" className="block text-sm font-medium text-gray-700 mb-2">
                      Product Type *
                    </label>
                    <select
                      id="productType"
                      name="productType"
                      required
                      value={formData.productType}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                    >
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
                    <label htmlFor="specifications" className="block text-sm font-medium text-gray-700 mb-2">
                      Product Specifications *
                    </label>
                    <textarea
                      id="specifications"
                      name="specifications"
                      rows={4}
                      required
                      value={formData.specifications}
                      onChange={handleChange}
                      placeholder="Please specify dimensions, grade, quantity, and any special requirements..."
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    ></textarea>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-2">
                        Quantity Required *
                      </label>
                      <input
                        type="text"
                        id="quantity"
                        name="quantity"
                        required
                        value={formData.quantity}
                        onChange={handleChange}
                        placeholder="e.g., 10 tons, 500 pieces, etc."
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                      />
                    </div>

                    <div>
                      <label htmlFor="deliveryDate" className="block text-sm font-medium text-gray-700 mb-2">
                        Required Delivery Date
                      </label>
                      <input
                        type="date"
                        id="deliveryDate"
                        name="deliveryDate"
                        value={formData.deliveryDate}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="deliveryLocation" className="block text-sm font-medium text-gray-700 mb-2">
                      Delivery Location *
                    </label>
                    <input
                      type="text"
                      id="deliveryLocation"
                      name="deliveryLocation"
                      required
                      value={formData.deliveryLocation}
                      onChange={handleChange}
                      placeholder="Complete delivery address"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Additional Requirements
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Any additional information or special requirements..."
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    ></textarea>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="font-semibold text-gray-900 mb-2">What happens next?</h3>
                    <ul className="text-gray-600 space-y-1">
                      <li>• Our sales team will review your requirements</li>
                      <li>• You'll receive a detailed quote within 24 hours</li>
                      <li>• We'll schedule a call to discuss your project</li>
                      <li>• We'll provide delivery timeline and payment terms</li>
                    </ul>
                  </div>

                  {submitStatus && (
                    <div className={`p-4 rounded-lg ${
                      submitStatus.type === 'success'
                        ? 'bg-green-50 text-green-800 border border-green-200'
                        : 'bg-red-50 text-red-800 border border-red-200'
                    }`}>
                      {submitStatus.message}
                      {submitStatus.quoteId && (
                        <p className="mt-2 text-sm">Quote ID: <strong>{submitStatus.quoteId}</strong></p>
                      )}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-medium text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {submitting ? 'Submitting...' : 'Request Quote'}
                  </button>
                </form>
              </div>

              {/* Contact Information */}
              <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-blue-50 rounded-lg">
                  <svg className="w-8 h-8 text-blue-600 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                  </svg>
                  <h3 className="font-semibold text-gray-900">Call Us</h3>
                  <p className="text-gray-600 text-sm">+91 98765 43210</p>
                </div>

                <div className="text-center p-6 bg-blue-50 rounded-lg">
                  <svg className="w-8 h-8 text-blue-600 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                  </svg>
                  <h3 className="font-semibold text-gray-900">Email Us</h3>
                  <p className="text-gray-600 text-sm">sales@vighnahartasteel.com</p>
                </div>

                <div className="text-center p-6 bg-blue-50 rounded-lg">
                  <svg className="w-8 h-8 text-blue-600 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  <h3 className="font-semibold text-gray-900">Response Time</h3>
                  <p className="text-gray-600 text-sm">Within 24 hours</p>
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


