import React from 'react';
import { DollarSign, ShoppingBag, Users, Percent } from 'lucide-react';

const stats = [
  { label: 'Total Revenue', value: 'LE 124,500', icon: DollarSign, trend: '+12%', color: 'text-blue-600' },
  { label: 'Total Orders', value: '1,240', icon: ShoppingBag, trend: '+5%', color: 'text-purple-600' },
  { label: 'Active Customers', value: '850', icon: Users, trend: '+18%', color: 'text-orange-600' },
  { label: 'Conversion Rate', value: '3.2%', icon: Percent, trend: '+2%', color: 'text-green-600' },
];

const StatsCards = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
    {stats.map((stat, i) => (
      <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">{stat.label}</p>
            <h3 className="text-2xl font-black text-black tracking-tight">{stat.value}</h3>
            <span className="text-[10px] font-bold text-green-500 mt-2 block">{stat.trend} <span className="text-gray-300 font-medium ml-1">vs last month</span></span>
          </div>
          <div className={`p-3 bg-gray-50 rounded-xl ${stat.color}`}>
            <stat.icon size={22} />
          </div>
        </div>
      </div>
    ))}
  </div>
);

export default StatsCards;