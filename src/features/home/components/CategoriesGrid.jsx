import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../../../supabaseClient'; 

const CategoriesGrid = ({ brandId, brandName }) => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      if (!brandId) return; // حماية إضافية
      
      const { data, error } = await supabase
        .from('brand_categories')
        .select('*')
        .eq('brand_id', brandId);
      
      if (!error && data) setCategories(data);
    };
    fetchCategories();
  }, [brandId]);

  if (categories.length === 0) return null;

  return (
    <section className="w-full py-8 md:py-12 px-4 max-w-[1200px] mx-auto bg-white">
      <div className="flex justify-between items-center mb-6 md:mb-10 border-b border-gray-100 pb-4 md:pb-6">
        <button 
          onClick={() => navigate(`/shop/${brandName || ''}`)} 
          className="group flex items-center gap-1.5 md:gap-2 text-[8px] md:text-[9px] font-bold tracking-[0.15em] md:tracking-[0.2em] uppercase text-gray-400 hover:text-black transition-colors"
        >
          Discover {brandName}
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-4">
        {categories.map((cat) => {
          // السحر هنا: حماية ضد اختلاف أسماء الأعمدة في قاعدة البيانات (سواء كان اسمه category_name أو name)
          const safeCategoryName = cat.category_name || cat.name || 'general';

          return (
            <div 
              key={cat.id} 
              className="group cursor-pointer flex flex-col"
              onClick={() => navigate(`/shop/${brandName}/${safeCategoryName.toLowerCase()}`)} 
            >
              <div className="relative aspect-square overflow-hidden bg-[#f9f9f9] mb-2 md:mb-3">
                <img 
                  src={cat.image_url} 
                  alt={safeCategoryName} 
                  className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110 grayscale hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500"></div>
              </div>
              
              <div className="flex items-center justify-between px-0.5">
                <span className="text-base md:text-lg font-light text-gray-300 group-hover:text-black transition-colors">&#43;</span>
                <h3 className="text-black text-[8px] md:text-[10px] font-bold tracking-[0.15em] md:tracking-[0.25em] uppercase transition-all">
                  {safeCategoryName}
                </h3>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default CategoriesGrid;