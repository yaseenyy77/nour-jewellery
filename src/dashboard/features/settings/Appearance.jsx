import React, { useState } from 'react';
import { 
  Palette, Image as ImageIcon, Type, 
  Check, Upload, Sun, Moon, Layout
} from 'lucide-react';

const Appearance = () => {
  const [selectedColor, setSelectedColor] = useState('#000000');
  const [theme, setTheme] = useState('light');

  const brandColors = [
    { name: 'Classic Black', hex: '#000000' },
    { name: 'Royal Gold', hex: '#D4AF37' },
    { name: 'Deep Navy', hex: '#000080' },
    { name: 'Soft Rose', hex: '#E29595' },
    { name: 'Emerald', hex: '#047857' },
  ];

  return (
    <div className="max-w-5xl mx-auto pb-20">
      {/* Header Section */}
      <div className="mb-10">
        <h1 className="text-3xl font-black tracking-tighter uppercase flex items-center gap-3">
          <Palette className="text-black" size={32} strokeWidth={2.5} />
          Appearance Settings
        </h1>
        <p className="text-gray-400 text-xs font-bold tracking-widest mt-2 uppercase">
          Customize your store's visual identity
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: UI Controls */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Brand Identity Section */}
          <section className="bg-white border border-gray-100 rounded-[2rem] p-8 shadow-sm">
            <h2 className="text-sm font-black tracking-widest uppercase mb-6 flex items-center gap-2">
              <Layout size={18} /> Visual Identity
            </h2>
            
            <div className="space-y-6">
              {/* Color Picker */}
              <div>
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-4">
                  Primary Brand Color
                </label>
                <div className="flex flex-wrap gap-4">
                  {brandColors.map((color) => (
                    <button
                      key={color.hex}
                      onClick={() => setSelectedColor(color.hex)}
                      className={`w-12 h-12 rounded-full border-4 transition-all duration-300 flex items-center justify-center ${
                        selectedColor === color.hex ? 'border-black scale-110' : 'border-transparent'
                      }`}
                      style={{ backgroundColor: color.hex }}
                    >
                      {selectedColor === color.hex && (
                        <Check size={20} className={color.hex === '#000000' ? 'text-white' : 'text-black'} />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Theme Toggle */}
              <div className="pt-6 border-t border-gray-50">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-4">
                  System Theme
                </label>
                <div className="flex gap-4">
                  <button 
                    onClick={() => setTheme('light')}
                    className={`flex-1 py-4 rounded-2xl border-2 flex flex-col items-center gap-2 transition-all ${
                      theme === 'light' ? 'border-black bg-black text-white' : 'border-gray-100 text-gray-400'
                    }`}
                  >
                    <Sun size={20} />
                    <span className="text-[10px] font-black">LIGHT MODE</span>
                  </button>
                  <button 
                    onClick={() => setTheme('dark')}
                    className={`flex-1 py-4 rounded-2xl border-2 flex flex-col items-center gap-2 transition-all ${
                      theme === 'dark' ? 'border-black bg-black text-white' : 'border-gray-100 text-gray-400'
                    }`}
                  >
                    <Moon size={20} />
                    <span className="text-[10px] font-black">DARK MODE</span>
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Hero Section Banner Management */}
          <section className="bg-white border border-gray-100 rounded-[2rem] p-8 shadow-sm">
            <h2 className="text-sm font-black tracking-widest uppercase mb-6 flex items-center gap-2">
              <ImageIcon size={18} /> Home Hero Banner
            </h2>
            <div className="border-2 border-dashed border-gray-100 rounded-3xl p-10 flex flex-col items-center justify-center group hover:border-black transition-colors cursor-pointer">
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4 group-hover:bg-black group-hover:text-white transition-all">
                <Upload size={24} />
              </div>
              <p className="text-[10px] font-black tracking-widest text-gray-400 uppercase">Click to upload new banner</p>
              <p className="text-[8px] text-gray-300 mt-2">Recommended size: 1920x1080px</p>
            </div>
          </section>

        </div>

        {/* Right Column: Live Preview Placeholder */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 bg-black rounded-[2.5rem] p-6 text-white min-h-[400px] flex flex-col shadow-2xl overflow-hidden">
             <div className="flex justify-between items-center mb-10">
                <div className="w-8 h-8 rounded-full bg-white/20"></div>
                <div className="flex gap-2">
                  <div className="w-4 h-1 bg-white/20 rounded-full"></div>
                  <div className="w-4 h-1 bg-white/20 rounded-full"></div>
                </div>
             </div>

             <div className="space-y-4">
                <div className="h-4 w-3/4 bg-white/10 rounded-full animate-pulse"></div>
                <div className="h-10 w-full bg-white rounded-xl flex items-center px-4">
                   <div className="h-2 w-20 bg-black/10 rounded-full"></div>
                </div>
                <div className="grid grid-cols-2 gap-2 pt-4">
                   <div className="aspect-square bg-white/5 rounded-2xl"></div>
                   <div className="aspect-square bg-white/5 rounded-2xl"></div>
                </div>
             </div>

             <div className="mt-auto">
                <div 
                  className="w-full py-4 rounded-2xl text-center text-[10px] font-black tracking-[0.3em] transition-colors"
                  style={{ backgroundColor: selectedColor, color: selectedColor === '#000000' ? 'white' : 'black' }}
                >
                  PREVIEW MODE
                </div>
             </div>
          </div>
          <p className="text-center mt-4 text-[9px] font-black text-gray-300 tracking-widest uppercase">
            Live Interface Preview
          </p>
        </div>

      </div>

      {/* Action Bar */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 lg:left-auto lg:right-12 lg:translate-x-0 z-50">
        <button className="bg-black text-white px-10 py-5 rounded-full font-black text-xs tracking-[0.3em] shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center gap-3">
          SAVE CHANGES
        </button>
      </div>
    </div>
  );
};

export default Appearance;