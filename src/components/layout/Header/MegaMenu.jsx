import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiX, FiPlus, FiMinus, FiPhone, FiMail, FiHeart, FiSearch, FiUser, FiGrid, FiMapPin } from 'react-icons/fi';

const MegaMenu = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('MENU');
  const [expandedItem, setExpandedItem] = useState(null);
  const navigate = useNavigate();

  const toggleItem = (title) => {
    setExpandedItem(expandedItem === title ? null : title);
  };

  const handleCategoryClick = (slug) => {
    onClose();
    if (slug === 'all') {
      navigate('/shop');
    } else {
      navigate(`/shop?category=${slug}`);
    }
  };

  const handleMaterialClick = (materialName) => {
    onClose();
    navigate(`/shop?color=${materialName.toLowerCase().replace(' gold', '')}`);
  };

  const menuItems = [
    { 
      title: "Shop By Material", 
      icon: <FiGrid size={18} strokeWidth={1.5} />, 
      hasPlus: true,
      subItems: [
        { name: "YELLOW GOLD", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTj8hD6wB78XyC-XmI-6QO5_U7jD4g2T9v_Vw&s" },
        { name: "WHITE GOLD", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlU2HkS9X7vF8tS7vG1X8p6C4Y8k7mG9S_Aw&s" },
        { name: "ROSE GOLD", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSf5kK6Yy-Z7fJ6wB78XyC-XmI-6QO5_U7jD4g2T9v_Vw&s" }
      ]
    },
    { 
      title: "Nour Gallery Collections", 
      icon: null, 
      hasPlus: false, 
      action: () => { onClose(); navigate('/shop'); } 
    },
    { 
      title: "Our Location", 
      icon: <FiMapPin size={18} strokeWidth={1.5} />, 
      hasPlus: false, 
      action: () => { onClose(); navigate('/locations'); } 
    },
  ];

  const categoryItems = [
    { name: "All Categories", slug: "all" },
    { name: "Rings", slug: "rings" },
    { name: "Earrings", slug: "earrings" },
    { name: "Necklaces", slug: "necklaces" },
    { name: "Bracelets", slug: "bracelets" }
  ];

  return (
    <>
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .accordion-content {
          display: grid;
          grid-template-rows: 0fr;
          transition: grid-template-rows 0.3s ease-in-out, opacity 0.3s ease-in-out;
          opacity: 0;
          overflow: hidden;
        }
        .accordion-content.expanded {
          grid-template-rows: 1fr;
          opacity: 1;
        }
      `}</style>

      {/* خلفية معتمة عند الفتح */}
      <div 
        className={`fixed inset-0 bg-black/60 backdrop-blur-xs z-[60] transition-opacity duration-300 ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
        onClick={onClose}
      />

      {/* القائمة الجانبية متناسقة لشاشات الموبايل الصغيرة والشاشات الكبيرة */}
      <div 
        dir="ltr"
        className={`fixed top-0 left-0 h-full w-[85vw] max-w-[360px] bg-white z-[70] transform transition-transform duration-300 ease-in-out flex flex-col shadow-2xl ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        
        {/* زر الإغلاق علوي */}
        <button 
          onClick={onClose} 
          className={`absolute right-3 top-3 p-2.5 text-black hover:text-[#C5A059] transition-all duration-300 cursor-pointer ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        >
          <FiX size={22} strokeWidth={1.5} />
        </button>

        {/* التبويبات العلويّة */}
        <div className="flex border-b border-gray-100 mt-12">
          <button 
            onClick={() => setActiveTab('MENU')} 
            className={`flex-1 py-3.5 text-[10px] sm:text-[11px] font-bold tracking-[0.2em] uppercase transition-colors text-center ${activeTab === 'MENU' ? 'bg-[#fcfcfc] text-black border-b-2 border-black' : 'bg-white text-gray-400 hover:text-black'}`}
          >
            MENU
          </button>
          <button 
            onClick={() => setActiveTab('CATEGORIES')} 
            className={`flex-1 py-3.5 text-[10px] sm:text-[11px] font-bold tracking-[0.2em] uppercase transition-colors border-l border-gray-100 text-center ${activeTab === 'CATEGORIES' ? 'bg-[#fcfcfc] text-black border-b-2 border-black' : 'bg-white text-gray-400 hover:text-black'}`}
          >
            CATEGORIES
          </button>
        </div>

        {/* محتوى القائمة */}
        <div className="flex-1 overflow-y-auto no-scrollbar bg-white">
          {activeTab === 'CATEGORIES' ? (
            <ul className="flex flex-col text-left">
              {categoryItems.map((cat, index) => (
                <li 
                  key={index} 
                  onClick={() => handleCategoryClick(cat.slug)}
                  className="px-5 py-3.5 border-b border-gray-100 hover:bg-neutral-50 hover:text-[#C5A059] cursor-pointer text-xs text-gray-800 font-medium tracking-wide uppercase transition-colors flex justify-between items-center"
                >
                  <span>{cat.name}</span>
                  <span className="text-gray-400 text-xs">→</span>
                </li>
              ))}
            </ul>
          ) : (
            <ul className="flex flex-col text-left">
              {menuItems.map((item, index) => (
                <div key={index}>
                  <li 
                    onClick={() => {
                      if (item.hasPlus) {
                        toggleItem(item.title);
                      } else if (item.action) {
                        item.action();
                      }
                    }} 
                    className="flex items-center justify-between px-5 py-3.5 border-b border-gray-100 hover:bg-neutral-50 cursor-pointer group"
                  >
                    <span className="text-xs text-gray-900 font-medium uppercase tracking-wider">{item.title}</span>
                    <div className="flex items-center gap-2">
                      {item.icon && <span className="text-gray-500">{item.icon}</span>}
                      {item.hasPlus && (
                        <div className={`transition-transform duration-300 ${expandedItem === item.title ? 'rotate-180' : 'rotate-0'}`}>
                          {expandedItem === item.title ? <FiMinus size={14} className="text-black" /> : <FiPlus size={14} className="text-gray-400 group-hover:text-black" />}
                        </div>
                      )}
                    </div>
                  </li>

                  {item.hasPlus && item.subItems && (
                    <div className={`accordion-content ${expandedItem === item.title ? 'expanded' : ''}`}>
                      <div className="bg-gray-50 grid grid-cols-3 gap-2 p-3 min-h-0">
                        {item.subItems.map((sub, idx) => (
                          <div 
                            key={idx} 
                            onClick={() => handleMaterialClick(sub.name)}
                            className="relative aspect-square bg-white rounded-lg overflow-hidden group/item cursor-pointer border border-gray-200"
                          >
                            <img src={sub.img} alt={sub.name} className="w-full h-full object-cover transition-transform duration-500 group-hover/item:scale-110" />
                            <div className="absolute inset-0 bg-black/50 group-hover/item:bg-black/70 transition-colors flex items-center justify-center p-1 text-center">
                              <span className="text-white font-bold tracking-wider text-[8px] uppercase">
                                {sub.name}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {/* أزرار سريعة */}
              <li 
                onClick={() => { onClose(); navigate('/wishlist'); }} 
                className="flex items-center justify-between px-5 py-3.5 border-b border-gray-100 hover:bg-neutral-50 cursor-pointer text-xs text-gray-800 font-medium uppercase tracking-wider"
              >
                <span>Wishlist</span>
                <FiHeart size={16} className="text-gray-600" />
              </li>

              <li 
                onClick={() => { onClose(); navigate('/shop'); }} 
                className="flex items-center justify-between px-5 py-3.5 border-b border-gray-100 hover:bg-neutral-50 cursor-pointer text-xs text-gray-800 font-medium uppercase tracking-wider"
              >
                <span>Search</span>
                <FiSearch size={16} className="text-gray-600" />
              </li>

              <li 
                onClick={() => { onClose(); navigate('/account'); }} 
                className="flex items-center justify-between px-5 py-3.5 border-b border-gray-100 hover:bg-neutral-50 cursor-pointer text-xs text-gray-800 font-medium uppercase tracking-wider"
              >
                <span>Account</span>
                <FiUser size={16} className="text-gray-600" />
              </li>

              {/* بيانات التواصل */}
              <div className="p-5 mt-2 text-left border-t border-gray-100 bg-gray-50/50">
                <h4 className="text-[10px] font-bold text-black mb-3 uppercase tracking-[0.2em]">CONTACT NOUR GALLERY</h4>
                <div className="flex flex-col gap-2.5">
                  <a href="tel:+201224196130" className="flex items-center gap-2.5 text-gray-600 hover:text-black transition-colors text-xs">
                    <FiPhone size={14} />
                    <span>+20 12 24196130</span>
                  </a>
                  <a href="mailto:info@nourgallery.com" className="flex items-center gap-2.5 text-gray-600 hover:text-black transition-colors text-xs">
                    <FiMail size={14} />
                    <span>info@nourgallery.com</span>
                  </a>
                </div>
              </div>
            </ul>
          )}
        </div>
      </div>
    </>
  );
};

export default MegaMenu;