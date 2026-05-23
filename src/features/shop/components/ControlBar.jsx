import React, { useState } from 'react';
import { SlidersHorizontal, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ControlBar = ({ isFilterOpen, setIsFilterOpen, gridCols, setGridCols, sortBy, setSortBy }) => {
  const [isSortOpen, setIsSortOpen] = useState(false);

  const sortOptions = [
    { value: 'featured', label: 'Featured' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'newest', label: 'Date: New to Old' }
  ];

  const currentSortLabel = sortOptions.find(opt => opt.value === sortBy)?.label || 'Featured';

  // رسم أيقونات الشبكة
  const renderGridIcon = (cols, isActive) => {
    // التعديل هنا: أيقونة العمود الواحد بقت 3 خطوط أفقية ثابتة
    if (cols === 1) {
      return (
        <div 
          className="flex flex-col justify-between h-[14px] w-[16px] cursor-pointer group/icon" 
          onClick={() => setGridCols(1)}
        >
          {[...Array(3)].map((_, i) => (
            <div 
              key={i}
              className={`w-full h-[2.5px] transition-all duration-300 ${
                isActive ? 'bg-black' : 'bg-gray-200 group-hover/icon:bg-gray-400'
              }`}
            />
          ))}
        </div>
      );
    }

    // باقي الأيقونات (الخطوط الطولية)
    return (
      <div className="flex gap-[3px] h-[14px] cursor-pointer items-end group/icon" onClick={() => setGridCols(cols)}>
        {[...Array(cols)].map((_, i) => (
          <div 
            key={i} 
            className={`w-[3px] transition-all duration-300 ${
              isActive ? 'bg-black h-full' : 'bg-gray-200 h-[10px] group-hover/icon:bg-gray-500 group-hover/icon:h-full'
            }`}
            style={{ transitionDelay: `${i * 50}ms` }}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="flex items-center justify-between py-6 border-b border-gray-100 mb-8 relative z-30">
      
      {/* زر الفلتر */}
      <button 
        onClick={() => setIsFilterOpen(!isFilterOpen)}
        className="group relative overflow-hidden border border-black px-6 py-3"
      >
        <div className="absolute inset-0 bg-black -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]" />
        <span className="relative z-10 flex items-center gap-3 text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase text-black group-hover:text-white transition-colors duration-500">
          <SlidersHorizontal size={14} strokeWidth={2} className="group-hover:rotate-180 transition-transform duration-700" />
          {isFilterOpen ? 'Hide Filters' : 'Filter & Sort'}
        </span>
      </button>

      <div className="flex items-center gap-8 md:gap-10">
        
        {/* أيقونات اختيار العرض */}
        <div className="hidden md:flex items-center gap-5 border-r border-gray-200 pr-8">
          {renderGridIcon(1, gridCols === 1)}
          {renderGridIcon(2, gridCols === 2)}
          {renderGridIcon(3, gridCols === 3)}
          {renderGridIcon(4, gridCols === 4)}
        </div>

        {/* قائمة الترتيب */}
        <div className="relative">
          <button 
            onClick={() => setIsSortOpen(!isSortOpen)}
            className="group flex items-center gap-2 text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase text-black py-2"
          >
            <span className="text-gray-400 font-normal transition-colors group-hover:text-black">Sort by:</span>
            <span>{currentSortLabel}</span>
            <motion.div animate={{ rotate: isSortOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
              <ChevronDown size={14} className="text-gray-400 group-hover:text-black transition-colors" />
            </motion.div>
          </button>

          <AnimatePresence>
            {isSortOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setIsSortOpen(false)} />
                <motion.div 
                  initial={{ opacity: 0, y: 15, scale: 0.98 }} 
                  animate={{ opacity: 1, y: 0, scale: 1 }} 
                  exit={{ opacity: 0, y: 10, scale: 0.98 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="absolute right-0 mt-4 w-56 bg-white/90 backdrop-blur-lg border border-gray-100 shadow-[0_10px_40px_rgba(0,0,0,0.08)] z-50 py-3 rounded-sm"
                >
                  {sortOptions.map((opt, i) => (
                    <motion.button
                      initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
                      key={opt.value}
                      onClick={() => { setSortBy(opt.value); setIsSortOpen(false); }}
                      className={`w-full text-left px-6 py-3.5 text-[10px] font-bold tracking-[0.2em] uppercase block transition-all duration-300 relative group/opt ${
                        sortBy === opt.value ? 'text-black pl-8' : 'text-gray-400 hover:text-black hover:pl-8'
                      }`}
                    >
                      <div className={`absolute left-4 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-black transition-opacity duration-300 ${sortBy === opt.value ? 'opacity-100' : 'opacity-0 group-hover/opt:opacity-30'}`} />
                      {opt.label}
                    </motion.button>
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