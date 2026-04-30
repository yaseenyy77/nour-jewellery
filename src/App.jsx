import { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header/Header';
import BottomNav from './components/layout/BottomNav';
import Footer from './components/layout/Footer/Footer';
import Home from './features/home/Home';
import AdminDashboard from './dashboard/AdminDashboard';

// استيراد صفحة الإعدادات التي قمت بإنشائها
import SettingsPage from './dashboard/SettingsPage'; // تأكد أن المسار صحيح حسب ترتيب ملفاتك

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
        {/* مسار لوحة التحكم - Admin Panel */}
        <Route path="/admin" element={<AdminDashboard />}>
          <Route path="overview" element={<div>Overview Page</div>} />
          <Route path="products" element={<div>Products Management</div>} />
          <Route path="orders" element={<div>Orders Page</div>} />
          <Route path="customers" element={<div>Customers Page</div>} />
          
          {/* هنا قمنا بربط مسار الإعدادات بالصفحة التي صممتها SettingsPage */}
          <Route path="settings" element={<SettingsPage />} />
          
          {/* اختياري: إذا أردت إضافة مسارات فرعية داخل الإعدادات مستقبلاً */}
          <Route path="settings/appearance" element={<div>Appearance Settings</div>} />
          <Route path="settings/general" element={<div>General Settings</div>} />
          <Route path="settings/payment" element={<div>Payment Settings</div>} />
        </Route>

        {/* مسارات الموقع الرئيسي - Front-end */}
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