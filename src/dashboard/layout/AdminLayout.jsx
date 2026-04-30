import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const AdminLayout = () => {
  return (
    /* ضفنا dir="ltr" هنا بشكل صريح عشان نفرض الاتجاه من الشمال لليمين على لوحة التحكم بالكامل */
    <div className="flex bg-[#fcfcfc] min-h-screen" dir="ltr">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        {/* TopNav */}
        <main className="p-8">
          <Outlet /> 
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;