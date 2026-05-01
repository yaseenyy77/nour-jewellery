import React, { useState, useRef } from 'react';
import { 
  UploadCloud, Trash2, Monitor, Smartphone, 
  Image as ImageIcon, Loader2, GripHorizontal
} from 'lucide-react';

// التصحيح هنا: التأكد من المسار حسب الخريطة (hooks حرف صغير)[cite: 11]
import { useGetSlides, useUploadSlide } from '../../../hooks/useSlides';

// التصحيح هنا: التأكد من مسار السلايدر (features و home حرف صغير)[cite: 11]
import HeroSlider from '../../../features/home/components/HeroSlider';

const Appearance = () => {
  const [previewMode, setPreviewMode] = useState('desktop');
  const fileInputRef = useRef(null);
  
  const { data: slides, isLoading } = useGetSlides();
  const uploadMutation = useUploadSlide();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      uploadMutation.mutate(file);
    }
  };

  return (
    <div className="max-w-[1400px] mx-auto pb-20 p-4">
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
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white border border-gray-100 rounded-[2rem] p-6 shadow-sm">
            <h2 className="text-xs font-black tracking-widest uppercase mb-4 flex items-center gap-2">
              <UploadCloud size={16} /> Upload New Slide
            </h2>
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileChange} 
              accept="image/*"
              className="hidden" 
            />
            <div 
              onClick={() => !uploadMutation.isPending && fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-3xl p-8 flex flex-col items-center justify-center transition-all cursor-pointer ${
                uploadMutation.isPending ? 'border-gray-200 bg-gray-50' : 'border-gray-200 hover:border-black'
              }`}
            >
              {uploadMutation.isPending ? (
                <Loader2 size={32} className="animate-spin text-black" />
              ) : (
                <div className="text-center">
                   <UploadCloud size={24} className="mx-auto mb-2" />
                   <p className="text-[10px] font-black uppercase">Click to Upload</p>
                </div>
              )}
            </div>
          </div>

          <div className="bg-white border border-gray-100 rounded-[2rem] p-6 shadow-sm">
            <h2 className="text-xs font-black tracking-widest uppercase mb-4">Current Slides ({slides?.length || 0})</h2>
            <div className="space-y-3 max-h-[400px] overflow-y-auto">
                {slides?.map((slide, index) => (
                  <div key={slide.id} className="flex items-center gap-4 p-2 bg-gray-50 rounded-2xl border border-transparent hover:border-gray-100 transition-all">
                    <GripHorizontal size={16} className="text-gray-300" />
                    <div className="w-16 h-12 rounded-xl overflow-hidden bg-gray-200 flex-shrink-0">
                      <img src={slide.image_url} className="w-full h-full object-cover" alt="" />
                    </div>
                    <div className="flex-1 text-[10px] font-black uppercase">Slide {index + 1}</div>
                    <button className="p-2 text-red-400 hover:bg-red-50 rounded-lg"><Trash2 size={16} /></button>
                  </div>
                ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-7">
          <div className="bg-black text-white p-4 rounded-t-3xl flex justify-between items-center">
            <div className="flex gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-red-500"/><div className="w-2.5 h-2.5 rounded-full bg-yellow-500"/><div className="w-2.5 h-2.5 rounded-full bg-green-500"/></div>
            <div className="flex bg-white/10 rounded-full p-1">
              <button onClick={() => setPreviewMode('desktop')} className={`p-1.5 rounded-full ${previewMode === 'desktop' ? 'bg-white text-black' : ''}`}><Monitor size={14} /></button>
              <button onClick={() => setPreviewMode('mobile')} className={`p-1.5 rounded-full ${previewMode === 'mobile' ? 'bg-white text-black' : ''}`}><Smartphone size={14} /></button>
            </div>
          </div>
          <div className="bg-gray-100 p-4 rounded-b-3xl flex justify-center items-center min-h-[400px]">
            <div className={`transition-all duration-500 w-full rounded-xl overflow-hidden shadow-xl ${previewMode === 'mobile' ? 'max-w-[375px]' : 'max-w-full'}`}>
              <HeroSlider />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Appearance;