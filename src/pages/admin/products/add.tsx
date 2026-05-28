import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import AdminLayout from '../../../components/admin/AdminLayout';
import ImageUpload from '../../../components/admin/ImageUpload';

interface Spec { label: string; value: string; }

function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

export default function AddProduct() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [categories, setCategories] = useState<string[]>([]);
  const [brands, setBrands] = useState<string[]>([]);

  useEffect(() => {
    fetch('/api/admin/categories')
      .then((r) => r.json())
      .then((d) => { if (d.success && d.data.length > 0) setCategories(d.data.map((c: any) => c.name)); })
      .catch(() => {});
    fetch('/api/admin/brands')
      .then((r) => r.json())
      .then((d) => { if (d.success && d.data.length > 0) setBrands(d.data.map((b: any) => b.name)); })
      .catch(() => {});
  }, []);

  const [form, setForm] = useState({
    name: '',
    slug: '',
    category: '',
    brand: '',
    price: '',
    image: '/assets/images/steel-beam.png',
    description: '',
    featured: false,
    inStock: true,
  });
  const [specs, setSpecs] = useState<Spec[]>([{ label: '', value: '' }]);
  const [features, setFeatures] = useState(['']);
  const [applications, setApplications] = useState(['']);

  const set = (key: string, val: string | boolean) => {
    setForm((f) => ({ ...f, [key]: val }));
    if (key === 'name') setForm((f) => ({ ...f, name: val as string, slug: slugify(val as string) }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    const payload = {
      ...form,
      specifications: specs.filter((s) => s.label && s.value),
      features: features.filter(Boolean),
      applications: applications.filter(Boolean),
      metadata: {
        title: `${form.name} - Vighnaharta Steel Industries`,
        description: form.description.substring(0, 160),
      },
    };

    const res = await fetch('/api/admin/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    let data: any = {};
    try { data = await res.json(); } catch { /* empty body */ }

    if (res.ok && data.success) {
      router.push('/admin/products');
    } else {
      setError(data.error || `Server error (${res.status}). Check your MongoDB Atlas connection.`);
      setSaving(false);
    }
  };

  const inputClass = 'w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl text-sm focus:border-accent-orange focus:ring-2 focus:ring-accent-orange/20 outline-none transition-all';

  return (
    <AdminLayout title="Add Product">
      <form onSubmit={handleSubmit} className="max-w-3xl space-y-6">
        {/* Back */}
        <Link href="/admin/products" className="text-sm text-gray-500 hover:text-accent-orange flex items-center gap-1">
          ← Back to Products
        </Link>

        {/* Basic Info */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-4">
          <h2 className="font-bold text-steel-blue border-b pb-3">Basic Information</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">Product Name *</label>
              <input required value={form.name} onChange={(e) => set('name', e.target.value)} placeholder="e.g. Steel I-Beams" className={inputClass} />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">Slug (URL)</label>
              <input value={form.slug} onChange={(e) => set('slug', e.target.value)} placeholder="steel-i-beams" className={inputClass} />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">Category *</label>
              <select required value={form.category} onChange={(e) => set('category', e.target.value)} className={inputClass}>
                <option value="">Select category</option>
                {categories.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">Brand</label>
              <select value={form.brand} onChange={(e) => set('brand', e.target.value)} className={inputClass}>
                <option value="">Select brand (optional)</option>
                {brands.map((b) => <option key={b} value={b}>{b}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">Price</label>
              <input value={form.price} onChange={(e) => set('price', e.target.value)} placeholder="e.g. From ₹45/kg" className={inputClass} />
            </div>
          </div>

          <ImageUpload
            label="Product Image"
            hint="Upload a photo or paste a URL"
            value={form.image}
            onChange={(url) => set('image', url)}
          />

          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5">Description *</label>
            <textarea required rows={4} value={form.description} onChange={(e) => set('description', e.target.value)} placeholder="Describe the product..." className={inputClass + ' resize-none'} />
          </div>

          <div className="flex gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={form.featured} onChange={(e) => set('featured', e.target.checked)} className="w-4 h-4 accent-accent-orange rounded" />
              <span className="text-sm font-medium text-gray-700">Featured product</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={form.inStock} onChange={(e) => set('inStock', e.target.checked)} className="w-4 h-4 accent-accent-orange rounded" />
              <span className="text-sm font-medium text-gray-700">In stock</span>
            </label>
          </div>
        </div>

        {/* Specifications */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-3">
          <h2 className="font-bold text-steel-blue border-b pb-3">Specifications</h2>
          {specs.map((spec, i) => (
            <div key={i} className="flex gap-2">
              <input value={spec.label} onChange={(e) => { const s = [...specs]; s[i].label = e.target.value; setSpecs(s); }} placeholder="Label (e.g. Grade)" className={inputClass} />
              <input value={spec.value} onChange={(e) => { const s = [...specs]; s[i].value = e.target.value; setSpecs(s); }} placeholder="Value (e.g. IS 2062)" className={inputClass} />
              <button type="button" onClick={() => setSpecs(specs.filter((_, j) => j !== i))} className="text-red-400 hover:text-red-600 px-2 flex-shrink-0">✕</button>
            </div>
          ))}
          <button type="button" onClick={() => setSpecs([...specs, { label: '', value: '' }])} className="text-sm text-accent-orange hover:underline">+ Add Spec</button>
        </div>

        {/* Features */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-3">
          <h2 className="font-bold text-steel-blue border-b pb-3">Key Features</h2>
          {features.map((f, i) => (
            <div key={i} className="flex gap-2">
              <input value={f} onChange={(e) => { const arr = [...features]; arr[i] = e.target.value; setFeatures(arr); }} placeholder="e.g. High tensile strength" className={inputClass} />
              <button type="button" onClick={() => setFeatures(features.filter((_, j) => j !== i))} className="text-red-400 hover:text-red-600 px-2 flex-shrink-0">✕</button>
            </div>
          ))}
          <button type="button" onClick={() => setFeatures([...features, ''])} className="text-sm text-accent-orange hover:underline">+ Add Feature</button>
        </div>

        {/* Applications */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-3">
          <h2 className="font-bold text-steel-blue border-b pb-3">Applications</h2>
          {applications.map((a, i) => (
            <div key={i} className="flex gap-2">
              <input value={a} onChange={(e) => { const arr = [...applications]; arr[i] = e.target.value; setApplications(arr); }} placeholder="e.g. Bridge construction" className={inputClass} />
              <button type="button" onClick={() => setApplications(applications.filter((_, j) => j !== i))} className="text-red-400 hover:text-red-600 px-2 flex-shrink-0">✕</button>
            </div>
          ))}
          <button type="button" onClick={() => setApplications([...applications, ''])} className="text-sm text-accent-orange hover:underline">+ Add Application</button>
        </div>

        {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">{error}</div>}

        <div className="flex gap-3">
          <button type="submit" disabled={saving} className="bg-accent-orange hover:bg-accent-orange-dark text-white px-8 py-3 rounded-xl font-semibold transition-colors disabled:opacity-60 flex items-center gap-2">
            {saving && <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
            {saving ? 'Saving...' : 'Save Product'}
          </button>
          <Link href="/admin/products" className="px-8 py-3 rounded-xl border-2 border-gray-200 text-gray-600 font-semibold hover:border-gray-300 transition-colors">
            Cancel
          </Link>
        </div>
      </form>
    </AdminLayout>
  );
}
