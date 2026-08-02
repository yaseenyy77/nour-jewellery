import React from 'react';
import { MapPin } from 'lucide-react';

const LocationsHero = () => {
  return (
    <section className="bg-[#121212] text-white py-16 md:py-20 px-4 text-center relative overflow-hidden">
      <div className="max-w-3xl mx-auto space-y-4">
        {/* أيقونة الموقع */}
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/5 border border-white/10 text-[#C5A059] mb-2">
          <MapPin size={22} />
        </div>

        {/* النص الفرعي */}
        <span className="text-[11px] font-bold text-[#C5A059] tracking-[0.3em] uppercase block">
          Egyptian Gold & Fine Jewelry
        </span>

        {/* العنوان الرئيسي */}
        <h1 className="text-3xl md:text-5xl font-serif font-medium tracking-wider text-white uppercase">
          Nour Gallery
        </h1>

        {/* الوصف التعريفى */}
        <p className="text-gray-400 text-sm md:text-base font-light leading-relaxed max-w-2xl mx-auto">
          Welcome to Nour Gallery, your premier Egyptian gold showroom. Discover our exclusive handcrafted gold and luxury jewelry collections, crafted with authentic Egyptian excellence and timeless elegance.
        </p>
      </div>
    </section>
  );
};

export default LocationsHero;