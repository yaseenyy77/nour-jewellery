import React from 'react';
import { motion } from 'framer-motion';
import { Eye, Heart, Maximize2, ShoppingCart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ShopProductGrid = ({ products, gridCols }) => {
  const navigate = useNavigate();

  const getGridClasses = () => {
    switch (gridCols) {
      case 1: return 'grid-cols-1 gap-y-12';
      case 2: return 'grid-cols-2 gap-x-6 gap-y-16';
      case 3: return 'grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-16';
      case 4:
      default: return 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-16';
    }
  };

  const isSingleCol = gridCols === 1;

  return (
    <div className={`grid ${getGridClasses()}`}>
      {products.map((product, idx) => {
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
                ? 'flex flex-col md:flex-row items-center gap-8 md:gap-16 pb-10 border-b border-gray-100'
                : 'flex flex-col'
            }`}
            onClick={() => navigate(`/product/${product.id}`)}
          >
            {/* حاوية الصورة وتأثيرات الهوفر */}
            <div
              className={`relative bg-[#fdfdfd] overflow-hidden flex items-center justify-center shrink-0 group/img border border-gray-50 ${
                isSingleCol ? 'w-full md:w-[350px] aspect-[4/5]' : 'w-full aspect-[4/5]'
              }`}
            >
              {/* شارة الخصم */}
              {hasSale && (
                <div className="absolute top-4 right-4 z-10 bg-black text-white text-[9px] font-bold tracking-[0.25em] uppercase px-3.5 py-2 shadow-sm">
                  SALE
                </div>
              )}

              <img
                src={mainImage}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-[1.5s] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover/img:scale-110"
              />

              {/* تأثيرات الهوفر */}
              {!isSingleCol && (
                <>
                  <div className="absolute top-4 left-4 flex flex-col gap-3 opacity-0 group-hover/img:opacity-100 transition-all duration-500 z-20">
                    <button 
                      onClick={(e) => { e.stopPropagation(); /* كود إضافة مفضلة */ }}
                      className="text-gray-400 hover:text-red-700 hover:scale-110 transition-all duration-300"
                      title="Add to Favorites"
                    >
                      <Heart size={20} strokeWidth={1.5} />
                    </button>
                    <button 
                      onClick={(e) => { e.stopPropagation(); /* كود تكبير */ }}
                      className="text-gray-400 hover:text-black hover:scale-110 transition-all duration-300"
                      title="Zoom Image"
                    >
                      <Maximize2 size={20} strokeWidth={1.5} />
                    </button>
                  </div>

                  <div className="absolute inset-0 hidden lg:flex flex-col items-center justify-center gap-2 opacity-0 group-hover/img:opacity-100 transition-opacity duration-500 bg-black/5 z-10">
                    <button 
                      onClick={(e) => { e.stopPropagation(); navigate(`/product/${product.id}`); }}
                      className="relative w-[140px] h-[42px] bg-white text-black rounded-full transition-all duration-300 hover:bg-[#1a1a1a] group/btn1 overflow-hidden flex items-center justify-center shadow-md translate-y-4 group-hover/img:translate-y-0"
                    >
                      <span className="text-[12px] font-medium tracking-wide text-black group-hover/btn1:opacity-0 transition-opacity duration-300">Quick view</span>
                      <Eye size={18} className="absolute text-white opacity-0 translate-y-4 group-hover/btn1:opacity-100 group-hover/btn1:translate-y-0 transition-all duration-300" />
                    </button>

                    <button 
                      onClick={(e) => { e.stopPropagation(); /* كود إضافة للسلة */ }}
                      className="relative w-[140px] h-[42px] bg-white text-black rounded-full transition-all duration-300 hover:bg-[#1a1a1a] group/btn2 overflow-hidden flex items-center justify-center shadow-md translate-y-4 group-hover/img:translate-y-0 delay-75"
                    >
                      <span className="text-[12px] font-medium tracking-wide text-black group-hover/btn2:opacity-0 transition-opacity duration-300">Quick Shop</span>
                      <ShoppingCart size={18} className="absolute text-white opacity-0 translate-y-4 group-hover/btn2:opacity-100 group-hover/btn2:translate-y-0 transition-all duration-300" />
                    </button>
                  </div>
                </>
              )}
            </div>

            {/* تفاصيل المنتج المعروضة بأناقة (متجاوبة مع الـ Grid الموحد) */}
            <div className={`flex flex-col items-start text-left justify-center flex-1 w-full ${isSingleCol ? 'px-4 md:px-0' : 'pt-5 px-1'}`}>
              <div className={`flex items-center gap-2 ${isSingleCol ? 'mb-3' : 'mb-2'}`}>
                <span className={`font-bold text-[#555] uppercase ${isSingleCol ? 'text-[11px] tracking-[0.35em]' : 'text-[9px] tracking-[0.3em]'}`}>
                  {product.karat ? `${product.karat} GOLD` : 'NOUR JEWELLERY'}
                </span>
                {product.weight && (
                  <>
                    <span className="w-[3px] h-[3px] rounded-full bg-[#999]"></span>
                    <span className={`font-bold text-[#555] uppercase ${isSingleCol ? 'text-[11px] tracking-[0.25em]' : 'text-[9px] tracking-[0.2em]'}`}>
                      {product.weight}G
                    </span>
                  </>
                )}
              </div>

              <h3 className={`font-serif font-medium text-black uppercase ${isSingleCol ? 'text-2xl tracking-widest mb-4' : 'text-[14px] tracking-wider truncate w-full mb-2 hover:text-[#555] transition-colors'}`}>
                {product.name}
              </h3>

              <div className={`flex items-center gap-4 ${isSingleCol ? 'mt-2' : ''}`}>
                {hasSale && (
                  <span className={`text-[#888] line-through font-medium ${isSingleCol ? 'text-xs tracking-widest' : 'text-[11px] tracking-widest'}`}>
                    LE {product.old_price.toLocaleString()}
                  </span>
                )}
                <span className={`text-black font-bold ${isSingleCol ? 'text-lg tracking-[0.15em]' : 'text-[13px] tracking-[0.15em]'}`}>
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