import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';

const FilterPanel = ({ 
  isOpen, 
  maxPrice, 
  setMaxPrice, 
  selectedTypes, 
  setSelectedTypes,
  selectedKarats,
  setSelectedKarats,
  selectedColors, 
  setSelectedColors, 
  availability, 
  setAvailability, 
  onResetFilters, 
  totalResults 
}) => {

  const handleCheckboxChange = (list, setList, value) => {
    if (list.includes(value)) setList(list.filter(item => item !== value));
    else setList([...list, value]);
  };

  // الأقسام والعيارات المطابقة للداشبورد
  const productTypes = ['necklaces', 'rings', 'bracelets', 'earrings'];
  const karats = ['18K', '21K', '24K'];
  const colors = [
    { name: 'Yellow Gold', code: '#e8c872' },
    { name: 'White Gold', code: '#f4f4f4' },
    { name: 'Rose Gold', code: '#f4d4ce' }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ height: 0, opacity: 0 }} 
          animate={{ height: 'auto', opacity: 1 }} 
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden border-b border-gray-100 bg-white mb-8"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 py-8 px-2">
            
            {/* 1. نوع القطعة */}
            <div>
              <h4 className="text-[11px] font-bold tracking-[0.2em] uppercase text-black mb-6">Category</h4>
              <div className="space-y-3">
                {productTypes.map(type => (
                  <label key={type} className="flex items-center gap-4 cursor-pointer group select-none">
                    <div className={`w-4 h-4 border flex items-center justify-center transition-all ${selectedTypes.includes(type) ? 'border-black bg-black text-white' : 'border-gray-300 bg-white group-hover:border-black'}`}>
                      <input 
                        type="checkbox" 
                        className="hidden" 
                        checked={selectedTypes.includes(type)}
                        onChange={() => handleCheckboxChange(selectedTypes, setSelectedTypes, type)}
                      />
                      {selectedTypes.includes(type) && <Check size={12} strokeWidth={3} />}
                    </div>
                    <span className={`text-[11px] uppercase tracking-wider transition-colors ${selectedTypes.includes(type) ? 'text-black font-bold' : 'text-gray-500 group-hover:text-black'}`}>
                      {type}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* 2. عيار الذهب */}
            <div>
              <h4 className="text-[11px] font-bold tracking-[0.2em] uppercase text-black mb-6">Gold Karat</h4>
              <div className="space-y-3">
                {karats.map(karat => (
                  <label key={karat} className="flex items-center gap-4 cursor-pointer group select-none">
                    <div className={`w-4 h-4 border flex items-center justify-center transition-all ${selectedKarats.includes(karat) ? 'border-black bg-black text-white' : 'border-gray-300 bg-white group-hover:border-black'}`}>
                      <input 
                        type="checkbox" 
                        className="hidden" 
                        checked={selectedKarats.includes(karat)}
                        onChange={() => handleCheckboxChange(selectedKarats, setSelectedKarats, karat)}
                      />
                      {selectedKarats.includes(karat) && <Check size={12} strokeWidth={3} />}
                    </div>
                    <span className={`text-[11px] uppercase tracking-wider transition-colors ${selectedKarats.includes(karat) ? 'text-black font-bold' : 'text-gray-500 group-hover:text-black'}`}>
                      {karat}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* 3. لون الذهب */}
            <div>
              <h4 className="text-[11px] font-bold tracking-[0.2em] uppercase text-black mb-6">Material Color</h4>
              <div className="space-y-3">
                {colors.map(color => (
                  <label key={color.name} className="flex items-center gap-4 cursor-pointer group select-none">
                    <input 
                      type="checkbox" 
                      className="hidden" 
                      checked={selectedColors.includes(color.name)}
                      onChange={() => handleCheckboxChange(selectedColors, setSelectedColors, color.name)}
                    />
                    <div className={`w-4 h-4 rounded-full border shadow-sm transition-transform ${selectedColors.includes(color.name) ? 'scale-125 border-black ring-1 ring-black ring-offset-1' : 'border-gray-200'}`} style={{ backgroundColor: color.code }}></div>
                    <span className={`text-[11px] uppercase tracking-wider transition-colors ${selectedColors.includes(color.name) ? 'text-black font-bold' : 'text-gray-500 group-hover:text-black'}`}>
                      {color.name}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* 4. التوفر والشحن */}
            <div>
              <h4 className="text-[11px] font-bold tracking-[0.2em] uppercase text-black mb-6">Availability</h4>
              <div className="space-y-3">
                {[
                  { id: 'all', label: 'All Items' },
                  { id: 'inStock', label: 'In Stock Only' },
                  { id: 'outOfStock', label: 'Out Of Stock' }
                ].map(status => (
                  <label key={status.id} className="flex items-center gap-4 cursor-pointer group select-none">
                    <div className={`w-4 h-4 border rounded-full flex items-center justify-center transition-all ${availability === status.id ? 'border-black bg-black' : 'border-gray-300 bg-white group-hover:border-black'}`}>
                      <input 
                        type="radio" 
                        name="availability"
                        className="hidden" 
                        checked={availability === status.id}
                        onChange={() => setAvailability(status.id)}
                      />
                      {availability === status.id && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                    </div>
                    <span className={`text-[11px] uppercase tracking-wider transition-colors ${availability === status.id ? 'text-black font-bold' : 'text-gray-500 group-hover:text-black'}`}>
                      {status.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>

          </div>
          
          {/* شريط النتائج وتصفية الفلاتر */}
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