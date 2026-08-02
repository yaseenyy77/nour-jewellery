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
    { id: 'shop', icon: <HiOutlineSquares2X2 size={22} />, label: "Shop", action: () => navigate('/shop'), path: '/shop' },
    { id: 'menu', icon: <FiGrid size={22} />, label: "Categories", action: () => onOpenMenu && onOpenMenu() },
    { id: 'wishlist', icon: <FiHeart size={22} />, label: "Wishlist", action: () => navigate('/wishlist'), path: '/wishlist' },
    { id: 'search', icon: <FiSearch size={22} />, label: "Search", action: () => navigate('/shop'), path: '/search' },
  ];

  return (
    <div 
      dir="ltr"
      className="md:hidden fixed bottom-0 left-0 w-full bg-white/95 backdrop-blur-md border-t border-gray-200 px-3 py-2 z-50 flex justify-around items-center shadow-lg"
    >
      {navItems.map((item) => {
        const isActive = item.path && location.pathname === item.path;

        return (
          <button
            key={item.id}
            onClick={item.action}
            className={`flex flex-col items-center gap-1 cursor-pointer transition-all active:scale-90 ${
              isActive ? 'text-[#C5A059]' : 'text-gray-700 hover:text-black'
            }`}
          >
            <div>{item.icon}</div>
            <span className={`text-[9px] uppercase font-semibold tracking-wider ${
              isActive ? 'text-[#C5A059]' : 'text-gray-600'
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