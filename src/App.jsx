import { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';

// --- STORE COMPONENTS (المتجر العادي) ---
import Header from './components/layout/Header/Header';
import BottomNav from './components/layout/BottomNav';
import Footer from './components/layout/Footer/Footer';
import Home from './features/home/Home';

// --- ADMIN DASHBOARD COMPONENTS (لوحة التحكم) ---
import AdminLayout from './dashboard/layout/AdminLayout';
import AdminDashboard from './dashboard/AdminDashboard'; 
import ProductTable from './dashboard/features/product-management/ProductTable';

/**
 * StoreLayout Component
 */
const StoreLayout = ({ showBottomNav, footerRef }) => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="pb-20">
        <Outlet />
      </main>
      <div ref={footerRef}>
        <Footer />
      </div>
      <div className={`fixed bottom-0 w-full z-50 transition-opacity duration-300 ${
        showBottomNav ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}>
        <BottomNav />
      </div>
    </div>
  );
};

function App() {
  const [showBottomNav, setShowBottomNav] = useState(true);
  const footerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowBottomNav(!entry.isIntersecting);
      },
      { root: null, rootMargin: '0px 0px -50px 0px', threshold: 0 }
    );

    if (footerRef.current) observer.observe(footerRef.current);
    return () => { if (footerRef.current) observer.unobserve(footerRef.current); };
  }, []);

  return (
    <Router>
      <Routes>
        
        {/* مسارات المتجر: تفتح عبر الرابط الرئيسي / */}
        <Route element={<StoreLayout showBottomNav={showBottomNav} footerRef={footerRef} />}>
          <Route path="/" element={<Home />} />
        </Route>

        {/* مسارات لوحة التحكم: تفتح عبر الرابط /admin */}
        <Route path="/admin" element={<AdminLayout />}>
          {/* هذا المسار يفتح nour-jewellery.vercel.app/admin */}
          <Route index element={<AdminDashboard />} />
          
          {/* هذا المسار يفتح nour-jewellery.vercel.app/admin/products */}
          <Route path="products" element={<ProductTable />} />
        </Route>

      </Routes>
    </Router>
  );
}

export default App;