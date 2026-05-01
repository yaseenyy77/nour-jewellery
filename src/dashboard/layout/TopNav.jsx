import React from 'react';
import { Menu, X } from 'lucide-react';

const TopNav = ({ isSidebarOpen, setIsSidebarOpen }) => {
  return (
    <header className="h-14 bg-white border-b border-gray-100 flex items-center justify-between px-4 sticky top-0 z-30">
      <div className="flex items-center gap-3">
        {/* زرار الهمبرجر */}
        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-1.5 hover:bg-gray-100 rounded-md lg:hidden transition-colors"
        >
          {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
        
        {/* اللوجو */}
        <h1 className="text-lg font-black tracking-tighter italic uppercase text-black">
          NOUR ADMIN
        </h1>
      </div>

      <div className="hidden sm:block text-[10px] font-black text-gray-300 tracking-[0.3em]">
        SYSTEM v1.0
      </div>
    </header>
  );
};

export default TopNav;