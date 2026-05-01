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
      {/* الـ Overlay بقى فوق التوب ناف برضه */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* السايد بار واخد z-50 عشان يغطي على أي حاجة */}
      <aside className={`
        fixed lg:sticky top-0 left-0 z-50
        w-64 h-screen bg-white border-r border-gray-100 flex flex-col
        transition-transform duration-500 cubic-bezier(0.4, 0, 0.2, 1)
        ${isOpen ? 'translate-x-0 shadow-[20px_0_60px_-15px_rgba(0,0,0,0.3)]' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* هيدر صغير جوه السايد بار للموبايل عشان زرار القفل */}
        <div className="p-6 border-b border-gray-50 lg:hidden flex justify-between items-center">
          <span className="font-black italic">MENU</span>
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
                flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-black transition-all duration-300
                ${isActive 
                  ? 'bg-black text-white shadow-lg translate-x-2' 
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