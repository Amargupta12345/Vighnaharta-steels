'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

const STORAGE_KEY = 'vs-cookie-consent';

type Choice = 'accepted' | 'declined';

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) setVisible(true);
    } catch {
      setVisible(true);
    }
  }, []);

  const setChoice = (choice: Choice) => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ choice, ts: new Date().toISOString() })
      );
    } catch {
      /* ignore */
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie consent"
      className="fixed bottom-0 left-0 right-0 z-[100] p-4 md:p-6 pointer-events-none"
    >
      <div className="max-w-5xl mx-auto bg-white shadow-2xl rounded-2xl border border-gray-200 overflow-hidden pointer-events-auto">
        <div className="h-1 bg-gradient-to-r from-accent-orange via-accent-orange-light to-accent-orange" />
        <div className="p-5 md:p-6 flex flex-col md:flex-row items-start md:items-center gap-4">
          <div className="flex-1">
            <h2 className="font-bold text-steel-blue text-base md:text-lg mb-1 flex items-center gap-2">
              <span aria-hidden>🍪</span> We value your privacy
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              We use strictly necessary cookies to run this website and, with your consent,
              analytics cookies to understand how it&apos;s used. Read our{' '}
              <Link href="/cookies" className="text-accent-orange font-semibold underline">
                Cookie Policy
              </Link>{' '}
              and{' '}
              <Link href="/privacy" className="text-accent-orange font-semibold underline">
                Privacy Policy
              </Link>
              .
            </p>
          </div>
          <div className="flex flex-shrink-0 gap-2 w-full md:w-auto">
            <button
              type="button"
              onClick={() => setChoice('declined')}
              className="flex-1 md:flex-none px-4 py-2.5 text-sm font-semibold text-steel-blue border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"
            >
              Decline
            </button>
            <button
              type="button"
              onClick={() => setChoice('accepted')}
              className="flex-1 md:flex-none px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-accent-orange to-accent-orange-dark rounded-xl hover:shadow-lg hover:shadow-accent-orange/30 transition-all"
            >
              Accept All
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
