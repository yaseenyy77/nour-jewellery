import React from 'react';
import { motion } from 'framer-motion';
import { Eye, Heart, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const WishlistItem = ({ item, onRemove }) => {
  const navigate = useNavigate();
  const mainImage = item?.images?.[0] || item?.image || 'https://via.placeholder.com/400';

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      className="group relative bg-white border border-gray-100 flex flex-col justify-between overflow-hidden shadow-xs hover:shadow-md transition-shadow duration-300"
    >
      <div 
        className="relative w-full aspect-[4/5] bg-[#fdfdfd] overflow-hidden cursor-pointer flex items-center justify-center"
        onClick={() => navigate(`/product/${item.id}`)}
      >
        <img
          src={mainImage}
          alt={item.name || 'Nour Gold Item'}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
        />

        <button
          onClick={(e) => {
            e.stopPropagation();
            onRemove(item.id);
          }}
          className="absolute top-3 left-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-red-600 hover:bg-red-600 hover:text-white shadow-sm transition-all duration-300 z-20 hover:scale-110"
          title="Remove from wishlist"
        >
          <Trash2 size={14} strokeWidth={1.8} />
        </button>

        <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex justify-center z-10">
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/product/${item.id}`);
            }}
            className="w-full py-2.5 bg-white text-black text-[10px] font-bold tracking-[0.2em] uppercase flex items-center justify-center gap-2 hover:bg-black hover:text-white transition-colors duration-300 shadow-md"
          >
            <Eye size={14} />
            <span>View Piece</span>
          </button>
        </div>
      </div>

      <div className="p-4 flex flex-col items-start text-left w-full bg-white">
        <div className="flex items-center gap-2 mb-1.5">
          <span className="text-[9px] font-bold tracking-[0.25em] text-[#C5A059] uppercase">
            {item.karat ? `${item.karat} GOLD` : 'NOUR GOLD'}
          </span>
          {item.weight && (
            <>
              <span className="w-[3px] h-[3px] rounded-full bg-gray-300"></span>
              <span className="text-[9px] font-bold tracking-[0.2em] text-gray-400 uppercase">
                {item.weight}G
              </span>
            </>
          )}
        </div>

        <h4 className="font-serif text-[13px] font-medium text-black uppercase tracking-wide truncate w-full group-hover:text-[#C5A059] transition-colors">
          {item.name}
        </h4>

        <button
          onClick={() => onRemove(item.id)}
          className="mt-3 text-[10px] font-bold tracking-widest text-red-600 uppercase flex items-center gap-1.5 hover:underline lg:hidden"
        >
          <Heart size={12} className="fill-red-600 text-red-600" />
          <span>Remove</span>
        </button>
      </div>
    </motion.div>
  );
};

export default WishlistItem;