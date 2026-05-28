import React, { useEffect, useState } from 'react';
import AdminLayout from '../../../components/admin/AdminLayout';

interface Contact {
  _id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  subject: string;
  message: string;
  status: 'pending' | 'read' | 'replied';
  createdAt: string;
}

const STATUS_COLORS: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-800',
  read: 'bg-blue-100 text-blue-800',
  replied: 'bg-green-100 text-green-800',
};

export default function AdminContacts() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Contact | null>(null);
  const [filter, setFilter] = useState('all');

  const fetchAll = () => {
    setLoading(true);
    fetch('/api/admin/contacts')
      .then((r) => r.json())
      .then((d) => { if (d.success) setContacts(d.data); })
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchAll(); }, []);

  const updateStatus = async (id: string, status: string) => {
    await fetch('/api/admin/contacts', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id, status }) });
    fetchAll();
    if (selected?._id === id) setSelected((s) => s ? { ...s, status: status as Contact['status'] } : null);
  };

  const filtered = filter === 'all' ? contacts : contacts.filter((c) => c.status === filter);

  return (
    <AdminLayout title="Contact Submissions">
      <div className="space-y-4">
        {/* Filter tabs */}
        <div className="flex gap-2">
          {['all', 'pending', 'read', 'replied'].map((f) => (
            <button key={f} onClick={() => setFilter(f)} className={`px-4 py-2 rounded-xl text-sm font-semibold capitalize transition-colors ${filter === f ? 'bg-steel-blue text-white' : 'bg-white text-gray-600 border border-gray-200 hover:border-steel-blue'}`}>
              {f === 'all' ? `All (${contacts.length})` : `${f} (${contacts.filter((c) => c.status === f).length})`}
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
                <div className="text-4xl mb-3">✉️</div>
                <p>No {filter !== 'all' ? filter : ''} contacts</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-50">
                {filtered.map((c) => (
                  <div
                    key={c._id}
                    onClick={() => { setSelected(c); if (c.status === 'pending') updateStatus(c._id, 'read'); }}
                    className={`px-5 py-4 cursor-pointer hover:bg-gray-50 transition-colors ${selected?._id === c._id ? 'bg-accent-orange/5 border-l-4 border-accent-orange' : ''}`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold text-sm text-gray-800">{c.name}</span>
                          {c.company && <span className="text-xs text-gray-500">· {c.company}</span>}
                        </div>
                        <div className="text-xs text-gray-600 truncate font-medium">{c.subject}</div>
                        <div className="text-xs text-gray-400 mt-1">{new Date(c.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</div>
                      </div>
                      <span className={`text-xs px-2.5 py-1 rounded-lg font-medium flex-shrink-0 ${STATUS_COLORS[c.status]}`}>{c.status}</span>
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
                {selected.phone && <div><span className="text-gray-500 text-xs block">Phone</span><a href={`tel:${selected.phone}`} className="text-gray-800">{selected.phone}</a></div>}
                <div><span className="text-gray-500 text-xs block">Subject</span><span className="text-gray-800 font-medium">{selected.subject}</span></div>
                <div><span className="text-gray-500 text-xs block">Date</span><span className="text-gray-800">{new Date(selected.createdAt).toLocaleDateString('en-IN')}</span></div>
              </div>

              <div>
                <span className="text-gray-500 text-xs block mb-2">Message</span>
                <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-700 leading-relaxed">{selected.message}</div>
              </div>

              <div>
                <span className="text-gray-500 text-xs block mb-2">Update Status</span>
                <div className="flex gap-2">
                  {(['pending', 'read', 'replied'] as const).map((s) => (
                    <button key={s} onClick={() => updateStatus(selected._id, s)} className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-colors ${selected.status === s ? STATUS_COLORS[s] : 'border border-gray-200 text-gray-600 hover:border-gray-400'}`}>
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <a href={`mailto:${selected.email}?subject=Re: ${selected.subject}`} className="w-full bg-steel-blue hover:bg-steel-blue-dark text-white py-2.5 rounded-xl text-sm font-semibold transition-colors flex items-center justify-center gap-2">
                Reply via Email
              </a>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
