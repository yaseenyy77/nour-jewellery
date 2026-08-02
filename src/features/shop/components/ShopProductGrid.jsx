import React from 'react';
import { motion } from 'framer-motion';
import { Eye, Heart, Maximize2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// استيراد الـ Wishlist Context
import { useWishlist } from '../../../context/WishlistContext';

const ShopProductGrid = ({ 
  products = [], 
  gridCols = 4, 
  favorites = [], 
  onToggleFavorite 
}) => {
  const navigate = useNavigate();
  const { favorites: contextFavorites, addToWishlist, removeFromWishlist } = useWishlist();

  const getGridClasses = () => {
    switch (gridCols) {
      case 1: return 'grid-cols-1 gap-y-12';
      case 2: return 'grid-cols-2 gap-x-4 md:gap-x-6 gap-y-10 md:gap-y-16';
      case 3: return 'grid-cols-2 md:grid-cols-3 gap-x-4 md:gap-x-6 gap-y-10 md:gap-y-16';
      case 4:
      default: return 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 md:gap-x-6 gap-y-10 md:gap-y-16';
    }
  };

  const isSingleCol = gridCols === 1;

  if (!products || products.length === 0) {
    return (
      <div className="text-center py-24 bg-neutral-50 rounded-2xl border border-gray-100 my-4">
        <p className="text-xs text-neutral-400 uppercase tracking-[0.2em]">
          No products found matching your selection.
        </p>
      </div>
    );
  }

  return (
    <div className={`grid ${getGridClasses()}`}>
      {products.map((product, idx) => {
        const mainImage = product.images?.[0] || product.image || 'https://via.placeholder.com/400';

        const activeList = favorites.length > 0 ? favorites : contextFavorites;
        const isFav = activeList?.some(
          (item) => String(typeof item === 'object' ? item.id : item) === String(product.id)
        );

        const handleFavoriteClick = (e) => {
          e.stopPropagation();
          if (onToggleFavorite) {
            onToggleFavorite(product.id);
          } else {
            if (isFav) {
              removeFromWishlist(product.id);
            } else {
              addToWishlist(product);
            }
          }
        };

        return (
          <motion.div
            key={`${product.id || idx}-${gridCols}`}
            initial={{ opacity: 0, y: 15, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ 
              duration: 0.35, 
              ease: [0.25, 0.1, 0.25, 1.0],
              delay: idx * 0.035 
            }}
            className={`group cursor-pointer ${
              isSingleCol
                ? 'flex flex-col md:flex-row items-center gap-8 md:gap-16 pb-10 border-b border-gray-100'
                : 'flex flex-col'
            }`}
            onClick={() => navigate(`/product/${product.id}`)}
          >
            {/* حاوية الصورة */}
            <div
              className={`relative bg-[#fdfdfd] overflow-hidden flex items-center justify-center shrink-0 border border-gray-100 group/card ${
                isSingleCol ? 'w-full md:w-[350px] aspect-[4/5]' : 'w-full aspect-[4/5]'
              }`}
            >
              <img
                src={mainImage}
                alt={product.name || 'Nour Jewellery Product'}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover/card:scale-108"
              />

              {/* أزرار الموبايل */}
              {!isSingleCol && (
                <>
                  <div className="absolute top-2.5 left-2.5 flex lg:hidden z-20">
                    <button 
                      type="button"
                      onClick={handleFavoriteClick}
                      className={`w-8 h-8 rounded-full backdrop-blur-md flex items-center justify-center shadow-sm active:scale-90 transition-all ${
                        isFav ? 'bg-white text-red-600' : 'bg-white/90 text-gray-700'
                      }`}
                      title={isFav ? "Remove from Favorites" : "Add to Favorites"}
                    >
                      <Heart size={15} strokeWidth={1.8} className={isFav ? "fill-red-600 text-red-600" : ""} />
                    </button>
                  </div>

                  <div className="absolute bottom-2.5 right-2.5 flex lg:hidden items-center gap-1.5 z-20">
                    <button 
                      type="button"
                      onClick={(e) => { e.stopPropagation(); navigate(`/product/${product.id}`); }}
                      className="w-8 h-8 rounded-full bg-white/95 text-black backdrop-blur-md flex items-center justify-center shadow-md active:scale-90 transition-transform"
                      title="Quick View"
                    >
                      <Eye size={15} strokeWidth={1.8} />
                    </button>
                  </div>
                </>
              )}

              {/* أزرار الكمبيوتر */}
              {!isSingleCol && (
                <>
                  <div className="absolute top-4 left-4 hidden lg:flex flex-col gap-2.5 opacity-0 group-hover/card:opacity-100 transition-all duration-300 z-20 -translate-x-2 group-hover/card:translate-x-0">
                    <button 
                      type="button"
                      onClick={handleFavoriteClick}
                      className={`w-9 h-9 rounded-full backdrop-blur-md flex items-center justify-center shadow-sm transition-all duration-300 hover:scale-110 ${
                        isFav ? 'bg-white text-red-600' : 'bg-white/90 text-gray-600 hover:text-red-600 hover:bg-white'
                      }`}
                      title={isFav ? "Remove from Favorites" : "Add to Favorites"}
                    >
                      <Heart size={17} strokeWidth={1.8} className={isFav ? "fill-red-600 text-red-600" : ""} />
                    </button>
                    <button 
                      type="button"
                      onClick={(e) => { e.stopPropagation(); }}
                      className="w-9 h-9 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-gray-600 hover:text-black hover:bg-white shadow-sm transition-all duration-300 hover:scale-110"
                      title="Zoom Image"
                    >
                      <Maximize2 size={17} strokeWidth={1.5} />
                    </button>
                  </div>

                  <div className="absolute inset-0 hidden lg:flex flex-col items-center justify-center opacity-0 group-hover/card:opacity-100 transition-all duration-300 bg-black/10 backdrop-blur-[2px] z-10">
                    <button 
                      type="button"
                      onClick={(e) => { e.stopPropagation(); navigate(`/product/${product.id}`); }}
                      className="relative w-[145px] h-[42px] bg-white text-black rounded-full transition-all duration-300 hover:bg-black hover:text-white group/btn1 overflow-hidden flex items-center justify-center shadow-lg translate-y-2 group-hover/card:translate-y-0"
                    >
                      <span className="text-[11px] font-bold tracking-widest uppercase transition-opacity duration-300 group-hover/btn1:opacity-0">
                        Quick view
                      </span>
                      <Eye size={18} className="absolute opacity-0 translate-y-3 group-hover/btn1:opacity-100 group-hover/btn1:translate-y-0 transition-all duration-300" />
                    </button>
                  </div>
                </>
              )}
            </div>

            {/* تفاصيل المنتج */}
            <div className={`flex flex-col items-start text-left justify-center flex-1 w-full ${isSingleCol ? 'px-4 md:px-0' : 'pt-3 lg:pt-5 px-1'}`}>
              <div className={`flex items-center gap-2 ${isSingleCol ? 'mb-3' : 'mb-1.5 lg:mb-2'}`}>
                <span className={`font-bold text-[#666] uppercase ${isSingleCol ? 'text-[11px] tracking-[0.35em]' : 'text-[8px] lg:text-[9px] tracking-[0.25em] lg:tracking-[0.3em]'}`}>
                  {product.karat ? `${product.karat} GOLD` : 'NOUR JEWELLERY'}
                </span>
                {product.weight && (
                  <>
                    <span className="w-[3px] h-[3px] rounded-full bg-[#aaa]"></span>
                    <span className={`font-bold text-[#666] uppercase ${isSingleCol ? 'text-[11px] tracking-[0.25em]' : 'text-[8px] lg:text-[9px] tracking-[0.2em]'}`}>
                      {product.weight}G
                    </span>
                  </>
                )}
              </div>

              <h3 className={`font-serif font-medium text-black uppercase transition-colors duration-300 group-hover:text-[#555] ${
                isSingleCol ? 'text-xl md:text-2xl tracking-widest' : 'text-[12px] lg:text-[14px] tracking-wider truncate w-full'
              }`}>
                {product.name}
              </h3>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default ShopProductGrid;