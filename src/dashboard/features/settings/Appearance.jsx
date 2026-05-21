import React, { useState } from 'react';
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
  CheckCircle2, 
  Image as ImageIcon,
  Loader2
} from 'lucide-react';

const Appearance = () => {
  const [desktopImages, setDesktopImages] = useState([]);
  const [mobileImages, setMobileImages] = useState([]);
  const queryClient = useQueryClient();

  // جلب الصور الحالية
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

  // موتيشن الحذف
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

  // موتيشن الرفع
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

  // ================= STYLES =================
  const theme = {
    gold: '#D4AF37',
    black: '#0A0A0A',
    gray: '#F5F5F5',
    white: '#FFFFFF',
    red: '#FF4D4D'
  };

  const containerStyle = {
    maxWidth: '1100px',
    margin: '40px auto',
    padding: '0 20px',
    fontFamily: '"Inter", sans-serif',
    direction: 'ltr',
    color: theme.black
  };

  const cardStyle = {
    background: theme.white,
    borderRadius: '16px',
    padding: '30px',
    marginBottom: '30px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
    border: '1px solid #eee'
  };

  if (isFetchingSliders) return (
    <div style={{ display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '15px' }}>
      <Loader2 size={40} className="animate-spin" style={{ color: theme.gold }} />
      <p style={{ letterSpacing: '2px', fontWeight: '500', color: '#666' }}>REFINING YOUR VIEW...</p>
    </div>
  );

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
      style={containerStyle}
    >
      {/* Header */}
      <header style={{ marginBottom: '40px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '32px', fontWeight: '800', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '10px' }}>
          Visual <span style={{ color: theme.gold }}>Experience</span>
        </h1>
        <p style={{ color: '#666', fontSize: '15px' }}>Curate the luxury aesthetic of your jewellery banners</p>
      </header>

      <form onSubmit={(e) => { e.preventDefault(); uploadMutation.mutate(); }}>
        
        {/* Section Template */}
        {[
          { title: 'Desktop Masterpiece', subtitle: 'Widescreen HD Banners', icon: <Monitor size={20}/>, live: liveDesktopImages, pending: desktopImages, setter: setDesktopImages, type: 'desktop' },
          { title: 'Mobile Elegance', subtitle: 'Handheld Optimized Banners', icon: <Smartphone size={20}/>, live: liveMobileImages, pending: mobileImages, setter: setMobileImages, type: 'mobile' }
        ].map((sec, idx) => (
          <section key={idx} style={cardStyle}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '25px' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '5px' }}>
                  <span style={{ color: theme.gold }}>{sec.icon}</span>
                  <h3 style={{ fontSize: '20px', fontWeight: '700', margin: 0 }}>{sec.title}</h3>
                </div>
                <p style={{ fontSize: '13px', color: '#888' }}>{sec.subtitle}</p>
              </div>
              
              <label style={{ 
                cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', 
                padding: '10px 20px', borderRadius: '8px', border: `1px solid ${theme.black}`,
                fontSize: '13px', fontWeight: '600', transition: 'all 0.2s'
              }}>
                <Plus size={16} /> Add New
                <input type="file" hidden multiple onChange={(e) => handleFileChange(e, sec.setter)} />
              </label>
            </div>

            {/* Grid for Images */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '20px' }}>
              <AnimatePresence>
                {/* Live Images */}
                {sec.live.map((img) => (
                  <motion.div 
                    layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }}
                    key={img.id} style={{ position: 'relative', height: '120px', borderRadius: '12px', overflow: 'hidden', group: 'true' }}
                  >
                    <img src={img.image_url} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Banner" />
                    <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.4)', opacity: 0, transition: '0.3s', display: 'flex', alignItems: 'center', justifyContent: 'center' }} className="hover-overlay">
                        <button 
                          type="button" onClick={() => window.confirm('Delete forever?') && deleteMutation.mutate({ id: img.id, imageUrl: img.image_url })}
                          style={{ background: theme.white, color: theme.red, border: 'none', padding: '8px', borderRadius: '50%', cursor: 'pointer' }}
                        >
                          <Trash2 size={18} />
                        </button>
                    </div>
                    <span style={{ position: 'absolute', top: '8px', left: '8px', background: theme.gold, color: '#fff', fontSize: '10px', padding: '3px 8px', borderRadius: '4px', fontWeight: 'bold' }}>LIVE</span>
                  </motion.div>
                ))}

                {/* Pending Previews */}
                {sec.pending.map((img) => (
                  <motion.div 
                    initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                    key={img.id} style={{ position: 'relative', height: '120px', borderRadius: '12px', overflow: 'hidden', border: `2px dashed ${theme.gold}` }}
                  >
                    <img src={img.preview} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.6 }} alt="Preview" />
                    <button 
                      type="button" onClick={() => sec.setter(prev => prev.filter(i => i.id !== img.id))}
                      style={{ position: 'absolute', top: '8px', right: '8px', background: theme.black, color: '#fff', border: 'none', borderRadius: '50%', padding: '4px', cursor: 'pointer' }}
                    >
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
                <p style={{ color: '#999', fontSize: '13px' }}>No banners set for this layout</p>
              </div>
            )}
          </section>
        ))}

        {/* Global Action Button */}
        <AnimatePresence>
          {(desktopImages.length > 0 || mobileImages.length > 0) && (
            <motion.div 
              initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 50 }}
              style={{ position: 'fixed', bottom: '30px', left: '50%', transform: 'translateX(-50%)', zIndex: 100 }}
            >
              <button 
                type="submit" disabled={uploadMutation.isPending}
                style={{ 
                  background: theme.black, color: theme.white, border: 'none',
                  padding: '16px 40px', borderRadius: '50px', fontSize: '15px', fontWeight: '700',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.3)', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', gap: '12px', transition: '0.3s'
                }}
              >
                {uploadMutation.isPending ? <Loader2 className="animate-spin" /> : <UploadCloud size={20} />}
                {uploadMutation.isPending ? 'PUBLISHING...' : 'SAVE & PUBLISH CHANGES'}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </form>

      {/* Hover Effects CSS */}
      <style>{`
        .hover-overlay:hover { opacity: 1 !important; }
        label:hover { background: #000; color: #fff; }
        button:active { scale: 0.95; }
      `}</style>
    </motion.div>
  );
};

export default Appearance;