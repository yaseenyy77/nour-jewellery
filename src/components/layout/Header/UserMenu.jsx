import React from 'react';
import { FiHeart, FiSearch, FiUser } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const UserMenu = ({ favoritesCount = 0 }) => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center gap-1 sm:gap-3">
      {/* أيقونة الحساب - للشاشات الكبيرة */}
      <button 
        onClick={() => navigate('/account')}
        className="hidden md:flex p-2 text-black hover:text-[#C5A059] transition-colors cursor-pointer"
        title="Account"
      >
        <FiUser size={22} strokeWidth={1.5} />
      </button>

      {/* أيقونة المفضلة (Wishlist) */}
      <button 
        onClick={() => navigate('/wishlist')}
        className="relative p-2 text-black hover:text-[#C5A059] transition-colors cursor-pointer group"
        title="Wishlist"
      >
        <FiHeart size={22} strokeWidth={1.5} />
        {favoritesCount > 0 && (
          <span className="absolute top-1 right-0 bg-red-600 text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
            {favoritesCount}
          </span>
        )}
      </button>

      {/* أيقونة البحث */}
      <button 
        onClick={() => navigate('/shop')}
        className="p-2 text-black hover:text-[#C5A059] transition-colors cursor-pointer"
        title="Search Products"
      >
        <FiSearch size={22} strokeWidth={1.5} />
      </button>
    </div>
  );
};

export default UserMenu;