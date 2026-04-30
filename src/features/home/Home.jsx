// src/features/home/Home.jsx
import React, { useState, useEffect } from 'react';
import HeroSlider from './components/HeroSlider';
import CategoriesGrid from './components/CategoriesGrid';
import FeaturedProducts from './components/FeaturedProducts';

const Home = () => {
  const [config, setConfig] = useState({
    colors: { primary: '#000000', secondary: '#d4af37' },
    slides: [],
    brands: [] 
  });

  return (
    <div 
      className="home-container bg-white min-h-screen"
      style={{ '--main-color': config.colors.primary, '--accent-color': config.colors.secondary }}
    >
      {/* Original Design Hero Slider */}
      <HeroSlider slides={config.slides} />

      {/* Dynamic Sections */}
      {config.brands.map((brand) => (
        <div key={brand.id} className="mb-20 mt-10">
          <CategoriesGrid brand={brand.name} categories={brand.categories} />
          <FeaturedProducts title={`${brand.name} COLLECTION`} brand={brand.name} />
        </div>
      ))}
    </div>
  );
};

export default Home;