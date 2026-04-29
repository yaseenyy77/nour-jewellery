import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const AdminLayout = () => {
  return (
    /* ضفنا dir="rtl" عشان التصميم كله يقلب من اليمين للشمال */
    <div className="flex bg-[#fcfcfc] min-h-screen" dir="rtl">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        {/* TopNav لو عملته مستقبلاً هيكون مكانه هنا وهيكون متناسق مع الـ RTL */}
        <main className="p-8">
          <Outlet /> 
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;