import React from 'react';
import { FiMenu } from 'react-icons/fi';

const Navbar = ({ onOpenMenu }) => {
  return (
    <div className="flex items-center">
      <button 
        onClick={onOpenMenu}
        className="text-black hover:text-[#C5A059] transition-colors cursor-pointer p-2 flex items-center gap-2"
        aria-label="Open Menu"
      >
        <span className="hidden sm:inline text-[11px] font-bold tracking-[0.2em] uppercase">MENU</span>
        <FiMenu size={26} strokeWidth={1.5} />
      </button>
    </div>
  );
};

export default Navbar;