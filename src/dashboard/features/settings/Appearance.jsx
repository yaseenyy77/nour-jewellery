// src/dashboard/features/settings/Appearance.jsx
import React, { useState } from 'react';
import { Plus, Trash2, Save, Image as ImageIcon } from 'lucide-react';

const Appearance = () => {
  // 1. Theme Colors State
  const [colors, setColors] = useState({ primary: '#000000', secondary: '#d4af37' });

  // 2. Hero Slider State (Desktop & Mobile)
  const [slides, setSlides] = useState([
    { id: 1, desktop: '/images/slider-desk-1.jpg', mobile: '/images/slider-mob-1.jpg' }
  ]);

  // 3. Brands & Categories State
  const [brands, setBrands] = useState([
    { 
      id: 1, 
      name: 'KLEO', 
      categories: [
        { id: 101, name: 'Necklaces', image: '/images/cat1.jpg' }
      ] 
    }
  ]);

  const handleSave = async () => {
    // Here you will implement the Supabase Insert/Update functions using the states above.
    alert("Appearance settings saved successfully to Supabase!");
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-10">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Home Page Appearance</h2>
        <button onClick={handleSave} className="bg-black text-white px-6 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-800">
          <Save size={18} /> Save All Changes
        </button>
      </div>

      {/* --- COLORS SECTION --- */}
      <section className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
        <h3 className="text-lg font-bold mb-4">Theme Colors</h3>
        <div className="flex gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Primary Color</label>
            <div className="flex items-center gap-3">
              <input type="color" value={colors.primary} onChange={(e) => setColors({...colors, primary: e.target.value})} className="w-10 h-10 p-0 border-0 rounded" />
              <input type="text" value={colors.primary} readOnly className="border border-gray-200 px-3 py-2 rounded-md text-sm" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Secondary Color (Accents)</label>
            <div className="flex items-center gap-3">
              <input type="color" value={colors.secondary} onChange={(e) => setColors({...colors, secondary: e.target.value})} className="w-10 h-10 p-0 border-0 rounded" />
              <input type="text" value={colors.secondary} readOnly className="border border-gray-200 px-3 py-2 rounded-md text-sm" />
            </div>
          </div>
        </div>
      </section>

      {/* --- HERO SLIDER SECTION --- */}
      <section className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold">Hero Slider Images</h3>
          <button onClick={() => setSlides([...slides, { id: Date.now(), desktop: '', mobile: '' }])} className="text-sm font-medium flex items-center gap-1 text-blue-600">
            <Plus size={16} /> Add Slide
          </button>
        </div>
        <div className="space-y-4">
          {slides.map((slide, index) => (
            <div key={slide.id} className="flex gap-4 items-end bg-gray-50 p-4 rounded-lg border border-gray-100">
              <div className="flex-1">
                <label className="block text-xs font-medium text-gray-500 mb-1">Desktop Image URL</label>
                <input type="text" placeholder="https://..." value={slide.desktop} onChange={(e) => { const newSlides = [...slides]; newSlides[index].desktop = e.target.value; setSlides(newSlides); }} className="w-full border border-gray-200 px-3 py-2 rounded-md text-sm" />
              </div>
              <div className="flex-1">
                <label className="block text-xs font-medium text-gray-500 mb-1">Mobile Image URL</label>
                <input type="text" placeholder="https://..." value={slide.mobile} onChange={(e) => { const newSlides = [...slides]; newSlides[index].mobile = e.target.value; setSlides(newSlides); }} className="w-full border border-gray-200 px-3 py-2 rounded-md text-sm" />
              </div>
              <button onClick={() => setSlides(slides.filter(s => s.id !== slide.id))} className="p-2 text-red-500 hover:bg-red-50 rounded-md">
                <Trash2 size={20} />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* --- BRANDS & CATEGORIES SECTION --- */}
      <section className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-bold">Brands & Categories Slider</h3>
          <button onClick={() => setBrands([...brands, { id: Date.now(), name: 'New Brand', categories: [] }])} className="text-sm font-medium flex items-center gap-1 text-blue-600">
            <Plus size={16} /> Add Brand
          </button>
        </div>

        <div className="space-y-6">
          {brands.map((brand, bIndex) => (
            <div key={brand.id} className="border border-gray-200 rounded-lg p-5">
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-gray-100">
                <input type="text" value={brand.name} onChange={(e) => { const newBrands = [...brands]; newBrands[bIndex].name = e.target.value; setBrands(newBrands); }} className="text-lg font-bold border-none outline-none focus:ring-0 px-0 bg-transparent" placeholder="Brand Name" />
                <button onClick={() => setBrands(brands.filter(b => b.id !== brand.id))} className="text-red-500 text-sm flex items-center gap-1"><Trash2 size={16}/> Remove Brand</button>
              </div>

              <div className="space-y-3">
                <p className="text-sm font-medium text-gray-600">Brand Categories:</p>
                {brand.categories.map((cat, cIndex) => (
                  <div key={cat.id} className="flex gap-3 items-center">
                    <input type="text" placeholder="Category Name" value={cat.name} onChange={(e) => { const newBrands = [...brands]; newBrands[bIndex].categories[cIndex].name = e.target.value; setBrands(newBrands); }} className="w-1/3 border border-gray-200 px-3 py-2 rounded-md text-sm" />
                    <input type="text" placeholder="Image URL" value={cat.image} onChange={(e) => { const newBrands = [...brands]; newBrands[bIndex].categories[cIndex].image = e.target.value; setBrands(newBrands); }} className="flex-1 border border-gray-200 px-3 py-2 rounded-md text-sm" />
                    <button onClick={() => { const newBrands = [...brands]; newBrands[bIndex].categories.splice(cIndex, 1); setBrands(newBrands); }} className="p-2 text-red-500"><Trash2 size={18} /></button>
                  </div>
                ))}
                <button onClick={() => { const newBrands = [...brands]; newBrands[bIndex].categories.push({ id: Date.now(), name: '', image: '' }); setBrands(newBrands); }} className="text-sm font-medium flex items-center gap-1 text-gray-500 hover:text-black mt-2">
                  <Plus size={14} /> Add Category
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Appearance;