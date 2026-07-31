import React from 'react';
import { Trash2, Sparkles, RefreshCw } from 'lucide-react';

const ProductTable = ({ products, loading, onRefresh, onDeleteProduct }) => {
  return (
    <div className="bg-white border border-gray-100 shadow-sm rounded-lg overflow-hidden">
      {/* Header الشريط العالي للجدول */}
      <div className="p-5 border-b border-gray-100 flex items-center justify-between">
        <div>
          <h3 className="font-serif font-bold text-sm tracking-widest uppercase text-black">
            All Products Catalog
          </h3>
          <p className="text-[10px] text-gray-400 uppercase tracking-wider mt-0.5">
            Total Pieces: {products.length}
          </p>
        </div>
        <button
          onClick={onRefresh}
          className="p-2 border border-gray-200 rounded-full hover:bg-black hover:text-white transition-all text-gray-600"
          title="Refresh Catalog"
        >
          <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
        </button>
      </div>

      {loading ? (
        <div className="py-20 text-center text-xs tracking-widest text-gray-400 uppercase animate-pulse">
          Fetching pieces from Supabase...
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
                <th className="py-4 px-4">Specs (Karat & Weight)</th>
                <th className="py-4 px-4">Price</th>
                <th className="py-4 px-4">Stock Status</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-xs">
              {products.map((p) => {
                const hasDiscount = p.old_price && p.old_price > p.price;
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

                    <td className="py-4 px-4 font-bold text-black">
                      <div>LE {p.price?.toLocaleString()}</div>
                      {hasDiscount && (
                        <span className="text-[10px] text-gray-400 line-through font-normal">
                          LE {p.old_price?.toLocaleString()}
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
                        onClick={() => onDeleteProduct(p.id)}
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
  );
};

export default ProductTable;