'use client';

import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { company, fullAddress } from '../lib/company';

const COMPANY = {
  name: company.name,
  email: company.email,
  phone1: company.phone1,
  phone2: company.phone2,
  address: fullAddress(),
  gstin: company.gstin,
  udyam: company.udyam,
  jurisdiction: company.jurisdiction,
};

const LAST_UPDATED = '15 May 2026';

export default function PrivacyPolicy() {
  return (
    <>
      <Head>
        <title>Privacy Policy - Vighnaharta Steels</title>
        <meta
          name="description"
          content="Privacy Policy of Vighnaharta Steels — how we collect, use, store and protect your personal data in compliance with the DPDP Act 2023 and IT Act 2000."
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
                Privacy <span className="text-accent-orange">Policy</span>
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
                  This Privacy Policy explains how <strong>{COMPANY.name}</strong> (&quot;we&quot;, &quot;us&quot;,
                  &quot;our&quot;) collects, uses, discloses and safeguards information about you when you
                  visit our website, fill out our enquiry or quote forms, or otherwise interact
                  with us. We are committed to handling your personal data in accordance with the
                  <strong> Digital Personal Data Protection Act, 2023 (India)</strong>, the
                  <strong> Information Technology Act, 2000</strong> and the rules made thereunder.
                </p>

                <h2 className="text-2xl font-bold text-steel-blue mt-8 mb-3">1. Information We Collect</h2>
                <p>When you submit our contact form, request a quote, or otherwise contact us, we may collect:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Full name</li>
                  <li>Email address</li>
                  <li>Phone number</li>
                  <li>Company / organisation name</li>
                  <li>Delivery address or project location</li>
                  <li>Product requirements, quantity, specifications, expected delivery date</li>
                  <li>Any additional information you choose to share in the message field</li>
                </ul>
                <p>
                  We also automatically collect limited technical data when you visit our website
                  such as your IP address, browser type, device type, pages visited and timestamps.
                  This is used purely for analytics and security.
                </p>

                <h2 className="text-2xl font-bold text-steel-blue mt-8 mb-3">2. Purpose of Collection</h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li>To respond to your enquiry or quotation request</li>
                  <li>To provide quotations, invoices and order-related communication</li>
                  <li>To deliver products and coordinate logistics</li>
                  <li>To comply with statutory obligations under GST, Companies Act and other applicable laws</li>
                  <li>To improve our website, products and customer service</li>
                  <li>To send transactional communication (we do not send unsolicited marketing without consent)</li>
                </ul>

                <h2 className="text-2xl font-bold text-steel-blue mt-8 mb-3">3. Legal Basis &amp; Consent</h2>
                <p>
                  We process your personal data on the basis of your explicit consent, which you
                  provide by submitting our forms after checking the consent checkbox. You may
                  withdraw your consent at any time by writing to us at{' '}
                  <a href={`mailto:${COMPANY.email}`} className="text-accent-orange font-semibold">
                    {COMPANY.email}
                  </a>
                  . Withdrawal does not affect the lawfulness of processing before withdrawal.
                </p>

                <h2 className="text-2xl font-bold text-steel-blue mt-8 mb-3">4. Sharing &amp; Disclosure</h2>
                <p>We do not sell your personal data. We may share it only with:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Logistics and transport partners, strictly for delivering your order</li>
                  <li>Banks and payment processors, where applicable</li>
                  <li>Cloud and hosting providers (e.g., MongoDB Atlas, Cloudinary, Vercel) acting as data processors on our behalf</li>
                  <li>Government / regulatory authorities, where required by law (GST, tax, court order, etc.)</li>
                </ul>

                <h2 className="text-2xl font-bold text-steel-blue mt-8 mb-3">5. Data Retention</h2>
                <p>
                  We retain personal data only for as long as necessary for the purposes set out
                  above, or as required by Indian tax and corporate law (typically 8 years for
                  invoices and transactional records under GST and Income Tax statutes). Enquiry
                  data that does not lead to a transaction is deleted within 24 months unless
                  you request earlier deletion.
                </p>

                <h2 className="text-2xl font-bold text-steel-blue mt-8 mb-3">6. Your Rights (DPDP Act 2023)</h2>
                <p>You have the right to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Access the personal data we hold about you</li>
                  <li>Request correction or update of inaccurate data</li>
                  <li>Request deletion / erasure of your data (subject to statutory retention)</li>
                  <li>Withdraw consent at any time</li>
                  <li>Grievance redressal through our Data Protection contact below</li>
                </ul>
                <p>
                  To exercise any of these rights, email us at{' '}
                  <a href={`mailto:${COMPANY.email}`} className="text-accent-orange font-semibold">
                    {COMPANY.email}
                  </a>{' '}
                  with the subject line &quot;DPDP Request&quot;. We will respond within 30 days.
                </p>

                <h2 className="text-2xl font-bold text-steel-blue mt-8 mb-3">7. Cookies &amp; Tracking</h2>
                <p>
                  We use cookies and similar technologies to operate the website, remember your
                  preferences and analyse traffic. For details, see our{' '}
                  <Link href="/cookies" className="text-accent-orange font-semibold">
                    Cookie Policy
                  </Link>
                  . You can decline non-essential cookies via the consent banner shown on your first visit.
                </p>

                <h2 className="text-2xl font-bold text-steel-blue mt-8 mb-3">8. Security</h2>
                <p>
                  We use reasonable technical and organisational safeguards — HTTPS, access
                  controls, hashed passwords, encrypted database connections — to protect your
                  data. However, no method of transmission over the Internet is 100% secure, and
                  we cannot guarantee absolute security.
                </p>

                <h2 className="text-2xl font-bold text-steel-blue mt-8 mb-3">9. Children</h2>
                <p>
                  Our services are intended for businesses and adults. We do not knowingly collect
                  personal data from individuals under 18 years of age. If you believe a minor has
                  provided us data, please contact us so we can delete it.
                </p>

                <h2 className="text-2xl font-bold text-steel-blue mt-8 mb-3">10. Changes to this Policy</h2>
                <p>
                  We may update this Privacy Policy from time to time. The &quot;Last updated&quot;
                  date at the top of this page indicates the latest revision. Material changes
                  will be highlighted on the website.
                </p>

                <h2 className="text-2xl font-bold text-steel-blue mt-8 mb-3">11. Grievance Officer / Data Protection Contact</h2>
                <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 not-prose">
                  <p className="font-bold text-steel-blue mb-2">{COMPANY.name}</p>
                  <p className="text-sm text-gray-700">{COMPANY.address}</p>
                  <p className="text-sm text-gray-700 mt-2">
                    <strong>Email:</strong>{' '}
                    <a href={`mailto:${COMPANY.email}`} className="text-accent-orange">
                      {COMPANY.email}
                    </a>
                  </p>
                  <p className="text-sm text-gray-700">
                    <strong>Phone:</strong> {COMPANY.phone1} / {COMPANY.phone2}
                  </p>
                  <p className="text-sm text-gray-700 mt-2">
                    <strong>GSTIN:</strong> {COMPANY.gstin} &nbsp;|&nbsp;{' '}
                    <strong>Udyam:</strong> {COMPANY.udyam}
                  </p>
                </div>

                <p className="text-sm text-gray-500 mt-8 italic">
                  This Privacy Policy is governed by the laws of India and the courts of {COMPANY.jurisdiction} shall have exclusive jurisdiction.
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
