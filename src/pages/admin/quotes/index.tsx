import React, { useEffect, useState } from 'react';
import AdminLayout from '../../../components/admin/AdminLayout';

interface Quote {
  _id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  productType: string;
  specifications: string;
  quantity: string;
  deliveryDate: string;
  deliveryLocation: string;
  message: string;
  status: 'pending' | 'reviewed' | 'quoted' | 'accepted' | 'rejected';
  createdAt: string;
}

const STATUS_COLORS: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-800',
  reviewed: 'bg-blue-100 text-blue-800',
  quoted: 'bg-purple-100 text-purple-800',
  accepted: 'bg-green-100 text-green-800',
  rejected: 'bg-red-100 text-red-800',
};

export default function AdminQuotes() {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Quote | null>(null);
  const [filter, setFilter] = useState('all');

  const fetchAll = () => {
    setLoading(true);
    fetch('/api/admin/quotes')
      .then((r) => r.json())
      .then((d) => { if (d.success) setQuotes(d.data); })
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchAll(); }, []);

  const updateStatus = async (id: string, status: string) => {
    await fetch('/api/admin/quotes', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id, status }) });
    fetchAll();
    if (selected?._id === id) setSelected((s) => s ? { ...s, status: status as Quote['status'] } : null);
  };

  const filtered = filter === 'all' ? quotes : quotes.filter((q) => q.status === filter);

  return (
    <AdminLayout title="Quote Requests">
      <div className="space-y-4">
        {/* Filter tabs */}
        <div className="flex flex-wrap gap-2">
          {['all', 'pending', 'reviewed', 'quoted', 'accepted', 'rejected'].map((f) => (
            <button key={f} onClick={() => setFilter(f)} className={`px-4 py-2 rounded-xl text-sm font-semibold capitalize transition-colors ${filter === f ? 'bg-steel-blue text-white' : 'bg-white text-gray-600 border border-gray-200 hover:border-steel-blue'}`}>
              {f === 'all' ? `All (${quotes.length})` : `${f} (${quotes.filter((q) => q.status === f).length})`}
            </button>
          ))}
        </div>

        <div className={`grid gap-4 ${selected ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'}`}>
          {/* List */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            {loading ? (
              <div className="flex items-center justify-center h-48">
                <div className="w-8 h-8 border-2 border-accent-orange border-t-transparent rounded-full animate-spin" />
              </div>
            ) : filtered.length === 0 ? (
              <div className="text-center py-16 text-gray-400">
                <div className="text-4xl mb-3">📋</div>
                <p>No {filter !== 'all' ? filter : ''} quote requests</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-50">
                {filtered.map((q) => (
                  <div key={q._id} onClick={() => setSelected(q)} className={`px-5 py-4 cursor-pointer hover:bg-gray-50 transition-colors ${selected?._id === q._id ? 'bg-accent-orange/5 border-l-4 border-accent-orange' : ''}`}>
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold text-sm text-gray-800">{q.name}</span>
                          {q.company && <span className="text-xs text-gray-500">· {q.company}</span>}
                        </div>
                        <div className="text-xs text-gray-700 font-medium">{q.productType} — {q.quantity}</div>
                        <div className="text-xs text-gray-400 mt-1">{new Date(q.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</div>
                      </div>
                      <span className={`text-xs px-2.5 py-1 rounded-lg font-medium flex-shrink-0 ${STATUS_COLORS[q.status]}`}>{q.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Detail panel */}
          {selected && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-4 h-fit">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="font-bold text-steel-blue text-lg">{selected.name}</h2>
                  {selected.company && <p className="text-sm text-gray-500">{selected.company}</p>}
                </div>
                <button onClick={() => setSelected(null)} className="text-gray-400 hover:text-gray-600">✕</button>
              </div>

              <div className="grid grid-cols-2 gap-3 text-sm">
                <div><span className="text-gray-500 text-xs block">Email</span><a href={`mailto:${selected.email}`} className="text-accent-orange hover:underline">{selected.email}</a></div>
                <div><span className="text-gray-500 text-xs block">Phone</span><a href={`tel:${selected.phone}`} className="text-gray-800">{selected.phone}</a></div>
                <div><span className="text-gray-500 text-xs block">Product</span><span className="text-gray-800 font-medium">{selected.productType}</span></div>
                <div><span className="text-gray-500 text-xs block">Quantity</span><span className="text-gray-800 font-medium">{selected.quantity}</span></div>
                {selected.deliveryDate && <div><span className="text-gray-500 text-xs block">Delivery Date</span><span className="text-gray-800">{selected.deliveryDate}</span></div>}
                <div><span className="text-gray-500 text-xs block">Location</span><span className="text-gray-800">{selected.deliveryLocation}</span></div>
              </div>

              <div>
                <span className="text-gray-500 text-xs block mb-2">Specifications</span>
                <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-700 leading-relaxed">{selected.specifications}</div>
              </div>

              {selected.message && (
                <div>
                  <span className="text-gray-500 text-xs block mb-2">Additional Notes</span>
                  <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-700">{selected.message}</div>
                </div>
              )}

              <div>
                <span className="text-gray-500 text-xs block mb-2">Update Status</span>
                <div className="flex flex-wrap gap-2">
                  {(['pending', 'reviewed', 'quoted', 'accepted', 'rejected'] as const).map((s) => (
                    <button key={s} onClick={() => updateStatus(selected._id, s)} className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-colors ${selected.status === s ? STATUS_COLORS[s] : 'border border-gray-200 text-gray-600 hover:border-gray-400'}`}>
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <a href={`mailto:${selected.email}?subject=Quote for ${selected.productType}&body=Dear ${selected.name},%0A%0AThank you for your quote request for ${selected.productType}.`} className="w-full bg-steel-blue hover:bg-steel-blue-dark text-white py-2.5 rounded-xl text-sm font-semibold transition-colors flex items-center justify-center gap-2">
                Send Quote via Email
              </a>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
