import React, { useState } from 'react';
import { Outlet, useLocation, Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopNav from './TopNav';
import { 
  BarChart3, LineChart, Table, PlusCircle, Tags, 
  ListOrdered, FileText, Truck, Users, Shield, 
  Settings2, CreditCard, Palette, ChevronRight
} from 'lucide-react';

const dashboardStructure = {
  '/admin/overview': { title: 'OVERVIEW DASHBOARD', files: [
    { name: 'STATS CARDS', icon: <BarChart3 />, path: '/admin/overview/stats' },
    { name: 'SALES CHART', icon: <LineChart />, path: '/admin/overview/charts' },
  ]},
  '/admin/products': { title: 'PRODUCTS CONTROL', files: [
    { name: 'PRODUCT TABLE', icon: <Table />, path: '/admin/products/table' },
    { name: 'ADD PRODUCT', icon: <PlusCircle />, path: '/admin/products/add' },
    { name: 'CATEGORIES', icon: <Tags />, path: '/admin/products/categories' },
  ]},
  '/admin/orders': { title: 'ORDERS MANAGEMENT', files: [
    { name: 'ORDER LIST', icon: <ListOrdered />, path: '/admin/orders/list' },
    { name: 'ORDER DETAILS', icon: <FileText />, path: '/admin/orders/details' },
    { name: 'SHIPPING', icon: <Truck />, path: '/admin/orders/shipping' },
  ]},
  '/admin/customers': { title: 'CUSTOMERS HUB', files: [
    { name: 'CUSTOMERS LIST', icon: <Users />, path: '/admin/customers/list' },
    { name: 'ADMIN ROLES', icon: <Shield />, path: '/admin/customers/roles' },
  ]},
  '/admin/settings': { title: 'SYSTEM SETTINGS', files: [
    { name: 'GENERAL', icon: <Settings2 />, path: '/admin/settings/general' },
    { name: 'PAYMENTS', icon: <CreditCard />, path: '/admin/settings/payment' },
    { name: 'APPEARANCE', icon: <Palette />, path: '/admin/settings/appearance' },
  ]}
};

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const currentCategory = dashboardStructure[location.pathname];

  return (
    <div className="min-h-screen bg-[#fcfcfc] flex flex-col font-sans" dir="ltr">
      {/* استدعاء التوب ناف وإرسال حالة السايد بار */}
      <TopNav isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
      
      <div className="flex flex-1 relative">
        {/* السايد بار */}
        <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
        
        {/* المحتوى الرئيسي */}
        <main className="flex-1 p-6 md:p-12 transition-all">
          {currentCategory ? (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div className="mb-12">
                <h2 className="text-3xl font-black tracking-tighter text-black flex items-center gap-3">
                  <span className="w-12 h-[2px] bg-black"></span>
                  {currentCategory.title}
                </h2>
              </div>
              
              {/* شبكة الكروت التفاعلية والذكية */}
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {currentCategory.files.map((file, index) => (
                  <Link
                    key={index}
                    to={file.path}
                    className="group relative flex flex-row items-center gap-5 p-7 w-full border border-gray-100 rounded-3xl transition-all duration-300 hover:border-black hover:bg-black active:scale-95 shadow-sm md:aspect-square md:flex-col md:items-center md:justify-center md:p-10 md:rounded-3xl md:overflow-hidden md:shadow-none animate-in fade-in-up duration-500 delay-[20ms]"
                  >
                    {/* خلفية مخفية بتظهر في الهوفر للديسكتاب */}
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-black opacity-0 group-hover:opacity-100 transition-opacity duration-500 md:block hidden z-0"></div>
                    
                    {/* الأيقونة */}
                    <div className="relative z-10 text-black group-hover:text-white transition-all duration-500 group-hover:rotate-[360deg] md:mb-4">
                      {React.cloneElement(file.icon, { size: 38, strokeWidth: 1.5 })}
                    </div>
                    
                    {/* النص */}
                    <div className="flex-1 md:flex-none">
                        <span className="relative z-10 text-lg font-bold text-gray-800 transition-colors duration-500 md:text-[11px] md:font-black md:tracking-[0.2em] md:text-gray-400 group-hover:text-white text-left md:text-center">
                          {file.name}
                        </span>
                    </div>

                    {/* سهم الموبايل الصغير (مخفي في الديسكتاب) */}
                    <ChevronRight size={24} className="text-gray-400 group-hover:text-white transition-colors duration-500 md:hidden" />
                  </Link>
                ))}
              </div>
            </div>
          ) : (
            <Outlet />
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;