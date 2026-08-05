import React, { useState, useEffect } from 'react';
import { supabase } from '../../../../supabaseClient';
import { Link } from 'react-router-dom';
import { ArrowLeft, ChevronRight, Sparkles } from 'lucide-react';

const CategoryManager = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Collection' },
    { id: 'rings', name: 'Rings' },
    { id: 'necklaces', name: 'Necklaces' },
    { id: 'bracelets', name: 'Bracelets' },
    { id: 'earrings', name: 'Earrings' },
    { id: 'bangles', name: 'Bangles' },
  ];

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

  const getCategoryCount = (catId) => {
    if (catId === 'all') return products.length;
    return products.filter((p) => p.category?.toLowerCase() === catId.toLowerCase()).length;
  };

  const filteredProducts = activeCategory === 'all'
    ? products
    : products.filter(p => p.category?.toLowerCase() === activeCategory.toLowerCase());

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4 pb-6 border-b border-gray-100">
        <Link
          to="/admin/products"
          className="p-2 border border-gray-200 rounded-full hover:bg-black hover:text-white transition-all text-gray-600"
        >
          <ArrowLeft size={16} />
        </Link>
        <div>
          <h1 className="text-xl font-serif font-bold tracking-widest uppercase text-black">
            Product Categories & Tags
          </h1>
          <p className="text-[10px] text-gray-400 uppercase tracking-wider mt-0.5">
            Filter and inspect products by category
          </p>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {categories.map((cat) => {
          const count = getCategoryCount(cat.id);
          const isSelected = activeCategory === cat.id;

          return (
            <div
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`p-4 rounded-xl border cursor-pointer transition-all duration-300 flex flex-col justify-between h-28 ${
                isSelected
                  ? 'border-black bg-black text-white shadow-md'
                  : 'border-gray-100 bg-white hover:border-black text-gray-800'
              }`}
            >
              <span className={`text-[9px] font-bold tracking-[0.2em] uppercase ${isSelected ? 'text-gray-300' : 'text-gray-400'}`}>
                Category
              </span>

              <h4 className="font-bold text-xs uppercase tracking-wider my-1">
                {cat.name}
              </h4>

              <div className="flex items-center justify-between">
                <span className={`text-[10px] font-semibold tracking-wider ${isSelected ? 'text-gray-300' : 'text-gray-500'}`}>
                  {count} Pieces
                </span>
                <ChevronRight size={14} className={isSelected ? 'text-white' : 'text-gray-400'} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Filtered Table */}
      <div className="bg-white border border-gray-100 shadow-sm rounded-xl overflow-hidden mt-8">
        <div className="p-4 bg-[#fbfbfb] border-b border-gray-100 flex items-center justify-between">
          <span className="text-xs font-bold tracking-widest uppercase text-black">
            Showing: {activeCategory.toUpperCase()} ({filteredProducts.length})
          </span>
        </div>

        {loading ? (
          <div className="py-16 text-center text-xs tracking-widest text-gray-400 uppercase animate-pulse">
            Loading pieces...
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="py-16 text-center flex flex-col items-center justify-center">
            <Sparkles size={28} className="text-gray-300 mb-2" />
            <p className="text-xs font-bold tracking-widest text-gray-400 uppercase">
              No products found in this category.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-100 bg-[#fbfbfb] text-[10px] font-bold tracking-[0.2em] text-gray-400 uppercase">
                  <th className="py-4 px-6">Piece</th>
                  <th className="py-4 px-4">Specs</th>
                  <th className="py-4 px-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-xs">
                {filteredProducts.map((p) => (
                  <tr key={p.id} className="hover:bg-gray-50/60 transition-colors">
                    <td className="py-4 px-6 flex items-center gap-4">
                      <img
                        src={p.images?.[0] || 'https://via.placeholder.com/80'}
                        alt={p.name}
                        className="w-12 h-14 object-cover bg-gray-100 rounded border border-gray-100"
                      />
                      <div>
                        <h4 className="font-bold text-black uppercase tracking-wider">{p.name}</h4>
                        <span className="text-[10px] text-gray-400 uppercase">{p.category}</span>
                      </div>
                    </td>

                    <td className="py-4 px-4 text-gray-600">
                      <span className="font-bold">{p.karat || '18k'}</span>
                      {p.weight_grams && <span className="block text-[10px] text-gray-400">{p.weight_grams}g</span>}
                    </td>

                    <td className="py-4 px-4">
                      {p.in_stock ? (
                        <span className="text-emerald-600 font-bold text-[10px] uppercase">In Stock</span>
                      ) : (
                        <span className="text-rose-600 font-bold text-[10px] uppercase">Out of Stock</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryManager;