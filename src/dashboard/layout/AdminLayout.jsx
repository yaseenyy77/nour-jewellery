import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const AdminLayout = () => {
  return (
    <div className="flex bg-[#fcfcfc] min-h-screen" dir="ltr">
      {/* السايد بار الثابت على الشمال */}
      <Sidebar />
      
      <div className="flex-1 flex flex-col">
        {/* main هي المنطقة الفاضية اللي كنت معلم عليها */}
        <main className="p-8">
          {/* الـ Outlet هو اللي بيعرض (Overview, Settings, Appearance) بناءً على الرابط */}
          <Outlet /> 
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;