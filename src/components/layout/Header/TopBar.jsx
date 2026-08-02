import React from 'react';
import { FiX } from 'react-icons/fi';

const TopBar = ({ onClose }) => {
  return (
    <div className="w-full bg-[#0f0f0f] text-[#C5A059] py-2.5 px-4 relative flex justify-center items-center z-50">
      <span className="text-[8px] sm:text-[10px] font-medium tracking-[0.25em] uppercase text-center leading-tight">
        NOUR GOLD | EXQUISITE FINE JEWELLERY COLLECTION
      </span>
      
      <button 
        onClick={onClose}
        className="absolute right-3 md:right-6 text-[#C5A059] hover:text-white transition-colors cursor-pointer p-1"
        aria-label="Close Announcement"
      >
        <FiX size={15} />
      </button>
    </div>
  );
};

export default TopBar;