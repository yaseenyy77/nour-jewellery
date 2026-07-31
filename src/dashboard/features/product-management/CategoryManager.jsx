import React from 'react';
import { Layers, ChevronRight } from 'lucide-react';

const CategoryManager = ({ products = [], activeCategory, onSelectCategory }) => {
  const categories = [
    { id: 'all', name: 'All Collection' },
    { id: 'rings', name: 'Rings' },
    { id: 'necklaces', name: 'Necklaces' },
    { id: 'bracelets', name: 'Bracelets' },
    { id: 'earrings', name: 'Earrings' },
    { id: 'bangles', name: 'Bangles' },
  ];

  // حساب عدد المنتجات لكل قسم ديناميكياً
  const getCategoryCount = (catId) => {
    if (catId === 'all') return products.length;
    return products.filter((p) => p.category?.toLowerCase() === catId.toLowerCase()).length;
  };

  return (
    <div className="bg-white border border-gray-100 p-6 rounded-lg shadow-sm mb-8" dir="ltr">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
        <Layers size={18} className="text-black" />
        <h3 className="font-serif font-bold text-sm tracking-widest uppercase text-black">
          Jewelry Category Filter & Overview
        </h3>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {categories.map((cat) => {
          const count = getCategoryCount(cat.id);
          const isSelected = activeCategory === cat.id;

          return (
            <div
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`p-4 rounded-lg border cursor-pointer transition-all duration-300 flex flex-col justify-between ${
                isSelected
                  ? 'border-black bg-black text-white shadow-md'
                  : 'border-gray-100 bg-gray-50/50 hover:border-black text-gray-800'
              }`}
            >
              <span className={`text-[10px] font-bold tracking-[0.2em] uppercase ${isSelected ? 'text-gray-300' : 'text-gray-400'}`}>
                Category
              </span>

              <h4 className="font-bold text-xs uppercase tracking-wider my-2">
                {cat.name}
              </h4>

              <div className="flex items-center justify-between mt-1">
                <span className={`text-[10px] font-semibold tracking-wider ${isSelected ? 'text-gray-300' : 'text-gray-500'}`}>
                  {count} Pieces
                </span>
                <ChevronRight size={14} className={isSelected ? 'text-white' : 'text-gray-400'} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryManager;