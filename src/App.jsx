import { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';

// --- STORE COMPONENTS (المتجر العادي) ---
import Header from './components/layout/Header/Header';
import BottomNav from './components/layout/BottomNav';
import Footer from './components/layout/Footer/Footer';
import Home from './features/home/Home';

// --- ADMIN DASHBOARD COMPONENTS (لوحة التحكم) ---
import AdminLayout from './dashboard/layout/AdminLayout';
import AdminDashboard from './dashboard/AdminDashboard'; // ملف الداش بورد الرئيسي (Overview)
import ProductTable from './dashboard/features/product-management/ProductTable';

/**
 * StoreLayout Component
 * هذا المكون يغلف صفحات المتجر فقط (الهيدر، الفوتر، والـ BottomNav)
 */
const StoreLayout = ({ showBottomNav, footerRef }) => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="pb-20">
        <Outlet /> {/* هنا تظهر صفحات المتجر مثل Home */}
      </main>
      <div ref={footerRef}>
        <Footer />
      </div>
      {/* الـ BottomNav تظهر فقط في صفحات المتجر */}
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

  // منطق مراقبة الفوتر لإخفاء الـ BottomNav في المتجر
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
        
        {/* ==========================================
            1. ROUTES: CUSTOMER STORE (المتجر)
           ========================================== */}
        <Route element={<StoreLayout showBottomNav={showBottomNav} footerRef={footerRef} />}>
          <Route path="/" element={<Home />} />
          {/* يمكنك إضافة مسارات المتجر الأخرى هنا مثل:
              <Route path="/shop" element={<Shop />} /> 
          */}
        </Route>

        {/* ==========================================
            2. ROUTES: ADMIN DASHBOARD (الأدمن)
           ========================================== */}
        {/* نستخدم الـ AdminLayout الذي يستدعي الـ Sidebar داخله */}
        <Route path="/admin" element={<AdminLayout />}>
          
          {/* الصفحة الرئيسية للداش بورد (Overview) */}
          <Route index element={<AdminDashboard />} />
          
          {/* صفحة جدول المنتجات */}
          <Route path="products" element={<ProductTable />} />
          
          {/* يمكنك إضافة مسارات الإدارة الأخرى هنا:
              <Route path="orders" element={<Orders />} /> 
          */}
        </Route>

      </Routes>
    </Router>
  );
}

export default App;