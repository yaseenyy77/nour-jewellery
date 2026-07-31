import React from 'react';
import { motion } from 'framer-motion';
import { Eye, Heart } from 'lucide-react';

const ShopProductGrid = ({ products, gridCols }) => {
  const getGridClasses = () => {
    switch (gridCols) {
      case 1: return 'grid-cols-1 gap-y-8';
      case 2: return 'grid-cols-2 gap-x-4 gap-y-16';
      case 3: return 'grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-16';
      case 4:
      default: return 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-16';
    }
  };

  const isSingleCol = gridCols === 1;

  return (
    <div className={`grid ${getGridClasses()}`}>
      {products.map((product, idx) => {
        // تحديد هل المنتج عليه خصم أم لا
        const hasSale = product.old_price && product.old_price > product.price;
        const mainImage = product.images?.[0] || product.image || 'https://via.placeholder.com/400';

        return (
          <motion.div
            layout
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: idx * 0.04 }}
            key={product.id || idx}
            className={`group cursor-pointer ${
              isSingleCol
                ? 'flex flex-col md:flex-row items-center gap-8 md:gap-16 py-8 border-b border-gray-100'
                : 'flex flex-col'
            }`}
          >
            {/* حاوية الصورة الفخمة */}
            <div
              className={`relative bg-[#fafafa] overflow-hidden flex items-center justify-center shrink-0 ${
                isSingleCol ? 'w-full md:w-[350px] aspect-[4/5] border border-gray-50' : 'w-full aspect-[4/5] border border-gray-50'
              }`}
            >
              {/* شارة الخصم تلقائياً */}
              {hasSale && (
                <div className="absolute top-4 left-4 z-10 bg-black text-white text-[9px] font-bold tracking-[0.25em] uppercase px-3.5 py-2">
                  SALE
                </div>
              )}

              <img
                src={mainImage}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-[1.5s] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-105"
              />

              {!isSingleCol && (
                <div className="absolute inset-0 hidden lg:flex flex-col items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-black/5">
                  <button className="relative w-[75%] bg-white text-black rounded-full py-4 transition-all duration-300 hover:bg-black group/btn overflow-hidden flex items-center justify-center shadow-lg translate-y-4 group-hover:translate-y-0">
                    <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-black group-hover/btn:opacity-0 transition-opacity duration-300">Quick view</span>
                    <Eye size={16} className="absolute text-white opacity-0 translate-y-4 group-hover/btn:opacity-100 group-hover/btn:translate-y-0 transition-all duration-300" />
                  </button>
                </div>
              )}
            </div>

            {/* تفاصيل المنتج */}
            <div className={`flex flex-col items-start text-left justify-center flex-1 w-full ${isSingleCol ? 'px-4 md:px-0' : 'pt-5'}`}>
              <span className={`text-gray-400 font-bold uppercase ${isSingleCol ? 'text-[10px] tracking-[0.3em] mb-2' : 'text-[9px] tracking-[0.2em] mb-1'}`}>
                {product.karat ? `${product.karat} Gold` : 'NOUR JEWELLERY'}
              </span>

              <h3 className={`font-black uppercase text-black ${isSingleCol ? 'text-xl md:text-2xl tracking-widest mb-4' : 'text-[12px] tracking-wider truncate w-full'}`}>
                {product.name}
              </h3>

              <div className={`flex items-center gap-4 ${isSingleCol ? 'mb-8' : 'mt-1'}`}>
                {hasSale && (
                  <span className={`text-gray-400 line-through font-medium ${isSingleCol ? 'text-xs tracking-widest' : 'text-[10px] tracking-wider'}`}>
                    LE {product.old_price.toLocaleString()}
                  </span>
                )}
                <span className={`text-black font-black ${isSingleCol ? 'text-lg tracking-[0.15em]' : 'text-[12px] tracking-wider'}`}>
                  LE {(product.price || 0).toLocaleString()}
                </span>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default ShopProductGrid;