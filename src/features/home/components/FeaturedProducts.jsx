import React, { useEffect, useState } from 'react';
import { supabase } from '../../../../supabaseClient';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { Eye, ChevronLeft, ChevronRight, Heart, Maximize2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

// استيراد الـ Wishlist Context
import { useWishlist } from '../../../context/WishlistContext';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const FeaturedProducts = ({ title = "Collection", category = "rings" }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // جلب دالة إضافة/حذف وقائمة المفضلة من الـ Context
  const { favorites, addToWishlist, removeFromWishlist } = useWishlist();

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('category', category.toLowerCase())
          .limit(10);

        if (error) throw error;
        setProducts(data || []);
      } catch (err) {
        console.error('Error fetching featured products:', err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryProducts();
  }, [category]);

  if (loading || products.length === 0) return null;

  const swiperId = category.replace(/\s+/g, '');

  const handleViewAll = () => {
    navigate(`/shop?category=${category.toLowerCase()}`);
  };

  return (
    <div className="w-full py-12 lg:py-16 bg-white overflow-hidden" dir="ltr">
      <div 
        className="flex items-center justify-center gap-4 lg:gap-6 mb-8 lg:mb-12 cursor-pointer group px-4" 
        onClick={handleViewAll}
      >
        <div className="h-[1px] bg-[#555] w-12 lg:w-16 opacity-30 group-hover:w-24 transition-all duration-300"></div>
        <h2 className="text-lg lg:text-xl font-medium tracking-[0.25em] text-black uppercase font-serif group-hover:text-[#555] transition-colors text-center">
          {title || category}
        </h2>
        <div className="h-[1px] bg-[#555] w-12 lg:w-16 opacity-30 group-hover:w-24 transition-all duration-300"></div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 lg:px-8 relative group/slider">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          // تظبيط المسافات عشان الموبايل ياخد حجم أكبر
          breakpoints={{ 
            0: { slidesPerView: 2, spaceBetween: 12 },
            768: { slidesPerView: 3, spaceBetween: 20 },
            1024: { slidesPerView: 4, spaceBetween: 25 } 
          }}
          navigation={{ nextEl: `.next-${swiperId}`, prevEl: `.prev-${swiperId}` }}
          pagination={{ el: `.dots-${swiperId}`, clickable: true }}
          className="pb-12"
        >
          {products.map((product) => {
            const hasSale = product.old_price && product.old_price > product.price;
            const mainImg = product.images?.[0] || 'https://via.placeholder.com/400';

            // التأكد إذا كان المنتج في المفضلة باستخدام String ضماناً للنوع
            const isFav = favorites?.some((item) => String(item.id) === String(product.id));

            const handleToggleWishlist = (e) => {
              e.stopPropagation();
              if (isFav) {
                removeFromWishlist(product.id);
              } else {
                addToWishlist(product);
              }
            };

            return (
              <SwiperSlide key={product.id}>
                <motion.div 
                  className="group cursor-pointer flex flex-col h-full"
                  onClick={() => navigate(`/product/${product.id}`)}
                >
                  {/* حاوية الصورة */}
                  <div className="relative aspect-[4/5] bg-[#fdfdfd] mb-2 overflow-hidden flex items-center justify-center group/img border border-gray-100">
                    {/* شارة الخصم */}
                    {hasSale && (
                      <div className="absolute top-2 right-2 z-10 bg-black text-white text-[8px] lg:text-[9px] font-bold tracking-[0.2em] uppercase px-2 py-1 shadow-sm">
                        SALE
                      </div>
                    )}
                    
                    <img 
                      src={mainImg} 
                      alt={product.name} 
                      className="w-full h-full object-cover transition-transform duration-[1.5s] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover/img:scale-105"
                    />

                    {/* --- أزرار الموبايل (ظاهرة دائماً) --- */}
                    <div className="absolute top-2 left-2 flex lg:hidden z-20">
                      <button 
                        type="button"
                        onClick={handleToggleWishlist}
                        className={`w-8 h-8 rounded-full backdrop-blur-md flex items-center justify-center shadow-sm active:scale-90 transition-all ${
                          isFav ? 'bg-white text-red-600' : 'bg-white/90 text-gray-700'
                        }`}
                        title={isFav ? "Remove from Favorites" : "Add to Favorites"}
                      >
                        <Heart size={15} strokeWidth={1.8} className={isFav ? "fill-red-600 text-red-600" : ""} />
                      </button>
                    </div>

                    <div className="absolute bottom-2 right-2 flex lg:hidden items-center gap-1.5 z-20">
                      <button 
                        type="button"
                        onClick={(e) => { e.stopPropagation(); navigate(`/product/${product.id}`); }}
                        className="w-8 h-8 rounded-full bg-white/95 text-black backdrop-blur-md flex items-center justify-center shadow-md active:scale-90 transition-transform"
                        title="Quick View"
                      >
                        <Eye size={15} strokeWidth={1.8} />
                      </button>
                    </div>
                    {/* ---------------------------------- */}

                    {/* --- أزرار الكمبيوتر (تظهر عند الـ Hover) --- */}
                    <div className="absolute top-3 left-3 hidden lg:flex flex-col gap-2.5 opacity-0 group-hover/img:opacity-100 transition-all duration-500 z-20">
                      <button 
                        type="button"
                        onClick={handleToggleWishlist} 
                        className={`w-9 h-9 rounded-full backdrop-blur-md flex items-center justify-center shadow-sm transition-all duration-300 hover:scale-110 ${
                          isFav ? 'bg-white text-red-600' : 'bg-white/90 text-gray-600 hover:text-red-600 hover:bg-white'
                        }`}
                        title={isFav ? "Remove from Favorites" : "Add to Favorites"}
                      >
                        <Heart size={17} strokeWidth={1.8} className={isFav ? "fill-red-600 text-red-600" : ""} />
                      </button>
                      <button 
                        type="button"
                        onClick={(e) => { e.stopPropagation(); }}
                        className="w-9 h-9 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-gray-600 hover:text-black hover:bg-white shadow-sm transition-all duration-300 hover:scale-110"
                        title="Zoom Image"
                      >
                        <Maximize2 size={17} strokeWidth={1.5} />
                      </button>
                    </div>

                    <div className="absolute inset-0 hidden lg:flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity duration-500 bg-black/5 z-10">
                      <button 
                        type="button"
                        onClick={(e) => { e.stopPropagation(); navigate(`/product/${product.id}`); }}
                        className="relative w-[140px] h-[42px] bg-white text-black rounded-full transition-all duration-300 hover:bg-[#1a1a1a] group/btn1 overflow-hidden flex items-center justify-center shadow-md translate-y-4 group-hover/img:translate-y-0"
                      >
                        <span className="text-[12px] font-medium tracking-wide text-black group-hover/btn1:opacity-0 transition-opacity duration-300">Quick view</span>
                        <Eye size={18} className="absolute text-white opacity-0 translate-y-4 group-hover/btn1:opacity-100 group-hover/btn1:translate-y-0 transition-all duration-300" />
                      </button>
                    </div>
                    {/* ---------------------------------- */}
                  </div>

                  {/* تفاصيل المنتج */}
                  <div className="pt-3 px-1 flex flex-col items-start text-left flex-1">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-[8px] lg:text-[9px] font-bold text-[#555] tracking-[0.3em] uppercase">
                        {product.karat ? `${product.karat} GOLD` : category}
                      </span>
                      {product.weight && (
                        <>
                          <span className="w-[3px] h-[3px] rounded-full bg-[#999]"></span>
                          <span className="text-[8px] lg:text-[9px] font-bold text-[#555] tracking-[0.2em] uppercase">
                            {product.weight}G
                          </span>
                        </>
                      )}
                    </div>
                    <h3 className="text-[12px] lg:text-[14px] font-serif font-medium text-black tracking-wider leading-relaxed line-clamp-1 mb-2 hover:text-[#555] transition-colors">
                      {product.name}
                    </h3>
                    <div className="flex items-center gap-3 mt-auto">
                      {hasSale && (
                        <span className="text-[10px] lg:text-[11px] text-[#888] line-through font-medium tracking-widest">
                          LE {product.old_price.toLocaleString()}
                        </span>
                      )}
                      <p className="text-[12px] lg:text-[13px] text-black font-bold tracking-[0.15em]">
                        LE {product.price?.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </SwiperSlide>
            );
          })}
        </Swiper>

        <button className={`prev-${swiperId} absolute left-0 lg:left-2 top-[40%] -translate-y-1/2 z-30 w-8 h-8 lg:w-9 lg:h-9 hidden md:flex items-center justify-center bg-white/80 backdrop-blur-sm rounded-full shadow-sm text-neutral-600 opacity-0 group-hover/slider:opacity-100 transition-all hover:bg-black hover:text-white`}>
          <ChevronLeft size={18} />
        </button>
        <button className={`next-${swiperId} absolute right-0 lg:right-2 top-[40%] -translate-y-1/2 z-30 w-8 h-8 lg:w-9 lg:h-9 hidden md:flex items-center justify-center bg-white/80 backdrop-blur-sm rounded-full shadow-sm text-neutral-600 opacity-0 group-hover/slider:opacity-100 transition-all hover:bg-black hover:text-white`}>
          <ChevronRight size={18} />
        </button>
      </div>

      <div className="w-full flex justify-center mt-6 lg:mt-8">
        <button 
          onClick={handleViewAll}
          className="px-8 lg:px-10 py-2.5 lg:py-3 border border-black text-black text-[10px] lg:text-[11px] font-semibold tracking-[0.2em] uppercase rounded-full hover:bg-black hover:text-white transition-all duration-300"
        >
          View All {category}
        </button>
      </div>
    </div>
  );
};

export default FeaturedProducts;