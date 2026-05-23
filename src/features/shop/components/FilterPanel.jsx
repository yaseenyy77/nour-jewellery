import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';

const FilterPanel = ({ 
  isOpen, maxPrice, setMaxPrice, selectedTypes, setSelectedTypes, 
  selectedColors, setSelectedColors, availability, setAvailability, 
  onResetFilters, totalResults 
}) => {

  const handleCheckboxChange = (list, setList, value) => {
    if (list.includes(value)) {
      setList(list.filter(item => item !== value));
    } else {
      setList([...list, value]);
    }
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
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
          className="overflow-hidden border-b border-gray-100 bg-white mb-8"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 py-8 px-2">
            
            {/* 1. نطاق السعر الفاخر */}
            <div className="flex flex-col">
              <h4 className="text-[11px] font-bold tracking-[0.2em] uppercase text-black mb-5">Price Range</h4>
              <input 
                type="range" 
                min="0" 
                max="400000" 
                step="5000" 
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full h-[2px] bg-gray-100 appearance-none cursor-pointer accent-black"
              />
              <div className="flex justify-between items-center mt-4">
                <span className="text-[10px] tracking-wider text-gray-400 uppercase">LE 0</span>
                <span className="text-[11px] font-bold tracking-wider text-black uppercase">Up to: LE {maxPrice.toLocaleString()}</span>
              </div>
            </div>

            {/* 2. نوع المنتج المخصص */}
            <div>
              <h4 className="text-[11px] font-bold tracking-[0.2em] uppercase text-black mb-5">Product Type</h4>
              <div className="space-y-3">
                {productTypes.map(type => {
                  const isChecked = selectedTypes.includes(type);
                  return (
                    <label key={type} className="flex items-center gap-3 cursor-pointer group select-none">
                      <div className={`w-3.5 h-3.5 border transition-all duration-300 flex items-center justify-center ${
                        isChecked ? 'border-black bg-black text-white' : 'border-gray-200 bg-white group-hover:border-black'
                      }`}>
                        {isChecked && <Check size={10} strokeWidth={3} />}
                      </div>
                      <span className={`text-[11px] uppercase tracking-wider transition-colors ${isChecked ? 'text-black font-semibold' : 'text-gray-500 group-hover:text-black'}`}>{type}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* 3. اللون المخصص */}
            <div>
              <h4 className="text-[11px] font-bold tracking-[0.2em] uppercase text-black mb-5">Color Material</h4>
              <div className="space-y-3">
                {colors.map(color => {
                  const isChecked = selectedColors.includes(color.name);
                  return (
                    <label key={color.name} className="flex items-center gap-3 cursor-pointer group select-none">
                      <div className={`w-3.5 h-3.5 border transition-all duration-300 flex items-center justify-center ${
                        isChecked ? 'border-black bg-black text-white' : 'border-gray-200 bg-white group-hover:border-black'
                      }`}>
                        {isChecked && <Check size={10} strokeWidth={3} />}
                      </div>
                      <span className={`text-[11px] uppercase tracking-wider transition-colors ${isChecked ? 'text-black font-semibold' : 'text-gray-500 group-hover:text-black'}`}>{color.name}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* 4. التوافر المخصص */}
            <div>
              <h4 className="text-[11px] font-bold tracking-[0.2em] uppercase text-black mb-5">Availability</h4>
              <div className="space-y-3">
                {[
                  { id: 'all', label: 'All Collection' },
                  { id: 'inStock', label: 'In Stock Only' },
                  { id: 'outOfStock', label: 'Out Of Stock' }
                ].map(status => {
                  const isSelected = availability === status.id;
                  return (
                    <label key={status.id} className="flex items-center gap-3 cursor-pointer group select-none">
                      <div className={`w-3.5 h-3.5 border rounded-full transition-all duration-300 flex items-center justify-center ${
                        isSelected ? 'border-black bg-black' : 'border-gray-200 bg-white group-hover:border-black'
                      }`}>
                        {isSelected && <div className="w-1 h-1 bg-white rounded-full" />}
                      </div>
                      <span className={`text-[11px] uppercase tracking-wider transition-colors ${isSelected ? 'text-black font-semibold' : 'text-gray-500 group-hover:text-black'}`}>{status.label}</span>
                    </label>
                  );
                })}
              </div>
            </div>

          </div>
          
          {/* شريط النتائج السفلي */}
          <div className="pb-5 px-2 flex items-center justify-between border-t border-gray-50 pt-4 mb-2">
             <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-gray-400">
               {totalResults} Luxury Pieces Found
             </span>
             <button 
                onClick={onResetFilters}
                className="text-[10px] font-bold tracking-[0.2em] uppercase text-gray-400 hover:text-black border-b border-black transition-colors pb-0.5"
             >
                Clear Filters
             </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FilterPanel;