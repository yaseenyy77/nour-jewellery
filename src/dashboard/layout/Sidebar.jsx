import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, Package, ShoppingBag, Users, Settings, LogOut,
  ChevronDown, ChevronRight, BarChart3, LineChart, Table, PlusCircle, 
  Tags, ListOrdered, FileText, Truck, Contact, Shield, Settings2, 
  CreditCard, Palette 
} from 'lucide-react';

// تقسيم القوائم بناءً على هيكل الملفات اللي تم إرساله
const menuItems = [
  { 
    name: 'Overview', 
    icon: <LayoutDashboard size={20} />, 
    path: '/admin/overview',
    subItems: [
      { name: 'Stats Cards', path: '/admin/overview/stats-cards', icon: <BarChart3 size={16} /> },
      { name: 'Sales Chart', path: '/admin/overview/sales-chart', icon: <LineChart size={16} /> }
    ]
  },
  { 
    name: 'Products', 
    icon: <Package size={20} />, 
    path: '/admin/products',
    subItems: [
      { name: 'Product Table', path: '/admin/products/table', icon: <Table size={16} /> },
      { name: 'Add Product', path: '/admin/products/add', icon: <PlusCircle size={16} /> },
      { name: 'Category Manager', path: '/admin/products/categories', icon: <Tags size={16} /> }
    ]
  },
  { 
    name: 'Orders', 
    icon: <ShoppingBag size={20} />, 
    path: '/admin/orders',
    subItems: [
      { name: 'Order List', path: '/admin/orders/list', icon: <ListOrdered size={16} /> },
      { name: 'Order Details', path: '/admin/orders/details', icon: <FileText size={16} /> },
      { name: 'Shipping Status', path: '/admin/orders/shipping', icon: <Truck size={16} /> }
    ]
  },
  { 
    name: 'Customers', 
    icon: <Users size={20} />, 
    path: '/admin/customers',
    subItems: [
      { name: 'Customers List', path: '/admin/customers/list', icon: <Contact size={16} /> },
      { name: 'Admin Roles', path: '/admin/customers/roles', icon: <Shield size={16} /> }
    ]
  },
  { 
    name: 'Settings', 
    icon: <Settings size={20} />, 
    path: '/admin/settings',
    subItems: [
      { name: 'General Settings', path: '/admin/settings/general', icon: <Settings2 size={16} /> },
      { name: 'Payment Settings', path: '/admin/settings/payment', icon: <CreditCard size={16} /> },
      { name: 'Appearance', path: '/admin/settings/appearance', icon: <Palette size={16} /> }
    ]
  },
];

const Sidebar = () => {
  const [openMenu, setOpenMenu] = useState(null);
  const location = useLocation();

  // لفتح القائمة تلقائياً إذا كان الرابط الحالي يتبع نفس القسم
  useEffect(() => {
    const currentMenu = menuItems.find(item => location.pathname.includes(item.path));
    if (currentMenu) {
      setOpenMenu(currentMenu.name);
    }
  }, [location.pathname]);

  const toggleMenu = (name) => {
    setOpenMenu(openMenu === name ? null : name);
  };

  return (
    <aside className="w-64 h-screen bg-white border-r border-gray-100 flex flex-col sticky top-0">
      {/* Logo Section */}
      <div className="p-8 border-b border-gray-50">
        <h1 className="text-2xl font-black tracking-tighter italic">NOUR ADMIN</h1>
      </div>

      {/* Navigation Links (Accordion Style) */}
      <nav className="flex-1 p-4 space-y-2 mt-2 overflow-y-auto custom-scrollbar">
        {menuItems.map((item) => {
          const isActiveGroup = location.pathname.includes(item.path);
          const isOpen = openMenu === item.name;

          return (
            <div key={item.name} className="flex flex-col">
              {/* Main Button */}
              <button
                onClick={() => toggleMenu(item.name)}
                className={`
                  flex items-center justify-between w-full px-4 py-3 rounded-lg text-sm font-medium transition-all
                  ${isActiveGroup 
                    ? 'bg-black text-white shadow-lg' 
                    : 'text-gray-500 hover:bg-gray-50 hover:text-black'}
                `}
              >
                <div className="flex items-center gap-3">
                  {item.icon}
                  <span>{item.name}</span>
                </div>
                {/* Arrow icon toggling based on open state */}
                {isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
              </button>

              {/* Sub-menu Items */}
              <div 
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  isOpen ? 'max-h-64 opacity-100 mt-1' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="flex flex-col gap-1 pl-4 ml-6 py-2 border-l border-gray-100">
                  {item.subItems.map((subItem) => (
                    <NavLink
                      key={subItem.name}
                      to={subItem.path}
                      className={({ isActive }) => `
                        flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition-all
                        ${isActive 
                          ? 'text-black bg-gray-100 font-bold' 
                          : 'text-gray-400 hover:text-black hover:bg-gray-50'}
                      `}
                    >
                      {subItem.icon}
                      <span>{subItem.name}</span>
                    </NavLink>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </nav>

      {/* Logout Section */}
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