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
    <form onSubmit={handleSubmit}>
      <div>
        <label>اختر الصور:</label>
        <input 
          type="file" 
          multiple 
          accept="image/*" 
          onChange={handleImageChange} 
        />
      </div>
      <button type="submit">رفع</button>
    </form>
  );
};

export default Appearance;