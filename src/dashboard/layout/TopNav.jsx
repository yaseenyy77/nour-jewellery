import React from 'react';
import { Menu, X } from 'lucide-react';

const TopNav = ({ isSidebarOpen, setIsSidebarOpen }) => {
  return (
    <header className="h-14 bg-white/80 backdrop-blur-md border-b border-gray-100 flex items-center justify-between px-4 sticky top-0 z-50">
      <div className="flex items-center gap-3">
        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-1.5 hover:bg-gray-100 rounded-md lg:hidden transition-colors"
        >
          {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
        <h1 className="text-lg font-black tracking-tighter italic">NOUR ADMIN</h1>
      </div>

      <div className="hidden sm:block text-[10px] font-bold text-gray-300 tracking-[0.2em]">
        PANEL v1.0
      </div>
    </header>
  );
};

export default TopNav;