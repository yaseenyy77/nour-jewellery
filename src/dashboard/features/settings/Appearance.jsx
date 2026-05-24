import React, { useState, useEffect } from 'react';
import { supabase } from '../../../../supabaseClient';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Monitor, 
  Smartphone, 
  Trash2, 
  UploadCloud, 
  Plus, 
  X, 
  Image as ImageIcon,
  Loader2,
  Tag,
  FolderTree
} from 'lucide-react';

const Appearance = () => {
  // --- Tab State ---
  const [activeTab, setActiveTab] = useState('banners'); // 'banners' or 'brands'

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      
      {/* Navigation Tabs for Appearance Sections */}
      <div style={{ display: 'flex', gap: '20px', marginBottom: '30px', borderBottom: '1px solid #eee' }}>
        <button 
          onClick={() => setActiveTab('banners')}
          style={{
            padding: '12px 24px', background: 'none', border: 'none', 
            borderBottom: activeTab === 'banners' ? '2px solid #000' : '2px solid transparent',
            color: activeTab === 'banners' ? '#000' : '#888',
            fontWeight: 'bold', fontSize: '13px', letterSpacing: '1px', textTransform: 'uppercase', cursor: 'pointer', transition: '0.3s'
          }}
        >
          <ImageIcon size={16} style={{ display: 'inline', marginRight: '8px', verticalAlign: 'text-bottom' }} />
          Banners
        </button>
        <button 
          onClick={() => setActiveTab('brands')}
          style={{
            padding: '12px 24px', background: 'none', border: 'none', 
            borderBottom: activeTab === 'brands' ? '2px solid #000' : '2px solid transparent',
            color: activeTab === 'brands' ? '#000' : '#888',
            fontWeight: 'bold', fontSize: '13px', letterSpacing: '1px', textTransform: 'uppercase', cursor: 'pointer', transition: '0.3s'
          }}
        >
          <Tag size={16} style={{ display: 'inline', marginRight: '8px', verticalAlign: 'text-bottom' }} />
          Brands & Categories
        </button>
      </div>

      {/* Render Selected Section */}
      {activeTab === 'banners' ? <BannersManager /> : <BrandsManager />}
    </div>
  );
};

export default Appearance;

// ==========================================
// 1. ORIGINAL BANNERS MANAGER (UNTOUCHED)
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

  const theme = { gold: '#D4AF37', black: '#0A0A0A', gray: '#F5F5F5', white: '#FFFFFF', red: '#FF4D4D' };

  if (isFetchingSliders) return (
    <div style={{ display: 'flex', height: '60vh', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '15px' }}>
      <Loader2 size={40} className="animate-spin" style={{ color: theme.gold }} />
      <p style={{ letterSpacing: '2px', fontWeight: '500', color: '#666' }}>REFINING YOUR VIEW...</p>
    </div>
  );

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ fontFamily: '"Inter", sans-serif', color: theme.black }}>
      <header style={{ marginBottom: '40px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '32px', fontWeight: '800', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '10px' }}>
          Visual <span style={{ color: theme.gold }}>Experience</span>
        </h1>
        <p style={{ color: '#666', fontSize: '15px' }}>Curate the luxury aesthetic of your jewellery banners</p>
      </header>

      <form onSubmit={(e) => { e.preventDefault(); uploadMutation.mutate(); }}>
        {[
          { title: 'Desktop Masterpiece', subtitle: 'Widescreen HD Banners', icon: <Monitor size={20}/>, live: liveDesktopImages, pending: desktopImages, setter: setDesktopImages, type: 'desktop' },
          { title: 'Mobile Elegance', subtitle: 'Handheld Optimized Banners', icon: <Smartphone size={20}/>, live: liveMobileImages, pending: mobileImages, setter: setMobileImages, type: 'mobile' }
        ].map((sec, idx) => (
          <section key={idx} style={{ background: theme.white, borderRadius: '16px', padding: '30px', marginBottom: '30px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', border: '1px solid #eee' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '25px' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '5px' }}>
                  <span style={{ color: theme.gold }}>{sec.icon}</span>
                  <h3 style={{ fontSize: '20px', fontWeight: '700', margin: 0 }}>{sec.title}</h3>
                </div>
                <p style={{ fontSize: '13px', color: '#888' }}>{sec.subtitle}</p>
              </div>
              <label style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px', borderRadius: '8px', border: `1px solid ${theme.black}`, fontSize: '13px', fontWeight: '600', transition: 'all 0.2s' }} className="btn-hover">
                <Plus size={16} /> Add New
                <input type="file" hidden multiple onChange={(e) => handleFileChange(e, sec.setter)} />
              </label>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '20px' }}>
              <AnimatePresence>
                {sec.live.map((img) => (
                  <motion.div layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} key={img.id} style={{ position: 'relative', height: '120px', borderRadius: '12px', overflow: 'hidden' }} className="image-card">
                    <img src={img.image_url} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Banner" />
                    <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.4)', opacity: 0, transition: '0.3s', display: 'flex', alignItems: 'center', justifyContent: 'center' }} className="hover-overlay">
                        <button type="button" onClick={() => window.confirm('Delete forever?') && deleteMutation.mutate({ id: img.id, imageUrl: img.image_url })} style={{ background: theme.white, color: theme.red, border: 'none', padding: '8px', borderRadius: '50%', cursor: 'pointer' }}>
                          <Trash2 size={18} />
                        </button>
                    </div>
                    <span style={{ position: 'absolute', top: '8px', left: '8px', background: theme.gold, color: '#fff', fontSize: '10px', padding: '3px 8px', borderRadius: '4px', fontWeight: 'bold' }}>LIVE</span>
                  </motion.div>
                ))}
                {sec.pending.map((img) => (
                  <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} key={img.id} style={{ position: 'relative', height: '120px', borderRadius: '12px', overflow: 'hidden', border: `2px dashed ${theme.gold}` }}>
                    <img src={img.preview} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.6 }} alt="Preview" />
                    <button type="button" onClick={() => sec.setter(prev => prev.filter(i => i.id !== img.id))} style={{ position: 'absolute', top: '8px', right: '8px', background: theme.black, color: '#fff', border: 'none', borderRadius: '50%', padding: '4px', cursor: 'pointer' }}>
                      <X size={14} />
                    </button>
                    <span style={{ position: 'absolute', bottom: '8px', left: '8px', color: theme.black, fontSize: '10px', fontWeight: '800' }}>READY</span>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
            {sec.live.length === 0 && sec.pending.length === 0 && (
              <div style={{ textAlign: 'center', padding: '40px', border: '1px dashed #ddd', borderRadius: '12px' }}>
                <ImageIcon size={32} style={{ color: '#ccc', marginBottom: '10px' }} />
                <p style={{ color: '#999', fontSize: '13px' }}>No banners set</p>
              </div>
            )}
          </section>
        ))}
        <AnimatePresence>
          {(desktopImages.length > 0 || mobileImages.length > 0) && (
            <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 50 }} style={{ position: 'fixed', bottom: '30px', left: '50%', transform: 'translateX(-50%)', zIndex: 100 }}>
              <button type="submit" disabled={uploadMutation.isPending} style={{ background: theme.black, color: theme.white, border: 'none', padding: '16px 40px', borderRadius: '50px', fontSize: '15px', fontWeight: '700', boxShadow: '0 10px 30px rgba(0,0,0,0.3)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '12px', transition: '0.3s' }}>
                {uploadMutation.isPending ? <Loader2 className="animate-spin" /> : <UploadCloud size={20} />}
                {uploadMutation.isPending ? 'PUBLISHING...' : 'SAVE & PUBLISH CHANGES'}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </form>
      <style>{`
        .image-card:hover .hover-overlay { opacity: 1 !important; }
        .btn-hover:hover { background: #000; color: #fff; }
      `}</style>
    </motion.div>
  );
};

