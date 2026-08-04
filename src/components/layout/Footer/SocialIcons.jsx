import React from 'react';
import { FaFacebookF, FaInstagram, FaWhatsapp, FaTiktok } from 'react-icons/fa';

const SocialIcons = () => {
  const socials = [
    { icon: <FaWhatsapp size={16} />, link: "https://wa.me/201224196130", label: "WhatsApp" },
    { icon: <FaInstagram size={16} />, link: "https://instagram.com", label: "Instagram" },
    { icon: <FaTiktok size={15} />, link: "https://tiktok.com", label: "TikTok" },
    { icon: <FaFacebookF size={15} />, link: "https://facebook.com", label: "Facebook" }
  ];

  return (
    <div className="flex items-center gap-3">
      {socials.map((item, index) => (
        <a 
          key={index} 
          href={item.link} 
          target="_blank" 
          rel="noopener noreferrer"
          aria-label={item.label}
          className="w-9 h-9 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-400 flex items-center justify-center hover:bg-white hover:text-black hover:border-white transition-all duration-300"
        >
          {item.icon}
        </a>
      ))}
    </div>
  );
};

export default SocialIcons;