import React from 'react';
import HeroSlider from './components/HeroSlider';
import CategoriesGrid from './components/CategoriesGrid';
import FeaturedProducts from './components/FeaturedProducts';

const Home = () => {
  const brands = ["KLEO", "SIRAN", "IRAM"];

  return (
    <div className="home-container bg-white min-h-screen">
      <HeroSlider />
      {brands.map((brand) => (
        <div key={brand} className="mb-20 mt-10">
          <CategoriesGrid brand={brand} />
          <FeaturedProducts title={`${brand} COLLECTION`} brand={brand} />
        </div>
      ))}
    </div>
  );
};

export default Home;