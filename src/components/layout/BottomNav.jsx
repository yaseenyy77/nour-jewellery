import { useEffect, useState } from 'react';
import { FiHeart, FiSearch, FiUser, FiShoppingCart } from 'react-icons/fi';
import { HiOutlineSquares2X2 } from "react-icons/hi2";

const BottomNav = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const footer = document.getElementById('main-footer');
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(!entry.isIntersecting),
      { threshold: 0.1 }
    );
    if (footer) observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  if (!isVisible) return null;

  const navItems = [
    { icon: <HiOutlineSquares2X2 size={24} />, label: "Shop" },
    { icon: <FiHeart size={24} />, label: "Wishlist" },
    { icon: <FiShoppingCart size={24} />, label: "Cart" },
    { icon: <FiUser size={24} />, label: "Account" },
    { icon: <FiSearch size={24} />, label: "Search" },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 w-full bg-white border-t border-gray-100 px-2 py-2 z-50 flex justify-around items-center">
      {navItems.map((item, index) => (
        <div key={index} className="flex flex-col items-center gap-1 cursor-pointer">
          <div className="text-black">{item.icon}</div>
          <span className="text-[10px] font-medium text-gray-800">{item.label}</span>
        </div>
      ))}
    </div>
  );
};

export default BottomNav;