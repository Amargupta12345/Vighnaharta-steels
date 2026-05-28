import React, { useEffect, useState } from 'react';
import AdminLayout from '../../../components/admin/AdminLayout';
import ImageUpload from '../../../components/admin/ImageUpload';

interface Brand {
  _id: string;
  name: string;
  slug: string;
  description: string;
  logo: string;
  order: number;
  active: boolean;
}

const EMPTY_FORM = { name: '', slug: '', description: '', logo: '', order: 0, active: true };

function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

export default function AdminBrands() {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [formError, setFormError] = useState('');
  const [saving, setSaving] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);

  const fetchBrands = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/brands');
      const d = await res.json();
      if (d.success) setBrands(d.data);
      else setError(d.error || 'Failed to load brands');
    } catch {
      setError('Network error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchBrands(); }, []);

  const set = (key: string, val: string | number | boolean) => {
    setForm((f) => {
      const next = { ...f, [key]: val };
      if (key === 'name' && !editId) next.slug = slugify(val as string);
      return next;
    });
  };

  const openAdd = () => {
    setForm(EMPTY_FORM);
    setEditId(null);
    setFormError('');
    setShowForm(true);
  };

  const openEdit = (brand: Brand) => {
    setForm({ name: brand.name, slug: brand.slug, description: brand.description, logo: brand.logo, order: brand.order, active: brand.active });
    setEditId(brand._id);
    setFormError('');
    setShowForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setFormError('');

    const url = editId ? `/api/admin/brands/${editId}` : '/api/admin/brands';
    const method = editId ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
      let data: any = {};
      try { data = await res.json(); } catch {}
      if (res.ok && data.success) {
        setShowForm(false);
        fetchBrands();
      } else {
        setFormError(data.error || `Server error (${res.status})`);
      }
    } catch {
      setFormError('Network error');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete brand "${name}"? Products assigned to this brand will keep the brand name but it won't appear in navigation.`)) return;
    try {
      const res = await fetch(`/api/admin/brands/${id}`, { method: 'DELETE' });
      if (res.ok) fetchBrands();
      else {
        let d: any = {};
        try { d = await res.json(); } catch {}
        setError(d.error || 'Delete failed');
      }
    } catch {
      setError('Network error');
    }
  };

  const inputClass = 'w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl text-sm focus:border-accent-orange focus:ring-2 focus:ring-accent-orange/20 outline-none transition-all';

  return (
    <AdminLayout title="Brands">
      <div className="max-w-4xl space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500">{brands.length} brands total</p>
          <button onClick={openAdd} className="bg-accent-orange hover:bg-accent-orange-dark text-white px-5 py-2.5 rounded-xl font-semibold text-sm transition-colors flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Brand
          </button>
        </div>

        {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">{error}</div>}

        {/* Add / Edit Form */}
        {showForm && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-4">
            <div className="flex items-center justify-between mb-2">
              <h2 className="font-bold text-steel-blue">{editId ? 'Edit Brand' : 'New Brand'}</h2>
              <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-gray-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">Brand Name *</label>
                  <input required value={form.name} onChange={(e) => set('name', e.target.value)} placeholder="e.g. TATA Steel" className={inputClass} />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">Slug</label>
                  <input value={form.slug} onChange={(e) => set('slug', e.target.value)} placeholder="tata-steel" className={inputClass} />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">Description</label>
                  <input value={form.description} onChange={(e) => set('description', e.target.value)} placeholder="Short description about the brand" className={inputClass} />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">Display Order</label>
                  <input type="number" value={form.order} onChange={(e) => set('order', parseInt(e.target.value) || 0)} className={inputClass} />
                </div>
              </div>

              <ImageUpload
                label="Brand Logo"
                hint="Optional. If left blank, the brand card shows the first letter automatically."
                value={form.logo}
                onChange={(url) => set('logo', url)}
              />

              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={form.active} onChange={(e) => set('active', e.target.checked)} className="w-4 h-4 accent-accent-orange rounded" />
                <span className="text-sm font-medium text-gray-700">Active (visible in navigation)</span>
              </label>

              {formError && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">{formError}</div>}

              <div className="flex gap-3">
                <button type="submit" disabled={saving} className="bg-accent-orange hover:bg-accent-orange-dark text-white px-6 py-2.5 rounded-xl font-semibold text-sm transition-colors disabled:opacity-60 flex items-center gap-2">
                  {saving && <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
                  {saving ? 'Saving...' : editId ? 'Update Brand' : 'Add Brand'}
                </button>
                <button type="button" onClick={() => setShowForm(false)} className="px-6 py-2.5 rounded-xl border-2 border-gray-200 text-gray-600 font-semibold text-sm hover:border-gray-300 transition-colors">Cancel</button>
              </div>
            </form>
          </div>
        )}

        {/* Brands List */}
        {loading ? (
          <div className="flex items-center justify-center h-40">
            <div className="w-8 h-8 border-2 border-accent-orange border-t-transparent rounded-full animate-spin" />
          </div>
        ) : brands.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
            <div className="text-5xl mb-4">🏭</div>
            <p className="text-gray-500 mb-4">No brands yet. Add brands like TATA, JSW, SAIL to let customers filter products by manufacturer.</p>
            <button onClick={openAdd} className="text-accent-orange font-semibold hover:underline text-sm">+ Add Brand</button>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Brand</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider hidden md:table-cell">Slug</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider hidden md:table-cell">Order</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {brands.map((brand) => (
                  <tr key={brand._id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {brand.logo ? (
                          <img src={brand.logo} alt={brand.name} className="w-10 h-10 rounded-xl object-contain border border-gray-100 bg-white p-1 flex-shrink-0" />
                        ) : (
                          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-steel-blue/10 to-steel-blue/20 flex items-center justify-center flex-shrink-0">
                            <span className="text-steel-blue font-bold text-sm">{brand.name.charAt(0)}</span>
                          </div>
                        )}
                        <div>
                          <div className="font-semibold text-gray-900">{brand.name}</div>
                          {brand.description && <div className="text-xs text-gray-500 mt-0.5 truncate max-w-[200px]">{brand.description}</div>}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-500 font-mono text-xs hidden md:table-cell">{brand.slug}</td>
                    <td className="px-6 py-4 text-gray-500 hidden md:table-cell">{brand.order}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${brand.active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                        {brand.active ? 'Active' : 'Hidden'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 justify-end">
                        <button onClick={() => openEdit(brand)} className="p-1.5 text-gray-400 hover:text-steel-blue hover:bg-gray-100 rounded-lg transition-colors">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        <button onClick={() => handleDelete(brand._id, brand.name)} className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="bg-blue-50 border border-blue-200 rounded-xl px-4 py-3 text-sm text-blue-700">
          <strong>Tip:</strong> Brands appear in the Brands navigation dropdown. Assign a brand when adding or editing a product so customers can filter by manufacturer (e.g. TATA, JSW, SAIL).
        </div>
      </div>
    </AdminLayout>
  );
}
