import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { Heart, Eye, ChevronLeft, ChevronRight } from 'lucide-react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { products } from '../../../utils/data';

const FeaturedProducts = ({ title = "Collection", brand = "KLEO" }) => {
  const filteredProducts = products.filter(p => p.brand === brand).slice(0, 10);

  return (
    <div className="w-full py-10 md:py-16 relative group/slider bg-white overflow-hidden" dir="ltr">
      {/* العنوان - تحسين المسافات للموبايل */}
      <div className="flex items-center justify-center gap-3 md:gap-4 mb-8 md:mb-14 px-4">
        <div className="h-[1px] bg-black/10 w-12 md:w-32"></div>
        <h2 className="text-xl md:text-3xl font-black italic text-black tracking-tighter whitespace-nowrap">{title}</h2>
        <div className="h-[1px] bg-black/10 w-12 md:w-32"></div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 relative">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={12}
          slidesPerView={1.2}
          grabCursor={true} // تجربة سحب احترافية
          loop={true}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          navigation={{ nextEl: '.next-custom', prevEl: '.prev-custom' }}
          pagination={{ clickable: true, el: '.dots-custom' }}
          breakpoints={{
            // التابلت الصغير والموبايلات الكبيرة
            480: { slidesPerView: 2.2, spaceBetween: 15 },
            // التابلت العادي
            768: { slidesPerView: 3, spaceBetween: 20 },
            // الشاشات الكبيرة
            1024: { slidesPerView: 4, spaceBetween: 25 },
          }}
          className="pb-12"
        >
          {filteredProducts.map((product) => (
            <SwiperSlide key={product.id}>
              <div className="group flex flex-col h-full">
                <div className="relative w-full aspect-square bg-[#f9f9f9] overflow-hidden flex items-center justify-center border border-gray-50 rounded-sm">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-[85%] h-[85%] object-contain transition-transform duration-1000 group-hover:scale-110"
                  />
                  
                  {/* أزرار الكومبيوتر (Hover) - تظهر فقط للأجهزة التي تدعم hover */}
                  <div className="absolute inset-0 hidden lg:flex flex-col items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none group-hover:pointer-events-auto">
                    <button className="relative w-[70%] bg-white rounded-full py-3.5 transition-all duration-300 hover:bg-black group/btn overflow-hidden flex items-center justify-center border border-black/5">
                      <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-black group-hover/btn:opacity-0 transition-opacity duration-300">Quick view</span>
                      <Eye size={16} className="absolute text-white opacity-0 translate-y-4 group-hover/btn:opacity-100 group-hover/btn:translate-y-0 transition-all duration-300" />
                    </button>

                    <button className="relative w-[70%] bg-white rounded-full py-3.5 transition-all duration-300 hover:bg-black group/btn-wish overflow-hidden flex items-center justify-center border border-black/5">
                      <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-black group-hover/btn-wish:opacity-0 transition-opacity duration-300">Add to Wishlist</span>
                      <Heart size={16} className="absolute text-white opacity-0 translate-y-4 group-hover/btn-wish:opacity-100 group-hover/btn-wish:translate-y-0 transition-all duration-300" />
                    </button>
                  </div>

                  {/* أزرار التابلت والموبايل (تظهر دائماً في الأجهزة اللمس) */}
                  <div className="absolute bottom-3 right-3 flex flex-col gap-2 lg:hidden">
                    <button className="p-2.5 bg-white/95 shadow-sm rounded-full text-black border border-gray-100 active:scale-90 transition-transform flex items-center justify-center">
                      <Eye size={15}/>
                    </button>
                    <button className="p-2.5 bg-white/95 shadow-sm rounded-full text-black border border-gray-100 active:scale-90 transition-transform flex items-center justify-center">
                      <Heart size={15}/>
                    </button>
                  </div>
                </div>

                <div className="py-4 text-center px-1">
                  <h3 className="text-[10px] md:text-[11px] font-bold uppercase text-black tracking-[0.1em] md:tracking-[0.15em] truncate mb-1">
                    {product.name}
                  </h3>
                  <p className="text-[10px] md:text-[11px] font-medium text-gray-400">LE {product.price.toLocaleString()}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* الأسهم - تظهر فقط في الشاشات الكبيرة جداً */}
        <button className="prev-custom absolute left-0 top-[40%] -translate-y-1/2 z-20 p-3 bg-white/90 border border-gray-100 rounded-full shadow-sm opacity-0 group-hover/slider:opacity-100 transition-all hover:bg-black hover:text-white hidden xl:block">
          <ChevronLeft size={20}/>
        </button>
        <button className="next-custom absolute right-0 top-[40%] -translate-y-1/2 z-20 p-3 bg-white/90 border border-gray-100 rounded-full shadow-sm opacity-0 group-hover/slider:opacity-100 transition-all hover:bg-black hover:text-white hidden xl:block">
          <ChevronRight size={20}/>
        </button>
      </div>

      <div className="dots-custom flex justify-center mt-2 gap-2"></div>

      <style jsx global>{`
        .dots-custom .swiper-pagination-bullet { width: 5px; height: 5px; background: #d1d1d1; opacity: 1; transition: 0.3s; }
        .dots-custom .swiper-pagination-bullet-active { background: #000 !important; width: 15px; border-radius: 3px; }
        @media (max-width: 768px) {
          .dots-custom .swiper-pagination-bullet { width: 4px; height: 4px; }
          .dots-custom .swiper-pagination-bullet-active { width: 12px; }
        }
      `}</style>
    </div>
  );
};

export default FeaturedProducts;