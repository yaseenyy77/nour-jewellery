import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { Heart, RefreshCw, ShoppingBag, ChevronLeft, ChevronRight } from 'lucide-react';

// استيراد ستايلات سويبر
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// استيراد الداتا
import { products } from '../../../utils/data';

const FeaturedProducts = ({ title = "Collection", brand = "KLEO" }) => {
  const filteredProducts = products.filter(p => p.brand === brand).slice(0, 10);

  return (
    <div className="w-full py-12 relative group/slider" dir="ltr">
      {/* العنوان */}
      <div className="flex items-center justify-center gap-4 mb-12">
        <div className="h-[1px] bg-gray-300 w-24"></div>
        <h2 className="text-2xl font-light tracking-[0.2em] uppercase text-gray-800">{title}</h2>
        <div className="h-[1px] bg-gray-300 w-24"></div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 relative">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={20}
          slidesPerView={1.2}
          loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: true,
            pauseOnMouseEnter: true,
          }}
          navigation={{
            nextEl: '.next-custom',
            prevEl: '.prev-custom',
          }}
          pagination={{ clickable: true, el: '.dots-custom' }}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 4 },
          }}
        >
          {filteredProducts.map((product) => (
            <SwiperSlide key={product.id}>
              <div className="group flex flex-col">
                {/* الحاوية المربعة */}
                <div className="relative w-full aspect-square bg-[#f4f4f4] overflow-hidden flex items-center justify-center">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-contain p-4 transition-transform duration-700 group-hover:scale-105"
                  />
                  
                  {/* أزرار جانبية */}
                  <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-4 group-hover:translate-x-0">
                    <button className="p-2 bg-white rounded-full shadow hover:bg-black hover:text-white"><Heart size={18}/></button>
                    <button className="p-2 bg-white rounded-full shadow hover:bg-black hover:text-white"><RefreshCw size={18}/></button>
                  </div>

                  {/* أزرار سفلية */}
                  <div className="absolute bottom-0 w-full p-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
                    <button className="w-full bg-white py-3 text-[10px] font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-all">Quick View</button>
                    <button className="w-full bg-white py-3 text-[10px] font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-all flex justify-center items-center gap-2">
                      <ShoppingBag size={14}/> Quick Shop
                    </button>
                  </div>
                </div>

                {/* تفاصيل */}
                <div className="py-4 text-center">
                  <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-1">{product.brand}</p>
                  <h3 className="text-sm font-medium text-gray-800">{product.name}</h3>
                  <p className="text-sm font-bold text-gray-900 mt-1">LE {product.price.toLocaleString()}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* الأسهم الثابتة */}
        <button className="prev-custom absolute left-0 top-1/2 -translate-y-1/2 z-20 p-3 bg-white border border-gray-100 rounded-full shadow-lg opacity-0 group-hover/slider:opacity-100 transition-all hover:bg-black hover:text-white">
          <ChevronLeft size={24}/>
        </button>
        <button className="next-custom absolute right-0 top-1/2 -translate-y-1/2 z-20 p-3 bg-white border border-gray-100 rounded-full shadow-lg opacity-0 group-hover/slider:opacity-100 transition-all hover:bg-black hover:text-white">
          <ChevronRight size={24}/>
        </button>
      </div>

      <div className="dots-custom flex justify-center mt-6 gap-2"></div>

      <style jsx global>{`
        .dots-custom .swiper-pagination-bullet { width: 8px; height: 8px; background: #ccc; opacity: 1; transition: 0.3s; }
        .dots-custom .swiper-pagination-bullet-active { background: #000 !important; width: 20px; border-radius: 4px; }
      `}</style>
    </div>
  );
};

export default FeaturedProducts;