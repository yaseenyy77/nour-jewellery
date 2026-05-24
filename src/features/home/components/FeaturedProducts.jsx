import React from 'react';
import { motion } from 'framer-motion';
import { Eye, Heart, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
// تأكد من مسار ملف الداتا بتاعك
import { products as dummyProducts } from '../../utils/data'; 

const FeaturedProducts = ({ brandName }) => {
  const navigate = useNavigate();

  // فلترة المنتجات بناءً على اسم البراند المبعوت
  const brandProducts = dummyProducts.filter(
    (product) => product.brand?.toLowerCase() === brandName.toLowerCase()
  );

  if (brandProducts.length === 0) return null;

  return (
    <div className="w-full bg-[#fafafa] py-20 border-y border-gray-100">
      <div className="max-w-[1400px] mx-auto px-4">
        
        <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6">
          <div className="text-center md:text-left">
            <h2 className="text-2xl md:text-3xl font-black uppercase tracking-[0.2em] text-black">
              {brandName} HIGHLIGHTS
            </h2>
            <p className="text-gray-400 text-[10px] tracking-widest uppercase mt-3">
              Curated master pieces
            </p>
          </div>
          
          <button 
            onClick={() => navigate(`/shop/${brandName}`)}
            className="flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] uppercase border-b border-black pb-1 hover:text-gray-500 hover:border-gray-500 transition-all"
          >
            Shop {brandName} <ArrowRight size={14} />
          </button>
        </div>

        {/* سلايدر التمرير الأفقي */}
        <div className="flex overflow-x-auto gap-6 pb-8 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {brandProducts.slice(0, 8).map((product, idx) => (
            <motion.div 
              key={product.id || idx}
              initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }}
              className="min-w-[260px] md:min-w-[300px] lg:min-w-[340px] snap-start group cursor-pointer"
            >
              <div className="relative w-full aspect-[4/5] bg-white overflow-hidden border border-gray-100 flex items-center justify-center">
                {product.discount && (
                  <div className="absolute top-4 left-4 z-10 bg-black text-white text-[9px] font-bold tracking-widest uppercase px-3 py-1.5">
                    SALE
                  </div>
                )}
                <img 
                  src={product.image || product.img} 
                  alt={product.name} 
                  className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-105"
                />
                
                {/* أزرار الهوفر */}
                <div className="absolute inset-0 hidden lg:flex flex-col items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-black/5">
                  <button className="w-[70%] bg-white text-black rounded-full py-3 text-[9px] font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-all duration-300">Quick view</button>
                  <button className="w-[70%] bg-white text-black rounded-full py-3 text-[9px] font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-all duration-300">Add to Wishlist</button>
                </div>
              </div>

              <div className="pt-4 flex flex-col items-start text-left">
                <h3 className="text-xs font-bold tracking-wider uppercase text-black truncate w-full mb-1">
                  {product.name}
                </h3>
                <span className="text-[11px] text-black font-black tracking-wider">
                  LE {(product.price || 0).toLocaleString()}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
        
      </div>
    </div>
  );
};

export default FeaturedProducts;