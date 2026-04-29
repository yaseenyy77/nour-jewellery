import React from 'react';
import StatsCards from './features/overview/StatsCards';
import SalesChart from './features/overview/SalesChart';

const AdminDashboard = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header Section */}
      <div>
        <h1 className="text-2xl font-black tracking-tight text-black uppercase italic">
          Dashboard Overview
        </h1>
        <p className="text-gray-400 text-sm font-medium mt-1">
          Welcome back! Here's what's happening with KLEO today.
        </p>
      </div>

      {/* 1. Statistics Section - We call the StatsCards here */}
      <StatsCards />

      {/* 2. Analytics Section - We call the SalesChart here */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <SalesChart />
        </div>
        
        {/* Quick Actions Card */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-black uppercase text-xs tracking-widest mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full py-3 bg-black text-white text-[10px] font-bold uppercase tracking-widest rounded-lg hover:bg-gray-900 transition-all">
                Add New Product
              </button>
              <button className="w-full py-3 bg-white border border-gray-100 text-black text-[10px] font-bold uppercase tracking-widest rounded-lg hover:bg-gray-50 transition-all">
                Create Discount
              </button>
            </div>
          </div>
          <div className="mt-6 pt-6 border-t border-gray-50">
            <p className="text-[10px] text-gray-400 font-medium leading-relaxed">
              * Actions here will directly affect the store's public visibility.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;