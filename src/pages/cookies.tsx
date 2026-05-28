'use client';

import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { company } from '../lib/company';

const COMPANY = {
  name: company.name,
  email: company.email,
};

const LAST_UPDATED = '15 May 2026';

export default function CookiePolicy() {
  return (
    <>
      <Head>
        <title>Cookie Policy - Vighnaharta Steels</title>
        <meta
          name="description"
          content="Cookie Policy of Vighnaharta Steels — types of cookies used, why they are used, and how you can manage them."
        />
      </Head>

      <div className="min-h-screen bg-gray-50">
        <Navbar />

        <section className="pt-32 bg-gradient-to-br from-steel-blue via-steel-blue-dark to-steel-blue-900 text-white py-20 relative overflow-hidden">
          <div className="absolute top-20 right-10 w-64 h-64 bg-accent-orange/10 rounded-full blur-3xl"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-accent-orange/20 backdrop-blur-sm border border-accent-orange/30 rounded-full px-5 py-2 mb-6">
                <span className="w-2 h-2 bg-accent-orange rounded-full animate-pulse"></span>
                <span className="text-sm font-semibold text-accent-orange-light tracking-wider uppercase">Legal</span>
              </div>
              <h1 className="font-display font-black text-4xl md:text-6xl uppercase tracking-tight mb-4">
                Cookie <span className="text-accent-orange">Policy</span>
              </h1>
              <p className="text-gray-300">Last updated: {LAST_UPDATED}</p>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-3xl p-8 md:p-12 border border-gray-100">
              <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-6">

                <p>
                  This Cookie Policy explains how <strong>{COMPANY.name}</strong> uses cookies and
                  similar technologies on our website. It should be read together with our{' '}
                  <Link href="/privacy" className="text-accent-orange font-semibold">
                    Privacy Policy
                  </Link>
                  .
                </p>

                <h2 className="text-2xl font-bold text-steel-blue mt-8 mb-3">1. What Are Cookies?</h2>
                <p>
                  Cookies are small text files placed on your device when you visit a website.
                  They help the site remember your preferences, keep you signed in, and understand
                  how the site is being used.
                </p>

                <h2 className="text-2xl font-bold text-steel-blue mt-8 mb-3">2. Types of Cookies We Use</h2>

                <div className="overflow-x-auto not-prose">
                  <table className="w-full text-sm border border-gray-200 rounded-xl overflow-hidden">
                    <thead className="bg-steel-blue text-white">
                      <tr>
                        <th className="text-left p-3 font-semibold">Type</th>
                        <th className="text-left p-3 font-semibold">Purpose</th>
                        <th className="text-left p-3 font-semibold">Required?</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      <tr>
                        <td className="p-3 font-semibold text-steel-blue">Strictly Necessary</td>
                        <td className="p-3">Enable core functionality such as session security, form submission, admin login.</td>
                        <td className="p-3">Yes</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-semibold text-steel-blue">Preference</td>
                        <td className="p-3">Remember your settings such as cookie consent choice.</td>
                        <td className="p-3">No</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-semibold text-steel-blue">Analytics</td>
                        <td className="p-3">Help us understand traffic, popular pages, device types (e.g., Google Analytics if enabled).</td>
                        <td className="p-3">No (opt-in)</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-semibold text-steel-blue">Marketing</td>
                        <td className="p-3">Currently not used. If enabled in the future, you will be asked for consent.</td>
                        <td className="p-3">No (opt-in)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <h2 className="text-2xl font-bold text-steel-blue mt-8 mb-3">3. Third-Party Services</h2>
                <p>
                  Our website is hosted and supported by services that may set their own cookies,
                  including:
                </p>
                <ul className="list-disc pl-6 space-y-1">
                  <li><strong>Vercel</strong> — hosting &amp; CDN</li>
                  <li><strong>Cloudinary</strong> — image delivery</li>
                  <li><strong>Google Fonts</strong> — typography</li>
                  <li><strong>Google Analytics</strong> (if enabled) — anonymised usage statistics</li>
                </ul>

                <h2 className="text-2xl font-bold text-steel-blue mt-8 mb-3">4. How to Manage Cookies</h2>
                <p>
                  When you first visit our website, a cookie banner gives you the choice to
                  <strong> Accept</strong> or <strong>Decline</strong> non-essential cookies. You
                  may change your preference at any time by clearing your browser storage for this
                  site or by writing to{' '}
                  <a href={`mailto:${COMPANY.email}`} className="text-accent-orange font-semibold">
                    {COMPANY.email}
                  </a>
                  .
                </p>
                <p>
                  Most browsers also let you block or delete cookies from their settings. Note that
                  blocking strictly necessary cookies may break parts of the website.
                </p>

                <h2 className="text-2xl font-bold text-steel-blue mt-8 mb-3">5. Changes</h2>
                <p>
                  We may update this Cookie Policy from time to time. Any changes will be posted
                  on this page with a revised &quot;Last updated&quot; date.
                </p>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
