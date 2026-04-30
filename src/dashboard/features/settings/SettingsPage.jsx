import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Palette, 
  Settings2, 
  CreditCard, 
  ChevronRight,
  Monitor
} from 'lucide-react';

const SettingsPage = () => {
  const navigate = useNavigate();

  // مصفوفة الخيارات المرتبطة بالملفات اللي في الصورة عندك
  const settingsOptions = [
    { 
      title: 'Appearance', 
      desc: 'تحكم في شكل الصفحة الرئيسية، الألوان، والبانرات', 
      icon: <Palette className="text-black" size={24} />, 
      path: '/admin/settings/appearance', // تأكد من مطابقة المسار في App.jsx
      fileName: 'Appearance.jsx'
    },
    { 
      title: 'General Settings', 
      desc: 'إعدادات الموقع العامة، اللوجو، ومعلومات التواصل', 
      icon: <Settings2 className="text-black" size={24} />, 
      path: '/admin/settings/general',
      fileName: 'GeneralSettings.jsx'
    },
    { 
      title: 'Payment Settings', 
      desc: 'إدارة طرق الدفع وتفعيل الفيزا أو الكاش', 
      icon: <CreditCard className="text-black" size={24} />, 
      path: '/admin/settings/payment',
      fileName: 'PaymentSettings.jsx'
    },
  ];

  return (
    <div className="max-w-5xl animate-in fade-in duration-500">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-black tracking-tighter uppercase italic">Settings</h1>
        <p className="text-gray-400 text-sm mt-1">Manage your store configuration and appearance</p>
      </div>

      {/* Buttons Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {settingsOptions.map((option) => (
          <button
            key={option.title}
            onClick={() => navigate(option.path)}
            className="group relative flex flex-col p-8 bg-white border border-gray-100 rounded-2xl transition-all duration-300 hover:shadow-2xl hover:shadow-gray-100 hover:border-black text-left"
          >
            {/* Icon Box */}
            <div className="mb-6 p-4 w-fit rounded-xl bg-gray-50 group-hover:bg-black group-hover:text-white transition-colors duration-300">
              {option.icon}
            </div>

            {/* Text Content */}
            <div className="flex-1">
              <h3 className="text-lg font-bold text-gray-900 group-hover:text-black mb-2">
                {option.title}
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                {option.desc}
              </p>
            </div>

            {/* Bottom Info & Arrow */}
            <div className="mt-8 pt-4 border-t border-gray-50 flex items-center justify-between w-full">
              <span className="text-[10px] font-mono text-gray-300 uppercase tracking-widest">
                File: {option.fileName}
              </span>
              <ChevronRight size={18} className="text-gray-300 group-hover:text-black group-hover:translate-x-1 transition-all" />
            </div>

            {/* Hover Decorative Element */}
            <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-transparent group-hover:bg-black transition-all" />
          </button>
        ))}
      </div>

      {/* Quick Help Section */}
      <div className="mt-12 p-6 bg-gray-50 rounded-2xl border border-gray-100 flex items-center gap-4">
        <div className="p-2 bg-white rounded-lg shadow-sm">
          <Monitor size={20} className="text-gray-400" />
        </div>
        <p className="text-xs text-gray-500">
          <strong>Tip:</strong> Any changes made in <b>Appearance.jsx</b> will reflect instantly on your store's front-end home page.
        </p>
      </div>
    </div>
  );
};

export default SettingsPage;