import React from 'react';
import { Eye, Heart } from 'lucide-react';

const ShopProductGrid = ({ products, gridCols }) => {
  // توليد كلاسات الـ Grid الذكية عشان تظبط بناءً على اختيار اليوزر
  const getGridClasses = () => {
    switch(gridCols) {
      case 2: return 'grid-cols-2';
      case 3: return 'grid-cols-2 md:grid-cols-3';
      case 5: return 'grid-cols-2 md:grid-cols-3 lg:grid-cols-5';
      case 4: 
      default: return 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4';
    }
  };

  return (
    <div className={`grid gap-4 md:gap-6 lg:gap-8 ${getGridClasses()} transition-all duration-500`}>
      {products.slice(0, 12).map((product, idx) => (
        <div key={idx} className="group flex flex-col h-full cursor-pointer animate-in fade-in duration-700">
          
          <div className="relative w-full aspect-[4/5] bg-[#fcfcfc] overflow-hidden flex items-center justify-center border border-gray-100">
            {/* باج الخصم */}
            {product.discount && (
              <div className="absolute top-3 left-3 z-10 w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#d2b174] text-white flex items-center justify-center text-[8px] md:text-[10px] font-bold">
                -5%
              </div>
            )}
            
            <img 
              src={product.image || '/images/placeholder.jpg'} 
              alt={product.name}
              className="w-[85%] h-[85%] object-contain transition-transform duration-1000 group-hover:scale-105"
            />
            
            {/* Quick View & Shop Overlay */}
            <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-2">
              <button className="hidden lg:flex w-[60%] bg-white/95 rounded-full py-3 text-[9px] font-bold uppercase tracking-widest text-black shadow-sm hover:bg-black hover:text-white transition-all duration-300 items-center justify-center translate-y-4 group-hover:translate-y-0">
                Quick view
              </button>
              <button className="hidden lg:flex w-[60%] bg-white/95 rounded-full py-3 text-[9px] font-bold uppercase tracking-widest text-black shadow-sm hover:bg-black hover:text-white transition-all duration-300 items-center justify-center translate-y-4 group-hover:translate-y-0 delay-75">
                Quick shop
              </button>
            </div>
            
            {/* أزرار الموبايل */}
            <div className="absolute bottom-2 right-2 lg:hidden flex flex-col gap-2">
              <button className="p-2 bg-white rounded-full text-black shadow-sm border border-gray-100"><Eye size={14}/></button>
              <button className="p-2 bg-white rounded-full text-black shadow-sm border border-gray-100"><Heart size={14}/></button>
            </div>
          </div>

          <div className="py-4 text-center px-2 flex flex-col flex-1 justify-between">
            <div>
              <p className="text-[9px] text-gray-400 font-bold tracking-widest uppercase mb-1">
                {product.brand || 'SIRANJEWELRY'}
              </p>
              <h3 className="text-[10px] md:text-xs font-bold uppercase text-black tracking-wider leading-relaxed mb-2 line-clamp-2">
                {product.name}
              </h3>
            </div>
            <div className="flex items-center justify-center gap-3">
              {product.oldPrice && <span className="text-[10px] text-gray-400 line-through">LE {product.oldPrice}</span>}
              <span className="text-[10px] md:text-xs font-bold text-black">LE {product.price.toLocaleString()}</span>
            </div>
          </div>

        </div>
      ))}
    </div>
  );
};

export default ShopProductGrid;