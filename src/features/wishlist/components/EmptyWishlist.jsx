import React from 'react';
import { motion } from 'framer-motion';
import { Heart, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const EmptyWishlist = () => {
  const navigate = useNavigate();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center py-20 px-4 text-center max-w-md mx-auto"
    >
      <div className="relative mb-6 flex items-center justify-center">
        <div className="w-20 h-20 rounded-full bg-neutral-50 border border-gray-100 flex items-center justify-center shadow-inner">
          <Heart size={36} strokeWidth={1.2} className="text-[#C5A059]" />
        </div>
        <span className="absolute -top-1 -right-1 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C5A059] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-[#C5A059]"></span>
        </span>
      </div>

      <h3 className="font-serif text-2xl font-medium text-black uppercase tracking-wider mb-2">
        Your Wishlist is Empty
      </h3>

      <p className="text-gray-500 text-xs tracking-widest uppercase mb-8 leading-relaxed">
        Explore our fine jewellery collection and save your favorite gold pieces here.
      </p>

      <button
        onClick={() => navigate('/shop')}
        className="group relative inline-flex items-center gap-3 px-8 py-3.5 bg-black text-white text-[11px] font-bold tracking-[0.25em] uppercase transition-all duration-300 hover:bg-[#C5A059] shadow-md hover:shadow-lg active:scale-95"
      >
        <span>Explore Collection</span>
        <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
      </button>
    </motion.div>
  );
};

export default EmptyWishlist;