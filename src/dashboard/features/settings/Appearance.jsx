// src/dashboard/features/settings/Appearance.jsx
import React, { useState } from 'react';
import { Plus, Trash2, Save, ImageIcon, Globe } from 'lucide-react';

const Appearance = () => {
  const [colors, setColors] = useState({ primary: '#000000', secondary: '#d4af37' });
  const [slides, setSlides] = useState([{ id: 1, desktop: '', mobile: '' }]);
  
  // Every brand will automatically have these 4 categories
  const fixedCategoryNames = ["Necklaces", "Rings", "Bracelets", "Earrings"];

  const [brands, setBrands] = useState([
    { 
      id: 1, 
      name: 'KLEO', 
      // Mapping the fixed names to the brand object
      categories: fixedCategoryNames.map(name => ({ name, image: '' }))
    }
  ]);

  const addNewBrand = () => {
    setBrands([...brands, { 
      id: Date.now(), 
      name: 'New Brand', 
      categories: fixedCategoryNames.map(name => ({ name, image: '' })) 
    }]);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-20 p-4">
      <div className="flex justify-between items-center border-b pb-4">
        <div>
          <h2 className="text-2xl font-black">HOME APPEARANCE</h2>
          <p className="text-gray-500 text-sm">Control your slides, colors, and brands</p>
        </div>
        <button className="bg-black text-white px-8 py-3 rounded-full font-bold flex items-center gap-2 hover:bg-gray-800 transition-all shadow-lg">
          <Save size={20} /> SAVE SETTINGS
        </button>
      </div>

      {/* 1. HERO SLIDER WITH PREVIEWS */}
      <section className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-bold text-lg flex items-center gap-2"><Globe size={20}/> Main Hero Slider</h3>
          <button onClick={() => setSlides([...slides, { id: Date.now(), desktop: '', mobile: '' }])} className="text-blue-600 text-sm font-bold">+ Add Slide</button>
        </div>
        <div className="grid grid-cols-1 gap-6">
          {slides.map((slide, index) => (
            <div key={slide.id} className="flex flex-col md:flex-row gap-6 p-4 bg-gray-50 rounded-xl border border-gray-100">
              <div className="flex-1 space-y-4">
                <input type="text" placeholder="Desktop Image URL" value={slide.desktop} onChange={(e) => { const s = [...slides]; s[index].desktop = e.target.value; setSlides(s); }} className="w-full p-3 border rounded-lg text-sm" />
                <input type="text" placeholder="Mobile Image URL" value={slide.mobile} onChange={(e) => { const s = [...slides]; s[index].mobile = e.target.value; setSlides(s); }} className="w-full p-3 border rounded-lg text-sm" />
              </div>
              <div className="flex gap-4">
                <div className="w-32 h-20 bg-gray-200 rounded-lg overflow-hidden border">
                   {slide.desktop ? <img src={slide.desktop} className="w-full h-full object-cover" /> : <div className="flex items-center justify-center h-full text-[10px] text-gray-400">Desktop Preview</div>}
                </div>
                <div className="w-20 h-20 bg-gray-200 rounded-lg overflow-hidden border">
                   {slide.mobile ? <img src={slide.mobile} className="w-full h-full object-cover" /> : <div className="flex items-center justify-center h-full text-[10px] text-gray-400">Mobile</div>}
                </div>
                <button onClick={() => setSlides(slides.filter(s => s.id !== slide.id))} className="text-red-500 hover:bg-red-50 p-2 rounded-lg self-center"><Trash2 size={20}/></button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 2. DYNAMIC BRANDS SECTION */}
      <section className="space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="font-black text-xl">BRANDS SECTIONS</h3>
          <button onClick={addNewBrand} className="bg-white border-2 border-black text-black px-4 py-2 rounded-lg font-bold hover:bg-black hover:text-white transition-all">+ Add New Brand</button>
        </div>

        {brands.map((brand, bIndex) => (
          <div key={brand.id} className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
            <div className="bg-gray-50 p-4 border-b flex justify-between items-center">
              <input 
                className="bg-transparent font-black text-lg border-none focus:ring-0 w-1/2" 
                value={brand.name} 
                onChange={(e) => { const b = [...brands]; b[bIndex].name = e.target.value; setBrands(b); }}
              />
              <button onClick={() => setBrands(brands.filter(b => b.id !== brand.id))} className="text-red-500 flex items-center gap-1 text-sm font-bold"><Trash2 size={16}/> Delete Brand Section</button>
            </div>
            
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {brand.categories.map((cat, cIndex) => (
                <div key={cIndex} className="space-y-3">
                  <p className="font-bold text-xs uppercase tracking-widest text-gray-400">{cat.name}</p>
                  <div className="aspect-square w-full bg-gray-100 rounded-lg overflow-hidden border mb-2 flex items-center justify-center">
                    {cat.image ? <img src={cat.image} className="w-full h-full object-cover" /> : <ImageIcon className="text-gray-300" size={32}/>}
                  </div>
                  <input 
                    type="text" 
                    placeholder="Image URL" 
                    value={cat.image} 
                    onChange={(e) => { const b = [...brands]; b[bIndex].categories[cIndex].image = e.target.value; setBrands(b); }}
                    className="w-full p-2 border rounded text-xs"
                  />
                </div>
              ))}
            </div>
            <div className="px-6 pb-6 italic text-xs text-blue-500">
              * A product slider for "{brand.name}" will be automatically generated on the Home page.
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Appearance;