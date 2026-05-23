import React from 'react';
import { motion } from 'framer-motion';

const categories = ['necklaces', 'rings', 'bracelets', 'earrings', 'bangles'];

const CategoryTabs = ({ activeBrand, activeCategory, onCategoryChange }) => {
  return (
    <div className="w-full bg-white py-6 border-b border-gray-100">
      <div className="max-w-[1400px] mx-auto px-4 flex justify-start lg:justify-center overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <div className="flex items-center gap-8 md:gap-16 min-w-max">
          
          {/* زر عرض الكل */}
          <TabButton 
            label={`${activeBrand} COLLECTION`} 
            isActive={activeCategory === 'all'} 
            onClick={() => onCategoryChange('all')} 
          />
          
          {/* باقي الأقسام */}
          {categories.map((cat) => (
            <TabButton 
              key={cat} 
              label={cat} 
              isActive={activeCategory === cat} 
              onClick={() => onCategoryChange(cat)} 
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// مكون فرعي للزر عشان الكود يبقى أنظف ونطبق الأنيميشن عليه
const TabButton = ({ label, isActive, onClick }) => (
  <button 
    onClick={onClick}
    className="relative px-1 py-2 outline-none group"
  >
    <span className={`text-[10px] md:text-[11px] font-bold tracking-[0.25em] uppercase transition-colors duration-300 ${
      isActive ? 'text-black' : 'text-gray-400 group-hover:text-black'
    }`}>
      {label}
    </span>
    
    {/* خط الأنيميشن الفخم */}
    {isActive && (
      <motion.div 
        layoutId="activeTab" 
        className="absolute bottom-0 left-0 right-0 h-[2px] bg-black"
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      />
    )}
  </button>
);

export default CategoryTabs;