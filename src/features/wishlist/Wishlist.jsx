import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Heart } from 'lucide-react';

// تصحيح المسارات للوصول إلى فولدر components
import EmptyWishlist from './components/EmptyWishlist';
import WishlistItem from './components/WishlistItem';

// ربط المكون بالـ Context مباشرة
import { useWishlist } from '../../context/WishlistContext';

const Wishlist = () => {
  const { favorites, removeFromWishlist, clearWishlist } = useWishlist();

  return (
    <div dir="ltr" className="w-full min-h-[60vh] bg-white py-10 px-4 sm:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-gray-100 pb-6 mb-10 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Heart size={18} className="fill-red-600 text-red-600" />
              <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-gray-400">
                SAVED ITEMS
              </span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-medium text-black tracking-wider uppercase">
              MY WISHLIST
            </h1>
          </div>

          {favorites && favorites.length > 0 && (
            <div className="flex items-center justify-between md:justify-end gap-6">
              <span className="text-xs font-medium text-gray-500 tracking-widest uppercase">
                {favorites.length} {favorites.length === 1 ? 'PIECE' : 'PIECES'}
              </span>

              <button
                onClick={clearWishlist}
                className="flex items-center gap-2 text-[11px] font-bold tracking-widest text-gray-400 hover:text-red-600 transition-colors uppercase"
              >
                <Trash2 size={14} />
                <span>Clear All</span>
              </button>
            </div>
          )}
        </div>

        {!favorites || favorites.length === 0 ? (
          <EmptyWishlist />
        ) : (
          <motion.div 
            layout
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8"
          >
            <AnimatePresence>
              {favorites.map((item) => (
                <WishlistItem
                  key={item.id}
                  item={item}
                  onRemove={removeFromWishlist}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;