// src/features/home/components/CategoriesGrid.jsx
import React from 'react';

const CategoriesGrid = ({ brand = "BRAND", categories = [] }) => {
  if (!categories.length) return null;

  return (
    <section className="w-full py-8 md:py-12 px-4 max-w-[1200px] mx-auto bg-white">
      
      <div className="flex justify-between items-center mb-6 md:mb-10 border-b border-gray-100 pb-4 md:pb-6">
        <a 
          href={`/shop`} 
          className="group flex items-center gap-1.5 md:gap-2 text-[8px] md:text-[9px] font-bold tracking-[0.15em] md:tracking-[0.2em] uppercase transition-all duration-500"
          style={{ color: 'var(--theme-primary)' }}
        >
          <span className="text-sm md:text-base group-hover:-translate-x-1 transition-transform">&larr;</span>
          SHOP ALL
        </a>

        <div className="flex items-center gap-3 md:gap-4">
          <h2 
            className="text-lg md:text-3xl font-black tracking-[0.15em] md:tracking-[0.25em] uppercase"
            style={{ color: 'var(--theme-primary)' }}
          >
            {brand}
          </h2>
          <div className="hidden sm:block h-[1px] w-10 md:w-16" style={{ backgroundColor: 'var(--theme-primary)' }}></div>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-4">
        {categories.map((cat) => (
          <div 
            key={cat.id} 
            className="group cursor-pointer flex flex-col"
          >
            <div className="relative aspect-square overflow-hidden bg-[#f9f9f9] mb-2 md:mb-3">
              <img 
                src={cat.image} 
                alt={cat.name} 
                className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110 grayscale hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500"></div>
            </div>
            
            <div className="flex items-center justify-between px-0.5">
              <span className="text-base md:text-lg font-light transition-colors" style={{ color: 'var(--theme-secondary)' }}>
                &#43;
              </span>
              
              <h3 
                className="text-[8px] md:text-[10px] font-bold tracking-[0.15em] md:tracking-[0.25em] uppercase transition-all"
                style={{ color: 'var(--theme-primary)' }}
              >
                {cat.name}
              </h3>
            </div>
            
            <div className="mt-1.5 h-[1px] w-0 group-hover:w-full transition-all duration-700 mx-auto" style={{ backgroundColor: 'var(--theme-primary)' }}></div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategoriesGrid;