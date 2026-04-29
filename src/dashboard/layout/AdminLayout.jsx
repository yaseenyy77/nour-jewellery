import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopNav from './TopNav'; // We will create this next

const AdminLayout = () => {
  return (
    <div className="flex bg-[#fcfcfc] min-h-screen">
      {/* Left Navigation */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Header */}
        <TopNav />

        {/* Dynamic Page Content */}
        <main className="p-8">
          <Outlet /> 
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;