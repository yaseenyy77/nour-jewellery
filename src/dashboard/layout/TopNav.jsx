import React from 'react';
import { Search, Bell, User } from 'lucide-react';

const TopNav = () => {
  return (
    <header className="h-20 bg-white border-b border-gray-50 flex items-center justify-between px-8 sticky top-0 z-30">
      <div className="relative w-96">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
        <input 
          type="text" 
          placeholder="Search products, orders..." 
          className="w-full bg-gray-50 border-none rounded-xl py-2.5 pl-10 text-sm focus:ring-1 focus:ring-black transition-all"
        />
      </div>
      <div className="flex items-center gap-6">
        <button className="relative text-gray-400 hover:text-black transition-colors">
          <Bell size={20} />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>
        <div className="flex items-center gap-3 pl-6 border-l border-gray-100">
          <div className="text-right">
            <p className="text-xs font-bold text-black uppercase tracking-tight">KLEO Admin</p>
            <p className="text-[10px] text-gray-400 font-medium">Full Access</p>
          </div>
          <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 border border-gray-50">
            <User size={20} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopNav;