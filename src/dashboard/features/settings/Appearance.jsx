import React, { useState } from 'react';
import { 
  Image as ImageIcon, 
  Palette, 
  Layout, 
  Plus, 
  Trash2, 
  Save,
  CheckCircle2
} from 'lucide-react';

const Appearance = () => {
  // حالة تجريبية للتحكم في البانرات
  const [banners, setBanners] = useState([
    { id: 1, url: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8', title: 'Summer Collection' },
  ]);

  const [activeColor, setActiveColor] = useState('#000000');

  return (
    <div className="max-w-5xl animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header */}
      <div className="flex justify-between items-end mb-10">
        <div>
          <h1 className="text-3xl font-black tracking-tighter uppercase italic">Appearance</h1>
          <p className="text-gray-400 text-sm mt-1">Customize your store's visual identity and banners</p>
        </div>
        <button className="flex items-center gap-2 bg-black text-white px-6 py-3 rounded-xl hover:bg-zinc-800 transition-all shadow-lg hover:shadow-black/20 font-bold text-sm">
          <Save size={18} />
          SAVE CHANGES
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Banners Management */}
        <div className="lg:col-span-2 space-y-6">
          <section className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gray-50 rounded-lg text-black">
                  <ImageIcon size={20} />
                </div>
                <h2 className="font-bold text-lg">Hero Banners</h2>
              </div>
              <button className="text-xs font-bold uppercase tracking-widest flex items-center gap-1 hover:text-blue-600 transition-colors">
                <Plus size={14} /> Add Banner
              </button>
            </div>

            {/* Banners List */}
            <div className="space-y-4">
              {banners.map((banner) => (
                <div key={banner.id} className="group relative h-48 rounded-2xl overflow-hidden border border-gray-100 bg-gray-50">
                  <img src={banner.url} alt="" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-6">
                    <div className="flex justify-between items-end text-white">
                      <div>
                        <p className="text-[10px] uppercase tracking-widest font-mono opacity-70">Banner Title</p>
                        <h3 className="font-bold italic uppercase tracking-tighter">{banner.title}</h3>
                      </div>
                      <button className="p-2 bg-white/10 backdrop-blur-md rounded-lg hover:bg-red-500 transition-colors">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Home Sections Toggle */}
          <section className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-gray-50 rounded-lg text-black">
                <Layout size={20} />
              </div>
              <h2 className="font-bold text-lg">Home Page Layout</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              {['New Arrivals', 'Best Sellers', 'Instagram Feed', 'Newsletter Section'].map((section) => (
                <div key={section} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-transparent hover:border-black transition-all cursor-pointer group">
                  <span className="font-medium text-gray-700">{section}</span>
                  <div className="w-10 h-5 bg-black rounded-full relative p-1">
                    <div className="absolute right-1 w-3 h-3 bg-white rounded-full" />
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right Column: Colors & Fonts */}
        <div className="space-y-6">
          <section className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-gray-50 rounded-lg text-black">
                <Palette size={20} />
              </div>
              <h2 className="font-bold text-lg">Theme Colors</h2>
            </div>

            <div className="space-y-6">
              <div>
                <p className="text-xs uppercase tracking-widest text-gray-400 mb-3">Primary Brand Color</p>
                <div className="flex gap-3">
                  {['#000000', '#2563eb', '#db2777', '#059669'].map((color) => (
                    <button 
                      key={color}
                      onClick={() => setActiveColor(color)}
                      className={`w-10 h-10 rounded-full border-2 transition-transform active:scale-90 ${activeColor === color ? 'border-black scale-110 shadow-lg' : 'border-transparent'}`}
                      style={{ backgroundColor: color }}
                    >
                      {activeColor === color && <CheckCircle2 size={14} className="text-white mx-auto" />}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="p-4 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                <p className="text-[10px] text-gray-400 font-mono">COLOR HEX CODE</p>
                <input 
                  type="text" 
                  value={activeColor} 
                  onChange={(e) => setActiveColor(e.target.value)}
                  className="bg-transparent font-bold text-lg focus:outline-none w-full"
                />
              </div>
            </div>
          </section>

          {/* Quick Preview Card */}
          <section className="bg-black text-white rounded-3xl p-8 overflow-hidden relative group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:rotate-12 transition-transform duration-500">
              <ImageIcon size={120} />
            </div>
            <h3 className="font-black italic uppercase tracking-tighter text-xl mb-2">Live Preview</h3>
            <p className="text-xs text-gray-400 mb-6">See how your changes look on the live site.</p>
            <button className="w-full py-3 bg-white text-black font-bold rounded-xl text-xs uppercase tracking-widest hover:scale-105 transition-transform">
              Open Webstore
            </button>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Appearance;