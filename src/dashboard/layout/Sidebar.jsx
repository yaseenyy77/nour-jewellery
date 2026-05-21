import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, Package, ShoppingBag, Users, Settings, LogOut, X 
} from 'lucide-react';

const menuItems = [
  { name: 'Overview', icon: <LayoutDashboard size={18} strokeWidth={1.5} />, path: '/admin/overview' },
  { name: 'Product Management', icon: <Package size={18} strokeWidth={1.5} />, path: '/admin/products' },
  { name: 'Order Management', icon: <ShoppingBag size={18} strokeWidth={1.5} />, path: '/admin/orders' },
  { name: 'User Management', icon: <Users size={18} strokeWidth={1.5} />, path: '/admin/customers' },
  { name: 'Settings', icon: <Settings size={18} strokeWidth={1.5} />, path: '/admin/settings' },
];

const Sidebar = ({ isOpen, setIsOpen }) => {
  return (
    <>
      {/* طبقة الحماية للموبايل */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[45] lg:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* السايد بار ثابت fixed 100% ومستقل تماماً عن أي سكرول */}
      <aside className={`
        fixed top-0 left-0 z-50
        w-64 h-screen bg-white border-r border-gray-100/60 flex flex-col
        transition-transform duration-500 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* هيدر الموبايل */}
        <div className="p-5 border-b border-gray-50 lg:hidden flex justify-between items-center">
          <span className="font-black italic text-xs text-black tracking-widest">NAVIGATION</span>
          <button onClick={() => setIsOpen(false)} className="p-2 bg-gray-50 rounded-full hover:bg-black hover:text-white transition-colors duration-300">
            <X size={16} />
          </button>
        </div>

        {/* براند هيدر فخم وثابت للكمبيوتر */}
        <div className="hidden lg:flex p-7 border-b border-gray-50/80 items-center justify-center">
          <span className="font-serif font-bold text-sm tracking-[0.25em] text-black">NOUR ADMIN</span>
        </div>

        {/* قائمة التنقل الرئيسية المينيمال */}
        <nav className="flex-1 p-4 space-y-2 mt-4 overflow-y-auto">
          {menuItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) => `
                flex items-center gap-3.5 px-4 py-3.5 rounded-xl text-[11px] font-black tracking-widest transition-all duration-300
                ${isActive 
                  ? 'bg-black text-white shadow-md shadow-black/5' 
                  : 'text-gray-400 hover:bg-gray-50/80 hover:text-black'}
              `}
            >
              {item.icon}
              <span className="uppercase">{item.name}</span>
            </NavLink>
          ))}
        </nav>

        {/* زر الخروج السفلي */}
        <div className="p-4 border-t border-gray-50/80">
          <button className="flex items-center gap-3 px-4 py-3.5 w-full text-[10px] font-black tracking-[0.15em] text-red-500 hover:bg-red-50/60 rounded-xl transition-all duration-300 uppercase">
            <LogOut size={15} />
            Log Out System
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;