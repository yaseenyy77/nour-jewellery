import React from 'react';
import { motion } from 'framer-motion';
import { Eye, Heart, Maximize2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

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
      case 1: return 'grid-cols-1 gap-y-8';
      case 2: return 'grid-cols-2 gap-x-2.5 sm:gap-x-4 gap-y-5 sm:gap-y-10';
      case 3: return 'grid-cols-2 md:grid-cols-3 gap-x-2.5 sm:gap-x-4 gap-y-5 sm:gap-y-10';
      case 4:
      default: return 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-2.5 sm:gap-x-4 gap-y-5 sm:gap-y-10';
    }
  };

  const isSingleCol = gridCols === 1;

  if (!products || products.length === 0) {
    return (
      <div className="text-center py-20 bg-neutral-50 rounded-xl border border-gray-100 my-4">
        <p className="text-[10px] sm:text-xs text-neutral-400 uppercase tracking-[0.2em]">
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
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ 
              duration: 0.3, 
              ease: [0.25, 0.1, 0.25, 1.0],
              delay: idx * 0.03 
            }}
            className={`group cursor-pointer ${
              isSingleCol
                ? 'flex flex-col md:flex-row items-center gap-6 md:gap-12 pb-8 border-b border-gray-100'
                : 'flex flex-col h-full'
            }`}
            onClick={() => navigate(`/product/${product.id}`)}
          >
            {/* حاوية الصورة */}
            <div
              className={`relative bg-[#fdfdfd] overflow-hidden flex items-center justify-center shrink-0 border border-gray-100/80 rounded-sm group/card ${
                isSingleCol ? 'w-full md:w-[320px] aspect-[4/5]' : 'w-full aspect-[4/5]'
              }`}
            >
              <img
                src={mainImage}
                alt={product.name || 'Nour Gallery Product'}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover/card:scale-105"
              />

              {!isSingleCol && (
                <>
                  <div className="absolute top-2 left-2 flex xl:hidden z-20">
                    <button 
                      type="button"
                      onClick={handleFavoriteClick}
                      className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full backdrop-blur-md flex items-center justify-center shadow-xs active:scale-90 transition-all ${
                        isFav ? 'bg-white text-red-600' : 'bg-white/90 text-gray-700'
                      }`}
                      aria-label={isFav ? "Remove from Favorites" : "Add to Favorites"}
                    >
                      <Heart size={14} strokeWidth={1.8} className={isFav ? "fill-red-600 text-red-600" : ""} />
                    </button>
                  </div>

                  <div className="absolute bottom-2 right-2 flex xl:hidden items-center gap-1.5 z-20">
                    <button 
                      type="button"
                      onClick={(e) => { e.stopPropagation(); navigate(`/product/${product.id}`); }}
                      className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/95 text-black backdrop-blur-md flex items-center justify-center shadow-xs active:scale-90 transition-transform"
                      aria-label="Quick View"
                    >
                      <Eye size={14} strokeWidth={1.8} />
                    </button>
                  </div>
                </>
              )}

              {!isSingleCol && (
                <>
                  <div className="absolute top-3 left-3 hidden xl:flex flex-col gap-2 opacity-0 group-hover/card:opacity-100 transition-all duration-300 z-20 -translate-x-2 group-hover/card:translate-x-0">
                    <button 
                      type="button"
                      onClick={handleFavoriteClick}
                      className={`w-8 h-8 rounded-full backdrop-blur-md flex items-center justify-center shadow-xs transition-all duration-300 hover:scale-110 ${
                        isFav ? 'bg-white text-red-600' : 'bg-white/90 text-gray-600 hover:text-red-600 hover:bg-white'
                      }`}
                      title={isFav ? "Remove from Favorites" : "Add to Favorites"}
                    >
                      <Heart size={16} strokeWidth={1.8} className={isFav ? "fill-red-600 text-red-600" : ""} />
                    </button>
                    <button 
                      type="button"
                      onClick={(e) => { e.stopPropagation(); }}
                      className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-gray-600 hover:text-black hover:bg-white shadow-xs transition-all duration-300 hover:scale-110"
                      title="Zoom Image"
                    >
                      <Maximize2 size={16} strokeWidth={1.5} />
                    </button>
                  </div>

                  <div className="absolute inset-0 hidden xl:flex flex-col items-center justify-center opacity-0 group-hover/card:opacity-100 transition-all duration-300 bg-black/5 backdrop-blur-[2px] z-10">
                    <button 
                      type="button"
                      onClick={(e) => { e.stopPropagation(); navigate(`/product/${product.id}`); }}
                      className="relative w-[130px] h-[38px] bg-white text-black rounded-full transition-all duration-300 hover:bg-black hover:text-white group/btn1 overflow-hidden flex items-center justify-center shadow-md translate-y-2 group-hover/card:translate-y-0"
                    >
                      <span className="text-[10px] font-bold tracking-widest uppercase transition-opacity duration-300 group-hover/btn1:opacity-0">
                        Quick view
                      </span>
                      <Eye size={16} className="absolute opacity-0 translate-y-3 group-hover/btn1:opacity-100 group-hover/btn1:translate-y-0 transition-all duration-300" />
                    </button>
                  </div>
                </>
              )}
            </div>

            {/* تفاصيل المنتج */}
            <div className={`flex flex-col items-start text-left justify-between flex-1 w-full ${isSingleCol ? 'px-2 md:px-0' : 'pt-2.5 sm:pt-3 px-0.5'}`}>
              <div className="w-full">
                <div className="flex items-center gap-1.5 mb-1">
                  <span className={`font-bold text-neutral-500 uppercase ${isSingleCol ? 'text-[10px] tracking-[0.25em]' : 'text-[8px] sm:text-[9px] tracking-[0.2em]'}`}>
                    {product.karat ? `${product.karat} GOLD` : 'NOUR GALLERY'}
                  </span>
                  {product.weight && (
                    <>
                      <span className="w-[2.5px] h-[2.5px] rounded-full bg-neutral-400"></span>
                      <span className={`font-bold text-neutral-500 uppercase ${isSingleCol ? 'text-[10px] tracking-[0.2em]' : 'text-[8px] sm:text-[9px] tracking-[0.15em]'}`}>
                        {product.weight}G
                      </span>
                    </>
                  )}
                </div>

                <h3 className={`font-serif font-medium text-black uppercase transition-colors duration-300 group-hover:text-neutral-600 line-clamp-1 ${
                  isSingleCol ? 'text-lg md:text-xl tracking-wider' : 'text-[11px] sm:text-xs lg:text-[13px] tracking-wide w-full'
                }`}>
                  {product.name}
                </h3>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default ShopProductGrid;