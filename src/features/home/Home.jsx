import React, { useEffect, useState } from 'react';
import { supabase } from '../../../supabaseClient'; 
import HeroSlider from './components/HeroSlider';
import CategoriesGrid from './components/CategoriesGrid';
import FeaturedProducts from './components/FeaturedProducts';

const Home = () => {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const { data, error } = await supabase
          .from('brands')
          .select('*')
          .order('created_at', { ascending: true });
          
        if (error) throw error;
        setBrands(data || []);
      } catch (err) {
        console.error("Error fetching brands in Home:", err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchBrands();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center gap-4">
        <div className="w-8 h-8 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
        <div className="font-bold tracking-widest text-[10px] uppercase">Curating Collections...</div>
      </div>
    );
  }

  return (
    <div className="home-container bg-white min-h-screen">
      {/* سلايدر البنرات العلوي */}
      <HeroSlider />
      
      {/* عرض شبكة الأقسام والمنتجات لكل براند ديناميكياً */}
      {brands.length > 0 ? (
        brands.map((brand) => (
          <div key={brand.id} className="mb-20 mt-12">
            {/* إرسال الـ ID والاسم لشبكة الأقسام */}
            <CategoriesGrid brandId={brand.id} brandName={brand.name} />
            
            {/* إرسال الاسم لسلايدر المنتجات */}
            <FeaturedProducts title={`${brand.name} COLLECTION`} brand={brand.name} />
          </div>
        ))
      ) : (
        <div className="text-center py-20 text-gray-400 font-medium text-xs tracking-widest uppercase">
          No collections available yet. Please add brands from the Dashboard.
        </div>
      )}
    </div>
  );
};

export default Home;