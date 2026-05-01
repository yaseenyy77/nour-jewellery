import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, Package, ShoppingBag, Users, Settings, LogOut, X 
} from 'lucide-react';

const menuItems = [
  { name: 'Overview', icon: <LayoutDashboard size={18} />, path: '/admin/overview' },
  { name: 'Products', icon: <Package size={18} />, path: '/admin/products' },
  { name: 'Orders', icon: <ShoppingBag size={18} />, path: '/admin/orders' },
  { name: 'Customers', icon: <Users size={18} />, path: '/admin/customers' },
  { name: 'Settings', icon: <Settings size={18} />, path: '/admin/settings' },
];

const Sidebar = ({ isOpen, setIsOpen }) => {
  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[45] lg:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      <aside className={`
        fixed lg:sticky top-0 left-0 z-50
        w-64 h-screen bg-white border-r border-gray-100 flex flex-col
        transition-transform duration-500 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="p-5 border-b border-gray-50 lg:hidden flex justify-between items-center">
          <span className="font-black italic text-sm">NAVIGATION</span>
          <button onClick={() => setIsOpen(false)} className="p-2 bg-gray-50 rounded-full">
            <X size={18} />
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-1.5 mt-2">
          {menuItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) => `
                flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-black transition-all
                ${isActive 
                  ? 'bg-black text-white shadow-lg' 
                  : 'text-gray-400 hover:bg-gray-50 hover:text-black'}
              `}
            >
              {item.icon}
              <span className="tracking-widest uppercase">{item.name}</span>
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-50">
          <button className="flex items-center gap-3 px-4 py-3 w-full text-[10px] font-black tracking-widest text-red-500 hover:bg-red-50 rounded-xl transition-all">
            <LogOut size={16} />
            LOG OUT
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;