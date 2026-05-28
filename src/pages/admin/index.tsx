import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import AdminLayout from '../../components/admin/AdminLayout';

interface Stats {
  products: number;
  testimonials: number;
  contacts: number;
  pendingContacts: number;
  quotes: number;
  pendingQuotes: number;
}

interface RecentItem {
  _id: string;
  name: string;
  email?: string;
  company?: string;
  subject?: string;
  productType?: string;
  status: string;
  createdAt: string;
}

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-800',
  read: 'bg-blue-100 text-blue-800',
  replied: 'bg-green-100 text-green-800',
  reviewed: 'bg-blue-100 text-blue-800',
  quoted: 'bg-purple-100 text-purple-800',
  accepted: 'bg-green-100 text-green-800',
  rejected: 'bg-red-100 text-red-800',
};

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [recentContacts, setRecentContacts] = useState<RecentItem[]>([]);
  const [recentQuotes, setRecentQuotes] = useState<RecentItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/dashboard')
      .then((r) => r.json())
      .then((d) => {
        if (d.success) {
          setStats(d.data.stats);
          setRecentContacts(d.data.recentContacts);
          setRecentQuotes(d.data.recentQuotes);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  const statCards = stats
    ? [
        { label: 'Total Products', value: stats.products, color: 'from-steel-blue to-steel-blue-dark', icon: '📦', href: '/admin/products' },
        { label: 'Testimonials', value: stats.testimonials, color: 'from-purple-500 to-purple-700', icon: '💬', href: '/admin/testimonials' },
        { label: 'New Contacts', value: stats.pendingContacts, color: 'from-accent-orange to-accent-orange-dark', icon: '✉️', href: '/admin/contacts' },
        { label: 'New Quotes', value: stats.pendingQuotes, color: 'from-green-500 to-green-700', icon: '📋', href: '/admin/quotes' },
      ]
    : [];

  return (
    <AdminLayout title="Dashboard">
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="w-8 h-8 border-2 border-accent-orange border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <div className="space-y-8">
          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {statCards.map((card) => (
              <Link key={card.label} href={card.href} className="group bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200">
                <div className={`w-10 h-10 bg-gradient-to-br ${card.color} rounded-xl flex items-center justify-center text-lg mb-3`}>
                  {card.icon}
                </div>
                <div className="text-2xl font-extrabold text-steel-blue">{card.value}</div>
                <div className="text-sm text-gray-500 mt-1">{card.label}</div>
              </Link>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Contacts */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
                <h2 className="font-bold text-steel-blue">Recent Contacts</h2>
                <Link href="/admin/contacts" className="text-xs text-accent-orange hover:underline">View all</Link>
              </div>
              <div className="divide-y divide-gray-50">
                {recentContacts.length === 0 ? (
                  <p className="text-gray-400 text-sm p-5">No contacts yet</p>
                ) : recentContacts.map((c) => (
                  <div key={c._id} className="px-5 py-3 flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <div className="font-semibold text-sm text-gray-800 truncate">{c.name}</div>
                      <div className="text-xs text-gray-500 truncate">{c.subject}</div>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-lg font-medium flex-shrink-0 ${statusColors[c.status] || 'bg-gray-100 text-gray-600'}`}>
                      {c.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Quotes */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
                <h2 className="font-bold text-steel-blue">Recent Quotes</h2>
                <Link href="/admin/quotes" className="text-xs text-accent-orange hover:underline">View all</Link>
              </div>
              <div className="divide-y divide-gray-50">
                {recentQuotes.length === 0 ? (
                  <p className="text-gray-400 text-sm p-5">No quote requests yet</p>
                ) : recentQuotes.map((q) => (
                  <div key={q._id} className="px-5 py-3 flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <div className="font-semibold text-sm text-gray-800 truncate">{q.name}</div>
                      <div className="text-xs text-gray-500 truncate">{q.productType}</div>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-lg font-medium flex-shrink-0 ${statusColors[q.status] || 'bg-gray-100 text-gray-600'}`}>
                      {q.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick actions */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
            <h2 className="font-bold text-steel-blue mb-4">Quick Actions</h2>
            <div className="flex flex-wrap gap-3">
              <Link href="/admin/products/add" className="bg-accent-orange hover:bg-accent-orange-dark text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors">
                + Add Product
              </Link>
              <Link href="/admin/testimonials/add" className="bg-steel-blue hover:bg-steel-blue-dark text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors">
                + Add Testimonial
              </Link>
              <Link href="/admin/contacts" className="border-2 border-gray-200 text-gray-600 hover:border-accent-orange hover:text-accent-orange px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors">
                View Contacts
              </Link>
              <Link href="/admin/quotes" className="border-2 border-gray-200 text-gray-600 hover:border-accent-orange hover:text-accent-orange px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors">
                View Quotes
              </Link>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
