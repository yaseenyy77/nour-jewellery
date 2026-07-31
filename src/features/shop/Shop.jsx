import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import CategoryTabs from './components/CategoryTabs';
import ControlBar from './components/ControlBar';
import FilterPanel from './components/FilterPanel';
import ShopProductGrid from './components/ShopProductGrid';

import { products as dummyProducts } from '../../utils/data';

const Shop = () => {
  const { categoryParam } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [gridCols, setGridCols] = useState(4); 
  const [sortBy, setSortBy] = useState('featured');
  
  const [maxPrice, setMaxPrice] = useState(400000);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [availability, setAvailability] = useState('all');

  // قراءة القسم المختار سواء من الـ URL Query (`?category=rings`) أو الـ Route Param (`/shop/rings`)
  const queryCategory = searchParams.get('category');
  const currentCategory = queryCategory || categoryParam || 'all';

  useEffect(() => {
    setSelectedTypes([]);
    setSelectedColors([]);
    setAvailability('all');
    setMaxPrice(400000);
  }, [currentCategory]);

  const handleCategoryChange = (cat) => {
    if (cat === 'all') {
      navigate('/shop', { replace: true });
    } else {
      navigate(`/shop?category=${cat.toLowerCase()}`, { replace: true });
    }
  };

  const handleResetFilters = () => {
    setMaxPrice(400000);
    setSelectedTypes([]);
    setSelectedColors([]);
    setAvailability('all');
  };

  // محرك التصفية الفعال (بدون براندات)
  const filteredProducts = (dummyProducts || []).filter((product) => {
    const matchesCategory = currentCategory === 'all' || product.category?.toLowerCase() === currentCategory.toLowerCase();
    const matchesPrice = (product.price || 0) <= maxPrice;
    const matchesType = selectedTypes.length === 0 || selectedTypes.includes(product.type);
    const matchesColor = selectedColors.length === 0 || selectedColors.includes(product.color);
    
    let matchesAvailability = true;
    if (availability === 'inStock') matchesAvailability = product.inStock === true || (product.stock > 0);
    if (availability === 'outOfStock') matchesAvailability = product.inStock === false || (product.stock === 0);

    return matchesCategory && matchesPrice && matchesType && matchesColor && matchesAvailability;
  });

  // محرك الترتيب
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'newest') return (b.id || 0) - (a.id || 0);
    return 0; 
  });

  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="w-full min-h-screen bg-white pb-32" dir="ltr"
    >
      <CategoryTabs 
        activeCategory={currentCategory} 
        onCategoryChange={handleCategoryChange} 
      />
      
      <div className="max-w-[1400px] mx-auto px-6 mt-10">
        <ControlBar 
          isFilterOpen={isFilterOpen} setIsFilterOpen={setIsFilterOpen} 
          gridCols={gridCols} setGridCols={setGridCols} 
          sortBy={sortBy} setSortBy={setSortBy} 
        />
        
        <FilterPanel 
          isOpen={isFilterOpen} 
          maxPrice={maxPrice} setMaxPrice={setMaxPrice} 
          selectedTypes={selectedTypes} setSelectedTypes={setSelectedTypes} 
          selectedColors={selectedColors} setSelectedColors={setSelectedColors} 
          availability={availability} setAvailability={setAvailability} 
          onResetFilters={handleResetFilters} totalResults={sortedProducts.length} 
        />

        {sortedProducts.length > 0 ? (
          <ShopProductGrid products={sortedProducts} gridCols={gridCols} />
        ) : (
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="w-full py-40 text-center border border-gray-100 bg-[#fafafa] flex flex-col items-center justify-center"
          >
            <p className="text-[11px] font-bold tracking-[0.2em] text-gray-400 uppercase">
              No pieces match your current selection.
            </p>
            <button 
              onClick={handleResetFilters}
              className="mt-8 text-[10px] font-bold tracking-[0.2em] uppercase bg-black text-white px-8 py-4 hover:bg-neutral-800 transition-colors"
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