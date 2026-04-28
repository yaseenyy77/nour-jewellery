import React from 'react';

// الأقسام العامة باللغة الإنجليزية
const categories = [
  { id: 'necklaces', name: 'Necklaces', image: '/images/cat-necklaces.png' },
  { id: 'rings', name: 'Rings', image: '/images/cat-rings.png' },
  { id: 'bracelets', name: 'Bracelets', image: '/images/cat-bracelets.png' },
  { id: 'earrings', name: 'Earrings', image: '/images/cat-earrings.png' },
];

const CategoriesGrid = ({ brand }) => {
  return (
    <section className="w-full py-12 px-4 max-w-[1400px] mx-auto">
      
      {/* الهيدر: Shop All يساراً، اسم البراند يميناً */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
        
        {/* رابط Shop All على اليسار */}
        <a 
          href={`/shop/${brand.toLowerCase()}`} 
          className="text-sm font-medium text-gray-800 hover:text-black transition-colors flex items-center gap-1 order-2 md:order-1"
        >
          <span>&larr;</span> Shop All
        </a>

        {/* عنوان البراند على اليمين */}
        <div className="flex items-center gap-4 order-1 md:order-2">
          <div className="h-[2px] bg-gray-900 w-12 md:w-20"></div>
          <h2 className="text-xl md:text-2xl font-bold uppercase tracking-wider text-gray-900">
            {brand} JEWELRY
          </h2>
          <div className="h-[2px] bg-gray-900 w-12 md:w-20"></div>
        </div>

      </div>

      {/* الشبكة */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {categories.map((cat) => (
          <div 
            key={cat.id} 
            className="group cursor-pointer flex flex-col"
            onClick={() => console.log(`Maps to: ${brand} -> ${cat.id}`)} 
          >
            {/* حاوية الصورة المربعة */}
            <div className="relative aspect-square overflow-hidden bg-[#f4f4f4]">
              <img 
                src={cat.image} 
                alt={`${brand} ${cat.name}`} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            
            {/* الشريط الملون */}
            <div className="bg-[#dca68f] py-4 text-center">
              <h3 className="text-white text-sm font-bold tracking-wide uppercase">
                {cat.name}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategoriesGrid;