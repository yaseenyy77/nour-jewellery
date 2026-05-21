import React, { useState } from 'react';
import { supabase } from '../../../../supabaseClient';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

const Appearance = () => {
  const [desktopImages, setDesktopImages] = useState([]);
  const [mobileImages, setMobileImages] = useState([]);
  
  const queryClient = useQueryClient();

  // 1. جلب الصور المرفوعة حالياً في السيرفر فور دخول الصفحة
  const { data: sliders = [], isLoading: isFetchingSliders } = useQuery({
    queryKey: ['hero-sliders'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('hero_sliders')
        .select('*')
        .order('id', { ascending: false });
      
      if (error) throw error;
      return data;
    }
  });

  // تصفية الصور المجلوبة حسب نوع الجهاز
  const liveDesktopImages = sliders.filter(img => img.device_type === 'desktop');
  const liveMobileImages = sliders.filter(img => img.device_type === 'mobile');

  // 2. إعداد عملية الحذف الفوري من قاعدة البيانات والـ Storage
  const deleteMutation = useMutation({
    mutationFn: async ({ id, imageUrl }) => {
      // أ) استخراج مسار الملف داخل الـ Bucket من الرابط العام
      // مثلاً يحول الرابط إلى: desktop/filename.png
      const urlParts = imageUrl.split('/appearance_images/');
      if (urlParts.length > 1) {
        const filePath = urlParts[1];
        // حذف الملف من الـ Storage أولاً
        await supabase.storage.from('appearance_images').remove([filePath]);
      }

      // ب) حذف السجل من جدول قاعدة البيانات
      const { error } = await supabase
        .from('hero_sliders')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      // تحديث البيانات تلقائياً وفوراً في لوحة التحكم وفي الموقع الرئيسي
      queryClient.invalidateQueries({ queryKey: ['hero-sliders'] });
    },
    onError: (error) => {
      console.error('Delete Error:', error);
      alert(`حصل خطأ أثناء الحذف: ${error.message}`);
    }
  });

  const handleDeleteLiveImage = (id, imageUrl) => {
    if (window.confirm('هل أنت متأكد من حذف هذه الصورة نهائياً من الموقع والسيرفر؟')) {
      deleteMutation.mutate({ id, imageUrl });
    }
  };

  // 3. التعامل مع اختيار صور جديدة (Previews)
  const handleDesktopChange = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map(file => ({
      id: Date.now() + Math.random(),
      file: file,
      preview: URL.createObjectURL(file)
    }));
    setDesktopImages(prev => [...prev, ...newImages]);
    e.target.value = null; 
  };

  const handleMobileChange = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map(file => ({
      id: Date.now() + Math.random(),
      file: file,
      preview: URL.createObjectURL(file)
    }));
    setMobileImages(prev => [...prev, ...newImages]);
    e.target.value = null; 
  };

  // 4. إعداد عملية الرفع للصور الجديدة
  const uploadMutation = useMutation({
    mutationFn: async () => {
      const uploadAndSaveImage = async (imageFile, deviceType) => {
        const fileExt = imageFile.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `${deviceType}/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('appearance_images')
          .upload(filePath, imageFile);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('appearance_images')
          .getPublicUrl(filePath);

        const { error: dbError } = await supabase
          .from('hero_sliders')
          .insert([
            { image_url: publicUrl, device_type: deviceType }
          ]);

        if (dbError) throw dbError;
      };

      for (const img of desktopImages) {
        await uploadAndSaveImage(img.file, 'desktop');
      }

      for (const img of mobileImages) {
        await uploadAndSaveImage(img.file, 'mobile');
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['hero-sliders'] });
      alert('تم رفع وحفظ الصور الجديدة بنجاح والتحديث فوري!');
      setDesktopImages([]);
      setMobileImages([]);
    },
    onError: (error) => {
      console.error('Upload Error:', error);
      alert(`حصل خطأ أثناء الرفع: ${error.message}`);
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (desktopImages.length === 0 && mobileImages.length === 0) {
      alert("من فضلك اختر صورة جديدة واحدة على الأقل لرفعها!");
      return;
    }
    uploadMutation.mutate();
  };

  // ================= STYLES (Minimalist Black & White) =================
  const styles = {
    container: { maxWidth: '1000px', margin: '40px auto', padding: '20px', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', color: '#000000', direction: 'ltr', textAlign: 'left' },
    header: { borderBottom: '2px solid #000000', paddingBottom: '20px', marginBottom: '32px' },
    section: { marginBottom: '40px', padding: '24px', border: '1px solid #e5e5e5', backgroundColor: '#ffffff' },
    subTitle: { fontSize: '12px', color: '#666666', margin: '0 0 16px 0', textTransform: 'uppercase', letterSpacing: '0.5px' },
    gridTitle: { fontSize: '13px', fontWeight: '600', textTransform: 'uppercase', margin: '16px 0 8px 0', color: '#000000', borderBottom: '1px dashed #e5e5e5', paddingBottom: '4px' },
    uploadBtn: { display: 'inline-block', padding: '12px 24px', backgroundColor: '#000000', color: '#ffffff', fontSize: '13px', fontWeight: '600', letterSpacing: '0.5px', cursor: 'pointer', textAlign: 'center', border: '1px solid #000000', transition: 'all 0.2s' },
    grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '16px', marginTop: '12px', marginBottom: '24px' },
    previewContainer: { position: 'relative', width: '100%', height: '140px', border: '1px solid #e5e5e5', backgroundColor: '#fafafa', overflow: 'hidden' },
    badgeLive: { position: 'absolute', bottom: '4px', left: '4px', backgroundColor: '#000000', color: '#ffffff', fontSize: '9px', fontWeight: 'bold', padding: '2px 6px', textTransform: 'uppercase' },
    badgePending: { position: 'absolute', bottom: '4px', left: '4px', backgroundColor: '#ffffff', color: '#000000', border: '1px solid #000000', fontSize: '9px', fontWeight: 'bold', padding: '2px 6px', textTransform: 'uppercase' },
    deleteBtn: { position: 'absolute', top: '6px', right: '6px', backgroundColor: '#000000', color: '#ffffff', border: 'none', width: '24px', height: '24px', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', justifycontent: 'center', transition: 'transform 0.1s' },
    submitBtn: { width: '100%', padding: '18px', backgroundColor: uploadMutation.isPending ? '#e5e5e5' : '#000000', color: uploadMutation.isPending ? '#999999' : '#ffffff', border: 'none', fontSize: '14px', fontWeight: '700', letterSpacing: '1px', cursor: uploadMutation.isPending ? 'not-allowed' : 'pointer', textTransform: 'uppercase', transition: 'background-color 0.2s' },
    loadingText: { textAlign: 'center', padding: '40px', fontSize: '14px', color: '#666666', letterSpacing: '1px' }
  };

  if (isFetchingSliders) {
    return <div style={styles.loadingText}>LOADING CURRENT SETTINGS...</div>;
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={{ fontSize: '28px', fontWeight: '800', textTransform: 'uppercase', margin: 0, letterSpacing: '0.5px' }}>Appearance Control</h2>
        <p style={{ fontSize: '13px', color: '#666666', marginTop: '6px' }}>View, delete, or add premium banners across desktop and mobile screens live.</p>
      </div>

      <form onSubmit={handleSubmit}>
        
        {/* ================= DESKTOP SECTION ================= */}
        <div style={styles.section}>
          <h3 style={{ fontSize: '18px', fontWeight: '700', textTransform: 'uppercase', margin: '0 0 4px 0' }}>Desktop Banners</h3>
          <p style={styles.subTitle}>Displayed on computers and large screens.</p>
          
          {/* صور الديسكتوب الحالية */}
          <h4 style={styles.gridTitle}>Active Banners ({liveDesktopImages.length})</h4>
          {liveDesktopImages.length === 0 ? (
            <p style={{ fontSize: '12px', color: '#999999', italic: 'true' }}>No active desktop banners. Upload some below.</p>
          ) : (
            <div style={styles.grid}>
              {liveDesktopImages.map((img) => (
                <div key={img.id} style={styles.previewContainer}>
                  <img src={img.image_url} alt="Live Desktop" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <span style={styles.badgeLive}>Live</span>
                  <button 
                    type="button" 
                    disabled={deleteMutation.isPending}
                    onClick={() => handleDeleteLiveImage(img.id, img.image_url)}
                    style={{ ...styles.deleteBtn, opacity: deleteMutation.isPending ? 0.5 : 1 }}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* زر اختيار صور ديسكتوب جديدة */}
          <label style={styles.uploadBtn}>
            + Select New Desktop Image
            <input type="file" accept="image/*" multiple onChange={handleDesktopChange} style={{ display: 'none' }} />
          </label>

          {/* بريفيو الصور الجديدة المحددة */}
          {desktopImages.length > 0 && (
            <>
              <h4 style={styles.gridTitle}>New To Upload ({desktopImages.length})</h4>
              <div style={styles.grid}>
                {desktopImages.map((img) => (
                  <div key={img.id} style={styles.previewContainer}>
                    <img src={img.preview} alt="New Desktop Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <span style={styles.badgePending}>New</span>
                    <button 
                      type="button" 
                      onClick={() => setDesktopImages(prev => prev.filter(i => i.id !== img.id))}
                      style={styles.deleteBtn}
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* ================= MOBILE SECTION ================= */}
        <div style={styles.section}>
          <h3 style={{ fontSize: '18px', fontWeight: '700', textTransform: 'uppercase', margin: '0 0 4px 0' }}>Mobile Banners</h3>
          <p style={styles.subTitle}>Displayed on phones and compact viewports.</p>
          
          {/* صور الموبايل الحالية */}
          <h4 style={styles.gridTitle}>Active Banners ({liveMobileImages.length})</h4>
          {liveMobileImages.length === 0 ? (
            <p style={{ fontSize: '12px', color: '#999999', italic: 'true' }}>No active mobile banners. Upload some below.</p>
          ) : (
            <div style={styles.grid}>
              {liveMobileImages.map((img) => (
                <div key={img.id} style={styles.previewContainer}>
                  <img src={img.image_url} alt="Live Mobile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <span style={styles.badgeLive}>Live</span>
                  <button 
                    type="button" 
                    disabled={deleteMutation.isPending}
                    onClick={() => handleDeleteLiveImage(img.id, img.image_url)}
                    style={{ ...styles.deleteBtn, opacity: deleteMutation.isPending ? 0.5 : 1 }}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* زر اختيار صور موبايل جديدة */}
          <label style={styles.uploadBtn}>
            + Select New Mobile Image
            <input type="file" accept="image/*" multiple onChange={handleMobileChange} style={{ display: 'none' }} />
          </label>

          {/* بريفيو صور الموبايل الجديدة */}
          {mobileImages.length > 0 && (
            <>
              <h4 style={styles.gridTitle}>New To Upload ({mobileImages.length})</h4>
              <div style={styles.grid}>
                {mobileImages.map((img) => (
                  <div key={img.id} style={styles.previewContainer}>
                    <img src={img.preview} alt="New Mobile Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <span style={styles.badgePending}>New</span>
                    <button 
                      type="button" 
                      onClick={() => setMobileImages(prev => prev.filter(i => i.id !== img.id))}
                      style={styles.deleteBtn}
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* زر حفظ التغييرات والرفع */}
        {(desktopImages.length > 0 || mobileImages.length > 0) && (
          <button 
            type="submit" 
            disabled={uploadMutation.isPending}
            style={styles.submitBtn}
          >
            {uploadMutation.isPending ? 'Saving New Changes...' : 'Save & Publish New Images'}
          </button>
        )}
      </form>
    </div>
  );
};

export default Appearance;