import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import AdminLayout from '../../../components/admin/AdminLayout';

interface Product {
  _id: string;
  name: string;
  slug: string;
  category: string;
  price: string;
  image: string;
  featured: boolean;
  inStock: boolean;
}

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [deleting, setDeleting] = useState<string | null>(null);

  const fetchProducts = () => {
    setLoading(true);
    fetch('/api/admin/products')
      .then((r) => r.json())
      .then((d) => { if (d.success) setProducts(d.data); })
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchProducts(); }, []);

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete "${name}"? This cannot be undone.`)) return;
    setDeleting(id);
    await fetch(`/api/admin/products/${id}`, { method: 'DELETE' });
    setDeleting(null);
    fetchProducts();
  };

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AdminLayout title="Products">
      <div className="space-y-5">
        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full sm:w-72 px-4 py-2.5 border-2 border-gray-200 rounded-xl text-sm focus:border-accent-orange focus:ring-2 focus:ring-accent-orange/20 outline-none transition-all"
          />
          <Link href="/admin/products/add" className="bg-accent-orange hover:bg-accent-orange-dark text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors whitespace-nowrap">
            + Add Product
          </Link>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center h-48">
              <div className="w-8 h-8 border-2 border-accent-orange border-t-transparent rounded-full animate-spin" />
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-16 text-gray-400">
              <div className="text-4xl mb-3">📦</div>
              <p className="font-medium">{search ? 'No products match your search' : 'No products yet'}</p>
              {!search && <Link href="/admin/products/add" className="text-accent-orange text-sm mt-2 inline-block hover:underline">Add your first product</Link>}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    <th className="text-left px-5 py-3.5 font-semibold text-gray-600">Product</th>
                    <th className="text-left px-5 py-3.5 font-semibold text-gray-600 hidden md:table-cell">Category</th>
                    <th className="text-left px-5 py-3.5 font-semibold text-gray-600 hidden sm:table-cell">Price</th>
                    <th className="text-left px-5 py-3.5 font-semibold text-gray-600 hidden lg:table-cell">Status</th>
                    <th className="text-right px-5 py-3.5 font-semibold text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {filtered.map((product) => (
                    <tr key={product._id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0 relative">
                            <Image src={product.image || '/assets/images/steel-beam.png'} alt={product.name} fill className="object-cover" sizes="40px" />
                          </div>
                          <div>
                            <div className="font-semibold text-gray-800">{product.name}</div>
                            <div className="text-xs text-gray-400">{product.slug}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-3.5 text-gray-600 hidden md:table-cell">{product.category}</td>
                      <td className="px-5 py-3.5 text-gray-600 hidden sm:table-cell">{product.price}</td>
                      <td className="px-5 py-3.5 hidden lg:table-cell">
                        <div className="flex gap-2">
                          {product.featured && <span className="bg-accent-orange/10 text-accent-orange text-xs px-2 py-1 rounded-lg font-medium">Featured</span>}
                          <span className={`text-xs px-2 py-1 rounded-lg font-medium ${product.inStock ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                            {product.inStock ? 'In Stock' : 'Out of Stock'}
                          </span>
                        </div>
                      </td>
                      <td className="px-5 py-3.5 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link href={`/admin/products/${product._id}`} className="text-steel-blue hover:text-accent-orange text-xs font-semibold px-3 py-1.5 border border-gray-200 rounded-lg hover:border-accent-orange transition-all">
                            Edit
                          </Link>
                          <button
                            onClick={() => handleDelete(product._id, product.name)}
                            disabled={deleting === product._id}
                            className="text-red-500 hover:text-red-700 text-xs font-semibold px-3 py-1.5 border border-red-200 rounded-lg hover:border-red-400 transition-all disabled:opacity-50"
                          >
                            {deleting === product._id ? '...' : 'Delete'}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <p className="text-xs text-gray-400">{filtered.length} product{filtered.length !== 1 ? 's' : ''} total</p>
      </div>
    </AdminLayout>
  );
}
