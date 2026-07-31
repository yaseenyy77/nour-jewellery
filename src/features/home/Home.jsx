import React from 'react';
import HeroSlider from './components/HeroSlider';
import FeaturedProducts from './components/FeaturedProducts';

const Home = () => {
  // الأقسام الرئيسية للمصوغات والمجوهرات
  const categories = [
    { id: 'rings', name: 'Rings', title: 'RINGS COLLECTION' },
    { id: 'necklaces', name: 'Necklaces', title: 'NECKLACES COLLECTION' },
    { id: 'bracelets', name: 'Bracelets', title: 'BRACELETS COLLECTION' },
    { id: 'earrings', name: 'Earrings', title: 'EARRINGS COLLECTION' },
    { id: 'bangles', name: 'Bangles', title: 'BANGLES COLLECTION' },
  ];

  return (
    <div className="home-container bg-white min-h-screen">
      {/* سلايدر البنرات العلوي */}
      <HeroSlider />

      {/* عرض سلايدرات المنتجات حسب الأقسام (Categories) */}
      <div className="py-6">
        {categories.map((cat) => (
          <div key={cat.id} className="mb-10">
            <FeaturedProducts category={cat.name} title={cat.title} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;