import { useState } from 'react';
import { FiX, FiPlus, FiMinus, FiPhone, FiMail, FiHeart, FiSearch, FiUser, FiGrid } from 'react-icons/fi';

const MegaMenu = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('MENU');
  const [expandedItem, setExpandedItem] = useState(null);

  const toggleItem = (title) => {
    setExpandedItem(expandedItem === title ? null : title);
  };

  const menuItems = [
    { 
      title: "Shop By Brand", 
      icon: <FiGrid size={18} strokeWidth={1.5} />, 
      hasPlus: true,
      subItems: [
        { name: "IRAM Jewelry", img: "https://p-m-m-s.com/wp-content/uploads/2023/11/iram.jpg" },
        { name: "SIRAN Jewelry", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6f9YI_Z9nKk05-pGf2_R99L-78-W1_u8Ysw&s" },
        { name: "KLEO Jewelry", img: "https://kleojewelry.com/cdn/shop/files/KLEO_LOGO_BLACK_200x.png?v=1613594451" },
        { name: "AL- SEBHA", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgI1I_Z9nKk05-pGf2_R99L-78-W1_u8Ysw&s" }
      ]
    },
    { 
      title: "Shop by material", 
      icon: null, 
      hasPlus: true,
      subItems: [
        { name: "YELLOW GOLD", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTj8hD6wB78XyC-XmI-6QO5_U7jD4g2T9v_Vw&s" },
        { name: "WHITE GOLD", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlU2HkS9X7vF8tS7vG1X8p6C4Y8k7mG9S_Aw&s" },
        { name: "ROSE GOLD", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSf5kK6Yy-Z7fJ6wB78XyC-XmI-6QO5_U7jD4g2T9v_Vw&s" }
      ]
    },
    { title: "Shop TJH products", icon: null, hasPlus: false },
    { title: "Our Locations", icon: null, hasPlus: false },
  ];

  const categoryItems = ["All categories", " Rings", " Earrings", " Necklaces", " Bracelets"];

  return (
    <>
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .accordion-content {
          display: grid;
          grid-template-rows: 0fr;
          transition: grid-template-rows 0.4s ease-in-out, opacity 0.3s ease-in-out;
          opacity: 0;
          overflow: hidden;
        }
        .accordion-content.expanded {
          grid-template-rows: 1fr;
          opacity: 1;
        }
      `}</style>

      <div 
        className={`fixed inset-0 bg-black/40 z-[60] transition-opacity duration-300 ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
        onClick={onClose}
      />

      <div className={`fixed top-0 left-0 h-full w-[320px] sm:w-[350px] bg-white z-[70] transform transition-transform duration-300 ease-in-out flex flex-col ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        
        <button 
          onClick={onClose} 
          className={`absolute -right-12 top-4 p-2 text-white hover:text-gray-200 transition-opacity duration-300 cursor-pointer ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        >
          <FiX size={30} strokeWidth={1.5} />
        </button>

        <div className="flex border-b border-gray-200">
          <button onClick={() => setActiveTab('CATEGORIES')} className={`flex-1 py-4 text-[12px] font-bold tracking-widest transition-colors ${activeTab === 'CATEGORIES' ? 'bg-[#f8f8f8] text-black' : 'bg-white text-gray-400'}`}>CATEGORIES</button>
          <button onClick={() => setActiveTab('MENU')} className={`flex-1 py-4 text-[12px] font-bold tracking-widest transition-colors border-l border-gray-200 ${activeTab === 'MENU' ? 'bg-[#f8f8f8] text-black' : 'bg-white text-gray-400'}`}>MENU</button>
        </div>

        <div className="flex-1 overflow-y-auto no-scrollbar bg-white">
          {activeTab === 'MENU' ? (
            <ul className="flex flex-col text-left">
              {menuItems.map((item, index) => (
                <div key={index}>
                  <li onClick={() => item.hasPlus && toggleItem(item.title)} className="flex items-center px-6 py-4 border-b border-gray-50 hover:bg-gray-50 cursor-pointer group">
                    <div className="w-8">
                      {item.hasPlus && (
                        <div className={`transition-transform duration-300 ${expandedItem === item.title ? 'rotate-180' : 'rotate-0'}`}>
                          {expandedItem === item.title ? <FiMinus size={14} className="text-black" /> : <FiPlus size={14} className="text-gray-400 group-hover:text-black" />}
                        </div>
                      )}
                    </div>
                    <div className="flex-1 flex items-center justify-end gap-3">
                      <span className="text-[14px] text-gray-800 font-medium">{item.title}</span>
                      {item.icon && <span className="text-gray-600">{item.icon}</span>}
                    </div>
                  </li>
                  {item.hasPlus && item.subItems && (
                    <div className={`accordion-content ${expandedItem === item.title ? 'expanded' : ''}`}>
                      <div className="bg-gray-100 grid grid-cols-2 gap-[1px] min-h-0">
                        {item.subItems.map((sub, idx) => (
                          <div key={idx} className="relative aspect-square bg-white overflow-hidden group/item cursor-pointer">
                            <img src={sub.img} alt={sub.name} className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover/item:scale-110" />
                            <div className="absolute inset-0 bg-black/0 group-hover/item:bg-black/30 transition-colors duration-300 flex items-center justify-center p-2 text-center">
                              <span className="text-white font-bold tracking-widest text-xs uppercase opacity-0 group-hover/item:opacity-100 transition-opacity duration-300">
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
              <li className="flex items-center justify-end gap-3 px-6 py-4 border-b border-gray-50 hover:bg-gray-50 cursor-pointer"><span className="text-[14px] text-gray-800 font-medium">Wishlist</span><FiHeart size={18} className="text-gray-600" /></li>
              <li className="flex items-center justify-end gap-3 px-6 py-4 border-b border-gray-50 hover:bg-gray-50 cursor-pointer"><span className="text-[14px] text-gray-800 font-medium">Search</span><FiSearch size={18} className="text-gray-600" /></li>
              <li className="flex items-center justify-end gap-3 px-6 py-4 border-b border-gray-50 hover:bg-gray-50 cursor-pointer"><span className="text-[14px] text-gray-800 font-medium">Login / Register</span><FiUser size={18} className="text-gray-600" /></li>
              <div className="p-8 mt-4 text-left">
                <h4 className="text-[15px] font-bold text-gray-800 mb-6 uppercase tracking-wider">CONTACT US</h4>
                <div className="flex flex-col gap-5">
                  <a href="tel:+01274710000" className="flex items-center justify-end gap-3 text-gray-600 hover:text-black transition-colors"><span className="text-[14px] font-medium">+01274710000</span><FiPhone size={16} /></a>
                  <a href="mailto:info@tjh.online" className="flex items-center justify-end gap-3 text-gray-600 hover:text-black transition-colors"><span className="text-[14px] font-medium">info@tjh.online</span><FiMail size={16} /></a>
                </div>
              </div>
            </ul>
          ) : (
            <ul className="flex flex-col text-left">
              {categoryItems.map((category, index) => (
                <li key={index} className="px-6 py-4 border-b border-gray-50 hover:bg-gray-50 cursor-pointer text-[14px] text-gray-800 font-medium">{category}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
};

export default MegaMenu;