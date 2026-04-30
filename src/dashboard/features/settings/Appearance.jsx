import React, { useState, useEffect } from 'react';
import { supabase } from '../../../supabaseClient'; // تأكد من مسار الملف عندك
import { 
  Save, Trash2, Upload, ImageIcon, Palette, 
  Layout, Smartphone, Monitor, Plus, Loader2 
} from 'lucide-react';

const Appearance = () => {
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('colors');
  const [colors, setColors] = useState({ primary: '#000000', secondary: '#d4af37' });
  const [slides, setSlides] = useState([]);
  const [brands, setBrands] = useState([]);

  // 1. جلب البيانات عند فتح الصفحة
  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    setLoading(true);
    const { data: colorData } = await supabase.from('appearance_settings').select('*').single();
    if (colorData) setColors({ primary: colorData.primary_color, secondary: colorData.secondary_color });

    const { data: slideData } = await supabase.from('hero_slides').select('*').order('display_order');
    if (slideData) setSlides(slideData);

    const { data: brandData } = await supabase.from('brands_config').select('*').order('display_order');
    if (brandData) setBrands(brandData);
    setLoading(false);
  };

  // 2. وظيفة رفع الصور للـ Bucket
  const handleFileUpload = async (file, folder) => {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${folder}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('home-assets')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from('home-assets').getPublicUrl(filePath);
      return data.publicUrl;
    } catch (error) {
      alert('Error uploading image!');
      return null;
    }
  };

  // 3. حفظ كل التغييرات
  const saveAll = async () => {
    setLoading(true);
    // حفظ الألوان
    await supabase.from('appearance_settings').upsert({ id: 1, primary_color: colors.primary, secondary_color: colors.secondary });
    
    // حفظ السلايدر (مسح وإعادة إضافة للتبسيط)
    await supabase.from('hero_slides').delete().neq('id', 0);
    if (slides.length > 0) {
      await supabase.from('hero_slides').insert(slides.map((s, i) => ({ 
        desktop_url: s.desktop_url, 
        mobile_url: s.mobile_url, 
        display_order: i 
      })));
    }

    // حفظ البراندات
    await supabase.from('brands_config').delete().neq('id', 0);
    if (brands.length > 0) {
      await supabase.from('brands_config').insert(brands.map((b, i) => ({
        brand_name: b.brand_name,
        necklaces_img: b.necklaces_img,
        rings_img: b.rings_img,
        bracelets_img: b.bracelets_img,
        earrings_img: b.earrings_img,
        display_order: i
      })));
    }
    
    alert('Website Updated Successfully!');
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] p-4 md:p-10">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-4xl font-black italic tracking-tighter uppercase">Appearance Control</h1>
            <p className="text-gray-500">Live edit your website's primary visuals and branding.</p>
          </div>
          <button 
            onClick={saveAll}
            disabled={loading}
            className="bg-black text-white px-8 py-4 rounded-full font-bold flex items-center gap-2 hover:scale-105 transition-all disabled:opacity-50"
          >
            {loading ? <Loader2 className="animate-spin" /> : <Save size={20} />} 
            PUBLISH CHANGES
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Tabs Navigation */}
          <div className="w-full md:w-64 space-y-2">
            {['colors', 'hero', 'brands'].map((t) => (
              <button
                key={t}
                onClick={() => setActiveTab(t)}
                className={`w-full text-left px-6 py-4 rounded-xl font-bold uppercase text-xs tracking-widest transition-all ${
                  activeTab === t ? 'bg-black text-white shadow-lg' : 'bg-white text-gray-400 hover:bg-gray-50'
                }`}
              >
                {t === 'colors' && 'Theme Palette'}
                {t === 'hero' && 'Main Slider'}
                {t === 'brands' && 'Brand Sections'}
              </button>
            ))}
          </div>

          {/* Editor Panels */}
          <div className="flex-1 space-y-6">
            {activeTab === 'colors' && (
              <div className="bg-white p-8 rounded-3xl border shadow-sm grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Primary Color (Texts/Borders)</label>
                  <div className="flex items-center gap-4 p-4 border rounded-2xl">
                    <input type="color" value={colors.primary} onChange={e => setColors({...colors, primary: e.target.value})} className="w-12 h-12 rounded-lg cursor-pointer" />
                    <span className="font-mono font-bold">{colors.primary}</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Accent Color (Brand Highlight)</label>
                  <div className="flex items-center gap-4 p-4 border rounded-2xl">
                    <input type="color" value={colors.secondary} onChange={e => setColors({...colors, secondary: e.target.value})} className="w-12 h-12 rounded-lg cursor-pointer" />
                    <span className="font-mono font-bold" style={{color: colors.secondary}}>{colors.secondary}</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'hero' && (
              <div className="space-y-4">
                <button onClick={() => setSlides([...slides, { desktop_url: '', mobile_url: '' }])} className="w-full py-4 border-2 border-dashed rounded-2xl font-bold text-gray-400 hover:border-black hover:text-black transition-all">+ Add New Slide</button>
                {slides.map((slide, idx) => (
                  <div key={idx} className="bg-white p-6 rounded-3xl border shadow-sm flex flex-col md:flex-row gap-6 items-center">
                    <div className="flex-1 grid grid-cols-2 gap-4">
                      <label className="h-32 border rounded-xl flex flex-col items-center justify-center cursor-pointer overflow-hidden relative">
                        {slide.desktop_url ? <img src={slide.desktop_url} className="w-full h-full object-cover" /> : <Monitor className="text-gray-200" />}
                        <input type="file" className="hidden" onChange={async e => {
                          const url = await handleFileUpload(e.target.files[0], 'hero');
                          const newSlides = [...slides]; newSlides[idx].desktop_url = url; setSlides(newSlides);
                        }} />
                      </label>
                      <label className="h-32 border rounded-xl flex flex-col items-center justify-center cursor-pointer overflow-hidden relative">
                        {slide.mobile_url ? <img src={slide.mobile_url} className="w-full h-full object-cover" /> : <Smartphone className="text-gray-200" />}
                        <input type="file" className="hidden" onChange={async e => {
                          const url = await handleFileUpload(e.target.files[0], 'hero');
                          const newSlides = [...slides]; newSlides[idx].mobile_url = url; setSlides(newSlides);
                        }} />
                      </label>
                    </div>
                    <button onClick={() => setSlides(slides.filter((_, i) => i !== idx))} className="text-red-500 p-3 bg-red-50 rounded-full"><Trash2/></button>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'brands' && (
               <div className="space-y-6">
                  <button onClick={() => setBrands([...brands, { brand_name: 'BRAND', necklaces_img: '', rings_img: '', bracelets_img: '', earrings_img: '' }])} className="w-full py-4 bg-black text-white rounded-2xl font-bold uppercase tracking-widest">+ Add New Brand Collection</button>
                  {brands.map((brand, bIdx) => (
                    <div key={bIdx} className="bg-white rounded-3xl border shadow-sm overflow-hidden">
                      <div className="p-4 bg-gray-50 border-b flex justify-between items-center px-8">
                        <input className="bg-transparent font-black text-xl uppercase border-none focus:ring-0" value={brand.brand_name} onChange={e => {const b = [...brands]; b[bIdx].brand_name = e.target.value; setBrands(b);}} />
                        <button onClick={() => setBrands(brands.filter((_, i) => i !== bIdx))} className="text-red-500 text-xs font-bold uppercase tracking-widest">Delete Brand</button>
                      </div>
                      <div className="p-8 grid grid-cols-2 md:grid-cols-4 gap-6">
                        {['necklaces', 'rings', 'bracelets', 'earrings'].map((cat) => (
                          <div key={cat} className="space-y-2">
                            <span className="text-[9px] font-black uppercase text-gray-400 block text-center tracking-[0.2em]">{cat}</span>
                            <label className="aspect-square border-2 border-dashed rounded-2xl flex items-center justify-center cursor-pointer overflow-hidden hover:border-black transition-all">
                              {brand[`${cat}_img`] ? <img src={brand[`${cat}_img`]} className="w-full h-full object-cover" /> : <Plus className="text-gray-200" />}
                              <input type="file" className="hidden" onChange={async e => {
                                const url = await handleFileUpload(e.target.files[0], 'categories');
                                const newBrands = [...brands]; newBrands[bIdx][`${cat}_img`] = url; setBrands(newBrands);
                              }} />
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
               </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Appearance;