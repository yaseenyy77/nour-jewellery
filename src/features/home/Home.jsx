import React from 'react';
import HeroSlider from './components/HeroSlider';
import CategoriesGrid from './components/CategoriesGrid';
import FeaturedProducts from './components/FeaturedProducts';

const Home = () => {
  // مصفوفة بأسماء البراندات الموجودة عندك
  const brands = ["KLEO", "SIRAN", "IRAM"];

  return (
    <div className="home-container bg-white min-h-screen">
      {/* 1. السلايدر الرئيسي */}
      <HeroSlider />

      {/* 2. تكرار الأقسام لكل براند */}
      {brands.map((brand) => (
        <div key={brand} className="mb-20 mt-10">
          
          {/* قسم تصنيفات البراند (الشبكة المربعة) */}
          <CategoriesGrid brand={brand} />

          {/* قسم سلايدر منتجات البراند */}
          <FeaturedProducts 
            title={`${brand} COLLECTION`} 
            brand={brand} 
          />
          
        </div>
      ))}
    </div>
  );
};

export default Home;