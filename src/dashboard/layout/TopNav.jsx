import React from 'react';
import { Menu, X } from 'lucide-react';

const TopNav = ({ isSidebarOpen, setIsSidebarOpen }) => {
  return (
    <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-6 sticky top-0 z-50">
      <div className="flex items-center gap-4">
        {/* زر الهمبرجر يظهر فقط في الموبايل */}
        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 hover:bg-gray-50 rounded-lg lg:hidden transition-colors"
        >
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        
        {/* اللوجو اتنقل هنا */}
        <h1 className="text-xl font-black tracking-tighter italic">NOUR ADMIN</h1>
      </div>

      {/* حتة زيادة لو عايز تحط بروفايل أو إشعارات مستقبلاً */}
      <div className="flex items-center gap-4 text-sm font-bold text-gray-400">
        ADMIN PANEL v1.0
      </div>
    </header>
  );
};

export default TopNav;