import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import AdminLayout from '../../../components/admin/AdminLayout';

interface Testimonial {
  _id: string;
  name: string;
  designation: string;
  company: string;
  rating: number;
  comment: string;
  location: string;
  featured: boolean;
  approved: boolean;
  date: string;
}

export default function AdminTestimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Testimonial | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const emptyForm = { name: '', designation: '', company: '', rating: 5, comment: '', location: '', project: '', featured: false, approved: true };
  const [form, setForm] = useState<typeof emptyForm>(emptyForm);

  const fetchAll = () => {
    setLoading(true);
    fetch('/api/admin/testimonials')
      .then((r) => r.json())
      .then((d) => { if (d.success) setTestimonials(d.data); })
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchAll(); }, []);

  const openAdd = () => { setForm(emptyForm); setEditing(null); setShowForm(true); };
  const openEdit = (t: Testimonial) => {
    setForm({ name: t.name, designation: t.designation, company: t.company, rating: t.rating, comment: t.comment, location: t.location, project: '', featured: t.featured, approved: t.approved });
    setEditing(t);
    setShowForm(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const url = editing ? `/api/admin/testimonials/${editing._id}` : '/api/admin/testimonials';
    const method = editing ? 'PUT' : 'POST';
    await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
    setSaving(false);
    setShowForm(false);
    fetchAll();
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete testimonial from "${name}"?`)) return;
    setDeleting(id);
    await fetch(`/api/admin/testimonials/${id}`, { method: 'DELETE' });
    setDeleting(null);
    fetchAll();
  };

  const toggleFeatured = async (t: Testimonial) => {
    await fetch(`/api/admin/testimonials/${t._id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ featured: !t.featured }) });
    fetchAll();
  };

  const inputClass = 'w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl text-sm focus:border-accent-orange focus:ring-2 focus:ring-accent-orange/20 outline-none transition-all';

  return (
    <AdminLayout title="Testimonials">
      <div className="space-y-5">
        <div className="flex justify-end">
          <button onClick={openAdd} className="bg-accent-orange hover:bg-accent-orange-dark text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors">
            + Add Testimonial
          </button>
        </div>

        {/* Inline Form */}
        {showForm && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="font-bold text-steel-blue mb-4">{editing ? 'Edit Testimonial' : 'Add Testimonial'}</h2>
            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">Name *</label>
                  <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Rajesh Kumar" className={inputClass} />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">Designation</label>
                  <input value={form.designation} onChange={(e) => setForm({ ...form, designation: e.target.value })} placeholder="Project Manager" className={inputClass} />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">Company</label>
                  <input value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} placeholder="ABC Builders Pvt. Ltd." className={inputClass} />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">Location</label>
                  <input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} placeholder="Mumbai, Maharashtra" className={inputClass} />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">Rating (1-5)</label>
                  <select value={form.rating} onChange={(e) => setForm({ ...form, rating: Number(e.target.value) })} className={inputClass}>
                    {[5, 4, 3, 2, 1].map((r) => <option key={r} value={r}>{r} ★</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">Testimonial *</label>
                <textarea required rows={4} value={form.comment} onChange={(e) => setForm({ ...form, comment: e.target.value })} placeholder="What did the client say?" className={inputClass + ' resize-none'} />
              </div>
              <div className="flex gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} className="w-4 h-4 accent-accent-orange" />
                  <span className="text-sm font-medium text-gray-700">Featured</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={form.approved} onChange={(e) => setForm({ ...form, approved: e.target.checked })} className="w-4 h-4 accent-accent-orange" />
                  <span className="text-sm font-medium text-gray-700">Approved (visible)</span>
                </label>
              </div>
              <div className="flex gap-3">
                <button type="submit" disabled={saving} className="bg-accent-orange hover:bg-accent-orange-dark text-white px-6 py-2.5 rounded-xl text-sm font-semibold disabled:opacity-60 flex items-center gap-2">
                  {saving && <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
                  {saving ? 'Saving...' : 'Save'}
                </button>
                <button type="button" onClick={() => setShowForm(false)} className="px-6 py-2.5 rounded-xl border-2 border-gray-200 text-gray-600 text-sm font-semibold">Cancel</button>
              </div>
            </form>
          </div>
        )}

        {/* List */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center h-48">
              <div className="w-8 h-8 border-2 border-accent-orange border-t-transparent rounded-full animate-spin" />
            </div>
          ) : testimonials.length === 0 ? (
            <div className="text-center py-16 text-gray-400">
              <div className="text-4xl mb-3">💬</div>
              <p>No testimonials yet</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-50">
              {testimonials.map((t) => (
                <div key={t._id} className="px-5 py-4 flex items-start gap-4">
                  <div className="w-10 h-10 bg-steel-blue rounded-xl flex items-center justify-center text-white font-bold flex-shrink-0">
                    {t.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="font-semibold text-gray-800 text-sm">{t.name}</span>
                      {t.designation && <span className="text-xs text-gray-500">{t.designation}, {t.company}</span>}
                      <span className="text-accent-orange text-xs">{'★'.repeat(t.rating)}</span>
                      {t.featured && <span className="bg-accent-orange/10 text-accent-orange text-xs px-2 py-0.5 rounded-lg">Featured</span>}
                      {!t.approved && <span className="bg-red-100 text-red-600 text-xs px-2 py-0.5 rounded-lg">Hidden</span>}
                    </div>
                    <p className="text-sm text-gray-600 line-clamp-2">{t.comment}</p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button onClick={() => toggleFeatured(t)} className={`text-xs px-2.5 py-1.5 rounded-lg border font-medium transition-colors ${t.featured ? 'border-accent-orange text-accent-orange hover:bg-accent-orange hover:text-white' : 'border-gray-200 text-gray-500 hover:border-accent-orange hover:text-accent-orange'}`}>
                      {t.featured ? '★ Unfeature' : '☆ Feature'}
                    </button>
                    <button onClick={() => openEdit(t)} className="text-xs px-2.5 py-1.5 rounded-lg border border-gray-200 text-steel-blue hover:border-steel-blue font-medium transition-colors">Edit</button>
                    <button onClick={() => handleDelete(t._id, t.name)} disabled={deleting === t._id} className="text-xs px-2.5 py-1.5 rounded-lg border border-red-200 text-red-500 hover:border-red-400 font-medium transition-colors disabled:opacity-50">
                      {deleting === t._id ? '...' : 'Delete'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
