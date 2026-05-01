import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingBag, 
  Users, 
  Settings, 
  LogOut 
} from 'lucide-react';

const menuItems = [
  { name: 'Overview', icon: <LayoutDashboard size={20} />, path: '/admin/overview' },
  { name: 'Products', icon: <Package size={20} />, path: '/admin/products' },
  { name: 'Orders', icon: <ShoppingBag size={20} />, path: '/admin/orders' },
  { name: 'Customers', icon: <Users size={20} />, path: '/admin/customers' },
  { name: 'Settings', icon: <Settings size={20} />, path: '/admin/settings' },
];

const Sidebar = ({ isOpen, setIsOpen }) => {
  return (
    <>
      {/* Overlay للموبايل عشان لما السايد بار يفتح يقفل الباقي */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      <aside className={`
        fixed lg:sticky top-0 left-0 z-40
        w-64 h-screen bg-white border-r border-gray-100 flex flex-col
        transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Navigation Links */}
        <nav className="flex-1 p-4 space-y-2 mt-4">
          {menuItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={() => setIsOpen(false)} // يقفل السايد بار لما تختار حاجة في الموبايل
              className={({ isActive }) => `
                flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300
                ${isActive 
                  ? 'bg-black text-white shadow-xl' 
                  : 'text-gray-500 hover:bg-gray-50 hover:text-black'}
              `}
            >
              {item.icon}
              <span>{item.name}</span>
            </NavLink>
          ))}
        </nav>

        {/* Logout Section */}
        <div className="p-4 border-t border-gray-50">
          <button className="flex items-center gap-3 px-4 py-3 w-full text-sm font-medium text-red-500 hover:bg-red-50 rounded-lg transition-all hover:bg-red-50 rounded-lg">
            <LogOut size={20} />
            Log Out
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;