import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../../../supabaseClient'; 

const CategoriesGrid = ({ brandId, brandName }) => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      const { data } = await supabase
        .from('brand_categories')
        .select('*')
        .eq('brand_id', brandId);
      
      if (data) setCategories(data);
    };
    if (brandId) fetchCategories();
  }, [brandId]);

  // لو لسه مفيش صور للبراند ده، مش هنعرض القسم ده خالص
  if (categories.length === 0) return null;

  return (
    <section className="w-full py-8 md:py-12 px-4 max-w-[1200px] mx-auto bg-white">
      
      <div className="flex justify-between items-center mb-6 md:mb-10 border-b border-gray-100 pb-4 md:pb-6">
        <button 
          onClick={() => navigate(`/shop/${brandName}`)} 
          className="group flex items-center gap-1.5 md:gap-2 text-[8px] md:text-[9px] font-bold tracking-[0.15em] md:tracking-[0.2em] uppercase text-gray-400 hover:text-black transition-all duration-500 bg-transparent border-none cursor-pointer"
        >
          <span className="text-sm md:text-base group-hover:-translate-x-1 transition-transform">&larr;</span>
          SHOP ALL {brandName}
        </button>

        <div className="flex items-center gap-3 md:gap-4">
          <h2 className="text-lg md:text-3xl font-black tracking-[0.15em] md:tracking-[0.25em] uppercase text-black">
            {brandName}
          </h2>
          <div className="hidden sm:block h-[1px] bg-black w-10 md:w-16"></div>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-4">
        {categories.map((cat) => (
          <div 
            key={cat.id} 
            className="group cursor-pointer flex flex-col"
            onClick={() => navigate(`/shop/${brandName}/${cat.category_name.toLowerCase()}`)} 
          >
            <div className="relative aspect-square overflow-hidden bg-[#f9f9f9] mb-2 md:mb-3">
              <img 
                src={cat.image_url} 
                alt={cat.category_name} 
                className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110 grayscale hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500"></div>
            </div>
            
            <div className="flex items-center justify-between px-0.5">
              <span className="text-base md:text-lg font-light text-gray-300 group-hover:text-black transition-colors">&#43;</span>
              <h3 className="text-black text-[8px] md:text-[10px] font-bold tracking-[0.15em] md:tracking-[0.25em] uppercase transition-all">
                {cat.category_name}
              </h3>
            </div>
            
            <div className="mt-1.5 h-[1px] w-0 group-hover:w-full bg-black transition-all duration-700 mx-auto"></div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategoriesGrid;