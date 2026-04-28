import { useState } from 'react';
import { Link } from 'react-router-dom';
import TopBar from './TopBar';
import Navbar from './Navbar';
import UserMenu from './UserMenu';
import MegaMenu from './MegaMenu';
import nourLogo from '../../../assets/images/nour-logo.png';

const Header = () => {
  const [isTopBarVisible, setIsTopBarVisible] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="w-full bg-white flex flex-col font-sans sticky top-0 z-50">
      {isTopBarVisible && <TopBar onClose={() => setIsTopBarVisible(false)} />}
      
      <MegaMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      <div className="w-full px-6 h-[90px] flex items-center justify-between border-b border-gray-100">
        
        {/* الشمال: أيقونات المستخدم (بعد التعديل) */}
        <div className="flex-1 flex justify-start">
          <UserMenu />
        </div>

        {/* النص: اللوجو (ثابت في المنتصف) */}
        <div className="flex-shrink-0 flex justify-center">
          <Link to="/">
            <img src={nourLogo} alt="Nour Gold" className="h-16 w-auto object-contain" />
          </Link>
        </div>

        {/* اليمين: زرار الهمبرجر (بعد التعديل) */}
        <div className="flex-1 flex justify-end">
          <Navbar onOpenMenu={() => setIsMenuOpen(true)} />
        </div>

      </div>
    </header>
  );
};

export default Header;