import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';

const FilterPanel = ({ isOpen, maxPrice, setMaxPrice, selectedTypes, setSelectedTypes, selectedColors, setSelectedColors, availability, setAvailability, onResetFilters, totalResults }) => {

  const handleCheckboxChange = (list, setList, value) => {
    if (list.includes(value)) setList(list.filter(item => item !== value));
    else setList([...list, value]);
  };

  const productTypes = ['Diamond Bangles', 'Diamond Bracelets', 'Diamond Necklaces', 'Rings'];
  const colors = [
    { name: 'Rose Gold', code: '#f4d4ce' },
    { name: 'White Gold', code: '#f4f4f4' },
    { name: 'Yellow Gold', code: '#e8c872' }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
          className="overflow-hidden border-b border-gray-100 bg-white mb-8"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 py-8 px-2">
            
            {/* السعر */}
            <div className="flex flex-col">
              <h4 className="text-[11px] font-bold tracking-[0.2em] uppercase text-black mb-6">Price Range</h4>
              <input 
                type="range" min="0" max="400000" step="5000" value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full h-[2px] bg-gray-200 appearance-none cursor-pointer accent-black"
              />
              <div className="flex justify-between items-center mt-5">
                <span className="text-[10px] font-bold tracking-wider text-gray-400 uppercase">LE 0</span>
                <span className="text-[10px] font-bold tracking-wider text-black uppercase">Up to: LE {maxPrice.toLocaleString()}</span>
              </div>
            </div>

            {/* نوع المنتج */}
            <div>
              <h4 className="text-[11px] font-bold tracking-[0.2em] uppercase text-black mb-6">Product Type</h4>
              <div className="space-y-4">
                {productTypes.map(type => (
                  <label key={type} className="flex items-center gap-4 cursor-pointer group select-none">
                    <div className={`w-4 h-4 border flex items-center justify-center transition-all ${selectedTypes.includes(type) ? 'border-black bg-black text-white' : 'border-gray-300 bg-white group-hover:border-black'}`}>
                      {selectedTypes.includes(type) && <Check size={12} strokeWidth={3} />}
                    </div>
                    <span className={`text-[11px] uppercase tracking-wider transition-colors ${selectedTypes.includes(type) ? 'text-black font-bold' : 'text-gray-500 group-hover:text-black'}`}>{type}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* الألوان */}
            <div>
              <h4 className="text-[11px] font-bold tracking-[0.2em] uppercase text-black mb-6">Material Color</h4>
              <div className="space-y-4">
                {colors.map(color => (
                  <label key={color.name} className="flex items-center gap-4 cursor-pointer group select-none">
                    <div className={`w-4 h-4 rounded-full border shadow-sm transition-transform ${selectedColors.includes(color.name) ? 'scale-125 border-black ring-1 ring-black ring-offset-1' : 'border-gray-200'}`} style={{ backgroundColor: color.code }}></div>
                    <span className={`text-[11px] uppercase tracking-wider transition-colors ${selectedColors.includes(color.name) ? 'text-black font-bold' : 'text-gray-500 group-hover:text-black'}`}>{color.name}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* حالة التوفر */}
            <div>
              <h4 className="text-[11px] font-bold tracking-[0.2em] uppercase text-black mb-6">Availability</h4>
              <div className="space-y-4">
                {[
                  { id: 'all', label: 'All Collection' },
                  { id: 'inStock', label: 'In Stock Only' },
                  { id: 'outOfStock', label: 'Out Of Stock' }
                ].map(status => (
                  <label key={status.id} className="flex items-center gap-4 cursor-pointer group select-none">
                    <div className={`w-4 h-4 border rounded-full flex items-center justify-center transition-all ${availability === status.id ? 'border-black bg-black' : 'border-gray-300 bg-white group-hover:border-black'}`}>
                      {availability === status.id && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                    </div>
                    <span className={`text-[11px] uppercase tracking-wider transition-colors ${availability === status.id ? 'text-black font-bold' : 'text-gray-500 group-hover:text-black'}`}>{status.label}</span>
                  </label>
                ))}
              </div>
            </div>

          </div>
          
          {/* شريط النتائج */}
          <div className="pb-5 px-2 flex items-center justify-between border-t border-gray-100 pt-5 mt-2">
             <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-black">
               {totalResults} <span className="text-gray-400 font-normal">Pieces Found</span>
             </span>
             <button onClick={onResetFilters} className="text-[10px] font-bold tracking-[0.2em] uppercase text-gray-400 hover:text-black transition-colors">
                Clear Filters
             </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FilterPanel;