import React, { useState, useEffect } from 'react';
import { supabase } from '../../../../supabaseClient';
import { Link } from 'react-router-dom';
import { ArrowLeft, Trash2, Sparkles, RefreshCw, Plus } from 'lucide-react';

const ProductTable = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProducts(data || []);
    } catch (err) {
      console.error('Error fetching products:', err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDeleteProduct = async (id) => {
    if (!window.confirm('هل أنت تأكد من حذف هذه القطعة نهائياً؟')) return;

    try {
      const { error } = await supabase.from('products').delete().eq('id', id);
      if (error) throw error;
      setProducts(products.filter((p) => p.id !== id));
    } catch (err) {
      alert('حدث خطأ أثناء الحذف: ' + err.message);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header و سهم الرجوع */}
      <div className="flex items-center justify-between pb-6 border-b border-gray-100">
        <div className="flex items-center gap-4">
          <Link
            to="/admin/products"
            className="p-2 border border-gray-200 rounded-full hover:bg-black hover:text-white transition-all text-gray-600"
          >
            <ArrowLeft size={16} />
          </Link>
          <div>
            <h1 className="text-xl font-serif font-bold tracking-widest uppercase text-black">
              All Products Catalog
            </h1>
            <p className="text-[10px] text-gray-400 uppercase tracking-wider mt-0.5">
              Total Pieces in Database: {products.length}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchProducts}
            className="p-2.5 border border-gray-200 rounded-full hover:bg-black hover:text-white transition-all text-gray-600"
            title="Refresh Catalog"
          >
            <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
          </button>
          <Link
            to="/admin/products/add"
            className="flex items-center gap-2 bg-black text-white px-5 py-2.5 rounded-full text-xs font-bold tracking-widest uppercase hover:bg-neutral-800 transition-all shadow-sm"
          >
            <Plus size={14} /> Add Piece
          </Link>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-100 shadow-sm rounded-xl overflow-hidden">
        {loading ? (
          <div className="py-20 text-center text-xs tracking-widest text-gray-400 uppercase animate-pulse">
            Fetching catalog from Supabase...
          </div>
        ) : products.length === 0 ? (
          <div className="py-20 text-center flex flex-col items-center justify-center">
            <Sparkles size={32} className="text-gray-300 mb-3" />
            <p className="text-xs font-bold tracking-widest text-gray-400 uppercase">
              No products found in catalog.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-100 bg-[#fbfbfb] text-[10px] font-bold tracking-[0.2em] text-gray-400 uppercase">
                  <th className="py-4 px-6">Piece</th>
                  <th className="py-4 px-4">Category</th>
                  <th className="py-4 px-4">Karat & Weight</th>
                  <th className="py-4 px-4">Status</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-xs">
                {products.map((p) => {
                  return (
                    <tr key={p.id} className="hover:bg-gray-50/60 transition-colors">
                      <td className="py-4 px-6 flex items-center gap-4">
                        <img
                          src={p.images?.[0] || 'https://via.placeholder.com/80'}
                          alt={p.name}
                          className="w-14 h-16 object-cover bg-gray-100 rounded border border-gray-100"
                        />
                        <div>
                          <h4 className="font-bold text-black uppercase tracking-wider">{p.name}</h4>
                          <span className="text-[10px] text-gray-400 uppercase">
                            {p.material_color || 'Yellow Gold'}
                          </span>
                        </div>
                      </td>

                      <td className="py-4 px-4 uppercase font-semibold text-neutral-600 tracking-wider">
                        {p.category}
                      </td>

                      <td className="py-4 px-4 text-gray-600">
                        <span className="font-bold">{p.karat || '18k'}</span>
                        {p.weight_grams && (
                          <span className="block text-[10px] text-gray-400">
                            {p.weight_grams} Grams
                          </span>
                        )}
                      </td>

                      <td className="py-4 px-4">
                        {p.in_stock ? (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-bold tracking-widest uppercase bg-emerald-50 text-emerald-600">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> In Stock
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-bold tracking-widest uppercase bg-rose-50 text-rose-600">
                            <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span> Out of Stock
                          </span>
                        )}
                      </td>

                      <td className="py-4 px-6 text-right">
                        <button
                          onClick={() => handleDeleteProduct(p.id)}
                          className="p-2 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-full transition-all"
                          title="Delete Piece"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductTable;