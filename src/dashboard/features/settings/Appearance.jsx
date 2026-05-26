import React, { useState, useEffect } from 'react';
import { supabase } from '../../../../supabaseClient';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Monitor, Smartphone, Trash2, UploadCloud, Plus, X, 
  Image as ImageIcon, Loader2, Tag, FolderTree
} from 'lucide-react';

const theme = { gold: '#D4AF37', black: '#0A0A0A', white: '#FFFFFF', red: '#FF4D4D' };

const Appearance = () => {
  const [activeTab, setActiveTab] = useState('brands'); // جعلنا البراندات التبويب الافتراضي لتسهيل العمل

  return (
    <div className="max-w-[1200px] mx-auto p-5 font-['Inter']">
      {/* التبويبات العلوية */}
      <div className="flex gap-5 mb-8 border-b border-gray-100">
        <button 
          onClick={() => setActiveTab('brands')}
          className={`pb-3 px-2 text-[13px] font-bold tracking-[0.1em] uppercase transition-all flex items-center gap-2 ${
            activeTab === 'brands' ? 'border-b-2 border-black text-black' : 'border-b-2 border-transparent text-gray-400 hover:text-black'
          }`}
        >
          <Tag size={16} /> Brands & Categories
        </button>
        <button 
          onClick={() => setActiveTab('banners')}
          className={`pb-3 px-2 text-[13px] font-bold tracking-[0.1em] uppercase transition-all flex items-center gap-2 ${
            activeTab === 'banners' ? 'border-b-2 border-black text-black' : 'border-b-2 border-transparent text-gray-400 hover:text-black'
          }`}
        >
          <ImageIcon size={16} /> Banners
        </button>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'banners' ? (
          <motion.div key="banners" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
            <BannersManager />
          </motion.div>
        ) : (
          <motion.div key="brands" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
            <BrandsManager />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ==========================================
// مكون إدارة البراندات والأقسام الكامل والمعدل
// ==========================================
const BrandsManager = () => {
  const [brands, setBrands] = useState([]);
  const [newBrandName, setNewBrandName] = useState('');
  const [selectedBrand, setSelectedBrand] = useState(null);
  
  const [categoryName, setCategoryName] = useState('Rings');
  const [imageFile, setImageFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [brandCategories, setBrandCategories] = useState([]);

  const categoryOptions = ['Rings', 'Necklaces', 'Bracelets', 'Earrings', 'Bangles'];

  const fetchBrands = async () => {
    try {
      const { data, error } = await supabase.from('brands').select('*').order('created_at', { ascending: false });
      if (!error && data) setBrands(data);
    } catch (err) {
      console.error("Error fetching brands:", err);
    }
  };

  const fetchBrandCategories = async (brandId) => {
    try {
       const { data, error } = await supabase.from('brand_categories').select('*').eq('brand_id', brandId);
       if (!error && data) setBrandCategories(data);
    } catch (err) {
       console.error("Error fetching categories:", err);
    }
  };

  useEffect(() => {
    fetchBrands();
  }, []);

  useEffect(() => {
    if (selectedBrand?.id) {
      fetchBrandCategories(selectedBrand.id);
    } else {
      setBrandCategories([]);
    }
  }, [selectedBrand]);

  const handleAddBrand = async (e) => {
    e.preventDefault();
    if (!newBrandName.trim()) return;

    try {
       const { error } = await supabase.from('brands').insert([{ name: newBrandName.trim().toUpperCase() }]);
       if (error) {
          alert('Error adding brand: ' + error.message);
       } else {
          setNewBrandName('');
          await fetchBrands();
          alert('Brand added successfully! 🎉');
       }
    } catch (err) {
       console.error(err);
    }
  };

  const handleDeleteBrand = async (brandId) => {
    if(!window.confirm('Are you sure you want to delete this brand and all its category images?')) return;
    
    try {
       const { error } = await supabase.from('brands').delete().eq('id', brandId);
       if (!error) {
           if(selectedBrand?.id === brandId) setSelectedBrand(null);
           await fetchBrands();
       }
    } catch (err) {
       console.error(err);
    }
  };

  const handleAddCategory = async (e) => {
    e.preventDefault();
    if (!selectedBrand) return alert("Please select a brand from the buttons below first!");
    if (!imageFile) return alert("Please upload an image first!");
    
    setIsUploading(true);
    try {
      const fileExt = imageFile.name.split('.').pop();
      const fileName = `brand_${selectedBrand.id}_cat_${categoryName}_${Date.now()}.${fileExt}`;
      
      const { error: uploadError } = await supabase.storage.from('brand_category_images').upload(fileName, imageFile);
      if (uploadError) throw uploadError;
      
      const { data: { publicUrl } } = supabase.storage.from('brand_category_images').getPublicUrl(fileName);
      
      const { error: insertError } = await supabase.from('brand_categories').insert([{ 
         brand_id: selectedBrand.id, 
         category_name: categoryName, 
         image_url: publicUrl 
      }]);

      if (insertError) throw insertError;
      
      setImageFile(null);
      const fileInput = document.getElementById('category-image-upload');
      if(fileInput) fileInput.value = '';

      await fetchBrandCategories(selectedBrand.id);
      alert('Category Image Saved & Linked Perfectly! ✨');
    } catch (error) {
      console.error(error);
      alert("Error: " + error.message);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div>
      <header className="mb-10 text-center">
        <h1 className="text-2xl font-extrabold tracking-widest uppercase mb-2">
          Brand <span className="text-[#D4AF37]">Management</span>
        </h1>
        <p className="text-gray-500 text-xs">Dynamically add brands and assign category images</p>
      </header>

      {/* نموذج إضافة براند جديد */}
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.05)] mb-8">
        <h3 className="text-xs font-bold uppercase tracking-widest mb-4 flex items-center gap-2 text-gray-700">
          <FolderTree size={16} /> Add New Brand
        </h3>
        <form onSubmit={handleAddBrand} className="flex gap-3">
          <input 
            type="text" placeholder="e.g., CARTIER, KLEO" value={newBrandName} onChange={(e) => setNewBrandName(e.target.value)}
            className="flex-1 px-4 py-2.5 border border-gray-200 rounded-lg text-sm outline-none focus:border-black transition-colors"
          />
          <button type="submit" className="bg-black text-white px-6 py-2.5 rounded-lg font-bold tracking-widest text-xs uppercase hover:bg-neutral-800 transition-colors">
            Add Brand
          </button>
        </form>
      </div>

      {/* قائمة واختيار البراندات المضافة لتعديلها */}
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
        <h3 className="text-xs font-bold uppercase tracking-widest mb-4 text-gray-700">Select Brand to Manage</h3>
        
        {brands.length === 0 ? (
          <p className="text-gray-400 text-xs py-2">No brands available yet. Add your first brand above!</p>
        ) : (
          <div className="flex flex-wrap gap-3 mb-8">
            {brands.map(b => (
              <div key={b.id} className="flex items-center shadow-sm rounded-lg overflow-hidden border border-black/10">
                <button 
                  type="button"
                  onClick={() => setSelectedBrand(b)}
                  className={`px-4 py-2 text-[10px] font-bold tracking-widest uppercase transition-colors ${
                    selectedBrand?.id === b.id ? 'bg-black text-white' : 'bg-white text-black hover:bg-gray-50'
                  }`}
                >
                  {b.name}
                </button>
                <button 
                  type="button"
                  onClick={() => handleDeleteBrand(b.id)}
                  className="px-2.5 py-2 bg-white text-red-500 hover:bg-red-50 transition-colors border-l border-black/10"
                >
                  <Trash2 size={13} />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* إضافة الصور والأقسام للبراند المُختار */}
        {selectedBrand && (
          <div className="bg-[#fafafa] p-5 rounded-xl border border-gray-100">
            <h4 className="text-xs font-bold uppercase tracking-widest mb-4 text-gray-500">
              Add Categories to <span className="text-black font-extrabold">{selectedBrand.name}</span>
            </h4>
            
            <form onSubmit={handleAddCategory} className="flex flex-wrap items-end gap-4">
              <div className="flex-1 min-w-[180px]">
                <label className="block text-[9px] font-bold tracking-widest uppercase mb-1.5 text-gray-400">Category Type</label>
                <select value={categoryName} onChange={(e) => setCategoryName(e.target.value)} className="w-full p-2.5 bg-white border border-gray-200 rounded-lg text-xs outline-none focus:border-black">
                  {categoryOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                </select>
              </div>
              <div className="flex-1 min-w-[180px]">
                <label className="block text-[9px] font-bold tracking-widest uppercase mb-1.5 text-gray-400">Category Image</label>
                <input id="category-image-upload" type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files[0])} className="w-full p-1.5 text-xs border border-gray-200 rounded-lg bg-white outline-none" />
              </div>
              <button type="submit" disabled={isUploading} className="bg-[#D4AF37] text-white px-6 py-2.5 rounded-lg font-bold tracking-widest text-xs uppercase hover:bg-[#c4a133] transition-colors disabled:opacity-50 h-[38px]">
                {isUploading ? 'Saving...' : 'Save Category'}
              </button>
            </form>

            {/* عرض شبكة الصور الحالية المرفوعة للبراند */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-8">
              {brandCategories.map(cat => (
                <div key={cat.id} className="relative group bg-white p-2 border border-gray-100 rounded-lg shadow-sm">
                  <img src={cat.image_url} alt={cat.category_name} className="w-full aspect-[4/5] object-cover rounded mb-1.5" />
                  <p className="text-center text-[9px] font-bold tracking-widest uppercase text-gray-700">{cat.category_name || cat.name}</p>
                  <button 
                    type="button"
                    onClick={async () => {
                      if(window.confirm('Delete this category image?')) {
                          const { error } = await supabase.from('brand_categories').delete().eq('id', cat.id);
                          if(!error) await fetchBrandCategories(selectedBrand.id);
                      }
                    }}
                    className="absolute top-3 right-3 bg-red-500 text-white p-1.5 rounded opacity-0 group-hover:opacity-100 transition-opacity shadow-md hover:scale-105"
                  >
                    <Trash2 size={11} />
                  </button>
                </div>
              ))}
            </div>
            
            {brandCategories.length === 0 && (
              <p className="text-gray-400 text-xs text-center py-6">No category images added for this brand yet. Create some using the inputs above!</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

// ==========================================
// مكون إدارة البنرات بالكامل (بدون حذف أي سطر)
// ==========================================
const BannersManager = () => {
  const [desktopImages, setDesktopImages] = useState([]);
  const [mobileImages, setMobileImages] = useState([]);
  const queryClient = useQueryClient();

  const { data: sliders = [], isLoading: isFetchingSliders } = useQuery({
    queryKey: ['hero-sliders'],
    queryFn: async () => {
      const { data, error } = await supabase.from('hero_sliders').select('*').order('id', { ascending: false });
      if (error) throw error;
      return data;
    }
  });

  const liveDesktopImages = sliders.filter(img => img.device_type === 'desktop');
  const liveMobileImages = sliders.filter(img => img.device_type === 'mobile');

  const deleteMutation = useMutation({
    mutationFn: async ({ id, imageUrl }) => {
      const urlParts = imageUrl.split('/appearance_images/');
      if (urlParts.length > 1) {
        await supabase.storage.from('appearance_images').remove([urlParts[1]]);
      }
      const { error } = await supabase.from('hero_sliders').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['hero-sliders'] }),
  });

  const uploadMutation = useMutation({
    mutationFn: async () => {
      const uploadAndSave = async (imageFile, deviceType) => {
        const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${imageFile.name.split('.').pop()}`;
        const filePath = `${deviceType}/${fileName}`;
        const { error: upErr } = await supabase.storage.from('appearance_images').upload(filePath, imageFile);
        if (upErr) throw upErr;
        const { data: { publicUrl } } = supabase.storage.from('appearance_images').getPublicUrl(filePath);
        const { error: dbErr } = await supabase.from('hero_sliders').insert([{ image_url: publicUrl, device_type: deviceType }]);
        if (dbErr) throw dbErr;
      };
      await Promise.all([
        ...desktopImages.map(img => uploadAndSave(img.file, 'desktop')),
        ...mobileImages.map(img => uploadAndSave(img.file, 'mobile'))
      ]);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['hero-sliders'] });
      setDesktopImages([]);
      setMobileImages([]);
      alert('Banners updated successfully! ✨');
    }
  });

  const handleFileChange = (e, setter) => {
    const files = Array.from(e.target.files).map(file => ({
      id: Math.random(),
      file,
      preview: URL.createObjectURL(file)
    }));
    setter(prev => [...prev, ...files]);
    e.target.value = null;
  };

  if (isFetchingSliders) return (
    <div className="flex flex-col h-[40vh] items-center justify-center gap-4">
      <Loader2 size={32} className="animate-spin text-[#D4AF37]" />
      <p className="tracking-widest font-medium text-gray-500 uppercase text-xs">Loading banners...</p>
    </div>
  );

  return (
    <form onSubmit={(e) => { e.preventDefault(); uploadMutation.mutate(); }}>
      <header className="mb-10 text-center">
        <h1 className="text-2xl font-extrabold tracking-widest uppercase mb-2">
          Visual <span className="text-[#D4AF37]">Experience</span>
        </h1>
        <p className="text-gray-500 text-xs">Curate the luxury aesthetic of your jewellery banners</p>
      </header>

      {[
        { title: 'Desktop Masterpiece', subtitle: 'Widescreen HD Banners', icon: <Monitor size={20}/>, live: liveDesktopImages, pending: desktopImages, setter: setDesktopImages, type: 'desktop' },
        { title: 'Mobile Elegance', subtitle: 'Handheld Optimized Banners', icon: <Smartphone size={20}/>, live: liveMobileImages, pending: mobileImages, setter: setMobileImages, type: 'mobile' }
      ].map((sec, idx) => (
        <section key={idx} className="bg-white rounded-2xl p-6 mb-8 shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[#D4AF37]">{sec.icon}</span>
                <h3 className="text-lg font-bold">{sec.title}</h3>
              </div>
              <p className="text-xs text-gray-400">{sec.subtitle}</p>
            </div>
            <label className="cursor-pointer flex items-center gap-2 px-4 py-2 rounded-lg border border-black text-xs font-semibold hover:bg-black hover:text-white transition-all">
              <Plus size={14} /> Add New
              <input type="file" hidden multiple onChange={(e) => handleFileChange(e, sec.setter)} />
            </label>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            <AnimatePresence>
              {sec.live.map((img) => (
                <motion.div layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} key={img.id} className="relative h-28 rounded-xl overflow-hidden group">
                  <img src={img.image_url} className="w-full h-full object-cover" alt="Banner" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button type="button" onClick={() => window.confirm('Delete forever?') && deleteMutation.mutate({ id: img.id, imageUrl: img.image_url })} className="bg-white text-red-500 p-2 rounded-full hover:scale-110 transition-transform">
                        <Trash2 size={16} />
                      </button>
                  </div>
                  <span className="absolute top-2 left-2 bg-[#D4AF37] text-white text-[9px] px-2 py-1 rounded font-bold tracking-wider">LIVE</span>
                </motion.div>
              ))}
              {sec.pending.map((img) => (
                <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} key={img.id} className="relative h-28 rounded-xl overflow-hidden border-2 border-dashed border-[#D4AF37]">
                  <img src={img.preview} className="w-full h-full object-cover opacity-60" alt="Preview" />
                  <button type="button" onClick={() => sec.setter(prev => prev.filter(i => i.id !== img.id))} className="absolute top-2 right-2 bg-black text-white rounded-full p-1 hover:scale-110 transition-transform">
                    <X size={12} />
                  </button>
                  <span className="absolute bottom-2 left-2 text-black text-[9px] font-bold tracking-wider bg-white/80 px-2 py-0.5 rounded">READY</span>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          
          {sec.live.length === 0 && sec.pending.length === 0 && (
            <div className="text-center p-8 border border-dashed border-gray-200 rounded-xl">
              <ImageIcon size={28} className="text-gray-300 mx-auto mb-2" />
              <p className="text-gray-400 text-xs">No banners set for this layout</p>
            </div>
          )}
        </section>
      ))}

      <AnimatePresence>
        {(desktopImages.length > 0 || mobileImages.length > 0) && (
          <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 50 }} className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
            <button type="submit" disabled={uploadMutation.isPending} className="bg-black text-white px-8 py-4 rounded-full text-xs font-bold tracking-widest shadow-2xl flex items-center gap-3 hover:bg-neutral-800 transition-colors">
              {uploadMutation.isPending ? <Loader2 className="animate-spin" size={18} /> : <UploadCloud size={18} />}
              {uploadMutation.isPending ? 'PUBLISHING...' : 'SAVE & PUBLISH CHANGES'}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  );
};

export default Appearance;