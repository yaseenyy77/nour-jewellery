// src/features/home/Home.jsx
import React, { useState, useEffect } from 'react';
import HeroSlider from './components/HeroSlider';
import CategoriesGrid from './components/CategoriesGrid';
import FeaturedProducts from './components/FeaturedProducts';

const Home = () => {
  // This state will eventually come from your Supabase fetch
  const [homeConfig, setHomeConfig] = useState({
    slides: [],
    brands: [] // This will hold your Brands, Categories, and dynamically filter products
  });

  useEffect(() => {
    // SIMULATED FETCH FROM SUPABASE
    // In reality: const { data } = await supabase.from('appearance').select('*')
    setHomeConfig({
      slides: [
        { id: 1, desktop: '/assets/images/desk1.png', mobile: '/assets/images/mob1.png' }
      ],
      brands: [
        {
          id: 1,
          name: "KLEO",
          categories: [
            { name: "Necklaces", image: "/images/k-neck.png" },
            { name: "Rings", image: "/images/k-ring.png" },
            { name: "Bracelets", image: "/images/k-brac.png" },
            { name: "Earrings", image: "/images/k-ear.png" },
          ]
        }
        // If you add SIRAN in dashboard, it appears here automatically
      ]
    });
  }, []);

  return (
    <div className="bg-white min-h-screen">
      {/* 1. Main Slider */}
      <HeroSlider slides={homeConfig.slides} />

      {/* 2. Dynamic Sections per Brand */}
      {homeConfig.brands.map((brand) => (
        <div key={brand.id} className="mt-12">
          {/* Automatically adds the Category Grid for this Brand */}
          <CategoriesGrid brand={brand.name} categories={brand.categories} />

          {/* Automatically adds the Product Slider filtered for this Brand */}
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