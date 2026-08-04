import React from 'react';
import { Link } from 'react-router-dom';
import FooterLinks from './FooterLinks';
import SocialIcons from './SocialIcons';
import { MapPin, Phone, Clock } from 'lucide-react';

const Footer = () => {
  return (
    <footer id="main-footer" className="w-full bg-[#0c0c0c] text-white border-t border-neutral-800 pt-12 pb-24 md:pb-12 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* الجزء العلوي: اللوجو + الروابط + معلومات المعرض */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 text-left">
          
          {/* العمود الأول: الشعار والوصف */}
          <div className="lg:col-span-5 space-y-4">
            <Link to="/" className="inline-block">
              <span className="text-2xl font-serif font-medium tracking-widest text-white uppercase block">
                NOUR GALLERY
              </span>
              <span className="text-[9px] text-[#C5A059] tracking-[0.3em] uppercase block mt-0.5">
                Egyptian Fine Gold & Jewelry
              </span>
            </Link>

            <p className="text-xs text-neutral-400 font-light leading-relaxed max-w-md">
              Fine Egyptian jewelry crafted with precision and passion. Discover timeless gold pieces designed to commemorate life’s precious moments.
            </p>

            <div className="pt-2">
              <SocialIcons />
            </div>
          </div>

          {/* العمود الثاني: الروابط والأقسام */}
          <div className="lg:col-span-4">
            <FooterLinks />
          </div>

          {/* العمود الثالث: معلومات الاتصال المباشر */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-white mb-4">
              Visit Showroom
            </h4>

            <div className="space-y-3 text-xs text-neutral-400">
              <div className="flex items-start gap-2.5">
                <MapPin size={15} className="text-[#C5A059] shrink-0 mt-0.5" />
                <span className="leading-snug">Railway Street, In Front of Safiya Zaghloul School, Ismailia, Egypt</span>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone size={15} className="text-[#C5A059] shrink-0" />
                <a href="tel:+201224196130" className="hover:text-white transition-colors">+20 12 24196130</a>
              </div>

              <div className="flex items-center gap-2.5">
                <Clock size={15} className="text-[#C5A059] shrink-0" />
                <span>Sun – Fri: 10:00 AM – 10:00 PM (Sat Closed)</span>
              </div>
            </div>
          </div>

        </div>

        {/* الشريط السفلي: الحقوق والملكية */}
        <div className="pt-8 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left text-[11px] text-neutral-500">
          <p>© {new Date().getFullYear()} NOUR GALLERY. All Rights Reserved.</p>
          <div className="flex items-center gap-6 text-[10px] uppercase tracking-wider">
            <span className="hover:text-neutral-300 transition-colors cursor-pointer">Privacy Policy</span>
            <span className="hover:text-neutral-300 transition-colors cursor-pointer">Terms of Service</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer; 