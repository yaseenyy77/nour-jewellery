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
  const currentCategory = dashboardStructure[location.pathname];

  return (
    <div className="min-h-screen bg-[#fcfcfc] flex flex-col font-sans selection:bg-black selection:text-white" dir="ltr">
      {/* التوب ناف تحت السايد بار في الترتيب الرأسي */}
      <TopNav isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
      
      <div className="flex flex-1">
        {/* السايد بار واخد z-50 عشان يغطي على التوب ناف */}
        <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
        
        <main className="flex-1 p-4 md:p-12 transition-all">
          {currentCategory ? (
            <div className="animate-in fade-in zoom-in-95 duration-500">
              {/* عنوان مسمسم */}
              <div className="mb-8 md:mb-14">
                <h2 className="text-xl md:text-3xl font-black tracking-tight text-black flex items-center gap-3">
                  <span className="w-10 h-[3px] bg-black"></span>
                  <span className="uppercase tracking-tighter">{currentCategory.title}</span>
                </h2>
              </div>
              
              {/* شبكة صغنونة: 3 في الصف للموبايل لتقليل الحجم */}
              <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 md:gap-8">
                {currentCategory.files.map((file, index) => (
                  <Link
                    key={index}
                    to={file.path}
                    className="group relative aspect-square flex flex-col items-center justify-center bg-white border border-gray-100 rounded-xl md:rounded-[2rem] transition-all duration-500 hover:bg-black hover:scale-105 active:scale-90 shadow-sm hover:shadow-2xl overflow-hidden"
                  >
                    {/* انيميشن اللف رجع يا وحش */}
                    <div className="relative z-10 text-black group-hover:text-white transition-all duration-700 ease-in-out group-hover:rotate-[360deg] mb-1 md:mb-4">
                      {React.cloneElement(file.icon, { 
                        size: 22, // حجم أصغر للموبايل
                        className: "md:w-10 md:h-10", // حجم أكبر للديسكتاب
                        strokeWidth: 1.5 
                      })}
                    </div>
                    
                    {/* نص مسمسم جداً */}
                    <span className="relative z-10 text-[7px] md:text-[11px] font-black tracking-[0.15em] text-gray-400 group-hover:text-white text-center uppercase px-1">
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