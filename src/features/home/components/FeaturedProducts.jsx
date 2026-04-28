import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { Heart, Eye, ChevronLeft, ChevronRight } from 'lucide-react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// فرضاً أن الداتا موجودة
import { products } from '../../../utils/data';

const FeaturedProducts = ({ title = "Collection", brand = "KLEO" }) => {
  const filteredProducts = products.filter(p => p.brand === brand).slice(0, 10);

  return (
    <div className="w-full py-16 relative group/slider bg-white" dir="ltr">
      {/* العنوان */}
      <div className="flex items-center justify-center gap-4 mb-14 px-4">
        <div className="h-[1px] bg-black/10 w-20 md:w-32"></div>
        <h2 className="text-2xl md:text-3xl font-black italic text-black tracking-tighter">{title}</h2>
        <div className="h-[1px] bg-black/10 w-20 md:w-32"></div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 relative">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={15}
          slidesPerView={1.2}
          loop={true}
          autoplay={{ delay: 4000, disableOnInteraction: true }}
          navigation={{ nextEl: '.next-custom', prevEl: '.prev-custom' }}
          pagination={{ clickable: true, el: '.dots-custom' }}
          breakpoints={{
            640: { slidesPerView: 2, spaceBetween: 20 },
            1024: { slidesPerView: 4, spaceBetween: 25 },
          }}
        >
          {filteredProducts.map((product) => (
            <SwiperSlide key={product.id}>
              <div className="group flex flex-col">
                {/* حاوية الصورة المربعة */}
                <div className="relative w-full aspect-square bg-[#f9f9f9] overflow-hidden flex items-center justify-center border border-gray-50">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-[85%] h-[85%] object-contain transition-transform duration-1000 group-hover:scale-110"
                  />
                  
                  {/* أزرار التفاعل المركزية (للكومبيوتر - Hover) */}
                  <div className="absolute inset-0 hidden md:flex flex-col items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none group-hover:pointer-events-auto">
                    
                    {/* زر Quick View */}
                    <button className="relative w-[70%] bg-white rounded-full py-3.5 transition-all duration-300 hover:bg-black group/btn overflow-hidden flex items-center justify-center border border-black/5">
                      <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-black group-hover/btn:opacity-0 transition-opacity duration-300">
                        Quick view
                      </span>
                      <Eye size={16} className="absolute text-white opacity-0 translate-y-4 group-hover/btn:opacity-100 group-hover/btn:translate-y-0 transition-all duration-300" />
                    </button>

                    {/* زر Add to Wishlist */}
                    <button className="relative w-[70%] bg-white rounded-full py-3.5 transition-all duration-300 hover:bg-black group/btn-wish overflow-hidden flex items-center justify-center border border-black/5">
                      <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-black group-hover/btn-wish:opacity-0 transition-opacity duration-300">
                        Add to Wishlist
                      </span>
                      <Heart size={16} className="absolute text-white opacity-0 translate-y-4 group-hover/btn-wish:opacity-100 group-hover/btn-wish:translate-y-0 transition-all duration-300" />
                    </button>
                  </div>

                  {/* أزرار الجانب (للموبايل أو الأجهزة التي لا تدعم الهوفر) */}
                  <div className="absolute bottom-3 right-3 flex flex-col gap-2 md:hidden">
                    <button className="p-2.5 bg-white/90 shadow-md rounded-full text-black border border-gray-100 active:scale-90 transition-transform">
                      <Eye size={14}/>
                    </button>
                    <button className="p-2.5 bg-white/90 shadow-md rounded-full text-black border border-gray-100 active:scale-90 transition-transform">
                      <Heart size={14}/>
                    </button>
                  </div>
                </div>

                {/* تفاصيل المنتج */}
                <div className="py-5 text-center px-2">
                  <h3 className="text-[11px] font-bold uppercase text-black tracking-[0.15em] truncate mb-1">
                    {product.name}
                  </h3>
                  <p className="text-[11px] font-medium text-gray-400">LE {product.price.toLocaleString()}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* الأسهم */}
        <button className="prev-custom absolute left-0 top-[40%] -translate-y-1/2 z-20 p-3 bg-white/80 border border-gray-100 rounded-full shadow-sm opacity-0 group-hover/slider:opacity-100 transition-all hover:bg-black hover:text-white hidden md:block">
          <ChevronLeft size={20}/>
        </button>
        <button className="next-custom absolute right-0 top-[40%] -translate-y-1/2 z-20 p-3 bg-white/80 border border-gray-100 rounded-full shadow-sm opacity-0 group-hover/slider:opacity-100 transition-all hover:bg-black hover:text-white hidden md:block">
          <ChevronRight size={20}/>
        </button>
      </div>

      <div className="dots-custom flex justify-center mt-6 gap-2"></div>

      <style jsx global>{`
        .dots-custom .swiper-pagination-bullet { width: 6px; height: 6px; background: #e2e2e2; opacity: 1; transition: 0.3s; }
        .dots-custom .swiper-pagination-bullet-active { background: #000 !important; width: 18px; border-radius: 3px; }
      `}</style>
    </div>
  );
};

export default FeaturedProducts;