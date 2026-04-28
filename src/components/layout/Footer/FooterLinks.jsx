import React from 'react';

const FooterLinks = () => {
  const links = [
    { title: "Explore", items: ["Home", "Shop", "Investment", "About Us"] },
    { title: "Support", items: ["Privacy", "Terms", "Shipping", "Contact"] }
  ];

  return (
    <>
      {links.map((group, index) => (
        <div key={index} className="flex flex-col gap-3 items-center md:items-start">
          <h3 className="text-[#d4af37] text-[9px] font-bold tracking-[0.2em] uppercase mb-1">
            {group.title}
          </h3>
          <ul className="flex flex-col gap-2 items-center md:items-start">
            {group.items.map((item, i) => (
              <li key={i}>
                <a href={`#${item}`} className="text-gray-500 hover:text-white text-[10px] font-medium tracking-widest uppercase transition-all duration-300">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </>
  );
};

export default FooterLinks;