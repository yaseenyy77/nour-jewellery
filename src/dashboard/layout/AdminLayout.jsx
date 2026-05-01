import React from 'react';
import { Outlet, useLocation, Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import { 
  BarChart3, LineChart, Table, PlusCircle, Tags, 
  ListOrdered, FileText, Truck, Users, Shield, 
  Settings2, CreditCard, Palette 
} from 'lucide-react';

// تعريف هيكل الملفات لكل قسم بناءً على الملف اللي بعته
const dashboardStructure = {
  '/admin/overview': {
    title: 'Overview Analytics',
    files: [
      { name: 'Stats Cards', icon: <BarChart3 />, path: '/admin/overview/stats' },
      { name: 'Sales Chart', icon: <LineChart />, path: '/admin/overview/charts' },
    ]
  },
  '/admin/products': {
    title: 'Product Management',
    files: [
      { name: 'Product Table', icon: <Table />, path: '/admin/products/table' },
      { name: 'Add Product', icon: <PlusCircle />, path: '/admin/products/add' },
      { name: 'Category Manager', icon: <Tags />, path: '/admin/products/categories' },
    ]
  },
  '/admin/orders': {
    title: 'Order Management',
    files: [
      { name: 'Order List', icon: <ListOrdered />, path: '/admin/orders/list' },
      { name: 'Order Details', icon: <FileText />, path: '/admin/orders/details' },
      { name: 'Shipping Status', icon: <Truck />, path: '/admin/orders/shipping' },
    ]
  },
  '/admin/customers': {
    title: 'User Management',
    files: [
      { name: 'Customers List', icon: <Users />, path: '/admin/customers/list' },
      { name: 'Admin Roles', icon: <Shield />, path: '/admin/customers/roles' },
    ]
  },
  '/admin/settings': {
    title: 'Settings Page',
    files: [
      { name: 'General Settings', icon: <Settings2 />, path: '/admin/settings/general' },
      { name: 'Payment Settings', icon: <CreditCard />, path: '/admin/settings/payment' },
      { name: 'Appearance', icon: <Palette />, path: '/admin/settings/appearance' },
    ]
  }
};

const AdminLayout = () => {
  const location = useLocation();
  
  // التحقق إذا كان المسار الحالي هو أحد الأقسام الرئيسية لعرض الأزرار المربعة
  const currentCategory = dashboardStructure[location.pathname];

  return (
    <div className="flex bg-[#fcfcfc] min-h-screen" dir="ltr">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <main className="p-8">
          {/* لو إحنا في صفحة رئيسية (زي Settings)، اعرض الأزرار المربعة */}
          {currentCategory ? (
            <div>
              <h2 className="text-2xl font-bold mb-8 text-gray-800">{currentCategory.title}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {currentCategory.files.map((file, index) => (
                  <Link
                    key={index}
                    to={file.path}
                    className="group flex flex-col items-center justify-center p-10 bg-white border-2 border-gray-100 rounded-2xl transition-all duration-300 hover:border-black hover:shadow-xl hover:-translate-y-1"
                  >
                    <div className="mb-4 p-4 bg-gray-50 rounded-xl group-hover:bg-black group-hover:text-white transition-colors duration-300">
                      {React.cloneElement(file.icon, { size: 32 })}
                    </div>
                    <span className="text-sm font-bold text-gray-600 group-hover:text-black">
                      {file.name}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          ) : (
            /* لو ضغطت على زرار من المربعات، يعرض محتوى الملف (الـ Outlet) */
            <Outlet />
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;