import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { Heart, Eye, ShoppingCart, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { products } from '../../../utils/data';

const FeaturedProducts = ({ title = "Collection", brand = "KLEO" }) => {
  const navigate = useNavigate();
  const filteredProducts = products.filter(p => p.brand?.toUpperCase() === brand.toUpperCase()).slice(0, 10);

  if (filteredProducts.length === 0) return null;

  const swiperId = brand.replace(/\s+/g, '');

  return (
    <div className="w-full py-16 bg-white overflow-hidden" dir="ltr">
      {/* العنوان */}
      <div 
        className="flex items-center justify-center gap-6 mb-12 cursor-pointer group" 
        onClick={() => navigate(`/shop/${brand}`)}
      >
        <div className="h-[1px] bg-black w-16 opacity-30"></div>
        <h2 className="text-xl font-medium tracking-[0.25em] text-black uppercase font-serif">
          {brand} {title}
        </h2>
        <div className="h-[1px] bg-black w-16 opacity-30"></div>
      </div>

      {/* السلايدر */}
      <div className="max-w-[1400px] mx-auto px-8 relative group/slider">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={25}
          slidesPerView={2}
          breakpoints={{ 
            640: { slidesPerView: 2 }, 
            1024: { slidesPerView: 4 } 
          }}
          navigation={{ nextEl: `.next-${swiperId}`, prevEl: `.prev-${swiperId}` }}
          pagination={{ el: `.dots-${swiperId}`, clickable: true }}
          className="pb-14"
        >
          {filteredProducts.map((product) => (
            <SwiperSlide key={product.id}>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="group cursor-pointer"
                onClick={() => navigate(`/product/${product.id}`)}
              >
                {/* حاوية الصورة الأساسية */}
                <div className="relative aspect-[4/5] bg-[#f9f9f9] mb-4 overflow-hidden flex items-center justify-center">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  
                  {/* الأيقونات الجانبية (تظهر عند الهوفر على الكارت) */}
                  <div className="absolute top-4 left-4 flex flex-col gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                    <button className="text-neutral-500 hover:text-black transition-colors" onClick={(e) => e.stopPropagation()}>
                      <Heart size={18} strokeWidth={1.5} />
                    </button>
                    <button className="text-neutral-500 hover:text-black transition-colors" onClick={(e) => e.stopPropagation()}>
                      <Maximize2 size={18} strokeWidth={1.5} />
                    </button>
                  </div>

                  {/* حاوية الأزرار المركزية - متظبطة عشان تكون أنيقة ومش واخدة مساحة غبية */}
                  <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-3 z-20">
                    
                    {/* الزر الأول: Quick view */}
                    <button 
                      className="group/btn1 relative w-[160px] h-[44px] bg-white rounded-full overflow-hidden shadow-sm transition-transform duration-300 hover:scale-105"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {/* خلفية الزرار السودة اللي بتطلع من تحت */}
                      <div className="absolute inset-0 bg-[#111] translate-y-full group-hover/btn1:translate-y-0 transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]"></div>
                      
                      {/* النص - بيختفي لفوق */}
                      <div className="absolute inset-0 flex items-center justify-center transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/btn1:-translate-y-full">
                        <span className="text-black text-[13px] font-medium tracking-wide">Quick view</span>
                      </div>
                      
                      {/* الأيقونة - بتطلع من تحت */}
                      <div className="absolute inset-0 flex items-center justify-center translate-y-full group-hover/btn1:translate-y-0 transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]">
                        <Eye size={18} strokeWidth={2} className="text-white" />
                      </div>
                    </button>

                    {/* الزر الثاني: Quick Shop */}
                    <button 
                      className="group/btn2 relative w-[160px] h-[44px] bg-white rounded-full overflow-hidden shadow-sm transition-transform duration-300 hover:scale-105"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {/* خلفية الزرار السودة اللي بتطلع من تحت */}
                      <div className="absolute inset-0 bg-[#111] translate-y-full group-hover/btn2:translate-y-0 transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]"></div>
                      
                      {/* النص - بيختفي لفوق */}
                      <div className="absolute inset-0 flex items-center justify-center transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/btn2:-translate-y-full">
                        <span className="text-black text-[13px] font-medium tracking-wide">Quick Shop</span>
                      </div>
                      
                      {/* الأيقونة - بتطلع من تحت */}
                      <div className="absolute inset-0 flex items-center justify-center translate-y-full group-hover/btn2:translate-y-0 transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]">
                        <ShoppingCart size={18} strokeWidth={2} className="text-white" />
                      </div>
                    </button>

                  </div>
                </div>

                {/* تفاصيل المنتج */}
                <div className="text-left px-1">
                  <p className="text-[11px] text-neutral-400 tracking-widest uppercase mb-1">
                    {product.brand || brand}
                  </p>
                  <h3 className="text-[13px] font-normal text-neutral-800 tracking-wide leading-relaxed line-clamp-2 min-h-[38px] mb-1">
                    {product.name}
                  </h3>
                  <p className="text-[13px] text-black font-semibold tracking-wide">
                    LE {product.price}
                  </p>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* الأسهم الجانبية */}
        <button className={`prev-${swiperId} absolute left-2 top-[40%] -translate-y-1/2 z-30 w-9 h-9 flex items-center justify-center bg-white/80 backdrop-blur-sm rounded-full shadow-sm text-neutral-600 opacity-0 group-hover/slider:opacity-100 transition-all hover:bg-black hover:text-white`}>
          <ChevronLeft size={18} strokeWidth={2} />
        </button>
        <button className={`next-${swiperId} absolute right-2 top-[40%] -translate-y-1/2 z-30 w-9 h-9 flex items-center justify-center bg-white/80 backdrop-blur-sm rounded-full shadow-sm text-neutral-600 opacity-0 group-hover/slider:opacity-100 transition-all hover:bg-black hover:text-white`}>
          <ChevronRight size={18} strokeWidth={2} />
        </button>
      </div>

      {/* نقاط التصفح السفلي */}
      <div className={`dots-${swiperId} flex justify-center gap-2 mt-4`}></div>

      {/* زرار عرض الكل */}
      <div className="w-full flex justify-center mt-10">
        <button 
          onClick={() => navigate(`/shop/${brand}`)}
          className="px-10 py-3 border border-black text-black text-[11px] font-semibold tracking-[0.2em] uppercase rounded-full hover:bg-black hover:text-white transition-all duration-300"
        >
          View All
        </button>
      </div>
    </div>
  );
};

export default FeaturedProducts;