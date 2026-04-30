// src/features/home/Home.jsx
import React, { useState, useEffect } from 'react';
import HeroSlider from './components/HeroSlider';
import CategoriesGrid from './components/CategoriesGrid';
import FeaturedProducts from './components/FeaturedProducts';

const Home = () => {
  const [appearance, setAppearance] = useState(null);

  useEffect(() => {
    // Replace this with actual Supabase fetch:
    // const { data } = await supabase.from('appearance_settings').select('*').single();
    // const { data: slides } = await supabase.from('hero_slides').select('*');
    // const { data: brands } = await supabase.from('brands').select('*, brand_categories(*)');
    
    // Simulated dynamic fetch
    setAppearance({
      colors: { primary: '#000000', secondary: '#d4af37' },
      slides: [
        { id: 1, desktop: '/assets/images/desktop-gold.png', mobile: '/assets/images/mobile-gold.png' },
        { id: 2, desktop: '/assets/images/desktop-silver.png', mobile: '/assets/images/mobile-silver.png' }
      ],
      brands: [
        {
          id: 1, name: 'KLEO',
          categories: [
            { id: 101, name: 'Necklaces', image: '/images/cat-necklaces.png' },
            { id: 102, name: 'Rings', image: '/images/cat-rings.png' },
          ]
        },
        {
          id: 2, name: 'SIRAN',
          categories: [
            { id: 201, name: 'Watches', image: '/images/siran-watches.png' },
            { id: 202, name: 'Bracelets', image: '/images/siran-bracelets.png' },
          ]
        }
      ]
    });
  }, []);

  if (!appearance) return <div>Loading...</div>;

  return (
    // Applying dynamic colors as CSS variables
    <div 
      className="home-container bg-white min-h-screen"
      style={{ 
        '--theme-primary': appearance.colors.primary, 
        '--theme-secondary': appearance.colors.secondary 
      }}
    >
      {/* 1. Dynamic Hero Slider */}
      <HeroSlider slides={appearance.slides} />

      {/* 2. Dynamic Brands and Categories */}
      {appearance.brands.map((brand) => (
        <div key={brand.id} className="mb-20 mt-10">
          
          <CategoriesGrid brand={brand.name} categories={brand.categories} />

          <FeaturedProducts 
            title={`${brand.name} COLLECTION`} 
            brand={brand.name} 
          />
        </div>
      ))}
    </div>
  );
};

export default Home;