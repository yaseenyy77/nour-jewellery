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

// مصفوفة العناصر الأساسية في القائمة الجانبية
const menuItems = [
  { name: 'Overview', icon: <LayoutDashboard size={20} />, path: '/admin/overview' },
  { name: 'Products', icon: <Package size={20} />, path: '/admin/products' },
  { name: 'Orders', icon: <ShoppingBag size={20} />, path: '/admin/orders' },
  { name: 'Customers', icon: <Users size={20} />, path: '/admin/customers' },
  // عند الضغط على هذا الزر، سيتم فتح صفحة SettingsPage.jsx في المنطقة الرئيسية
  { name: 'Settings', icon: <Settings size={20} />, path: '/admin/settings' },
];

const Sidebar = () => {
  return (
    <aside className="w-64 h-screen bg-white border-r border-gray-100 flex flex-col sticky top-0">
      {/* Logo Section */}
      <div className="p-8 border-b border-gray-50">
        <h1 className="text-2xl font-black tracking-tighter italic uppercase">NOUR ADMIN</h1>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 p-4 space-y-2 mt-4">
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            // خاصية isActive بتغير شكل الزرار تلقائياً لما تكون في الصفحة الخاصة به[cite: 2]
            className={({ isActive }) => `
              flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200
              ${isActive 
                ? 'bg-black text-white shadow-lg shadow-gray-200' 
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
        <button className="flex items-center gap-3 px-4 py-3 w-full text-sm font-medium text-red-500 hover:bg-red-50 rounded-lg transition-all duration-200">
          <LogOut size={20} />
          Log Out
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;