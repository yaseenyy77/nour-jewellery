import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
// import TopNav from './TopNav'; // فك التعليق هنا لو الملف موجود

const AdminLayout = () => {
  return (
    <div className="flex bg-[#fcfcfc] min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        {/* <TopNav /> تم إيقافها مؤقتاً لمنع الشاشة البيضاء */}
        <main className="p-8">
          <Outlet /> 
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;