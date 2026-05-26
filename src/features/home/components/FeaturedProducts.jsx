import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { products } from '../../../utils/data';

const FeaturedProducts = ({ title = "Collection", brand = "" }) => {
  const navigate = useNavigate();
  
  // حماية ضد أن يكون البراند غير معرف
  const safeBrand = brand || '';
  
  const filteredProducts = products.filter(p => 
    p.brand?.toUpperCase() === safeBrand.toUpperCase()
  ).slice(0, 10);

  if (filteredProducts.length === 0) return null;

  // إزالة المسافات من اسم البراند لضمان عمل أزرار السلايدر بشكل صحيح
  const sliderClass = safeBrand.replace(/\s+/g, '');

  return (
    <div className="w-full py-10 md:py-16 relative group/slider bg-white overflow-hidden" dir="ltr">
      <div className="flex items-center justify-center gap-3 md:gap-4 mb-8 md:mb-14 px-4 cursor-pointer" onClick={() => navigate(`/shop/${safeBrand}`)}>
        <div className="h-[1px] bg-black/10 w-12 md:w-32"></div>
        <h2 className="text-xl md:text-3xl font-black italic text-black tracking-tighter whitespace-nowrap hover:text-gray-500 transition-colors">
          {title}
        </h2>
        <div className="h-[1px] bg-black/10 w-12 md:w-32"></div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 relative">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={15}
          slidesPerView={2}
          navigation={{
            nextEl: `.next-${sliderClass}`,
            prevEl: `.prev-${sliderClass}`,
          }}
          pagination={{ el: `.dots-${sliderClass}`, clickable: true }}
          breakpoints={{
            640: { slidesPerView: 2, spaceBetween: 20 },
            768: { slidesPerView: 3, spaceBetween: 20 },
            1024: { slidesPerView: 4, spaceBetween: 25 },
          }}
        >
          {filteredProducts.map((product) => (
            <SwiperSlide key={product.id}>
              <div className="group flex flex-col bg-white">
                <div className="relative aspect-[4/5] overflow-hidden bg-[#f8f8f8] mb-3">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex flex-col items-center text-center px-2">
                  <h3 className="text-[10px] md:text-xs font-bold tracking-[0.15em] uppercase mb-1 md:mb-2 line-clamp-1">{product.name}</h3>
                  <p className="text-[10px] md:text-xs font-medium text-gray-400">LE {product.price?.toLocaleString()}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <button className={`prev-${sliderClass} absolute left-0 top-[40%] -translate-y-1/2 z-20 p-3 bg-white/90 border border-gray-100 rounded-full shadow-sm opacity-0 group-hover/slider:opacity-100 transition-all hover:bg-black hover:text-white hidden xl:block`}>
          <ChevronLeft size={20}/>
        </button>
        <button className={`next-${sliderClass} absolute right-0 top-[40%] -translate-y-1/2 z-20 p-3 bg-white/90 border border-gray-100 rounded-full shadow-sm opacity-0 group-hover/slider:opacity-100 transition-all hover:bg-black hover:text-white hidden xl:block`}>
          <ChevronRight size={20}/>
        </button>
      </div>

      <div className={`dots-${sliderClass} flex justify-center mt-2 gap-2`}></div>
    </div>
  );
};

export default FeaturedProducts;