// ==========================================
// 2. NEW BRANDS & CATEGORIES MANAGER
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
    const { data } = await supabase.from('brands').select('*').order('created_at', { ascending: false });
    if (data) setBrands(data);
  };

  const fetchBrandCategories = async (brandId) => {
    const { data } = await supabase.from('brand_categories').select('*').eq('brand_id', brandId);
    if (data) setBrandCategories(data);
  };

  useEffect(() => { fetchBrands(); }, []);
  useEffect(() => { if (selectedBrand) fetchBrandCategories(selectedBrand.id); }, [selectedBrand]);

  const handleAddBrand = async (e) => {
    e.preventDefault();
    if (!newBrandName) return;
    await supabase.from('brands').insert([{ name: newBrandName }]);
    setNewBrandName('');
    fetchBrands();
  };

  const handleDeleteBrand = async (brandId) => {
    if(!window.confirm('Delete brand and all its categories?')) return;
    await supabase.from('brands').delete().eq('id', brandId);
    if(selectedBrand?.id === brandId) setSelectedBrand(null);
    fetchBrands();
  };

  const handleAddCategory = async (e) => {
    e.preventDefault();
    if (!selectedBrand || !imageFile) return alert("Please select an image!");
    setIsUploading(true);
    try {
      const fileExt = imageFile.name.split('.').pop();
      const fileName = `${selectedBrand.name}-${categoryName}-${Math.random()}.${fileExt}`;
      const { error: uploadError } = await supabase.storage.from('brand_category_images').upload(fileName, imageFile);
      if (uploadError) throw uploadError;
      
      const { data: { publicUrl } } = supabase.storage.from('brand_category_images').getPublicUrl(fileName);
      await supabase.from('brand_categories').insert([{ brand_id: selectedBrand.id, category_name: categoryName, image_url: publicUrl }]);
      
      setImageFile(null);
      fetchBrandCategories(selectedBrand.id);
    } catch (error) {
      alert("Error: " + error.message);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ fontFamily: '"Inter", sans-serif' }}>
      <header style={{ marginBottom: '40px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '32px', fontWeight: '800', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '10px' }}>
          Brand <span style={{ color: '#D4AF37' }}>Management</span>
        </h1>
        <p style={{ color: '#666', fontSize: '15px' }}>Dynamically add brands and assign category images for the homepage</p>
      </header>

      {/* Add Brand */}
      <div style={{ background: '#fff', padding: '30px', borderRadius: '16px', border: '1px solid #eee', marginBottom: '30px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
        <h3 style={{ fontSize: '14px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '20px' }}>
          <FolderTree size={16} style={{ display: 'inline', marginRight: '8px' }}/> Add New Brand
        </h3>
        <form onSubmit={handleAddBrand} style={{ display: 'flex', gap: '15px' }}>
          <input 
            type="text" placeholder="e.g., CARTIER, KLEO" value={newBrandName} onChange={(e) => setNewBrandName(e.target.value)}
            style={{ flex: 1, padding: '12px 20px', border: '1px solid #ddd', borderRadius: '8px', fontSize: '14px', outline: 'none' }}
          />
          <button type="submit" style={{ background: '#000', color: '#fff', padding: '0 30px', border: 'none', borderRadius: '8px', fontWeight: 'bold', letterSpacing: '1px', cursor: 'pointer' }}>
            ADD BRAND
          </button>
        </form>
      </div>

      {/* Select & Manage Brand */}
      {brands.length > 0 && (
        <div style={{ background: '#fff', padding: '30px', borderRadius: '16px', border: '1px solid #eee', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
          <h3 style={{ fontSize: '14px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '20px' }}>
            Select Brand to Manage
          </h3>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '30px' }}>
            {brands.map(b => (
              <div key={b.id} style={{ display: 'flex', alignItems: 'center' }}>
                <button 
                  onClick={() => setSelectedBrand(b)}
                  style={{
                    padding: '10px 20px', background: selectedBrand?.id === b.id ? '#000' : '#fff',
                    color: selectedBrand?.id === b.id ? '#fff' : '#000', border: '1px solid #000',
                    fontWeight: 'bold', letterSpacing: '1px', fontSize: '12px', cursor: 'pointer',
                    borderRadius: '8px 0 0 8px'
                  }}
                >
                  {b.name}
                </button>
                <button 
                  onClick={() => handleDeleteBrand(b.id)}
                  style={{ padding: '10px 15px', background: '#fff', border: '1px solid #000', borderLeft: 'none', color: '#FF4D4D', cursor: 'pointer', borderRadius: '0 8px 8px 0' }}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>

          {selectedBrand && (
            <div style={{ background: '#fcfcfc', padding: '25px', border: '1px solid #eee', borderRadius: '12px' }}>
              <h4 style={{ fontSize: '13px', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '20px', color: '#666' }}>
                Add Category Image to <span style={{color: '#000'}}>{selectedBrand.name}</span>
              </h4>
              <form onSubmit={handleAddCategory} style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', alignItems: 'flex-end' }}>
                <div style={{ flex: '1 1 200px' }}>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', letterSpacing: '1px', marginBottom: '8px' }}>CATEGORY</label>
                  <select value={categoryName} onChange={(e) => setCategoryName(e.target.value)} style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '6px' }}>
                    {categoryOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                  </select>
                </div>
                <div style={{ flex: '1 1 200px' }}>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', letterSpacing: '1px', marginBottom: '8px' }}>IMAGE</label>
                  <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files[0])} style={{ width: '100%', padding: '9px', border: '1px solid #ddd', borderRadius: '6px', background: '#fff' }} />
                </div>
                <button type="submit" disabled={isUploading} style={{ background: '#D4AF37', color: '#fff', padding: '12px 30px', border: 'none', borderRadius: '6px', fontWeight: 'bold', letterSpacing: '1px', cursor: isUploading ? 'not-allowed' : 'pointer' }}>
                  {isUploading ? 'SAVING...' : 'SAVE CATEGORY'}
                </button>
              </form>

              {/* Grid for uploaded categories */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '15px', marginTop: '30px' }}>
                {brandCategories.map(cat => (
                  <div key={cat.id} style={{ position: 'relative', border: '1px solid #eee', background: '#fff', padding: '5px' }}>
                    <img src={cat.image_url} alt={cat.category_name} style={{ width: '100%', aspectRatio: '4/5', objectFit: 'cover' }} />
                    <p style={{ textAlign: 'center', fontSize: '10px', fontWeight: 'bold', letterSpacing: '2px', textTransform: 'uppercase', padding: '10px 0 5px' }}>{cat.category_name}</p>
                    <button 
                      onClick={async () => {
                        await supabase.from('brand_categories').delete().eq('id', cat.id);
                        fetchBrandCategories(selectedBrand.id);
                      }}
                      style={{ position: 'absolute', top: '10px', right: '10px', background: '#FF4D4D', color: '#fff', border: 'none', padding: '5px', borderRadius: '4px', cursor: 'pointer' }}
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </motion.div>
  );
};