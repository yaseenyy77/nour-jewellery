import React from 'react';
import { Eye, Heart } from 'lucide-react';

const ShopProductGrid = ({ products, gridCols }) => {
  // الموبايل دايماً 2 عمود. التابلت والشاشات بياخدوا اختيار المستخدم.
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
    <div className={`grid gap-x-3 gap-y-8 md:gap-x-6 md:gap-y-12 ${getGridClasses()} transition-all duration-500`}>
      {products.slice(0, 12).map((product, idx) => (
        <div key={idx} className="group flex flex-col h-full cursor-pointer animate-in fade-in zoom-in-95 duration-700 delay-75">
          
          <div className="relative w-full aspect-[4/5] bg-[#f8f8f8] overflow-hidden flex items-center justify-center border border-gray-50 mb-3 md:mb-5">
            {product.discount && (
              <div className="absolute top-2 left-2 md:top-3 md:left-3 z-10 w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#d2b174] text-white flex items-center justify-center text-[8px] md:text-[10px] font-bold shadow-sm">
                -5%
              </div>
            )}
            
            <img 
              src={product.image || '/images/placeholder.jpg'} 
              alt={product.name}
              className="w-[80%] h-[80%] object-contain transition-transform duration-[1.5s] group-hover:scale-110"
            />
            
            {/* أزرار الديسكتوب (تظهر عند الهوفر فقط) */}
            <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 hidden lg:flex flex-col items-center justify-center gap-2.5">
              <button className="w-[65%] bg-white rounded-full py-3.5 text-[9px] font-bold uppercase tracking-[0.2em] text-black shadow-lg hover:bg-black hover:text-white transition-all duration-300 translate-y-4 group-hover:translate-y-0">
                Quick view
              </button>
              <button className="w-[65%] bg-white rounded-full py-3.5 text-[9px] font-bold uppercase tracking-[0.2em] text-black shadow-lg hover:bg-black hover:text-white transition-all duration-300 translate-y-4 group-hover:translate-y-0 delay-75">
                Quick shop
              </button>
            </div>
            
            {/* أيقونات الموبايل (موجودة دايماً بشكل أنيق) */}
            <div className="absolute bottom-2 right-2 flex lg:hidden flex-col gap-1.5">
              <button className="p-2 bg-white/90 backdrop-blur-sm rounded-full text-black shadow-sm border border-gray-100 active:scale-90 transition-transform"><Eye size={12}/></button>
              <button className="p-2 bg-white/90 backdrop-blur-sm rounded-full text-black shadow-sm border border-gray-100 active:scale-90 transition-transform"><Heart size={12}/></button>
            </div>
          </div>

          <div className="text-center px-1 flex flex-col flex-1 justify-between">
            <div>
              <p className="text-[8px] md:text-[9px] text-gray-400 font-bold tracking-[0.2em] uppercase mb-1.5">
                {product.brand || 'SIRANJEWELRY'}
              </p>
              <h3 className="text-[10px] md:text-[11px] font-black uppercase text-black tracking-[0.1em] md:tracking-[0.15em] leading-relaxed mb-2 md:mb-3 line-clamp-2 px-2">
                {product.name}
              </h3>
            </div>
            <div className="flex items-center justify-center gap-2 md:gap-3">
              {product.oldPrice && <span className="text-[9px] md:text-[10px] text-gray-400 line-through tracking-wider">LE {product.oldPrice}</span>}
              <span className="text-[10px] md:text-xs font-black text-black tracking-wider">LE {product.price.toLocaleString()}</span>
            </div>
          </div>

        </div>
      ))}
    </div>
  );
};

export default ShopProductGrid;