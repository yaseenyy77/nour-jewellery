import { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header/Header';
import BottomNav from './components/layout/BottomNav';
import Footer from './components/layout/Footer/Footer';
import Home from './features/home/Home';

// استيراد مكونات لوحة التحكم
import AdminLayout from './dashboard/layout/AdminLayout'; 
import Appearance from './dashboard/features/settings/Appearance'; 

function App() {
  const [showBottomNav, setShowBottomNav] = useState(true);
  const footerRef = useRef(null);

  useEffect(() => {
    // تم تصحيح القوس هنا ([entry]) ليكون السنتاكس سليماً تماماً
    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowBottomNav(!entry.isIntersecting);
      },
      { 
        root: null, 
        rootMargin: '0px 0px -50px 0px', 
        threshold: 0 
      }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => {
      if (footerRef.current) {
        observer.unobserve(footerRef.current);
      }
    };
  }, []);

  return (
    <Router>
      <Routes>
        {/* مسار لوحة التحكم */}
        <Route path="/admin" element={<AdminLayout />}>
          {/* الإحصائيات */}
          <Route path="overview" element={<div>Products Table Page</div>} />
          
          {/* الطلبات */}
          <Route path="orders" element={<div>Orders Grid</div>} />
          
          {/* العملاء */}
          <Route path="customers" element={<div>Clients Grid</div>} />
          
          {/* الإعدادات والربط المطلوب */}
          <Route path="settings" element={<div>Settings Grid</div>} />
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