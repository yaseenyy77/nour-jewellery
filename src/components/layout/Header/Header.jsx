import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import TopBar from './TopBar';
import Navbar from './Navbar';
import UserMenu from './UserMenu';
import MegaMenu from './MegaMenu';
import nourLogo from '../../../assets/images/nour-logo.png';

const Header = ({ onOpenMenu }) => {
  const [isTopBarVisible, setIsTopBarVisible] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleOpenMenu = () => {
    setIsMenuOpen(true);
    if (onOpenMenu) onOpenMenu();
  };

  return (
    <header className="w-full bg-white flex flex-col font-sans sticky top-0 z-50 shadow-sm">
      {isTopBarVisible && <TopBar onClose={() => setIsTopBarVisible(false)} />}
      
      <MegaMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      <div className="w-full px-3 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between border-b border-gray-100">
        
        {/* اليسار: أدوات المستخدم */}
        <div className="flex-1 flex justify-start items-center">
          <UserMenu />
        </div>

        {/* المنتصف: اللوجو متناسق تماماً مع شاشات الموبايل واللاب */}
        <div className="flex-shrink-0 flex justify-center items-center px-2">
          <Link to="/" className="block">
            <img 
              src={nourLogo} 
              alt="Nour Gallery Jewelry" 
              className="h-9 sm:h-12 md:h-14 w-auto object-contain transition-all" 
            />
          </Link>
        </div>

        {/* اليمين: زر فتح القائمة */}
        <div className="flex-1 flex justify-end items-center">
          <Navbar onOpenMenu={handleOpenMenu} />
        </div>

      </div>
    </header>
  );
};

export default Header;