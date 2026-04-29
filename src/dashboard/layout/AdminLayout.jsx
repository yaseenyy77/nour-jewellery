import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const AdminLayout = () => {
  return (
    /* أزلنا dir="rtl" ليعود التصميم للوضع الافتراضي (من اليسار لليمين) */
    <div className="flex bg-[#fcfcfc] min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        {/* TopNav لو عملته مستقبلاً سيكون مكانه هنا وهيكون متناسق مع الـ LTR */}
        <main className="p-8">
          <Outlet /> 
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;