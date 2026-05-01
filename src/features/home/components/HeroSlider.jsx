import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, Pagination } from 'swiper/modules';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// استيراد الـ Hook اللي عملناه للربط مع Supabase
import { useGetSlides } from '../../../hooks/useSlides';

const HeroSlider = () => {
  const swiperRef = useRef(null);
  
  // جلب البيانات من جدول hero_slides باستخدام React Query
  const { data: slides, isLoading } = useGetSlides();

  // حالة التحميل: بنعرض Skeleton بنفس أبعاد السلايدر عشان التصميم ميبوظش
  if (isLoading) {
    return <div className="w-full h-[400px] md:h-[500px] bg-gray-100 animate-pulse" />;
  }

  // لو مفيش صور مرفوعة لسه، ممكن تعرض صورة placeholder أو مساحة فاضية
  if (!slides || slides.length === 0) {
    return <div className="w-full h-[400px] md:h-[500px] bg-gray-50 flex items-center justify-center text-gray-300 font-black italic uppercase tracking-widest">No Slides Available</div>;
  }

  return (
    <section className="relative w-full group overflow-hidden bg-gray-50">
      <Swiper
        modules={[Navigation, Autoplay, Pagination]}
        slidesPerView={1}
        loop={true}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        onBeforeInit={(swiper) => {
          swiperRef.current = swiper;
        }}
        pagination={{ clickable: true }}
        className="w-full h-[400px] md:h-[500px]" 
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="w-full h-full">
              <img 
                src={slide.image_url} 
                className="w-full h-full object-cover object-center" 
                alt="Store Banner" 
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* الأسهم المخصصة - لم يتم تغيير أي شيء في التصميم */}
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

      <style jsx global>{`
        /* تنسيق النقاط (Pagination) - نفس الألوان والتنسيق الأصلي */
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
          background: #d4af37 !important; /* اللون الذهبي الفخم */
        }
      `}</style>
    </section>
  );
};

export default HeroSlider;