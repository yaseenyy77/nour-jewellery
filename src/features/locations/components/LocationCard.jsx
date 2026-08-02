import React from 'react';
import { MapPin, Clock, Phone, MessageSquare, Navigation, CalendarX } from 'lucide-react';

const LocationCard = ({ store }) => {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
        
        {/* صورة المعرض */}
        <div className="lg:col-span-5 relative min-h-[260px] lg:min-h-full bg-neutral-100">
          <img 
            src={store.image} 
            alt={store.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 left-4 bg-black/80 text-white text-[10px] font-bold tracking-[0.2em] uppercase px-3.5 py-1.5 rounded-full backdrop-blur-md">
            Main Flagship Boutique
          </div>
        </div>

        {/* تفاصيل المعرض */}
        <div className="lg:col-span-7 p-6 md:p-8 flex flex-col justify-between text-left">
          <div>
            <span className="text-[10px] font-bold text-[#C5A059] tracking-[0.25em] uppercase block mb-1">
              Nour Gallery Exclusive Showroom
            </span>
            <h2 className="text-2xl md:text-3xl font-serif font-medium text-black uppercase tracking-wider mb-3">
              {store.name}
            </h2>

            <p className="text-gray-600 text-xs md:text-sm font-light leading-relaxed mb-6">
              {store.description}
            </p>

            <div className="space-y-3.5 text-xs text-gray-700 border-t border-gray-100 pt-5">
              {/* العنوان */}
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-gray-50 text-black shrink-0 mt-0.5">
                  <MapPin size={16} />
                </div>
                <div>
                  <span className="font-semibold block text-black text-[11px] uppercase tracking-wider">Address</span>
                  <span className="text-gray-600">{store.address}</span>
                </div>
              </div>

              {/* مواعيد العمل */}
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-gray-50 text-black shrink-0 mt-0.5">
                  <Clock size={16} />
                </div>
                <div>
                  <span className="font-semibold block text-black text-[11px] uppercase tracking-wider">Working Hours</span>
                  <span className="text-gray-600 block">{store.hours}</span>
                  <span className="text-amber-700 text-[11px] font-medium flex items-center gap-1 mt-0.5">
                    <CalendarX size={12} />
                    {store.closedDay}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* أزرار الاتصال والتواصل المباشر */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-8 pt-5 border-t border-gray-100">
            <a 
              href={`tel:${store.phone}`}
              className="flex items-center justify-center gap-2 py-3 px-4 border border-gray-200 rounded-xl text-xs font-semibold tracking-wider text-gray-800 hover:bg-black hover:text-white hover:border-black transition-all duration-300"
            >
              <Phone size={15} />
              <span>Call Us</span>
            </a>

            <a 
              href={`https://wa.me/${store.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-3 px-4 border border-gray-200 rounded-xl text-xs font-semibold tracking-wider text-gray-800 hover:bg-[#25D366] hover:text-white hover:border-[#25D366] transition-all duration-300"
            >
              <MessageSquare size={15} />
              <span>WhatsApp</span>
            </a>

            <a 
              href={store.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-3 px-4 bg-black text-white rounded-xl text-xs font-semibold tracking-wider hover:bg-[#C5A059] transition-all duration-300"
            >
              <Navigation size={15} />
              <span>Get Directions</span>
            </a>
          </div>

        </div>
      </div>
    </div>
  );
};

export default LocationCard;