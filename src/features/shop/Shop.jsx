import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import CategoryTabs from './components/CategoryTabs';
import ControlBar from './components/ControlBar';
import FilterPanel from './components/FilterPanel';
import ShopProductGrid from './components/ShopProductGrid';

import { products as dummyProducts } from '../../utils/data';

const Shop = () => {
  const { brandParam, categoryParam } = useParams();
  const navigate = useNavigate();

  // الحالات الأساسية لعناصر العرض والترتيب
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [gridCols, setGridCols] = useState(4); 
  const [sortBy, setSortBy] = useState('featured');
  
  // حالات الفلاتر الفرعية المتقدمة
  const [maxPrice, setMaxPrice] = useState(400000);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [availability, setAvailability] = useState('all');

  const currentBrand = brandParam || 'KLEO';
  const currentCategory = categoryParam || 'all';

  // إعادة ضبط الفلاتر الفرعية تلقائياً عند تغيير البراند أو القسم لمنع حدوث تعارض بالبيانات
  useEffect(() => {
    setSelectedTypes([]);
    setSelectedColors([]);
    setAvailability('all');
    setMaxPrice(400000);
  }, [categoryParam, brandParam]);

  const handleCategoryChange = (cat) => {
    navigate(`/shop/${currentBrand}/${cat}`, { replace: true });
  };

  const handleResetFilters = () => {
    setMaxPrice(400000);
    setSelectedTypes([]);
    setSelectedColors([]);
    setAvailability('all');
  };

  // محرك تصفية المنتجات الحقيقي والذكي
  const filteredProducts = (dummyProducts || []).filter((product) => {
    const matchesBrand = product.brand?.toUpperCase() === currentBrand.toUpperCase();
    const matchesCategory = currentCategory === 'all' || product.category?.toLowerCase() === currentCategory.toLowerCase();
    const matchesPrice = (product.price || 0) <= maxPrice;
    const matchesType = selectedTypes.length === 0 || selectedTypes.includes(product.type);
    const matchesColor = selectedColors.length === 0 || selectedColors.includes(product.color);
    
    let matchesAvailability = true;
    if (availability === 'inStock') matchesAvailability = product.inStock === true || (product.stock > 0);
    if (availability === 'outOfStock') matchesAvailability = product.inStock === false || (product.stock === 0);

    return matchesBrand && matchesCategory && matchesPrice && matchesType && matchesColor && matchesAvailability;
  });

  // فرز وترتيب المنتجات حسب رغبة المستخدم
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'newest') return (b.id || 0) - (a.id || 0);
    return 0; 
  });

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="w-full min-h-screen bg-[#ffffff] pb-32" 
      dir="ltr"
    >
      {/* 1. شريط الأقسام العلوي والمثبت */}
      <CategoryTabs 
        activeBrand={currentBrand} 
        activeCategory={currentCategory} 
        onCategoryChange={handleCategoryChange} 
      />
      
      <div className="max-w-[1400px] mx-auto px-6 mt-6">
        
        {/* 2. شريط تحكم الفلاتر والترتيب */}
        <ControlBar 
          isFilterOpen={isFilterOpen} 
          setIsFilterOpen={setIsFilterOpen} 
          gridCols={gridCols} 
          setGridCols={setGridCols} 
          sortBy={sortBy} 
          setSortBy={setSortBy} 
        />
        
        {/* 3. لوحة الفلاتر المنسدلة المخصصة بالكامل */}
        <FilterPanel 
          isOpen={isFilterOpen} 
          maxPrice={maxPrice} 
          setMaxPrice={setMaxPrice} 
          selectedTypes={selectedTypes} 
          setSelectedTypes={setSelectedTypes} 
          selectedColors={selectedColors} 
          setSelectedColors={setSelectedColors} 
          availability={availability} 
          setAvailability={setAvailability} 
          onResetFilters={handleResetFilters} 
          totalResults={sortedProducts.length} 
        />

        {/* 4. شبكة عرض المنتجات أو واجهة خلو المنتجات */}
        {sortedProducts.length > 0 ? (
          <ShopProductGrid products={sortedProducts} gridCols={gridCols} />
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full py-32 text-center border border-dashed border-gray-100 bg-[#fafafa]"
          >
            <p className="text-[10px] font-bold tracking-[0.2em] text-gray-400 uppercase">
              No luxury pieces match your current filters.
            </p>
            <button 
              onClick={handleResetFilters}
              className="mt-6 text-[10px] font-bold tracking-widest uppercase bg-black text-white px-8 py-3.5 hover:bg-neutral-800 transition-colors duration-300"
            >
              Reset All Filters
            </button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default Shop;