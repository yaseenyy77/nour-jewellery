import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, Package, ShoppingBag, Users, Settings, LogOut 
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
          className="fixed inset-0 bg-black/10 backdrop-blur-[2px] z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      <aside className={`
        fixed lg:sticky top-0 left-0 z-40
        w-60 h-screen bg-white border-r border-gray-100 flex flex-col
        transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full lg:translate-x-0'}
      `}>
        <nav className="flex-1 p-3 space-y-1 mt-2">
          {menuItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) => `
                flex items-center gap-3 px-4 py-2.5 rounded-lg text-xs font-bold transition-all
                ${isActive 
                  ? 'bg-black text-white shadow-lg' 
                  : 'text-gray-400 hover:bg-gray-50 hover:text-black'}
              `}
            >
              {item.icon}
              <span>{item.name}</span>
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-50">
          <button className="flex items-center gap-3 px-4 py-2 w-full text-[11px] font-bold text-red-500 hover:bg-red-50 rounded-lg transition-all">
            <LogOut size={16} />
            LOG OUT
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;