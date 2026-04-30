import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';
import HeroSlider from './components/HeroSlider';
import CategoriesGrid from './components/CategoriesGrid';
import FeaturedProducts from './components/FeaturedProducts';

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [settings, setSettings] = useState({
    colors: { primary: '#000000', secondary: '#d4af37' },
    slides: [],
    brands: []
  });

  useEffect(() => {
    const fetchHomeData = async () => {
      // 1. جلب الألوان
      const { data: colorData } = await supabase.from('appearance_settings').select('*').single();
      
      // 2. جلب السلايدر
      const { data: slideData } = await supabase.from('hero_slides').select('*').order('display_order');
      
      // 3. جلب البراندات
      const { data: brandData } = await supabase.from('brands_config').select('*').order('display_order');

      setSettings({
        colors: colorData ? { primary: colorData.primary_color, secondary: colorData.secondary_color } : settings.colors,
        slides: slideData || [],
        brands: brandData || []
      });
      setLoading(false);
    };

    fetchHomeData();
  }, []);

  if (loading) return <div className="h-screen flex items-center justify-center font-bold italic">LOADING STORE...</div>;

  return (
    <div 
      className="home-wrapper transition-colors duration-500" 
      style={{ 
        '--primary-color': settings.colors.primary, 
        '--accent-color': settings.colors.secondary 
      }}
    >
      {/* 1. Hero Banner Slider */}
      <HeroSlider slides={settings.slides} />

      {/* 2. Dynamic Brand Sections */}
      {settings.brands.map((brand, index) => (
        <div key={brand.id} className="mb-20">
          <CategoriesGrid 
            brand={brand.brand_name} 
            categories={[
              { name: 'Necklaces', image: brand.necklaces_img },
              { name: 'Rings', image: brand.rings_img },
              { name: 'Bracelets', image: brand.bracelets_img },
              { name: 'Earrings', image: brand.earrings_img }
            ]} 
          />
          
          {/* سلايدر المنتجات بيظهر أوتوماتيك لكل براند */}
          <FeaturedProducts 
            title={`${brand.brand_name} COLLECTION`} 
            brandName={brand.brand_name} 
          />
        </div>
      ))}
    </div>
  );
};

export default Home;