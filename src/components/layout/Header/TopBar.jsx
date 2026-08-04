import React from 'react';
import { FiX } from 'react-icons/fi';

const TopBar = ({ onClose }) => {
  return (
    <div className="w-full bg-[#0a0a0a] text-gray-300 py-2 px-8 sm:px-12 relative flex justify-center items-center z-50 border-b border-neutral-800">
      <span className="text-[9px] sm:text-[10px] md:text-xs font-semibold tracking-[0.25em] uppercase text-center truncate">
        NOUR GALLERY <span className="text-gray-500 mx-1.5">|</span> FINE EGYPTIAN JEWELRY
      </span>
      
      <button 
        onClick={onClose}
        className="absolute right-2 sm:right-4 text-gray-400 hover:text-white transition-colors cursor-pointer p-1.5 rounded-full hover:bg-white/10"
        aria-label="Close Announcement"
      >
        <FiX className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
      </button>
    </div>
  );
};

export default TopBar;