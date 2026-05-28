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

export default function Terms() {
  return (
    <>
      <Head>
        <title>Terms &amp; Conditions - Vighnaharta Steels</title>
        <meta
          name="description"
          content="Terms & Conditions for using the Vighnaharta Steels website, requesting quotations and purchasing steel products."
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
                Terms &amp; <span className="text-accent-orange">Conditions</span>
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
                  These Terms &amp; Conditions (&quot;Terms&quot;) govern your use of the website
                  operated by <strong>{COMPANY.name}</strong> (&quot;we&quot;, &quot;us&quot;,
                  &quot;our&quot;) and any enquiry, quotation request or purchase of products
                  through the website. By accessing this website you agree to be bound by these
                  Terms. If you do not agree, please do not use this website.
                </p>

                <h2 className="text-2xl font-bold text-steel-blue mt-8 mb-3">1. About Us</h2>
                <p>
                  {COMPANY.name} is a wholesale steel dealer based in Kalyan, Maharashtra, dealing
                  in structural steel, TMT rebars, sheets, plates, pipes and allied steel products.
                </p>
                <ul className="list-disc pl-6 space-y-1">
                  <li><strong>GSTIN:</strong> {COMPANY.gstin}</li>
                  <li><strong>Udyam Registration:</strong> {COMPANY.udyam}</li>
                  <li><strong>Registered Address:</strong> {COMPANY.address}</li>
                </ul>

                <h2 className="text-2xl font-bold text-steel-blue mt-8 mb-3">2. Quotations Are Not Binding Offers</h2>
                <p>
                  <strong>Any quotation, price indication or product information displayed on
                  this website or shared via email is an &quot;invitation to treat&quot; and not a
                  binding offer.</strong> A binding contract of sale is formed only when:
                </p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>You place a confirmed purchase order in writing, and</li>
                  <li>We accept that order in writing and issue a tax invoice / proforma invoice.</li>
                </ul>
                <p>
                  Prices, availability, specifications and delivery dates are subject to change
                  without prior notice and are valid only for the period stated on the quotation
                  (typically 7 days).
                </p>

                <h2 className="text-2xl font-bold text-steel-blue mt-8 mb-3">3. Product Information &amp; Brand References</h2>
                <p>
                  We are an authorised wholesale dealer/stockist of various steel brands. All
                  brand names, trademarks and logos belong to their respective owners. Listing
                  these brands does not imply endorsement by them, and any product specifications
                  are indicative; the manufacturer&apos;s test certificate and mill specifications
                  shall prevail.
                </p>

                <h2 className="text-2xl font-bold text-steel-blue mt-8 mb-3">4. Pricing &amp; Taxes</h2>
                <ul className="list-disc pl-6 space-y-1">
                  <li>All prices, unless expressly stated otherwise, are <strong>exclusive of GST</strong>.</li>
                  <li>Applicable GST will be charged at the rate in force on the date of invoice.</li>
                  <li>Loading, transportation, cutting, bending and handling charges (if any) are billed separately.</li>
                  <li>Steel prices are linked to market rates and may fluctuate; the price on the final invoice will prevail.</li>
                </ul>

                <h2 className="text-2xl font-bold text-steel-blue mt-8 mb-3">5. Payment Terms</h2>
                <p>
                  Unless otherwise agreed in writing, payment is to be made in advance or against
                  proforma invoice prior to dispatch. Cheques are accepted subject to realisation.
                  Delayed payments may attract interest at 1.5% per month or as agreed in the order.
                </p>

                <h2 className="text-2xl font-bold text-steel-blue mt-8 mb-3">6. Delivery</h2>
                <p>
                  Delivery dates communicated by us are estimates only. We shall not be liable for
                  delays caused by transporters, traffic, weather, strikes, government action or
                  any other event beyond our reasonable control (force majeure). Risk in the goods
                  passes to the buyer upon delivery at the agreed location.
                </p>

                <h2 className="text-2xl font-bold text-steel-blue mt-8 mb-3">7. Inspection, Returns &amp; Cancellation</h2>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Goods must be inspected at the time of delivery. Any shortage, damage or specification mismatch must be reported within <strong>48 hours</strong> of delivery, in writing, with photographs.</li>
                  <li>Cut-to-length, bent, customised or job-work items are <strong>not returnable</strong>.</li>
                  <li>Orders once accepted cannot be cancelled without our written consent. Cancellation charges may apply.</li>
                </ul>

                <h2 className="text-2xl font-bold text-steel-blue mt-8 mb-3">8. Warranty &amp; Liability</h2>
                <p>
                  Products carry only the warranty (if any) given by the original manufacturer
                  through their test certificate. We expressly disclaim all other warranties,
                  express or implied, including fitness for a particular purpose. In no event
                  shall our liability exceed the invoice value of the specific goods supplied.
                  We shall not be liable for any indirect, consequential or incidental loss
                  including loss of profit, contract or goodwill.
                </p>

                <h2 className="text-2xl font-bold text-steel-blue mt-8 mb-3">9. Use of the Website</h2>
                <p>You agree not to:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Use the website for any unlawful purpose</li>
                  <li>Submit false or misleading information through forms</li>
                  <li>Attempt to gain unauthorised access to any part of the website, server or database</li>
                  <li>Scrape, copy or republish content without our written permission</li>
                  <li>Introduce viruses, malware or any disruptive code</li>
                </ul>

                <h2 className="text-2xl font-bold text-steel-blue mt-8 mb-3">10. Intellectual Property</h2>
                <p>
                  All content on this website — including logos, text, photographs, design,
                  graphics and code — is owned by or licensed to {COMPANY.name} and is protected
                  under Indian and international copyright and trademark laws. You may not copy,
                  reproduce, modify or distribute any part of it without prior written consent.
                </p>

                <h2 className="text-2xl font-bold text-steel-blue mt-8 mb-3">11. Privacy</h2>
                <p>
                  Your use of this website is also governed by our{' '}
                  <Link href="/privacy" className="text-accent-orange font-semibold">
                    Privacy Policy
                  </Link>{' '}
                  and{' '}
                  <Link href="/cookies" className="text-accent-orange font-semibold">
                    Cookie Policy
                  </Link>
                  , which describe how we handle your personal data.
                </p>

                <h2 className="text-2xl font-bold text-steel-blue mt-8 mb-3">12. Force Majeure</h2>
                <p>
                  Neither party shall be liable for failure to perform any obligation due to
                  events beyond reasonable control including acts of God, war, riots, fire,
                  flood, epidemics, pandemics, lockdowns, strikes, transport disruption or
                  government restrictions.
                </p>

                <h2 className="text-2xl font-bold text-steel-blue mt-8 mb-3">13. Governing Law &amp; Jurisdiction</h2>
                <p>
                  These Terms shall be governed by and construed in accordance with the laws of
                  India. Any dispute arising out of or in connection with these Terms or any
                  transaction shall be subject to the exclusive jurisdiction of the competent
                  courts at <strong>{COMPANY.jurisdiction}</strong>.
                </p>

                <h2 className="text-2xl font-bold text-steel-blue mt-8 mb-3">14. Changes to Terms</h2>
                <p>
                  We reserve the right to modify these Terms at any time. The updated Terms will
                  be posted on this page with a revised &quot;Last updated&quot; date. Continued
                  use of the website constitutes acceptance of the revised Terms.
                </p>

                <h2 className="text-2xl font-bold text-steel-blue mt-8 mb-3">15. Contact</h2>
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
