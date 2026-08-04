import React from 'react';
import { Link } from 'react-router-dom';

const FooterLinks = () => {
  const linkSections = [
    {
      title: "Navigation",
      items: [
        { label: "Home", path: "/" },
        { label: "Collections", path: "/shop" },
        { label: "Our Showroom", path: "/locations" },
        { label: "Saved Items", path: "/wishlist" }
      ]
    },
    {
      title: "Collections",
      items: [
        { label: "Gold Rings", path: "/shop?category=rings" },
        { label: "Earrings", path: "/shop?category=earrings" },
        { label: "Necklaces", path: "/shop?category=necklaces" },
        { label: "Bracelets", path: "/shop?category=bracelets" }
      ]
    }
  ];

  return (
    <div className="grid grid-cols-2 gap-8 sm:gap-12 text-left">
      {linkSections.map((section, idx) => (
        <div key={idx} className="space-y-3">
          <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-white">
            {section.title}
          </h4>
          <ul className="space-y-2">
            {section.items.map((item, i) => (
              <li key={i}>
                <Link 
                  to={item.path} 
                  className="text-xs text-neutral-400 hover:text-white transition-colors duration-200 font-light"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default FooterLinks;