import React from 'react';
import { SlidersHorizontal, ChevronDown } from 'lucide-react';

const ControlBar = ({ isFilterOpen, setIsFilterOpen, gridCols, setGridCols, sortBy, setSortBy }) => {
  const renderGridIcon = (cols, isActive) => (
    <div className="flex gap-[2px] h-4 cursor-pointer items-end hover:opacity-70 transition-opacity" onClick={() => setGridCols(cols)}>
      {[...Array(cols)].map((_, i) => (
        <div key={i} className={`w-1.5 transition-all duration-300 ${isActive ? 'bg-black h-full' : 'bg-gray-300 h-2.5'}`}></div>
      ))}
    </div>
  );

  return (
    <div className="flex flex-wrap items-center justify-between py-4 md:py-6 border-b border-gray-100 mb-6 md:mb-10 gap-y-4">
      
      {/* زر الفلتر */}
      <button 
        onClick={() => setIsFilterOpen(!isFilterOpen)}
        className="flex items-center gap-2 text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase hover:text-gray-500 transition-colors order-1"
      >
        <SlidersHorizontal size={14} strokeWidth={1.5} className="md:w-4 md:h-4" />
        {isFilterOpen ? 'Hide Filter' : 'Filter'}
      </button>

      {/* ترتيب المنتجات - تظهر على اليمين في الموبايل */}
      <div className="relative order-2 md:order-3">
        <select 
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="appearance-none bg-transparent text-[9px] md:text-[11px] font-bold tracking-[0.15em] uppercase py-2 pl-2 pr-8 cursor-pointer focus:outline-none text-right md:text-left"
        >
          <option value="featured">Featured</option>
          <option value="best-selling">Best Selling</option>
          <option value="price-low">Price, low to high</option>
          <option value="price-high">Price, high to low</option>
          <option value="newest">Date, new to old</option>
        </select>
        <ChevronDown size={12} className="absolute right-0 md:right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
      </div>

      {/* التحكم في الأعمدة - يختفي في الموبايل عشان الموبايل ثابت عمودين */}
      <div className="hidden md:flex items-center gap-5 lg:gap-8 order-3 md:order-2 absolute left-1/2 -translate-x-1/2">
        {renderGridIcon(2, gridCols === 2)}
        {renderGridIcon(3, gridCols === 3)}
        {renderGridIcon(4, gridCols === 4)}
        {renderGridIcon(5, gridCols === 5)}
      </div>
      
    </div>
  );
};

export default ControlBar;