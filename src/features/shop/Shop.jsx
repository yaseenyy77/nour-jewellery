import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import CategoryTabs from './components/CategoryTabs';
import ControlBar from './components/ControlBar';
import FilterPanel from './components/FilterPanel';
import ShopProductGrid from './components/ShopProductGrid';

// استيراد المنتجات
import { products as dummyProducts } from '../../utils/data';

const Shop = () => {
  const { brandParam, categoryParam } = useParams();
  const navigate = useNavigate();

  // إعدادات الواجهة والترتيب
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [gridCols, setGridCols] = useState(4); 
  const [sortBy, setSortBy] = useState('featured');
  
  // لضمان المزامنة الكاملة مع الـ URL: بنقرا البراند والقسم مباشرة من الرابط
  const currentBrand = brandParam || 'KLEO';
  const currentCategory = categoryParam || 'all';

  // عند الضغط على أي قسم، بنغير الرابط فوراً
  const handleCategoryChange = (cat) => {
    navigate(`/shop/${currentBrand}/${cat}`, { replace: true });
  };

  // 1️⃣ منطق الفلترة الذكي (Filtering Logic)
  const filteredProducts = (dummyProducts || []).filter((product) => {
    // التأكد من مطابقة البراند (مثلاً KLEO) مع تجاهل حالة الأحرف كابيتال أو سمول
    const matchesBrand = product.brand?.toUpperCase() === currentBrand.toUpperCase();
    
    // التأكد من مطابقة القسم (لو مختار all بيعرض كل البراند، لو مختار rings بيعرض خواتم بس)
    const matchesCategory = currentCategory === 'all' || product.category?.toLowerCase() === currentCategory.toLowerCase();
    
    return matchesBrand && matchesCategory;
  });

  // 2️⃣ منطق الترتيب (Sorting Logic) حسب اختيارك من القائمة المنسدلة
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-low') {
      return a.price - b.price; // من الأقل سعراً للأعلى
    }
    if (sortBy === 'price-high') {
      return b.price - a.price; // من الأعلى سعراً للأقل
    }
    if (sortBy === 'newest') {
      return b.id - a.id; // الأحدث (بناءً على الـ id)
    }
    return 0; // الترتيب الافتراضي (Featured)
  });

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      transition={{ duration: 0.5 }}
      className="w-full min-h-screen bg-[#fcfcfc] pt-4 md:pt-8 pb-24" 
      dir="ltr"
    >
      {/* تمرير القيم الحالية لشريط الأقسام */}
      <CategoryTabs 
        activeBrand={currentBrand} 
        activeCategory={currentCategory} 
        onCategoryChange={handleCategoryChange} 
      />

      <div className="max-w-[1600px] mx-auto px-4 md:px-8 lg:px-12 mt-6 md:mt-10">
        <ControlBar 
          isFilterOpen={isFilterOpen}
          setIsFilterOpen={setIsFilterOpen}
          gridCols={gridCols}
          setGridCols={setGridCols}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />

        <FilterPanel isOpen={isFilterOpen} />

        {/* 3️⃣ تمرير المنتجات بعد الفلترة والترتيب مباشرة */}
        {sortedProducts.length > 0 ? (
          <ShopProductGrid 
            products={sortedProducts} 
            gridCols={gridCols} 
          />
        ) : (
          // رسالة تظهر بشكل فخم لو القسم ده مفيش فيه منتجات حالياً
          <div className="w-full py-20 text-center">
            <p className="text-xs font-bold tracking-[0.2em] text-gray-400 uppercase">
              No products found in {currentBrand} {currentCategory}
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Shop;