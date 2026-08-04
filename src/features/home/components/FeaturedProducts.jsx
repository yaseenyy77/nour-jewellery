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
    <div className="w-full py-8 lg:py-14 bg-white overflow-hidden" dir="ltr">
      
      {/* عنوان السلايدر */}
      <div 
        className="flex items-center justify-center gap-3 sm:gap-6 mb-6 lg:mb-10 cursor-pointer group px-4" 
        onClick={handleViewAll}
      >
        <div className="h-[1px] bg-neutral-400 w-8 sm:w-16 opacity-40 group-hover:w-20 transition-all duration-300"></div>
        <h2 className="text-base sm:text-lg lg:text-xl font-serif font-medium tracking-[0.2em] text-black uppercase group-hover:text-neutral-600 transition-colors text-center">
          {title || category}
        </h2>
        <div className="h-[1px] bg-neutral-400 w-8 sm:w-16 opacity-40 group-hover:w-20 transition-all duration-300"></div>
      </div>

      <div className="max-w-[1400px] mx-auto px-3 sm:px-6 lg:px-8 relative group/slider">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          // توزيع متناسق للأحجام على الموبايل والتابلت واللاب توب
          breakpoints={{ 
            0: { slidesPerView: 2, spaceBetween: 10 },
            640: { slidesPerView: 2.5, spaceBetween: 14 },
            768: { slidesPerView: 3, spaceBetween: 18 },
            1024: { slidesPerView: 4, spaceBetween: 22 } 
          }}
          navigation={{ nextEl: `.next-${swiperId}`, prevEl: `.prev-${swiperId}` }}
          pagination={{ el: `.dots-${swiperId}`, clickable: true }}
          className="pb-10"
        >
          {products.map((product) => {
            const hasSale = product.old_price && product.old_price > product.price;
            const mainImg = product.images?.[0] || 'https://via.placeholder.com/400';

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
                  <div className="relative aspect-[4/5] bg-[#fdfdfd] overflow-hidden flex items-center justify-center group/img border border-gray-100 rounded-sm">
                    
                    {/* شارة الخصم */}
                    {hasSale && (
                      <div className="absolute top-2 right-2 z-10 bg-black text-white text-[7px] sm:text-[8px] font-bold tracking-[0.15em] uppercase px-1.5 py-0.5 shadow-xs">
                        SALE
                      </div>
                    )}
                    
                    <img 
                      src={mainImg} 
                      alt={product.name} 
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover/img:scale-105"
                    />

                    {/* أزرار أجهزة اللمس (الموبايل، التابلت، الأيباد حتى 1024px) - ظاهرة دائماً */}
                    <div className="absolute top-2 left-2 flex xl:hidden z-20">
                      <button 
                        type="button"
                        onClick={handleToggleWishlist}
                        className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full backdrop-blur-md flex items-center justify-center shadow-xs active:scale-90 transition-all ${
                          isFav ? 'bg-white text-red-600' : 'bg-white/90 text-gray-700'
                        }`}
                        aria-label={isFav ? "Remove from Favorites" : "Add to Favorites"}
                      >
                        <Heart size={14} strokeWidth={1.8} className={isFav ? "fill-red-600 text-red-600" : ""} />
                      </button>
                    </div>

                    <div className="absolute bottom-2 right-2 flex xl:hidden items-center gap-1.5 z-20">
                      <button 
                        type="button"
                        onClick={(e) => { e.stopPropagation(); navigate(`/product/${product.id}`); }}
                        className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/95 text-black backdrop-blur-md flex items-center justify-center shadow-xs active:scale-90 transition-transform"
                        aria-label="Quick View"
                      >
                        <Eye size={14} strokeWidth={1.8} />
                      </button>
                    </div>

                    {/* أزرار الكمبيوتر والشاشات الكبيرة (تظهر عند الـ Hover فقط من xl: 1280px) */}
                    <div className="absolute top-3 left-3 hidden xl:flex flex-col gap-2 opacity-0 group-hover/img:opacity-100 transition-all duration-300 z-20">
                      <button 
                        type="button"
                        onClick={handleToggleWishlist} 
                        className={`w-8 h-8 rounded-full backdrop-blur-md flex items-center justify-center shadow-xs transition-all duration-300 hover:scale-110 ${
                          isFav ? 'bg-white text-red-600' : 'bg-white/90 text-gray-600 hover:text-red-600 hover:bg-white'
                        }`}
                        title={isFav ? "Remove from Favorites" : "Add to Favorites"}
                      >
                        <Heart size={16} strokeWidth={1.8} className={isFav ? "fill-red-600 text-red-600" : ""} />
                      </button>
                      <button 
                        type="button"
                        onClick={(e) => { e.stopPropagation(); }}
                        className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-gray-600 hover:text-black hover:bg-white shadow-xs transition-all duration-300 hover:scale-110"
                        title="Zoom Image"
                      >
                        <Maximize2 size={16} strokeWidth={1.5} />
                      </button>
                    </div>

                    <div className="absolute inset-0 hidden xl:flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 bg-black/5 z-10">
                      <button 
                        type="button"
                        onClick={(e) => { e.stopPropagation(); navigate(`/product/${product.id}`); }}
                        className="relative w-[130px] h-[38px] bg-white text-black rounded-full transition-all duration-300 hover:bg-black hover:text-white group/btn1 overflow-hidden flex items-center justify-center shadow-sm translate-y-2 group-hover/img:translate-y-0"
                      >
                        <span className="text-[11px] font-medium tracking-wide text-black group-hover/btn1:opacity-0 transition-opacity duration-300">Quick view</span>
                        <Eye size={16} className="absolute text-white opacity-0 translate-y-3 group-hover/btn1:opacity-100 group-hover/btn1:translate-y-0 transition-all duration-300" />
                      </button>
                    </div>
                  </div>

                  {/* تفاصيل المنتج */}
                  <div className="pt-2.5 px-0.5 flex flex-col items-start text-left flex-1 justify-between">
                    <div>
                      <div className="flex items-center gap-1.5 mb-1">
                        <span className="text-[8px] sm:text-[9px] font-bold text-neutral-500 tracking-[0.2em] uppercase">
                          {product.karat ? `${product.karat} GOLD` : category}
                        </span>
                        {product.weight && (
                          <>
                            <span className="w-[2.5px] h-[2.5px] rounded-full bg-neutral-400"></span>
                            <span className="text-[8px] sm:text-[9px] font-bold text-neutral-500 tracking-[0.15em] uppercase">
                              {product.weight}G
                            </span>
                          </>
                        )}
                      </div>
                      
                      <h3 className="text-[11px] sm:text-xs lg:text-[13px] font-serif font-medium text-black tracking-wide leading-snug line-clamp-1 mb-1 hover:text-neutral-600 transition-colors">
                        {product.name}
                      </h3>
                    </div>

                    <div className="flex items-center gap-2 mt-1">
                      {hasSale && (
                        <span className="text-[9px] sm:text-[10px] text-gray-400 line-through font-medium">
                          LE {product.old_price.toLocaleString()}
                        </span>
                      )}
                      <p className="text-[11px] sm:text-xs text-black font-bold tracking-wider">
                        LE {product.price?.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </SwiperSlide>
            );
          })}
        </Swiper>

        {/* أسهم التنقل للشاشات الكبيرة */}
        <button className={`prev-${swiperId} absolute left-0 lg:left-1 top-[38%] -translate-y-1/2 z-30 w-8 h-8 hidden md:flex items-center justify-center bg-white/90 backdrop-blur-sm rounded-full shadow-sm text-neutral-700 opacity-0 group-hover/slider:opacity-100 transition-all hover:bg-black hover:text-white`}>
          <ChevronLeft size={16} />
        </button>
        <button className={`next-${swiperId} absolute right-0 lg:right-1 top-[38%] -translate-y-1/2 z-30 w-8 h-8 hidden md:flex items-center justify-center bg-white/90 backdrop-blur-sm rounded-full shadow-sm text-neutral-700 opacity-0 group-hover/slider:opacity-100 transition-all hover:bg-black hover:text-white`}>
          <ChevronRight size={16} />
        </button>
      </div>

      <div className="w-full flex justify-center mt-4 sm:mt-6">
        <button 
          onClick={handleViewAll}
          className="px-7 sm:px-9 py-2 sm:py-2.5 border border-black text-black text-[9px] sm:text-[10px] font-semibold tracking-[0.2em] uppercase rounded-full hover:bg-black hover:text-white transition-all duration-300"
        >
          View All {category}
        </button>
      </div>
    </div>
  );
};

export default FeaturedProducts;