import React, { useEffect, useState } from 'react';
import { supabase } from '../../../../supabaseClient';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { Eye, ChevronLeft, ChevronRight, Heart, Maximize2, ShoppingCart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const FeaturedProducts = ({ title = "Collection", category = "rings" }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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
    <div className="w-full py-16 bg-white overflow-hidden" dir="ltr">
      <div 
        className="flex items-center justify-center gap-6 mb-12 cursor-pointer group" 
        onClick={handleViewAll}
      >
        <div className="h-[1px] bg-[#555] w-16 opacity-30 group-hover:w-24 transition-all duration-300"></div>
        <h2 className="text-xl font-medium tracking-[0.25em] text-black uppercase font-serif group-hover:text-[#555] transition-colors">
          {title || category}
        </h2>
        <div className="h-[1px] bg-[#555] w-16 opacity-30 group-hover:w-24 transition-all duration-300"></div>
      </div>

      <div className="max-w-[1400px] mx-auto px-8 relative group/slider">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={25}
          slidesPerView={2}
          breakpoints={{ 640: { slidesPerView: 2 }, 1024: { slidesPerView: 4 } }}
          navigation={{ nextEl: `.next-${swiperId}`, prevEl: `.prev-${swiperId}` }}
          pagination={{ el: `.dots-${swiperId}`, clickable: true }}
          className="pb-14"
        >
          {products.map((product) => {
            const hasSale = product.old_price && product.old_price > product.price;
            const mainImg = product.images?.[0] || 'https://via.placeholder.com/400';

            return (
              <SwiperSlide key={product.id}>
                <motion.div 
                  className="group cursor-pointer flex flex-col"
                  onClick={() => navigate(`/product/${product.id}`)}
                >
                  {/* حاوية الصورة وتأثيرات الأنميشن */}
                  <div className="relative aspect-[4/5] bg-[#fdfdfd] mb-2 overflow-hidden flex items-center justify-center group/img border border-gray-50">
                    {/* شارة الخصم */}
                    {hasSale && (
                      <div className="absolute top-3 right-3 z-10 bg-black text-white text-[8px] font-bold tracking-[0.2em] uppercase px-2.5 py-1.5 shadow-sm">
                        SALE
                      </div>
                    )}
                    
                    <img 
                      src={mainImg} 
                      alt={product.name} 
                      className="w-full h-full object-cover transition-transform duration-[1.5s] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover/img:scale-110"
                    />

                    {/* أيقونات المفضلة والزووم */}
                    <div className="absolute top-4 left-4 flex flex-col gap-3 opacity-0 group-hover/img:opacity-100 transition-all duration-500 z-20">
                      <button 
                        onClick={(e) => { e.stopPropagation(); /* كود الإضافة للمفضلة */ }} 
                        className="text-gray-400 hover:text-red-700 hover:scale-110 transition-all duration-300"
                        title="Add to Favorites"
                      >
                        <Heart size={20} strokeWidth={1.5} />
                      </button>
                      <button 
                        onClick={(e) => { e.stopPropagation(); /* كود التكبير */ }}
                        className="text-gray-400 hover:text-black hover:scale-110 transition-all duration-300"
                        title="Zoom Image"
                      >
                        <Maximize2 size={20} strokeWidth={1.5} />
                      </button>
                    </div>

                    {/* زراير Quick View و Quick Shop */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 opacity-0 group-hover/img:opacity-100 transition-opacity duration-500 bg-black/5 z-10">
                      <button 
                        onClick={(e) => { e.stopPropagation(); navigate(`/product/${product.id}`); }}
                        className="relative w-[140px] h-[42px] bg-white text-black rounded-full transition-all duration-300 hover:bg-[#1a1a1a] group/btn1 overflow-hidden flex items-center justify-center shadow-md translate-y-4 group-hover/img:translate-y-0"
                      >
                        <span className="text-[12px] font-medium tracking-wide text-black group-hover/btn1:opacity-0 transition-opacity duration-300">Quick view</span>
                        <Eye size={18} className="absolute text-white opacity-0 translate-y-4 group-hover/btn1:opacity-100 group-hover/btn1:translate-y-0 transition-all duration-300" />
                      </button>

                      <button 
                        onClick={(e) => { e.stopPropagation(); /* كود إضافة للسلة */ }}
                        className="relative w-[140px] h-[42px] bg-white text-black rounded-full transition-all duration-300 hover:bg-[#1a1a1a] group/btn2 overflow-hidden flex items-center justify-center shadow-md translate-y-4 group-hover/img:translate-y-0 delay-75"
                      >
                        <span className="text-[12px] font-medium tracking-wide text-black group-hover/btn2:opacity-0 transition-opacity duration-300">Quick Shop</span>
                        <ShoppingCart size={18} className="absolute text-white opacity-0 translate-y-4 group-hover/btn2:opacity-100 group-hover/btn2:translate-y-0 transition-all duration-300" />
                      </button>
                    </div>
                  </div>

                  {/* تفاصيل المنتج المعروضة بأناقة (الرمادي الغامق والأسود) */}
                  <div className="pt-4 px-1 flex flex-col items-start text-left">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[9px] font-bold text-[#555] tracking-[0.3em] uppercase">
                        {product.karat ? `${product.karat} GOLD` : category}
                      </span>
                      {product.weight && (
                        <>
                          <span className="w-[3px] h-[3px] rounded-full bg-[#999]"></span>
                          <span className="text-[9px] font-bold text-[#555] tracking-[0.2em] uppercase">
                            {product.weight}G
                          </span>
                        </>
                      )}
                    </div>
                    <h3 className="text-[14px] font-serif font-medium text-black tracking-wider leading-relaxed line-clamp-1 mb-2 hover:text-[#555] transition-colors">
                      {product.name}
                    </h3>
                    <div className="flex items-center gap-3">
                      {hasSale && (
                        <span className="text-[11px] text-[#888] line-through font-medium tracking-widest">
                          LE {product.old_price.toLocaleString()}
                        </span>
                      )}
                      <p className="text-[13px] text-black font-bold tracking-[0.15em]">
                        LE {product.price?.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </SwiperSlide>
            );
          })}
        </Swiper>

        <button className={`prev-${swiperId} absolute left-2 top-[40%] -translate-y-1/2 z-30 w-9 h-9 flex items-center justify-center bg-white/80 backdrop-blur-sm rounded-full shadow-sm text-neutral-600 opacity-0 group-hover/slider:opacity-100 transition-all hover:bg-black hover:text-white`}>
          <ChevronLeft size={18} />
        </button>
        <button className={`next-${swiperId} absolute right-2 top-[40%] -translate-y-1/2 z-30 w-9 h-9 flex items-center justify-center bg-white/80 backdrop-blur-sm rounded-full shadow-sm text-neutral-600 opacity-0 group-hover/slider:opacity-100 transition-all hover:bg-black hover:text-white`}>
          <ChevronRight size={18} />
        </button>
      </div>

      <div className="w-full flex justify-center mt-6">
        <button 
          onClick={handleViewAll}
          className="px-10 py-3 border border-black text-black text-[11px] font-semibold tracking-[0.2em] uppercase rounded-full hover:bg-black hover:text-white transition-all duration-300"
        >
          View All {category}
        </button>
      </div>
    </div>
  );
};

export default FeaturedProducts;