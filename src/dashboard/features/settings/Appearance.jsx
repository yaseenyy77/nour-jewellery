import React, { useState } from 'react';
import { supabase } from '../../../../supabaseClient';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Monitor, Smartphone, Trash2, UploadCloud, Plus, X, 
  Image as ImageIcon, Loader2
} from 'lucide-react';

const Appearance = () => {
  return (
    <div className="max-w-[1200px] mx-auto p-5 font-['Inter']">
      <BannersManager />
    </div>
  );
};

// ==========================================
// مكون إدارة البنرات بالكامل (Desktop & Mobile)
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
        <p className="text-gray-500 text-xs">Manage website homepage hero banners</p>
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