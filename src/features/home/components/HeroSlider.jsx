import React, { useRef, useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, Pagination } from 'swiper/modules';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { fetchSliders } from '../../../services/appearanceService'; 

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const HeroSlider = () => {
  const swiperRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // جلب البيانات مع إضافة حماية في حالة الفشل
  const { data: sliders, isLoading, isError } = useQuery({
    queryKey: ['hero-sliders'],
    queryFn: fetchSliders,
    staleTime: 1000 * 60 * 60, 
    retry: 1,
  });

  // التأكد من أن sliders عبارة عن مصفوفة دائماً لتجنب ضرب الشاشة البيضاء
  const safeSliders = Array.isArray(sliders) ? sliders : [];

  // فلترة الصور حسب نوع الشاشة
  const activeSlides = safeSliders.filter(
    (slider) => slider && slider.device_type === (isMobile ? 'mobile' : 'desktop')
  );

  // 1. حالة التحميل
  if (isLoading) {
    return (
      <div className="w-full h-[400px] md:h-[500px] bg-gray-100 animate-pulse flex items-center justify-center text-gray-400">
        جاري تحميل السلايدر...
      </div>
    );
  }

  // 2. حالة الخطأ أو عدم وجود صور (تمنع الشاشة البيضاء وتظهر لوحة بديلة أنيقة)
  if (isError || activeSlides.length === 0) {
    return (
      <div className="w-full h-[400px] md:h-[500px] bg-neutral-900 flex flex-col items-center justify-center text-white p-6 text-center">
        <h2 className="text-2xl md:text-3xl font-serif tracking-widest mb-2">NOUR JEWELLERY</h2>
        <p className="text-sm text-neutral-400 tracking-wider max-w-md">
          Welcome to our luxury collection. Please upload banner images from the dashboard to customize this slider.
        </p>
      </div>
    );
  }

  return (
    <section className="relative w-full group overflow-hidden bg-gray-50">
      <Swiper
        modules={[Navigation, Autoplay, Pagination]}
        slidesPerView={1}
        loop={activeSlides.length > 1} // لا يعمل Loop إلا إذا كان هناك أكثر من صورة
        autoplay={activeSlides.length > 1 ? { delay: 4000, disableOnInteraction: false } : false}
        onBeforeInit={(swiper) => {
          swiperRef.current = swiper;
        }}
        pagination={{ clickable: true }}
        className="w-full h-[400px] md:h-[500px]" 
      >
        {activeSlides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="w-full h-full">
              <img 
                src={slide.image_url} 
                className="w-full h-full object-cover object-center" 
                alt="Nour Jewellery Banner" 
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* الأسهم تظهر فقط لو يوجد أكثر من صورة */}
      {activeSlides.length > 1 && (
        <>
          <button 
            onClick={() => swiperRef.current?.slidePrev()}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-white/30 backdrop-blur-sm border border-white/50 text-gray-800 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white shadow-sm"
          >
            <ChevronLeft size={28} />
          </button>

          <button 
            onClick={() => swiperRef.current?.slideNext()}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-white/30 backdrop-blur-sm border border-white/50 text-gray-800 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white shadow-sm"
          >
            <ChevronRight size={28} />
          </button>
        </>
      )}

      <style jsx global>{`
        .swiper-pagination-bullet {
          width: 8px;
          height: 8px;
          background: #000 !important;
          opacity: 0.2;
          transition: all 0.3s ease;
        }
        .swiper-pagination-bullet-active {
          width: 24px;
          border-radius: 4px;
          opacity: 0.8;
          background: #d4af37 !important;
        }
      `}</style>
    </section>
  );
};

export default HeroSlider;