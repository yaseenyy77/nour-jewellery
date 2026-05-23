import React, { useState } from 'react';
import { SlidersHorizontal, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ControlBar = ({ isFilterOpen, setIsFilterOpen, gridCols, setGridCols, sortBy, setSortBy }) => {
  const [isSortOpen, setIsSortOpen] = useState(false);

  const sortOptions = [
    { value: 'featured', label: 'Featured' },
    { value: 'best-selling', label: 'Best Selling' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'newest', label: 'Date: New to Old' }
  ];

  const currentSortLabel = sortOptions.find(opt => opt.value === sortBy)?.label || 'Featured';

  const renderGridIcon = (cols, isActive) => (
    <div 
      className="flex gap-[3px] h-3.5 cursor-pointer items-center group/icon" 
      onClick={() => setGridCols(cols)}
    >
      {[...Array(cols)].map((_, i) => (
        <div 
          key={i} 
          className={`w-[3px] transition-all duration-300 ${
            isActive ? 'bg-black h-full' : 'bg-gray-200 h-3 group-hover/icon:bg-gray-400'
          }`}
        ></div>
      ))}
    </div>
  );

  return (
    <div className="flex items-center justify-between py-5 border-b border-gray-100 mb-8 md:mb-12 gap-4 relative z-20">
      
      {/* زر الفلتر الفاخر */}
      <button 
        onClick={() => setIsFilterOpen(!isFilterOpen)}
        className="flex items-center gap-2.5 text-[10px] md:text-xs font-semibold tracking-[0.2em] uppercase text-black border border-black px-4 py-2 hover:bg-black hover:text-white transition-all duration-300"
      >
        <SlidersHorizontal size={12} strokeWidth={2} />
        <span>{isFilterOpen ? 'Hide Filters' : 'Filter & Sort'}</span>
      </button>

      {/* الـ Controls اليمين */}
      <div className="flex items-center gap-8">
        
        {/* تحجيم الشبكة (يختفي على الموبايل لثبات العرض) */}
        <div className="hidden md:flex items-center gap-4 border-r border-gray-100 pr-8">
          {renderGridIcon(2, gridCols === 2)}
          {renderGridIcon(3, gridCols === 3)}
          {renderGridIcon(4, gridCols === 4)}
        </div>

        {/* قائمة الترتيب المخصصة الاحترافية (Custom Sort Dropdown) */}
        <div className="relative">
          <button 
            onClick={() => setIsSortOpen(!isSortOpen)}
            className="flex items-center gap-2 text-[10px] md:text-xs font-semibold tracking-[0.2em] uppercase text-black py-2 focus:outline-none"
          >
            <span className="text-gray-400 font-normal">Sort by:</span>
            <span>{currentSortLabel}</span>
            <motion.div animate={{ rotate: isSortOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
              <ChevronDown size={12} />
            </motion.div>
          </button>

          <AnimatePresence>
            {isSortOpen && (
              <>
                {/* خلفية مخفية لإغلاق القائمة عند الضغط في أي مكان */}
                <div className="fixed inset-0 z-40" onClick={() => setIsSortOpen(false)} />
                
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute right-0 mt-2 w-48 bg-white border border-gray-100 shadow-xl z-50 rounded-none py-1"
                >
                  {sortOptions.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => {
                        setSortBy(opt.value);
                        setIsSortOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2.5 text-[11px] font-medium tracking-wider uppercase block hover:bg-gray-50 transition-colors ${
                        sortBy === opt.value ? 'text-black font-bold bg-gray-50/50' : 'text-gray-500'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
};

export default ControlBar;