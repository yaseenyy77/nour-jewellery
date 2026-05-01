import React, { useState } from 'react';
import { Outlet, useLocation, Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopNav from './TopNav';
import { 
  BarChart3, LineChart, Table, PlusCircle, Tags, 
  ListOrdered, FileText, Truck, Users, Shield, 
  Settings2, CreditCard, Palette
} from 'lucide-react';

const dashboardStructure = {
  '/admin/overview': { title: 'OVERVIEW', files: [
    { name: 'STATS', icon: <BarChart3 />, path: '/admin/overview/stats' },
    { name: 'SALES', icon: <LineChart />, path: '/admin/overview/charts' },
  ]},
  '/admin/products': { title: 'PRODUCTS', files: [
    { name: 'TABLE', icon: <Table />, path: '/admin/products/table' },
    { name: 'ADD', icon: <PlusCircle />, path: '/admin/products/add' },
    { name: 'TYPES', icon: <Tags />, path: '/admin/products/categories' },
  ]},
  '/admin/orders': { title: 'ORDERS', files: [
    { name: 'LIST', icon: <ListOrdered />, path: '/admin/orders/list' },
    { name: 'DETAILS', icon: <FileText />, path: '/admin/orders/details' },
    { name: 'TRACK', icon: <Truck />, path: '/admin/orders/shipping' },
  ]},
  '/admin/customers': { title: 'CUSTOMERS', files: [
    { name: 'ALL', icon: <Users />, path: '/admin/customers/list' },
    { name: 'ROLES', icon: <Shield />, path: '/admin/customers/roles' },
  ]},
  '/admin/settings': { title: 'SETTINGS', files: [
    { name: 'GENERAL', icon: <Settings2 />, path: '/admin/settings/general' },
    { name: 'PAYMENT', icon: <CreditCard />, path: '/admin/settings/payment' },
    { name: 'DESIGN', icon: <Palette />, path: '/admin/settings/appearance' },
  ]}
};

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const currentCategory = dashboardStructure[location.pathname];

  return (
    <div className="min-h-screen bg-[#fcfcfc] flex flex-col font-sans" dir="ltr">
      <TopNav isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
      
      <div className="flex flex-1 relative">
        <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
        
        <main className="flex-1 p-4 md:p-10 transition-all">
          {currentCategory ? (
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
              <div className="mb-6 md:mb-10">
                <h2 className="text-xl md:text-2xl font-black tracking-tighter text-black flex items-center gap-2">
                  <span className="w-8 md:w-12 h-[1.5px] bg-black"></span>
                  {currentCategory.title}
                </h2>
              </div>
              
              {/* شبكة مسمسمة: 2 في الصف للموبايل، ومربعات صغيرة شيك */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-6">
                {currentCategory.files.map((file, index) => (
                  <Link
                    key={index}
                    to={file.path}
                    className="group relative aspect-square flex flex-col items-center justify-center bg-white border border-gray-100 rounded-2xl transition-all duration-300 hover:border-black hover:bg-black active:scale-90 shadow-sm overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:block"></div>
                    
                    <div className="relative z-10 text-black group-hover:text-white transition-all duration-300 mb-2 md:mb-4">
                      {React.cloneElement(file.icon, { size: 28, strokeWidth: 1.5 })}
                    </div>
                    
                    <span className="relative z-10 text-[9px] md:text-[11px] font-black tracking-widest text-gray-400 group-hover:text-white text-center px-2">
                      {file.name}
                    </span>
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