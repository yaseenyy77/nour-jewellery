import React, { useEffect, useState } from 'react';
import { supabase } from '../../../../supabaseClient';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { Eye, ChevronLeft, ChevronRight } from 'lucide-react';
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
        <div className="h-[1px] bg-black w-16 opacity-30 group-hover:w-24 transition-all duration-300"></div>
        <h2 className="text-xl font-medium tracking-[0.25em] text-black uppercase font-serif group-hover:text-[#D4AF37] transition-colors">
          {title || category}
        </h2>
        <div className="h-[1px] bg-black w-16 opacity-30 group-hover:w-24 transition-all duration-300"></div>
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
                  className="group cursor-pointer"
                  onClick={() => navigate(`/product/${product.id}`)}
                >
                  <div className="relative aspect-[4/5] bg-[#f9f9f9] mb-4 overflow-hidden flex items-center justify-center">
                    {hasSale && (
                      <div className="absolute top-3 left-3 z-10 bg-black text-white text-[8px] font-bold tracking-[0.2em] uppercase px-2.5 py-1.5">
                        SALE
                      </div>
                    )}
                    <img 
                      src={mainImg} 
                      alt={product.name} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>

                  <div className="text-left px-1">
                    <p className="text-[11px] text-neutral-400 tracking-widest uppercase mb-1">
                      {product.karat || category}
                    </p>
                    <h3 className="text-[13px] font-normal text-neutral-800 tracking-wide leading-relaxed line-clamp-1 mb-1">
                      {product.name}
                    </h3>
                    <div className="flex items-center gap-3">
                      {hasSale && (
                        <span className="text-[11px] text-gray-400 line-through">
                          LE {product.old_price.toLocaleString()}
                        </span>
                      )}
                      <p className="text-[13px] text-black font-semibold tracking-wide">
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