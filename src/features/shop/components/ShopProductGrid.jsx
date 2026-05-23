import React from 'react';
import { motion } from 'framer-motion';
import { Eye, Heart } from 'lucide-react';

const ShopProductGrid = ({ products, gridCols }) => {
  
  // دالة ذكية لتحديد حجم الشبكة المتجاوب بناءً على اختيار المستخدم
  const getGridClasses = () => {
    switch(gridCols) {
      case 2: return 'grid-cols-2';
      case 3: return 'grid-cols-2 md:grid-cols-3';
      case 4:
      default: return 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4';
    }
  };

  return (
    <div className={`grid gap-x-4 gap-y-10 md:gap-y-14 ${getGridClasses()}`}>
      {/* هنا تم تعريف idx بشكل سليم داخل الـ map */}
      {products.map((product, idx) => (
        <motion.div 
          layout
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: idx * 0.03 }} 
          key={product.id || idx} 
          className="group flex flex-col cursor-pointer"
        >
          {/* حاوية الصورة الفاخرة - aspect-[4/5] */}
          <div className="relative w-full aspect-[4/5] bg-[#fafafa] overflow-hidden flex items-center justify-center border border-gray-50 rounded-sm">
            
            {/* بادج SALE الصافي */}
            {product.discount && (
              <div className="absolute top-3 left-3 z-10 bg-black text-white text-[8px] font-bold tracking-[0.25em] uppercase px-2.5 py-1.5 shadow-sm">
                SALE
              </div>
            )}

            {/* الصورة مع تأثير التكبير الناعم */}
            <img 
              src={product.image || product.img} 
              alt={product.name} 
              className="w-full h-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-105"
            />

            {/* 🖥️ أزرار الديسكتوب (Hover) المأخوذة من السلايدر */}
            <div className="absolute inset-0 hidden lg:flex flex-col items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none group-hover:pointer-events-auto">
              <button className="relative w-[70%] bg-white text-black rounded-full py-3.5 transition-all duration-300 hover:bg-black group/btn overflow-hidden flex items-center justify-center border border-black/5 shadow-sm">
                <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-black group-hover/btn:opacity-0 transition-opacity duration-300">Quick view</span>
                <Eye size={16} className="absolute text-white opacity-0 translate-y-4 group-hover/btn:opacity-100 group-hover/btn:translate-y-0 transition-all duration-300" />
              </button>

              <button className="relative w-[70%] bg-white text-black rounded-full py-3.5 transition-all duration-300 hover:bg-black group/btn-wish overflow-hidden flex items-center justify-center border border-black/5 shadow-sm">
                <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-black group-hover/btn-wish:opacity-0 transition-opacity duration-300">Add to Wishlist</span>
                <Heart size={16} className="absolute text-white opacity-0 translate-y-4 group-hover/btn-wish:opacity-100 group-hover/btn-wish:translate-y-0 transition-all duration-300" />
              </button>
            </div>
            
            {/* 📱 أيقونات التابلت والموبايل اللمس */}
            <div className="absolute bottom-3 right-3 flex flex-col gap-2.5 lg:hidden">
              <button className="p-2.5 bg-white/95 backdrop-blur-sm shadow-sm rounded-full text-black border border-gray-100 active:scale-90 transition-transform flex items-center justify-center">
                <Eye size={14}/>
              </button>
              <button className="p-2.5 bg-white/95 backdrop-blur-sm shadow-sm rounded-full text-black border border-gray-100 active:scale-90 transition-transform flex items-center justify-center">
                <Heart size={14}/>
              </button>
            </div>
          </div>

          {/* تفاصيل الكارت السفلي الأسود والأبيض */}
          <div className="pt-4 flex flex-col gap-1 items-start text-left">
            <h3 className="text-[11px] md:text-xs font-semibold tracking-wider uppercase text-black truncate w-full">
              {product.name}
            </h3>
            <div className="flex items-center gap-2 mt-0.5">
              {product.oldPrice && (
                <span className="text-[10px] text-gray-400 line-through font-light tracking-wider">
                  LE {product.oldPrice.toLocaleString()}
                </span>
              )}
              <span className="text-[11px] text-black font-bold tracking-wider">
                LE {(product.price || 0).toLocaleString()}
              </span>
            </div>
          </div>

        </motion.div>
      ))}
    </div>
  );
};

export default ShopProductGrid;