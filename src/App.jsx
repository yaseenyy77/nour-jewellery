import { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// الموقع الرئيسي
import Header from './components/layout/Header/Header';
import BottomNav from './components/layout/BottomNav';
import Footer from './components/layout/Footer/Footer';
import Home from './features/home/Home';

// لوحة التحكم (Admin Panel)
import AdminDashboard from './dashboard/AdminDashboard';
import SettingsPage from './dashboard/features/settings/SettingsPage';
import Appearance from './dashboard/features/settings/Appearance';
import GeneralSettings from './dashboard/features/settings/GeneralSettings';
import PaymentSettings from './dashboard/features/settings/PaymentSettings';

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
        {/* مسار لوحة التحكم[cite: 3, 5] */}
        <Route path="/admin" element={<AdminDashboard />}>
          {/* تحويل تلقائي لأول صفحة في الداش بورد */}
          <Route index element={<Navigate to="overview" replace />} />
          
          <Route path="overview" element={<div>Overview Page Content</div>} />
          <Route path="products" element={<div>Products Management Content</div>} />
          <Route path="orders" element={<div>Orders Page Content</div>} />
          <Route path="customers" element={<div>Customers Page Content</div>} />

          {/* مسارات الإعدادات المتداخلة */}
          <Route path="settings">
            {/* الصفحة الرئيسية للإعدادات (اللي فيها الزراير) */}
            <Route index element={<SettingsPage />} />
            
            {/* الصفحات الفرعية لكل زرار */}
            <Route path="appearance" element={<Appearance />} />
            <Route path="general" element={<GeneralSettings />} />
            <Route path="payment" element={<PaymentSettings />} />
          </Route>
        </Route>

        {/* مسارات الموقع الرئيسي[cite: 5] */}
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