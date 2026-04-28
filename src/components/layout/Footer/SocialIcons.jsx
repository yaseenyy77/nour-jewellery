import React from 'react';
import { FaFacebookF, FaInstagram, FaWhatsapp, FaTwitter, FaTiktok } from 'react-icons/fa';

const SocialMedia = () => {
  const socials = [
    { icon: <FaWhatsapp />, link: "#", color: "hover:text-[#25D366]" },
    { icon: <FaInstagram />, link: "#", color: "hover:text-[#E1306C]" },
    { icon: <FaTiktok />, link: "#", color: "hover:text-[#000000]" },
    { icon: <FaFacebookF />, link: "#", color: "hover:text-[#1877F2]" }
  ];

  return (
    <div className="flex gap-6 justify-center items-center">
      {socials.map((social, index) => (
        <a 
          key={index} 
          href={social.link} 
          className={`group flex items-center justify-center w-14 h-14 rounded-full border border-white/10 text-gray-400 transition-all duration-500 hover:border-current hover:-translate-y-2 ${social.color}`}
        >
          <span className="text-xl transition-colors duration-300">
            {social.icon}
          </span>
        </a>
      ))}
    </div>
  );
};

export default SocialMedia;