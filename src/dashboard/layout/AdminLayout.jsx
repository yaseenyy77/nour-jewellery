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
  '/admin/overview': { title: 'DASHBOARD', files: [
    { name: 'STATS', icon: <BarChart3 />, path: '/admin/overview/stats' },
    { name: 'SALES', icon: <LineChart />, path: '/admin/overview/charts' },
  ]},
  '/admin/products': { title: 'INVENTORY', files: [
    { name: 'TABLE', icon: <Table />, path: '/admin/products/table' },
    { name: 'ADD', icon: <PlusCircle />, path: '/admin/products/add' },
    { name: 'TAGS', icon: <Tags />, path: '/admin/products/categories' },
  ]},
  '/admin/orders': { title: 'ORDERS', files: [
    { name: 'LIST', icon: <ListOrdered />, path: '/admin/orders/list' },
    { name: 'INFO', icon: <FileText />, path: '/admin/orders/details' },
    { name: 'SHIP', icon: <Truck />, path: '/admin/orders/shipping' },
  ]},
  '/admin/customers': { title: 'CLIENTS', files: [
    { name: 'LIST', icon: <Users />, path: '/admin/customers/list' },
    { name: 'ROLES', icon: <Shield />, path: '/admin/customers/roles' },
  ]},
  '/admin/settings': { title: 'CONFIG', files: [
    { name: 'BASE', icon: <Settings2 />, path: '/admin/settings/general' },
    { name: 'PAY', icon: <CreditCard />, path: '/admin/settings/payment' },
    { name: 'UI', icon: <Palette />, path: '/admin/settings/appearance' },
  ]}
};

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  
  // تأمين الكود: لو المسار مش في الأوبجكت ميرميش Error
  const currentCategory = dashboardStructure[location.pathname];

  return (
    <div className="min-h-screen bg-[#fcfcfc] flex flex-col font-sans" dir="ltr">
      <TopNav isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
      
      <div className="flex flex-1 overflow-hidden">
        <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
        
        <main className="flex-1 p-4 md:p-12 overflow-y-auto transition-all">
          {currentCategory ? (
            <div className="animate-in fade-in zoom-in-95 duration-500">
              <div className="mb-8">
                <h2 className="text-xl md:text-3xl font-black tracking-tight text-black flex items-center gap-3">
                  <span className="w-8 md:w-12 h-[2.5px] bg-black"></span>
                  <span className="uppercase">{currentCategory.title}</span>
                </h2>
              </div>
              
              <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-8">
                {currentCategory.files.map((file, index) => (
                  <Link
                    key={index}
                    to={file.path}
                    className="group relative aspect-square flex flex-col items-center justify-center bg-white border border-gray-100 rounded-2xl md:rounded-[2rem] transition-all duration-500 hover:bg-black hover:scale-105 active:scale-95 shadow-sm hover:shadow-xl overflow-hidden"
                  >
                    <div className="relative z-10 text-black group-hover:text-white transition-all duration-700 group-hover:rotate-[360deg] mb-1 md:mb-4">
                      {React.cloneElement(file.icon, { 
                        size: 20,
                        className: "md:w-8 md:h-8",
                        strokeWidth: 1.5 
                      })}
                    </div>
                    
                    <span className="relative z-10 text-[7px] md:text-[10px] font-black tracking-widest text-gray-400 group-hover:text-white text-center uppercase">
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