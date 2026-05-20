import React, { useState } from 'react';
// استيراد المكونات المشتركة الجاهزة من مجلد الـ ui الخاص بك
import Button from '../../../components/ui/Button'; 
import Input from '../../../components/ui/Input';

const Appearance = () => {
  // حالة حفظ بيانات المظهر (ألوان ونصوص وصور)
  const [formData, setFormData] = useState({
    primaryColor: '#000000',
    secondaryColor: '#ffffff',
    heroTitle: '',
  });

  // حالة حفظ الصور ومعاينتها
  const [heroImage, setHeroImage] = useState(null);
  const [heroImagePreview, setHeroImagePreview] = useState('');
  const [logo, setLogo] = useState(null);
  const [logoPreview, setLogoPreview] = useState('');

  // التعامل مع تغيير الحقول النصية والألوان
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // التعامل مع رفع الصور والتحقق من الصيغ
  const handleImageChange = (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    // التحقق من أن الملف المرفوع هو صورة بالفعل (jpg, jpeg, png, webp, إلخ)
    if (!file.type.startsWith('image/')) {
      alert('يرجى اختيار ملف صورة صالح فقط (PNG, JPG, ...)!');
      return;
    }

    // إنشاء رابط للمعاينة الفورية داخل المتصفح
    const previewUrl = URL.createObjectURL(file);

    if (type === 'hero') {
      setHeroImage(file);
      setHeroImagePreview(previewUrl);
    } else if (type === 'logo') {
      setLogo(file);
      setLogoPreview(previewUrl);
    }
  };

  // إرسال الفورم إلى السيرفر
  const handleSubmit = (e) => {
    e.preventDefault();

    // نستخدم FormData لأننا نقوم برفع ملفات وصور بجانب النصوص والألوان
    const dataToSend = new FormData();
    dataToSend.append('primaryColor', formData.primaryColor);
    dataToSend.append('secondaryColor', formData.secondaryColor);
    dataToSend.append('heroTitle', formData.heroTitle);
    
    if (heroImage) dataToSend.append('heroImage', heroImage);
    if (logo) dataToSend.append('logo', logo);

    // هنا يمكنك استدعاء سيرفيس الـ API الخاصة بك (مثل adminService) لحفظ البيانات
    console.log('جاري حفظ البيانات...', formData);
    alert('تم حفظ إعدادات المظهر بنجاح! (معاينة في الكونسول)');
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-xl shadow-md space-y-6 text-right" dir="rtl">
      <div className="border-b pb-4">
        <h2 className="text-2xl font-bold text-gray-800">إعدادات مظهر الموقع (Appearance)</h2>
        <p className="text-sm text-gray-500 mt-1">التحكم في ألوان وصور البانر الرئيسي للموقع</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* قسم الألوان */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-b pb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">اللون الأساسي للموقع (Primary)</label>
            <div className="flex gap-2 items-center">
              <Input
                type="color"
                name="primaryColor"
                value={formData.primaryColor}
                onChange={handleInputChange}
                className="w-16 h-10 p-1 cursor-pointer rounded-md"
              />
              <span className="text-sm text-gray-600 font-mono">{formData.primaryColor}</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">اللون الفرعي للموقع (Secondary)</label>
            <div className="flex gap-2 items-center">
              <Input
                type="color"
                name="secondaryColor"
                value={formData.secondaryColor}
                onChange={handleInputChange}
                className="w-16 h-10 p-1 cursor-pointer rounded-md"
              />
              <span className="text-sm text-gray-600 font-mono">{formData.secondaryColor}</span>
            </div>
          </div>
        </div>

        {/* قسم النصوص والبانر */}
        <div className="space-y-4 border-b pb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">عنوان البانر الرئيسي (Hero Title)</label>
            <Input
              type="text"
              name="heroTitle"
              placeholder="اكتب العنوان الذي سيظهر على السلايدر الرئيسي"
              value={formData.heroTitle}
              onChange={handleInputChange}
              className="w-full"
            />
          </div>

          {/* رفع صورة اللوجو */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">لوجو الموقع (Logo)</label>
              <Input
                type="file"
                accept="image/png, image/jpeg, image/jpg, image/webp"
                onChange={(e) => handleImageChange(e, 'logo')}
                className="w-full text-sm text-gray-500 file:ml-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
              />
            </div>
            {logoPreview && (
              <div className="border rounded-lg p-2 flex justify-center bg-gray-50 h-24 items-center">
                <img src={logoPreview} alt="Logo Preview" className="max-h-full max-w-full object-contain" />
              </div>
            )}
          </div>

          {/* رفع صورة الهيروو/السلايدر */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">صورة خلفية البانر (Hero Image)</label>
              <Input
                type="file"
                accept="image/png, image/jpeg, image/jpg, image/webp"
                onChange={(e) => handleImageChange(e, 'hero')}
                className="w-full text-sm text-gray-500 file:ml-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
              />
            </div>
            {heroImagePreview && (
              <div className="border rounded-lg p-2 flex justify-center bg-gray-50 h-32 items-center">
                <img src={heroImagePreview} alt="Hero Preview" className="max-h-full max-w-full object-cover rounded" />
              </div>
            )}
          </div>
        </div>

        {/* زر الحفظ والتأكيد */}
        <div className="flex justify-start">
          <Button type="submit" variant="primary" className="px-6 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg font-medium shadow">
            حفظ التغييرات والمظهر
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Appearance;