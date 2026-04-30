// src/dashboard/layout/Sidebar.jsx
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingBag, 
  Users, 
  Settings, 
  LogOut,
  Palette,
  ChevronDown
} from 'lucide-react';

const Sidebar = () => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const menuItems = [
    { name: 'Overview', icon: <LayoutDashboard size={20} />, path: '/admin/overview' },
    { name: 'Products', icon: <Package size={20} />, path: '/admin/products' },
    { name: 'Orders', icon: <ShoppingBag size={20} />, path: '/admin/orders' },
    { name: 'Customers', icon: <Users size={20} />, path: '/admin/customers' },
  ];

  return (
    <aside className="w-64 h-screen bg-white border-r border-gray-100 flex flex-col sticky top-0">
      <div className="p-8 border-b border-gray-50">
        <h1 className="text-2xl font-black tracking-tighter italic">NOUR ADMIN</h1>
      </div>

      <nav className="flex-1 p-4 space-y-2 mt-4">
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) => `
              flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all
              ${isActive 
                ? 'bg-black text-white shadow-lg' 
                : 'text-gray-500 hover:bg-gray-50 hover:text-black'}
            `}
          >
            {item.icon}
            <span>{item.name}</span>
          </NavLink>
        ))}

        {/* Settings Dropdown */}
        <div>
          <button 
            onClick={() => setIsSettingsOpen(!isSettingsOpen)}
            className="w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium text-gray-500 hover:bg-gray-50 hover:text-black transition-all"
          >
            <div className="flex items-center gap-3">
              <Settings size={20} />
              <span>Settings</span>
            </div>
            <ChevronDown size={16} className={`transition-transform ${isSettingsOpen ? 'rotate-180' : ''}`} />
          </button>
          
          {/* Dropdown Menu Items */}
          {isSettingsOpen && (
            <div className="ml-8 mt-2 space-y-1">
              <NavLink
                to="/admin/settings/appearance"
                className={({ isActive }) => `
                  flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition-all
                  ${isActive ? 'text-black font-bold' : 'text-gray-500 hover:text-black'}
                `}
              >
                <Palette size={18} />
                <span>Appearance (Home)</span>
              </NavLink>
            </div>
          )}
        </div>
      </nav>

      <div className="p-4 border-t border-gray-50">
        <button className="flex items-center gap-3 px-4 py-3 w-full text-sm font-medium text-red-500 hover:bg-red-50 rounded-lg transition-all">
          <LogOut size={20} />
          Log Out
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;