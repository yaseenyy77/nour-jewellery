import React from 'react';

const categories = [
  { id: 'necklaces', name: 'Necklaces', image: '/images/cat-necklaces.png' },
  { id: 'rings', name: 'Rings', image: '/images/cat-rings.png' },
  { id: 'bracelets', name: 'Bracelets', image: '/images/cat-bracelets.png' },
  { id: 'earrings', name: 'Earrings', image: '/images/cat-earrings.png' },
];

const CategoriesGrid = ({ brand = "KLEO" }) => {
  return (
    <section className="w-full py-8 md:py-12 px-4 max-w-[1200px] mx-auto bg-white">
      
      {/* الهيدر: تحسين المسافات للموبايل */}
      <div className="flex justify-between items-center mb-6 md:mb-10 border-b border-gray-100 pb-4 md:pb-6">
        <a 
          href={`/shop`} 
          className="group flex items-center gap-1.5 md:gap-2 text-[8px] md:text-[9px] font-bold tracking-[0.15em] md:tracking-[0.2em] uppercase text-gray-400 hover:text-black transition-all duration-500"
        >
          <span className="text-sm md:text-base group-hover:-translate-x-1 transition-transform">&larr;</span>
          SHOP ALL
        </a>

        <div className="flex items-center gap-3 md:gap-4">
          <h2 className="text-lg md:text-3xl font-black tracking-[0.15em] md:tracking-[0.25em] uppercase text-black">
            {brand}
          </h2>
          <div className="hidden sm:block h-[1px] bg-black w-10 md:w-16"></div>
        </div>
      </div>

      {/* الشبكة الاستجابية */}
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
              <span className="text-base md:text-lg font-light text-gray-300 group-hover:text-black transition-colors">
                &#43;
              </span>
              
              <h3 className="text-black text-[8px] md:text-[10px] font-bold tracking-[0.15em] md:tracking-[0.25em] uppercase transition-all">
                {cat.name}
              </h3>
            </div>
            
            {/* خط التأثير السفلي - يعمل بشكل أنعم على الموبايل */}
            <div className="mt-1.5 h-[1px] w-0 group-hover:w-full bg-black transition-all duration-700 mx-auto"></div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategoriesGrid;