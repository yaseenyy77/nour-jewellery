import { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header/Header';
import BottomNav from './components/layout/BottomNav';
import Footer from './components/layout/Footer/Footer';
import Home from './features/home/Home';
import Shop from './features/shop/Shop';

// استيراد المكون الجديد اللي هيطلعنا لأول الصفحة
import ScrollToTop from './components/ScrollToTop';

// استيراد مكونات لوحة التحكم
import AdminLayout from './dashboard/layout/AdminLayout'; 
import Appearance from './dashboard/features/settings/Appearance'; 

// 👇 تم إضافة استدعاء ملفات المنتجات هنا (تأكد إن المسارات دي مطابقة لمجلداتك) 👇
import ProductTable from './dashboard/features/products/ProductTable';
import AddProduct from './dashboard/features/products/AddProduct';
import CategoryManager from './dashboard/features/products/CategoryManager';

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
      {/* المكون ده بيتحط هنا مباشرة جوه الـ Router عشان يشتغل على الموقع كله */}
      <ScrollToTop />
      
      <Routes>
        {/* مسارات لوحة التحكم */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="overview" element={<></>} />
          <Route path="overview/stats" element={<div>Stats Page</div>} />
          <Route path="overview/charts" element={<div>Charts Page</div>} />
          
          <Route path="products" element={<></>} />
          {/* 👇 تم التعديل هنا: ربط المسارات بالمكونات الحقيقية بدل النصوص الوهمية 👇 */}
          <Route path="products/table" element={<ProductTable />} />
          <Route path="products/add" element={<AddProduct />} />
          <Route path="products/categories" element={<CategoryManager />} />
          
          <Route path="orders" element={<></>} />
          <Route path="orders/list" element={<div>Orders List</div>} />
          <Route path="orders/details" element={<div>Order Details</div>} />
          <Route path="orders/shipping" element={<div>Shipping Info</div>} />
          
          <Route path="customers" element={<></>} />
          <Route path="customers/list" element={<div>Customers List</div>} />
          <Route path="customers/roles" element={<div>Admin Roles</div>} />
          
          <Route path="settings" element={<></>} />
          <Route path="settings/appearance" element={<Appearance />} /> 
          <Route path="settings/general" element={<div>General Settings Page</div>} />
          <Route path="settings/payment" element={<div>Payment Settings Page</div>} />
        </Route>

        {/* مسارات الموقع الرئيسي */}
        <Route
          path="/*"
          element={
            <div className="min-h-screen bg-white">
              <Header />
              <main className="pb-20">
                <Routes>
                  <Route path="/" element={<Home />} />
                  
                  {/* مسارات الشوب الذكية */}
                  <Route path="/shop" element={<Shop />} />
                  <Route path="/shop/:brandParam" element={<Shop />} />
                  <Route path="/shop/:brandParam/:categoryParam" element={<Shop />} />
                </Routes>
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
          }
        />
      </Routes>
    </Router>
  );
}

export default App;