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
  { name: 'نظرة عامة', icon: <LayoutDashboard size={20} />, path: '/admin/overview' },
  { name: 'المنتجات', icon: <Package size={20} />, path: '/admin/products' },
  { name: 'الطلبات', icon: <ShoppingBag size={20} />, path: '/admin/orders' },
  { name: 'العملاء', icon: <Users size={20} />, path: '/admin/customers' },
  { name: 'الإعدادات', icon: <Settings size={20} />, path: '/admin/settings' },
];

const Sidebar = () => {
  return (
    /* غيرنا border-r لـ border-l لأن السايد بار بقى على اليمين */
    <aside className="w-64 h-screen bg-white border-l border-gray-100 flex flex-col sticky top-0">
      {/* Logo Section */}
      <div className="p-8 border-b border-gray-50">
        <h1 className="text-2xl font-black tracking-tighter italic">KLEO ADMIN</h1>
      </div>

      {/* Navigation Links */}
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
      </nav>

      {/* Logout Section */}
      <div className="p-4 border-t border-gray-50">
        <button className="flex items-center gap-3 px-4 py-3 w-full text-sm font-medium text-red-500 hover:bg-red-50 rounded-lg transition-all">
          <LogOut size={20} />
          تسجيل الخروج
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;