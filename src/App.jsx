import { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header/Header';
import BottomNav from './components/layout/BottomNav';
import Footer from './components/layout/Footer/Footer';
import Home from './features/home/Home';
// استيراد ملف الداشبورد الجديد
import AdminDashboard from './dashboard/AdminDashboard';

function App() {
  const [showBottomNav, setShowBottomNav] = useState(true);
  const footerRef = useRef(null);

  useEffect(() => {
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
        {/* مسارات الموقع الرئيسي - تظهر مع الـ Header والـ Footer */}
        <Route
          path="/*"
          element={
            <div className="min-h-screen bg-white">
              <Header />
              <main className="pb-20">
                <Routes>
                  <Route path="/" element={<Home />} />
                  {/* تقدر تضيف باقي صفحات الموقع هنا */}
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

        {/* مسار لوحة التحكم - منفصل تماماً عن تصميم الموقع الرئيسي */}
        <Route path="/admin/*" element={<AdminDashboard />}>
          {/* هنا هتنزل الصفحات الداخلية للداشبورد زي Overview و Products في الـ Outlet */}
          <Route path="overview" element={<div>Overview Page</div>} />
          <Route path="products" element={<div>Products Management</div>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;