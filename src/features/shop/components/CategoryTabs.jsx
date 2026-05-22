import React from 'react';

const categories = ['necklaces', 'rings', 'bracelets', 'earrings', 'bangles'];

const CategoryTabs = ({ activeBrand, activeCategory, onCategoryChange }) => {
  return (
    <div className="w-full bg-[#f9f8f6] py-3 md:py-5 border-y border-gray-100 sticky top-[60px] md:top-[80px] z-30">
      {/* إخفاء الـ scrollbar مع الحفاظ على خاصية السحب في الموبايل */}
      <div className="max-w-[1400px] mx-auto px-4 flex justify-start lg:justify-center overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <div className="flex items-center gap-6 md:gap-12 min-w-max">
          <button
            onClick={() => onCategoryChange('all')}
            className={`text-[9px] md:text-[11px] font-black tracking-[0.2em] uppercase transition-all duration-300 pb-1.5 md:pb-2 border-b-2 ${
              activeCategory === 'all' ? 'border-black text-black' : 'border-transparent text-gray-400 hover:text-black'
            }`}
          >
            {activeBrand} COLLECTION
          </button>
          
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => onCategoryChange(cat)}
              className={`text-[9px] md:text-[11px] font-black tracking-[0.2em] uppercase transition-all duration-300 pb-1.5 md:pb-2 border-b-2 ${
                activeCategory === cat ? 'border-black text-black' : 'border-transparent text-gray-400 hover:text-black'
              }`}
            >
              {activeBrand} {cat}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryTabs;