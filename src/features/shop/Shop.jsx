import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { supabase } from '../../../supabaseClient';
import CategoryTabs from './components/CategoryTabs';
import ControlBar from './components/ControlBar';
import FilterPanel from './components/FilterPanel';
import ShopProductGrid from './components/ShopProductGrid';

const Shop = () => {
  const { categoryParam } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [gridCols, setGridCols] = useState(4); 
  const [sortBy, setSortBy] = useState('featured');
  
  const [maxPrice, setMaxPrice] = useState(400000);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedKarats, setSelectedKarats] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [availability, setAvailability] = useState('all');

  const queryCategory = searchParams.get('category');
  const currentCategory = queryCategory || categoryParam || 'all';

  // جلب البيانات مرة واحدة من Supabase
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase.from('products').select('*');
        if (error) throw error;
        setProducts(data || []);
      } catch (err) {
        console.error('Error fetching products from Supabase:', err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    handleResetFilters();
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
    setSelectedKarats([]);
    setSelectedColors([]);
    setAvailability('all');
  };

  // محرك التصفية الفعال
  const filteredProducts = (products || []).filter((product) => {
    const prodCategory = (product.category || '').toLowerCase();
    const matchesCategory = currentCategory === 'all' || prodCategory === currentCategory.toLowerCase();
    
    const prodPrice = Number(product.price || 0);
    const matchesPrice = prodPrice <= maxPrice;
    
    const prodType = product.type || product.category || '';
    const matchesType = selectedTypes.length === 0 || selectedTypes.some(t => t.toLowerCase() === prodType.toLowerCase());

    const prodKarat = product.karat || '';
    const matchesKarat = selectedKarats.length === 0 || selectedKarats.includes(prodKarat);
    
    const prodColor = product.color || '';
    const matchesColor = selectedColors.length === 0 || selectedColors.includes(prodColor);
    
    let matchesAvailability = true;
    const stockNum = Number(product.stock ?? 1);
    if (availability === 'inStock') matchesAvailability = stockNum > 0;
    if (availability === 'outOfStock') matchesAvailability = stockNum === 0;

    return matchesCategory && matchesPrice && matchesType && matchesKarat && matchesColor && matchesAvailability;
  });

  // محرك الترتيب
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    const priceA = Number(a.price || 0);
    const priceB = Number(b.price || 0);

    if (sortBy === 'price-low') return priceA - priceB;
    if (sortBy === 'price-high') return priceB - priceA;
    if (sortBy === 'newest') {
      const dateA = new Date(a.created_at || 0).getTime();
      const dateB = new Date(b.created_at || 0).getTime();
      return dateB - dateA;
    }
    return 0; 
  });

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="w-full min-h-screen bg-white pb-32" 
      dir="ltr"
    >
      <CategoryTabs 
        activeCategory={currentCategory} 
        onCategoryChange={handleCategoryChange} 
      />
      
      <div className="max-w-[1400px] mx-auto px-6 mt-10">
        <ControlBar 
          isFilterOpen={isFilterOpen} 
          setIsFilterOpen={setIsFilterOpen} 
          gridCols={gridCols} 
          setGridCols={setGridCols} 
          sortBy={sortBy} 
          setSortBy={setSortBy} 
        />
        
        <FilterPanel 
          isOpen={isFilterOpen} 
          maxPrice={maxPrice} 
          setMaxPrice={setMaxPrice} 
          selectedTypes={selectedTypes} 
          setSelectedTypes={setSelectedTypes} 
          selectedKarats={selectedKarats}
          setSelectedKarats={setSelectedKarats}
          selectedColors={selectedColors} 
          setSelectedColors={setSelectedColors} 
          availability={availability} 
          setAvailability={setAvailability} 
          onResetFilters={handleResetFilters} 
          totalResults={sortedProducts.length} 
        />

        {loading ? (
          <div className="py-32 flex justify-center items-center">
            <div className="w-8 h-8 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : sortedProducts.length > 0 ? (
          <ShopProductGrid products={sortedProducts} gridCols={gridCols} />
        ) : (
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }}
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