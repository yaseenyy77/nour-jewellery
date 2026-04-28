import { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header/Header';
import BottomNav from './components/layout/BottomNav';
import Footer from './components/layout/Footer/Footer';
import Home from './features/home/Home';

function App() {
  const [showBottomNav, setShowBottomNav] = useState(true);
  const footerRef = useRef(null);

  useEffect(() => {
    // مراقبة وصول المستخدم للفوتر لإخفاء الـ BottomNav
    const observer = new IntersectionObserver(
      ([entry]) => {
        // إذا كان الفوتر مرئياً (دخل منطقة الرؤية)، نخفي الناف
        setShowBottomNav(!entry.isIntersecting);
      },
      { 
        root: null, 
        rootMargin: '0px 0px -50px 0px', // تأخير الإخفاء قليلاً لضبط التوقيت
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
      <div className="min-h-screen bg-white">
        <Header />
        
        <main className="pb-20">
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </main>

        {/* الفوتر مع المرجع للمراقبة */}
        <div ref={footerRef}>
          <Footer />
        </div>

        {/* الـ BottomNav مع أنيميشن التلاشي والتحكم في الإخفاء */}
        <div className={`fixed bottom-0 w-full z-50 transition-opacity duration-300 ${
          showBottomNav ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}>
          <BottomNav />
        </div>
      </div>
    </Router>
  );
}

export default App;