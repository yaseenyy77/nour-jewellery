import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, Pagination } from 'swiper/modules';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// التصحيح هنا: التأكد من المسار حسب الخريطة (hooks حرف صغير)[cite: 11]
import { useGetSlides } from '../../../hooks/useSlides';

const HeroSlider = () => {
  const swiperRef = useRef(null);
  const { data: slides, isLoading } = useGetSlides();

  if (isLoading) return <div className="w-full h-[400px] md:h-[500px] bg-gray-100 animate-pulse" />;
  if (!slides || slides.length === 0) return <div className="w-full h-[400px] md:h-[500px] bg-gray-50 flex items-center justify-center text-gray-300 font-black italic uppercase tracking-widest">No Slides Available</div>;

  return (
    <section className="relative w-full group overflow-hidden bg-gray-50">
      <Swiper
        modules={[Navigation, Autoplay, Pagination]}
        slidesPerView={1}
        loop={true}
        autoplay={{ delay: 4000 }}
        onBeforeInit={(swiper) => { swiperRef.current = swiper; }}
        pagination={{ clickable: true }}
        className="w-full h-[400px] md:h-[500px]" 
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <img src={slide.image_url} className="w-full h-full object-cover" alt="Banner" />
          </SwiperSlide>
        ))}
      </Swiper>
      <button onClick={() => swiperRef.current?.slidePrev()} className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-white/30 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all shadow-sm"><ChevronLeft size={28} /></button>
      <button onClick={() => swiperRef.current?.slideNext()} className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-white/30 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all shadow-sm"><ChevronRight size={28} /></button>
    </section>
  );
};

export default HeroSlider;