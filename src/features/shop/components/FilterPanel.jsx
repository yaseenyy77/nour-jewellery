import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FilterPanel = ({ isOpen }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="overflow-hidden border-b border-gray-100 mb-6 md:mb-10 bg-white"
        >
          {/* الجريد بتتحول من عمود في الموبايل لـ 2 في التابلت لـ 4 في الكمبيوتر */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 py-6 md:py-8 px-2 md:px-4">
            
            {/* Price Filter */}
            <div>
              <h4 className="text-[10px] md:text-xs font-black tracking-widest uppercase mb-5">Price</h4>
              <div className="w-full h-1 bg-gray-100 relative mb-4">
                <div className="absolute left-0 w-full h-full bg-[#D4AF37]"></div>
                <div className="absolute left-0 -top-1.5 w-3.5 h-3.5 bg-black rounded-full cursor-pointer shadow-md"></div>
                <div className="absolute right-0 -top-1.5 w-3.5 h-3.5 bg-black rounded-full cursor-pointer shadow-md"></div>
              </div>
              <div className="flex justify-between text-[9px] md:text-[10px] font-bold text-gray-400 tracking-widest">
                <span>LE 0.00</span>
                <span>LE 341,410.00</span>
              </div>
            </div>

            {/* Product Type */}
            <div>
              <h4 className="text-[10px] md:text-xs font-black tracking-widest uppercase mb-5">Product Type</h4>
              <div className="space-y-3.5">
                {['Diamond Bangles (56)', 'Diamond Bracelets (1)', 'Diamond Necklaces (4)'].map((type) => (
                  <label key={type} className="flex items-center gap-3 cursor-pointer group">
                    <input type="checkbox" className="w-3.5 h-3.5 accent-black cursor-pointer border-gray-300 rounded-sm" />
                    <span className="text-[11px] md:text-xs text-gray-500 group-hover:text-black transition-colors">{type}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Colors */}
            <div>
              <h4 className="text-[10px] md:text-xs font-black tracking-widest uppercase mb-5">Color</h4>
              <div className="space-y-3.5">
                {[
                  { name: 'Rose Gold (31)', color: '#f4d4ce' },
                  { name: 'White Gold (8)', color: '#f4f4f4' },
                  { name: 'Yellow Gold (24)', color: '#e8c872' }
                ].map((item, idx) => (
                  <label key={idx} className="flex items-center gap-3 cursor-pointer group">
                    <div className="w-4 h-4 rounded-full border border-gray-200 shadow-sm" style={{ backgroundColor: item.color }}></div>
                    <span className="text-[11px] md:text-xs text-gray-500 group-hover:text-black transition-colors">{item.name}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Availability */}
            <div>
              <h4 className="text-[10px] md:text-xs font-black tracking-widest uppercase mb-5">Availability</h4>
              <div className="space-y-3.5">
                {['In Stock (63)', 'Out of Stock (26)'].map((status) => (
                  <label key={status} className="flex items-center gap-3 cursor-pointer group">
                    <input type="checkbox" className="w-3.5 h-3.5 accent-black cursor-pointer border-gray-300 rounded-sm" />
                    <span className="text-[11px] md:text-xs text-gray-500 group-hover:text-black transition-colors">{status}</span>
                  </label>
                ))}
              </div>
            </div>

          </div>
          
          <div className="pb-8 px-2 md:px-4 flex justify-end">
             <button className="bg-black text-white text-[9px] md:text-[10px] font-bold tracking-[0.2em] px-8 py-3.5 hover:bg-[#D4AF37] transition-colors uppercase rounded-sm">
                Apply Filters
             </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FilterPanel;