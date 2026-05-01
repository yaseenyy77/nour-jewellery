import { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// إضافة الـ Provider ده هي اللي هتحل المشكلة[cite: 10]
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import Header from './components/layout/Header/Header';
import BottomNav from './components/layout/BottomNav';
import Footer from './components/layout/Footer/Footer';
import Home from './features/home/Home';

import AdminLayout from './dashboard/layout/AdminLayout'; 
import Appearance from './dashboard/features/settings/Appearance';

const queryClient = new QueryClient();

function App() {
  const [showBottomNav, setShowBottomNav] = useState(true);
  const footerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { setShowBottomNav(!entry.isIntersecting); },
      { root: null, rootMargin: '0px 0px -50px 0px', threshold: 0 }
    );
    if (footerRef.current) observer.observe(footerRef.current);
    return () => { if (footerRef.current) observer.unobserve(footerRef.current); };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="overview" element={<div>Overview</div>} />
            <Route path="settings/appearance" element={<Appearance />} />
          </Route>

          <Route path="/*" element={
            <div className="min-h-screen bg-white">
              <Header />
              <main className="pb-20">
                <Routes>
                  <Route path="/" element={<Home />} />
                </Routes>
              </main>
              <div ref={footerRef}><Footer /></div>
              <div className={`fixed bottom-0 w-full z-50 transition-opacity duration-300 ${showBottomNav ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                <BottomNav />
              </div>
            </div>
          } />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;