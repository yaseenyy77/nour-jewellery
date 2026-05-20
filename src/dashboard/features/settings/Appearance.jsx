import React, { useState } from 'react';
// تأكد إن مسار ملف سوبابيس صح بناءً على هيكل مشروعك
import { supabase } from '../../../services/supabaseClient'; 

const Appearance = () => {
  const [desktopImages, setDesktopImages] = useState([]);
  const [mobileImages, setMobileImages] = useState([]);
  const [isUploading, setIsUploading] = useState(false); // حالة اللودينج أثناء الرفع

  // اختيار وتجهيز صور الديسكتوب
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

  // اختيار وتجهيز صور الموبايل
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

  // حذف صورة ديسكتوب قبل الرفع
  const removeDesktopImage = (id) => {
    setDesktopImages(prev => prev.filter(img => img.id !== id));
  };

  // حذف صورة موبايل قبل الرفع
  const removeMobileImage = (id) => {
    setMobileImages(prev => prev.filter(img => img.id !== id));
  };

  // دالة الإرسال للسيرفر (سوبابيس)
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (desktopImages.length === 0 && mobileImages.length === 0) {
      alert("Please select at least one image to upload.");
      return;
    }

    setIsUploading(true);

    try {
      // دالة داخلية مسؤولة عن رفع صورة واحدة للباكت وتخزينها في الجدول
      const uploadAndSaveImage = async (imageFile, deviceType) => {
        const fileExt = imageFile.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `${deviceType}/${fileName}`; // بنقسمهم فولدرات وهمية

        // 1. رفع الصورة للباكت
        const { error: uploadError } = await supabase.storage
          .from('appearance_images')
          .upload(filePath, imageFile);

        if (uploadError) throw uploadError;

        // 2. جلب الرابط العام للصورة
        const { data: { publicUrl } } = supabase.storage
          .from('appearance_images')
          .getPublicUrl(filePath);

        // 3. تخزين الرابط ونوع الشاشة في الجدول
        const { error: dbError } = await supabase
          .from('hero_sliders')
          .insert([
            { image_url: publicUrl, device_type: deviceType }
          ]);

        if (dbError) throw dbError;
      };

      // رفع كل صور الديسكتوب
      for (const img of desktopImages) {
        await uploadAndSaveImage(img.file, 'desktop');
      }

      // رفع كل صور الموبايل
      for (const img of mobileImages) {
        await uploadAndSaveImage(img.file, 'mobile');
      }

      alert('Images uploaded and saved successfully!');
      
      // تفريغ الفورم بعد النجاح
      setDesktopImages([]);
      setMobileImages([]);

    } catch (error) {
      console.error('Upload Error:', error);
      alert('An error occurred while uploading. Please check your connection and Supabase settings.');
    } finally {
      setIsUploading(false);
    }
  };

  // ================= STYLES =================
  const containerStyle = {
    maxWidth: '900px',
    margin: '40px auto',
    padding: '40px',
    backgroundColor: '#ffffff',
    border: '1px solid #e5e5e5',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    color: '#000000',
    direction: 'ltr', // عشان التصميم إنجليزي
    textAlign: 'left'
  };

  const headerStyle = {
    borderBottom: '2px solid #000000',
    paddingBottom: '20px',
    marginBottom: '32px'
  };

  const sectionStyle = {
    marginBottom: '40px',
    padding: '24px',
    border: '1px solid #e5e5e5',
    backgroundColor: '#fafafa'
  };

  const uploadBtnStyle = {
    display: 'inline-block',
    padding: '12px 20px',
    backgroundColor: '#000000',
    color: '#ffffff',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    textAlign: 'center',
    transition: 'background-color 0.2s'
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
    gap: '16px',
    marginTop: '20px'
  };

  const previewContainerStyle = {
    position: 'relative',
    width: '120px',
    height: '120px',
    border: '1px solid #e5e5e5',
    backgroundColor: '#ffffff',
    overflow: 'hidden'
  };

  const submitBtnStyle = {
    width: '100%',
    padding: '16px',
    backgroundColor: isUploading ? '#cccccc' : '#000000',
    color: '#ffffff',
    border: 'none',
    fontSize: '16px',
    fontWeight: '600',
    letterSpacing: '0.5px',
    cursor: isUploading ? 'not-allowed' : 'pointer',
    transition: 'background-color 0.2s'
  };
  // ==========================================

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <h2 style={{ fontSize: '24px', fontWeight: '700', textTransform: 'uppercase', margin: 0 }}>Appearance Settings</h2>
        <p style={{ fontSize: '13px', color: '#666666', marginTop: '6px' }}>Manage responsiveness for desktop and mobile banner images.</p>
      </div>

      <form onSubmit={handleSubmit}>
        
        {/* DESKTOP IMAGES SECTION */}
        <div style={sectionStyle}>
          <h3 style={{ fontSize: '16px', fontWeight: '600', textTransform: 'uppercase', margin: '0 0 8px 0' }}>Desktop Layout Images</h3>
          <p style={{ fontSize: '12px', color: '#666666', margin: '0 0 16px 0' }}>Will be displayed only on large screens and monitors.</p>
          
          <label style={uploadBtnStyle}>
            + Add Desktop Image
            <input type="file" accept="image/*" multiple onChange={handleDesktopChange} style={{ display: 'none' }} />
          </label>

          <div style={gridStyle}>
            {desktopImages.map((img) => (
              <div key={img.id} style={previewContainerStyle}>
                <img src={img.preview} alt="Desktop Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <button 
                  type="button" 
                  onClick={() => removeDesktopImage(img.id)}
                  style={{ position: 'absolute', top: '4px', right: '4px', backgroundColor: '#000000', color: '#ffffff', border: 'none', width: '22px', height: '22px', fontSize: '11px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  X
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* MOBILE IMAGES SECTION */}
        <div style={sectionStyle}>
          <h3 style={{ fontSize: '16px', fontWeight: '600', textTransform: 'uppercase', margin: '0 0 8px 0' }}>Mobile Layout Images</h3>
          <p style={{ fontSize: '12px', color: '#666666', margin: '0 0 16px 0' }}>Will be displayed only on handheld and compact mobile devices.</p>
          
          <label style={uploadBtnStyle}>
            + Add Mobile Image
            <input type="file" accept="image/*" multiple onChange={handleMobileChange} style={{ display: 'none' }} />
          </label>

          <div style={gridStyle}>
            {mobileImages.map((img) => (
              <div key={img.id} style={previewContainerStyle}>
                <img src={img.preview} alt="Mobile Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <button 
                  type="button" 
                  onClick={() => removeMobileImage(img.id)}
                  style={{ position: 'absolute', top: '4px', right: '4px', backgroundColor: '#000000', color: '#ffffff', border: 'none', width: '22px', height: '22px', fontSize: '11px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  X
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* SUBMIT BUTTON */}
        <button 
          type="submit" 
          disabled={isUploading}
          style={submitBtnStyle}
        >
          {isUploading ? 'UPLOADING...' : 'SAVE CHANGES'}
        </button>

      </form>
    </div>
  );
};

export default Appearance;