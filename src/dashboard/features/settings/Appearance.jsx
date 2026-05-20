import React, { useState } from 'react';

const Appearance = () => {
  const [images, setImages] = useState([]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    images.forEach((image) => {
      formData.append('images', image);
    });
    // هنا يتم إرسال formData إلى السيرفر
  };

  return (
    <div style={{ maxWidth: '500px', margin: '40px auto', padding: '30px', backgroundColor: '#ffffff', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)', fontFamily: 'sans-serif', textAlign: 'right' }} dir="rtl">
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label style={{ fontSize: '15px', fontWeight: '600', color: '#374151' }}>
            اختر الصور (JPG, PNG, ...):
          </label>
          <input 
            type="file" 
            multiple 
            accept="image/*" 
            onChange={handleImageChange} 
            style={{ padding: '10px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '14px', backgroundColor: '#f9fafb', cursor: 'pointer' }}
          />
        </div>

        <button 
          type="submit" 
          style={{ padding: '12px', backgroundColor: '#2563eb', color: '#ffffff', border: 'none', borderRadius: '8px', fontSize: '16px', fontWeight: '500', cursor: 'pointer', transition: 'background-color 0.2s' }}
          onMouseOver={(e) => e.target.style.backgroundColor = '#1d4ed8'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#2563eb'}
        >
          رفع الصور
        </button>

      </form>
    </div>
  );
};

export default Appearance;