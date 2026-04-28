import React from 'react';
import SocialMedia from './SocialIcons';

const Footer = () => {
  return (
    <footer className="w-full bg-[#1a1a1a] text-white py-16 px-6 border-t border-[#d4af37]/20">
      <div className="max-w-5xl mx-auto flex flex-col items-center gap-10">
        
        <div className="text-center">
          <h2 className="text-3xl font-black italic text-[#d4af37] tracking-tighter mb-2">NOUR GOLD</h2>
          <p className="text-[10px] text-gray-400 uppercase tracking-[0.3em]">Luxury Investment Since 1984</p>
        </div>

        <div className="w-full border-y border-white/5 py-10">
          <h4 className="text-[#d4af37] font-bold uppercase tracking-[0.3em] text-[10px] text-center mb-8">Connect With Us</h4>
          <SocialMedia />
        </div>

       
      </div>
    </footer>
  );
};

export default Footer;