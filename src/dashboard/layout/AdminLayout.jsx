import React from 'react';
import { Outlet, useLocation, Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import { 
  BarChart3, LineChart, Table, PlusCircle, Tags, 
  ListOrdered, FileText, Truck, Users, Shield, 
  Settings2, CreditCard, Palette 
} from 'lucide-react';

const dashboardStructure = {
  '/admin/overview': {
    title: 'Overview',
    files: [
      { name: 'Stats Cards', icon: <BarChart3 />, path: '/admin/overview/stats' },
      { name: 'Sales Chart', icon: <LineChart />, path: '/admin/overview/charts' },
    ]
  },
  '/admin/products': {
    title: 'Products',
    files: [
      { name: 'Product Table', icon: <Table />, path: '/admin/products/table' },
      { name: 'Add Product', icon: <PlusCircle />, path: '/admin/products/add' },
      { name: 'Category Manager', icon: <Tags />, path: '/admin/products/categories' },
    ]
  },
  '/admin/orders': {
    title: 'Orders',
    files: [
      { name: 'Order List', icon: <ListOrdered />, path: '/admin/orders/list' },
      { name: 'Order Details', icon: <FileText />, path: '/admin/orders/details' },
      { name: 'Shipping Status', icon: <Truck />, path: '/admin/orders/shipping' },
    ]
  },
  '/admin/customers': {
    title: 'Customers',
    files: [
      { name: 'Customers List', icon: <Users />, path: '/admin/customers/list' },
      { name: 'Admin Roles', icon: <Shield />, path: '/admin/customers/roles' },
    ]
  },
  '/admin/settings': {
    title: 'Settings',
    files: [
      { name: 'General Settings', icon: <Settings2 />, path: '/admin/settings/general' },
      { name: 'Payment Settings', icon: <CreditCard />, path: '/admin/settings/payment' },
      { name: 'Appearance', icon: <Palette />, path: '/admin/settings/appearance' },
    ]
  }
};

const AdminLayout = () => {
  const location = useLocation();
  const currentCategory = dashboardStructure[location.pathname];

  return (
    <div className="flex bg-[#fcfcfc] min-h-screen" dir="ltr">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <main className="p-10">
          {currentCategory ? (
            <div className="max-w-4xl">
              <h2 className="text-xl font-bold mb-8 text-black border-l-4 border-black pl-4">
                {currentCategory.title}
              </h2>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {currentCategory.files.map((file, index) => (
                  <Link
                    key={index}
                    to={file.path}
                    className="group flex flex-col items-center justify-center p-6 bg-white border border-gray-100 rounded-xl transition-all duration-200 hover:bg-black hover:border-black shadow-sm hover:shadow-md"
                  >
                    <div className="mb-3 text-black group-hover:text-white transition-colors duration-200">
                      {React.cloneElement(file.icon, { size: 24 })}
                    </div>
                    <span className="text-[12px] font-bold uppercase tracking-wider text-gray-500 group-hover:text-white text-center transition-colors duration-200">
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