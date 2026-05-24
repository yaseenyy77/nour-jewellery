import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase'; // تأكد من مسار السوبابيز عندك
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

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

  // لو البراند لسه متضافلوش صور، مش هنعرض الجريد عشان ميبوظش الشكل
  if (categories.length === 0) return null;

  return (
    <div className="max-w-[1400px] mx-auto px-4 py-16 md:py-24">
      <div className="flex items-end justify-between mb-10">
        <div>
          <h2 className="text-2xl md:text-3xl font-black uppercase tracking-widest text-black">
            {brandName} CATEGORIES
          </h2>
          <p className="text-gray-400 text-xs tracking-widest uppercase mt-2">Discover The Collections</p>
        </div>
        <button 
          onClick={() => navigate(`/shop/${brandName}`)}
          className="hidden md:flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] hover:text-gray-500 transition-colors"
        >
          View All <ArrowRight size={14} />
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {categories.map((cat, idx) => (
          <div 
            key={cat.id} 
            onClick={() => navigate(`/shop/${brandName}/${cat.category_name.toLowerCase()}`)}
            className="group cursor-pointer relative overflow-hidden bg-[#fafafa]"
          >
            <div className="relative w-full aspect-[4/5] overflow-hidden">
              <img 
                src={cat.image_url} 
                alt={cat.category_name} 
                className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors duration-500" />
            </div>
            <div className="absolute bottom-6 left-0 right-0 text-center z-10">
              <h3 className="text-white text-xs md:text-sm font-bold uppercase tracking-[0.25em] drop-shadow-md">
                {cat.category_name}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoriesGrid;