import React, { useState } from 'react';

const Appearance = () => {
  const [imageInputs, setImageInputs] = useState([{ id: Date.now(), file: null, preview: '' }]);

  // عند اختيار صورة لكل حقل مخصص
  const handleFileChange = (id, e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const previewUrl = URL.createObjectURL(file);
      setImageInputs(prevInputs =>
        prevInputs.map(input =>
          input.id === id ? { ...input, file: file, preview: previewUrl } : input
        )
      );
    }
  };

  // إضافة حقل صورة جديد القائمة
  const addNewInput = () => {
    setImageInputs(prev => [...prev, { id: Date.now(), file: null, preview: '' }]);
  };

  // حذف حقل صورة معين
  const removeInput = (id) => {
    if (imageInputs.length > 1) {
      setImageInputs(prev => prev.filter(input => input.id !== id));
    } else {
      // إذا كان الحقل الأخير، نقوم بتفريغه فقط بدلاً من حذفه
      setImageInputs([{ id: Date.now(), file: null, preview: '' }]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    
    // تجميع الملفات الفعلية فقط التي تم رفعها وتجاهل الحقول الفارغة
    imageInputs.forEach((input, index) => {
      if (input.file) {
        formData.append(`images`, input.file);
      }
    });

    // هنا يتم إرسال الـ formData إلى السيرفر
    console.log("تم إرسال الملفات بنجاح");
  };

  return (
    <div style={{ maxWidth: '650px', margin: '40px auto', padding: '30px', backgroundColor: '#ffffff', borderRadius: '16px', boxShadow: '0 10px 25px rgba(0, 0, 0, 0.05)', fontFamily: 'system-ui, -apple-system, sans-serif', textAlign: 'right' }} dir="rtl">
      
      <div style={{ marginBottom: '24px', borderBottom: '1px solid #f3f4f6', paddingBottom: '16px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#111827', margin: 0 }}>إدارة صور المعرض والمظهر</h2>
        <p style={{ fontSize: '13px', color: '#6b7280', marginTop: '4px' }}>قم برفع الصور واستعراضها بشكل ديناميكي</p>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {imageInputs.map((input, index) => (
            <div key={input.id} style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '16px', border: '1px solid #e5e7eb', borderRadius: '12px', backgroundColor: '#f9fafb', transition: 'all 0.2s' }}>
              
              {/* رقم الصورة */}
              <span style={{ fontSize: '14px', fontWeight: '600', color: '#9ca3af', minWidth: '24px' }}>
                {index + 1}
              </span>

              {/* زر رفع الملف المخفي داخل تصميم احترافي */}
              <div style={{ flexGrow: 1, position: 'relative' }}>
                <label style={{ display: 'block', padding: '10px 16px', backgroundColor: '#ffffff', border: '1px dashed #cbd5e1', borderRadius: '8px', cursor: 'pointer', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap', fontSize: '14px', color: input.file ? '#1e293b' : '#64748b', textAlign: 'center' }}>
                  {input.file ? `📸 ${input.file.name}` : 'اضغط لاختيار صورة (JPG, PNG)'}
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={(e) => handleFileChange(input.id, e)} 
                    style={{ display: 'none' }}
                  />
                </label>
              </div>

              {/* المعاينة الحية للصورة المصغرة */}
              {input.preview && (
                <div style={{ width: '56px', height: '56px', borderRadius: '8px', overflow: 'hidden', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' }}>
                  <img src={input.preview} alt="preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              )}

              {/* زر حذف الحقل */}
              <button 
                type="button" 
                onClick={() => removeInput(input.id)}
                style={{ padding: '8px 12px', backgroundColor: 'transparent', color: '#ef4444', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '14px', fontWeight: '500' }}
                onMouseOver={(e) => e.target.style.backgroundColor = '#ffeeee'}
                onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}
              >
                حذف
              </button>

            </div>
          ))}
        </div>

        {/* أزرار التحكم السفلى */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px', borderTop: '1px solid #f3f4f6', paddingTop: '20px' }}>
          
          {/* زر إضافة حقل صورة آخر */}
          <button 
            type="button" 
            onClick={addNewInput}
            style={{ padding: '10px 20px', backgroundColor: '#f0fdf4', color: '#16a34a', border: '1px solid #bbf7d0', borderRadius: '8px', fontSize: '14px', fontWeight: '600', cursor: 'pointer', transition: 'all 0.2s' }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#dcfce7'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#f0fdf4'}
          >
            + إضافة صورة أخرى
          </button>

          {/* زر الحفظ النهائي */}
          <button 
            type="submit" 
            style={{ padding: '10px 24px', backgroundColor: '#2563eb', color: '#ffffff', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: '600', cursor: 'pointer', boxShadow: '0 4px 12px rgba(37, 99, 235, 0.2)', transition: 'all 0.2s' }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#1d4ed8'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#2563eb'}
          >
            حفظ ورفع الكل
          </button>

        </div>

      </form>
    </div>
  );
};

export default Appearance;