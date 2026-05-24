import React, { useEffect, useState } from 'react';
import { supabase } from '../../../supabaseClient'; // تأكد من مسار السوبابيز الصحيح
import HeroSlider from './components/HeroSlider';
import CategoriesGrid from './components/CategoriesGrid';
import FeaturedProducts from './components/FeaturedProducts';

const Home = () => {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        // جلب أسماء البراندات اللي اتضافت من الداش بورد
        const { data, error } = await supabase.from('brands').select('*').order('created_at', { ascending: true });
        if (error) throw error;
        setBrands(data || []);
      } catch (err) {
        console.error("Error fetching brands:", err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchBrands();
  }, []);

  if (loading) {
    return <div className="min-h-screen bg-white flex items-center justify-center font-bold tracking-widest text-sm">LOADING COLLECTIONS...</div>;
  }

  return (
    <div className="home-container bg-white min-h-screen">
      {/* 1. السلايدر الرئيسي */}
      <HeroSlider />
      
      {/* 2. حلقة التكرار الديناميكية لكل براند */}
      {brands.length > 0 ? (
        brands.map((brand) => (
          <div key={brand.id} className="mb-24 mt-12">
            {/* تمرير الـ ID لمكون الكاتيجوري عشان يجيب صوره 
              وتمرير الاسم عشان يتعرض كعنوان
            */}
            <CategoriesGrid brandId={brand.id} brandName={brand.name} />
            
            {/* تمرير اسم البراند لسلايدر المنتجات عشان يفلتر الداتا بيز (أو ملف الداتا) ويجيب منتجاته 
            */}
            <FeaturedProducts title={`${brand.name} COLLECTION`} brand={brand.name} />
          </div>
        ))
      ) : (
        <div className="py-32 text-center text-gray-400 font-bold tracking-widest uppercase text-xs">
          No brands have been added yet. Add brands from the dashboard.
        </div>
      )}
    </div>
  );
};

export default Home;