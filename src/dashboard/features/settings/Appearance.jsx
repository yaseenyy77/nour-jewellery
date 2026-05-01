import React, { useState, useRef } from 'react';
import { 
  UploadCloud, Trash2, Monitor, Smartphone, 
  Image as ImageIcon, Loader2, GripHorizontal
} from 'lucide-react';
import { useGetSlides, useUploadSlide } from '../../../hooks/useSlides';
// استدعاء السلايدر الأصلي عشان نعرضه لايف
import HeroSlider from '../../../features/home/components/HeroSlider';

const Appearance = () => {
  const [previewMode, setPreviewMode] = useState('desktop'); // desktop | mobile
  const fileInputRef = useRef(null);
  
  // استدعاء الهوكس الخاصة بقاعدة البيانات
  const { data: slides, isLoading } = useGetSlides();
  const uploadMutation = useUploadSlide();

  // معالجة اختيار الصورة للرفع
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      uploadMutation.mutate(file);
    }
  };

  return (
    <div className="max-w-[1400px] mx-auto pb-20">
      {/* هيدر الصفحة */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-black tracking-tighter uppercase flex items-center gap-3">
          <ImageIcon className="text-black" size={32} strokeWidth={2.5} />
          Slider Management
        </h1>
        <p className="text-gray-400 text-xs font-bold tracking-widest mt-2 uppercase">
          Live Editor & Media Control
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* الجزء الأول: لوحة التحكم والرفع (اليسار) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* منطقة رفع الصور */}
          <div className="bg-white border border-gray-100 rounded-[2rem] p-6 shadow-sm">
            <h2 className="text-xs font-black tracking-widest uppercase mb-4 flex items-center gap-2">
              <UploadCloud size={16} /> Upload New Slide
            </h2>
            
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileChange} 
              accept="image/png, image/jpeg, image/webp"
              className="hidden" 
            />
            
            <div 
              onClick={() => !uploadMutation.isPending && fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-3xl p-8 flex flex-col items-center justify-center transition-all cursor-pointer ${
                uploadMutation.isPending 
                  ? 'border-gray-200 bg-gray-50' 
                  : 'border-gray-200 hover:border-black hover:bg-gray-50'
              }`}
            >
              {uploadMutation.isPending ? (
                <div className="flex flex-col items-center animate-pulse">
                  <Loader2 size={32} className="animate-spin text-black mb-3" />
                  <p className="text-[10px] font-black tracking-widest uppercase text-black">Uploading...</p>
                </div>
              ) : (
                <>
                  <div className="w-14 h-14 bg-black text-white rounded-full flex items-center justify-center mb-4 shadow-lg hover:scale-110 transition-transform">
                    <UploadCloud size={24} />
                  </div>
                  <p className="text-[10px] font-black tracking-widest uppercase text-black">Click to Upload</p>
                  <p className="text-[8px] text-gray-400 mt-2 font-bold">PNG, JPG, WEBP (Max 5MB)</p>
                </>
              )}
            </div>
          </div>

          {/* معرض الصور المرفوعة (إدارة السلايدز) */}
          <div className="bg-white border border-gray-100 rounded-[2rem] p-6 shadow-sm">
            <h2 className="text-xs font-black tracking-widest uppercase mb-4">Current Slides ({slides?.length || 0})</h2>
            
            {isLoading ? (
              <div className="h-32 flex items-center justify-center">
                <Loader2 size={24} className="animate-spin text-gray-300" />
              </div>
            ) : (
              <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                {slides?.map((slide, index) => (
                  <div key={slide.id} className="group relative flex items-center gap-4 p-2 bg-gray-50 rounded-2xl hover:bg-white hover:shadow-md border border-transparent hover:border-gray-100 transition-all">
                    
                    {/* أيقونة السحب (للترتيب لو حبيت تضيف الميزة بعدين) */}
                    <button className="text-gray-300 hover:text-black cursor-grab pl-2">
                      <GripHorizontal size={16} />
                    </button>

                    {/* الصورة المصغرة */}
                    <div className="w-16 h-12 rounded-xl overflow-hidden bg-gray-200 flex-shrink-0">
                      <img src={slide.image_url} alt="slide thumb" className="w-full h-full object-cover" />
                    </div>

                    {/* تفاصيل الصورة */}
                    <div className="flex-1">
                      <p className="text-[10px] font-black tracking-wider uppercase text-black">Slide {index + 1}</p>
                    </div>

                    {/* زر الحذف */}
                    <button 
                      className="p-3 text-red-400 hover:text-white hover:bg-red-500 rounded-xl transition-colors opacity-0 group-hover:opacity-100"
                      title="Delete Slide"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}

                {slides?.length === 0 && (
                  <p className="text-center text-[10px] font-bold text-gray-400 tracking-widest uppercase py-8">
                    No slides uploaded yet
                  </p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* الجزء الثاني: المعاينة الحية (اليمين) */}
        <div className="lg:col-span-7 flex flex-col">
          {/* شريط التحكم في المعاينة */}
          <div className="flex justify-between items-center bg-black text-white p-4 rounded-t-3xl">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            
            {/* أزرار التبديل بين الموبايل والديسكتوب */}
            <div className="flex bg-white/10 rounded-full p-1">
              <button 
                onClick={() => setPreviewMode('desktop')}
                className={`p-2 rounded-full transition-all ${previewMode === 'desktop' ? 'bg-white text-black' : 'text-gray-400 hover:text-white'}`}
              >
                <Monitor size={14} />
              </button>
              <button 
                onClick={() => setPreviewMode('mobile')}
                className={`p-2 rounded-full transition-all ${previewMode === 'mobile' ? 'bg-white text-black' : 'text-gray-400 hover:text-white'}`}
              >
                <Smartphone size={14} />
              </button>
            </div>
          </div>

          {/* حاوية المعاينة (بتتغير أبعادها حسب وضع الموبايل أو الديسكتوب) */}
          <div className="bg-gray-100 p-4 md:p-8 rounded-b-3xl border-x border-b border-gray-200 flex justify-center items-center flex-1 min-h-[500px]">
            <div 
              className={`transition-all duration-500 ease-in-out w-full rounded-2xl overflow-hidden shadow-2xl ring-4 ring-white ${
                previewMode === 'mobile' ? 'max-w-[375px]' : 'max-w-full'
              }`}
            >
              {/* عرض السلايدر الفعلي هنا */}
              <HeroSlider />
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Appearance;