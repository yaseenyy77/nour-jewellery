import React, { useState } from 'react';
import { Outlet, useLocation, Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopNav from './TopNav';
import { 
  BarChart3, LineChart, Table, PlusCircle, Tags, 
  ListOrdered, FileText, Truck, Users, Shield, 
  Settings2, CreditCard, Palette
} from 'lucide-react';

// هيكل الداش بورد بأسماء كاملة وواضحة تماماً بدون أي اختصارات
const dashboardStructure = {
  '/admin/overview': { 
    title: 'OVERVIEW & ANALYTICS', 
    files: [
      { name: 'OVERVIEW STATISTICS', icon: <BarChart3 />, path: '/admin/overview/stats' },
      { name: 'SALES PERFORMANCE CHARTS', icon: <LineChart />, path: '/admin/overview/charts' },
    ]
  },
  '/admin/products': { 
    title: 'PRODUCT MANAGEMENT', 
    files: [
      { name: 'ALL PRODUCTS TABLE', icon: <Table />, path: '/admin/products/table' },
      { name: 'ADD NEW PRODUCT', icon: <PlusCircle />, path: '/admin/products/add' },
      { name: 'PRODUCT CATEGORIES & TAGS', icon: <Tags />, path: '/admin/products/categories' },
    ]
  },
  '/admin/orders': { 
    title: 'ORDER MANAGEMENT', 
    files: [
      { name: 'ORDERS MASTER LIST', icon: <ListOrdered />, path: '/admin/orders/list' },
      { name: 'ORDER DETAILS & INVOICES', icon: <FileText />, path: '/admin/orders/details' },
      { name: 'SHIPPING & DISPATCH INFO', icon: <Truck />, path: '/admin/orders/shipping' },
    ]
  },
  '/admin/customers': { 
    title: 'USER MANAGEMENT', 
    files: [
      { name: 'CUSTOMER DATABASE', icon: <Users />, path: '/admin/customers/list' },
      { name: 'ADMIN ROLES & PERMISSIONS', icon: <Shield />, path: '/admin/customers/roles' },
    ]
  },
  '/admin/settings': { 
    title: 'SYSTEM CONFIGURATION', 
    files: [
      { name: 'GENERAL STORE SETTINGS', icon: <Settings2 />, path: '/admin/settings/general' },
      { name: 'PAYMENT GATEWAYS', icon: <CreditCard />, path: '/admin/settings/payment' },
      { name: 'APPEARANCE & VISUAL UI', icon: <Palette />, path: '/admin/settings/appearance' },
    ]
  }
};

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const currentCategory = dashboardStructure[location.pathname];

  return (
    <div className="min-h-screen bg-[#fafafa] font-sans antialiased text-black select-none" dir="ltr">
      
      {/* السايد بار الثابت */}
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      
      {/* الحاوية الرئيسية مع ترك مساحة ثابتة للسايد بار على الشاشات الكبيرة */}
      <div className="flex flex-col min-h-screen transition-all duration-500 lg:pl-64">
        
        {/* شريط التنقل العلوي */}
        <TopNav isSidebarOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
        
        {/* مساحة العمل ومحتوى الصفحات */}
        <main className="flex-1 p-6 md:p-10 lg:p-14 overflow-x-hidden">
          {currentCategory ? (
            <div className="animate-in fade-in-50 slide-in-from-bottom-2 duration-700">
              
              {/* عنوان القسم بتصميم خطي معاصر */}
              <div className="mb-10 flex items-center gap-4">
                <span className="w-10 h-[2px] bg-black block rounded-full"></span>
                <h2 className="text-sm md:text-base font-black tracking-[0.25em] text-black uppercase">
                  {currentCategory.title}
                </h2>
              </div>
              
              {/* شبكة الأزرار بتصميم أبيض وأسود فاخر ومتجاوب */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentCategory.files.map((file, index) => (
                  <Link
                    key={index}
                    to={file.path}
                    className="group relative flex items-center gap-5 p-6 bg-white border border-gray-100/80 rounded-2xl transition-all duration-500 hover:bg-black hover:border-black shadow-sm hover:shadow-xl hover:-translate-y-1 overflow-hidden"
                  >
                    {/* الأيقونة داخل مربع مباين */}
                    <div className="p-3.5 bg-gray-50 rounded-xl text-black group-hover:bg-white/10 group-hover:text-white transition-all duration-500 group-hover:rotate-[6deg]">
                      {React.cloneElement(file.icon, { 
                        size: 22,
                        strokeWidth: 1.3
                      })}
                    </div>
                    
                    {/* نصوص الزرار الكاملة */}
                    <div className="flex flex-col">
                      <span className="text-[11px] font-black tracking-widest text-black group-hover:text-white transition-colors duration-500 uppercase">
                        {file.name}
                      </span>
                      <span className="text-[9px] text-gray-400 mt-0.5 tracking-wider group-hover:text-gray-300 transition-colors duration-500">
                        Manage and edit section files
                      </span>
                    </div>

                    {/* سهم صغير جمالي يظهر عند الهوفر */}
                    <div className="absolute right-6 opacity-0 group-hover:opacity-100 group-hover:right-5 transition-all duration-500 text-white text-xs font-serif">
                      →
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ) : (
            /* في حالة الدخول للمسارات الفرعية الفعلية */
            <div className="animate-in fade-in duration-500">
               <Outlet />
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;