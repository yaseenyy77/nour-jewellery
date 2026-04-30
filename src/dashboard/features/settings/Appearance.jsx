// src/dashboard/features/settings/Appearance.jsx
import React, { useState } from 'react';
import { Save, Trash2, Upload, ImageIcon } from 'lucide-react';

const Appearance = () => {
  const [colors, setColors] = useState({ primary: '#000000', secondary: '#d4af37' });
  const [slides, setSlides] = useState([]);
  const fixedCats = ["Necklaces", "Rings", "Bracelets", "Earrings"];
  const [brands, setBrands] = useState([]);

  // Function to handle Image Upload (converts to local preview URL)
  const handleImageChange = (e, callback) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => callback(reader.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-10">
      <div className="flex justify-between items-center border-b pb-6">
        <h2 className="text-3xl font-black italic">APPEARANCE SETTINGS</h2>
        <button className="bg-black text-white px-10 py-3 rounded-full font-bold flex items-center gap-2 hover:scale-105 transition-transform shadow-xl">
          <Save size={20} /> SAVE ALL CHANGES
        </button>
      </div>

      {/* 1. THEME COLORS */}
      <section className="bg-white p-6 rounded-2xl border shadow-sm grid grid-cols-2 gap-8">
        <div>
          <label className="block font-bold mb-2">Primary Color (Text/Lines)</label>
          <input type="color" value={colors.primary} onChange={e => setColors({...colors, primary: e.target.value})} className="w-full h-12 rounded-lg cursor-pointer" />
        </div>
        <div>
          <label className="block font-bold mb-2">Accent Color (Gold/Hover)</label>
          <input type="color" value={colors.secondary} onChange={e => setColors({...colors, secondary: e.target.value})} className="w-full h-12 rounded-lg cursor-pointer" />
        </div>
      </section>

      {/* 2. HERO SLIDER (FILE UPLOAD) */}
      <section className="bg-white p-6 rounded-2xl border shadow-sm">
        <div className="flex justify-between mb-6">
          <h3 className="text-xl font-bold">Main Hero Slider</h3>
          <button onClick={() => setSlides([...slides, { id: Date.now(), desktop: '', mobile: '' }])} className="text-sm font-bold underline">+ Add New Slide</button>
        </div>
        <div className="space-y-4">
          {slides.map((slide, idx) => (
            <div key={slide.id} className="p-4 bg-gray-50 rounded-xl border flex gap-6 items-center">
               <div className="flex-1 grid grid-cols-2 gap-4">
                  <label className="flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-2 cursor-pointer hover:bg-gray-100">
                    <span className="text-[10px] font-bold">DESKTOP IMAGE (PNG/JPG)</span>
                    <input type="file" accept="image/*" className="hidden" onChange={e => handleImageChange(e, (img) => {const s = [...slides]; s[idx].desktop = img; setSlides(s);})} />
                    {slide.desktop && <img src={slide.desktop} className="h-12 mt-2" />}
                  </label>
                  <label className="flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-2 cursor-pointer hover:bg-gray-100">
                    <span className="text-[10px] font-bold">MOBILE IMAGE (PNG/JPG)</span>
                    <input type="file" accept="image/*" className="hidden" onChange={e => handleImageChange(e, (img) => {const s = [...slides]; s[idx].mobile = img; setSlides(s);})} />
                    {slide.mobile && <img src={slide.mobile} className="h-12 mt-2" />}
                  </label>
               </div>
               <button onClick={() => setSlides(slides.filter(s => s.id !== slide.id))} className="text-red-500"><Trash2 size={20}/></button>
            </div>
          ))}
        </div>
      </section>

      {/* 3. BRANDS & CATEGORIES */}
      <section className="space-y-6">
        <button onClick={() => setBrands([...brands, { id: Date.now(), name: 'NEW BRAND', categories: fixedCats.map(n => ({name: n, image: ''})) }])} className="w-full py-4 border-2 border-black font-black hover:bg-black hover:text-white transition-all">
          + ADD BRAND SECTION
        </button>

        {brands.map((brand, bIdx) => (
          <div key={brand.id} className="bg-white border rounded-2xl overflow-hidden">
            <div className="p-4 bg-black text-white flex justify-between">
              <input value={brand.name} onChange={e => {const b = [...brands]; b[bIdx].name = e.target.value; setBrands(b);}} className="bg-transparent border-none font-bold text-lg focus:ring-0" />
              <button onClick={() => setBrands(brands.filter(b => b.id !== brand.id))}><Trash2 size={18}/></button>
            </div>
            <div className="p-6 grid grid-cols-4 gap-4">
              {brand.categories.map((cat, cIdx) => (
                <label key={cIdx} className="flex flex-col items-center gap-2 cursor-pointer group">
                  <div className="w-full aspect-square bg-gray-100 rounded-lg border-2 border-dashed flex items-center justify-center overflow-hidden">
                    {cat.image ? <img src={cat.image} className="w-full h-full object-cover" /> : <ImageIcon className="text-gray-300" />}
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest">{cat.name}</span>
                  <input type="file" accept="image/*" className="hidden" onChange={e => handleImageChange(e, (img) => {const b = [...brands]; b[bIdx].categories[cIdx].image = img; setBrands(b);})} />
                </label>
              ))}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Appearance;