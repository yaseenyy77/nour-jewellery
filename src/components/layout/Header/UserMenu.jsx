import React from 'react';
import { FiHeart, FiSearch, FiUser } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const UserMenu = ({ favoritesCount = 0 }) => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center gap-0.5 sm:gap-2">
      {/* حساب المستخدم - للشاشات المتوسطة والكبيرة */}
      <button 
        onClick={() => navigate('/account')}
        className="hidden md:flex p-2 text-black hover:text-[#C5A059] transition-colors cursor-pointer rounded-full hover:bg-gray-50"
        title="Account"
      >
        <FiUser size={20} strokeWidth={1.5} />
      </button>

      {/* البحث */}
      <button 
        onClick={() => navigate('/shop')}
        className="p-2 text-black hover:text-[#C5A059] transition-colors cursor-pointer rounded-full hover:bg-gray-50"
        title="Search Products"
      >
        <FiSearch className="w-5 h-5 sm:w-5 sm:h-5" strokeWidth={1.5} />
      </button>

      {/* المفضلة */}
      <button 
        onClick={() => navigate('/wishlist')}
        className="relative p-2 text-black hover:text-[#C5A059] transition-colors cursor-pointer rounded-full hover:bg-gray-50"
        title="Wishlist"
      >
        <FiHeart className="w-5 h-5 sm:w-5 sm:h-5" strokeWidth={1.5} />
        {favoritesCount > 0 && (
          <span className="absolute top-1 right-1 bg-black text-white text-[8px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-white">
            {favoritesCount}
          </span>
        )}
      </button>
    </div>
  );
};

export default UserMenu;