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

      <div className="w-full px-4 sm:px-8 h-[80px] sm:h-[90px] flex items-center justify-between border-b border-gray-100">
        
        {/* اليسار: أيقونات المستخدم */}
        <div className="flex-1 flex justify-start items-center">
          <UserMenu />
        </div>

        {/* المنتصف: اللوجو */}
        <div className="flex-shrink-0 flex justify-center items-center">
          <Link to="/">
            <img src={nourLogo} alt="Nour Gold Jewellery" className="h-12 sm:h-16 w-auto object-contain" />
          </Link>
        </div>

        {/* اليمين: زر المنيو الجانبي */}
        <div className="flex-1 flex justify-end items-center">
          <Navbar onOpenMenu={handleOpenMenu} />
        </div>

      </div>
    </header>
  );
};

export default Header;