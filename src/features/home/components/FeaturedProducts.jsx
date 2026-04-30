// src/features/home/components/FeaturedProducts.jsx
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { products } from '../../../utils/data'; // Your future products list

const FeaturedProducts = ({ title, brand }) => {
  // SMART FILTER: Only show products belonging to THIS brand
  const filteredProducts = products.filter(p => p.brand === brand);

  // If no products exist for this brand yet, we don't show the slider
  if (filteredProducts.length === 0) return null;

  return (
    <div className="w-full py-10 bg-white overflow-hidden" dir="ltr">
      <div className="flex items-center justify-center gap-4 mb-10 px-4">
        <div className="h-[1px] bg-black/10 w-12 md:w-32"></div>
        <h2 className="text-xl md:text-2xl font-black uppercase text-black tracking-tighter">
          {title}
        </h2>
        <div className="h-[1px] bg-black/10 w-12 md:w-32"></div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={15}
          slidesPerView={1.2}
          breakpoints={{
            640: { slidesPerView: 2.2 },
            1024: { slidesPerView: 4 },
          }}
        >
          {filteredProducts.map((product) => (
            <SwiperSlide key={product.id}>
              {/* Product Card Content */}
              <div className="group">
                 <img src={product.image} className="w-full aspect-square object-cover" />
                 <h3 className="mt-4 text-xs font-bold uppercase">{product.name}</h3>
                 <p className="text-gray-400 text-xs">LE {product.price}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default FeaturedProducts;