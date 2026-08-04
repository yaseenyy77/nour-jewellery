import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FiHeart, FiSearch, FiGrid } from 'react-icons/fi';
import { HiOutlineSquares2X2 } from "react-icons/hi2";

const BottomNav = ({ onOpenMenu }) => {
  const [isVisible, setIsVisible] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const footer = document.getElementById('main-footer');
    if (!footer) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(!entry.isIntersecting),
      { threshold: 0.1 }
    );
    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  if (!isVisible) return null;

  const navItems = [
    { id: 'shop', icon: <HiOutlineSquares2X2 className="w-5 h-5 sm:w-6 sm:h-6" />, label: "Shop", action: () => navigate('/shop'), path: '/shop' },
    { id: 'menu', icon: <FiGrid className="w-5 h-5 sm:w-6 sm:h-6" />, label: "Categories", action: () => onOpenMenu && onOpenMenu() },
    { id: 'wishlist', icon: <FiHeart className="w-5 h-5 sm:w-6 sm:h-6" />, label: "Wishlist", action: () => navigate('/wishlist'), path: '/wishlist' },
    { id: 'search', icon: <FiSearch className="w-5 h-5 sm:w-6 sm:h-6" />, label: "Search", action: () => navigate('/shop'), path: '/search' },
  ];

  return (
    <div 
      dir="ltr"
      className="md:hidden fixed bottom-0 left-0 w-full bg-white/95 backdrop-blur-md border-t border-gray-100 px-2 py-1.5 z-50 flex justify-around items-center shadow-[0_-4px_20px_rgba(0,0,0,0.05)]"
    >
      {navItems.map((item) => {
        const isActive = item.path && location.pathname === item.path;

        return (
          <button
            key={item.id}
            onClick={item.action}
            className={`flex-1 flex flex-col items-center justify-center py-1 cursor-pointer transition-all active:scale-95 min-h-[44px] ${
              isActive ? 'text-black' : 'text-gray-400 hover:text-black'
            }`}
          >
            <div className={`transition-transform duration-200 ${isActive ? 'scale-110 text-black' : ''}`}>
              {item.icon}
            </div>
            <span className={`text-[9px] uppercase font-bold tracking-widest mt-1 ${
              isActive ? 'text-black font-extrabold' : 'text-gray-400'
            }`}>
              {item.label}
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default BottomNav;