import React, { useState } from 'react';
import Head from 'next/head';
import { signIn, getSession } from 'next-auth/react';
import { GetServerSideProps } from 'next';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const res = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (res?.error) {
      setError('Invalid email or password');
    } else {
      window.location.href = '/admin';
    }
  };

  return (
    <>
      <Head>
        <title>Admin Login — Vighnaharta Steel</title>
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-steel-blue via-steel-blue-dark to-steel-blue-900 flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-accent-orange rounded-2xl shadow-xl mb-4">
              <span className="text-white text-3xl font-extrabold">V</span>
            </div>
            <h1 className="text-white text-2xl font-extrabold">Vighnaharta Steel</h1>
            <p className="text-gray-400 text-sm mt-1">Admin Panel</p>
          </div>

          {/* Card */}
          <div className="bg-white rounded-3xl shadow-2xl p-8">
            <h2 className="text-xl font-bold text-steel-blue mb-6">Sign in to continue</h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@vighnahartasteels.com"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-accent-orange focus:ring-2 focus:ring-accent-orange/20 outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-accent-orange focus:ring-2 focus:ring-accent-orange/20 outline-none transition-all"
                />
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-accent-orange to-accent-orange-dark text-white py-3.5 rounded-xl font-semibold hover:shadow-lg hover:shadow-accent-orange/30 transition-all duration-300 disabled:opacity-60 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Signing in...
                  </>
                ) : 'Sign In'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  if (session) return { redirect: { destination: '/admin', permanent: false } };
  return { props: {} };
};
