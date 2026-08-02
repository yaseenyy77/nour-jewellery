import React from 'react';
import { ExternalLink } from 'lucide-react';

const MapSection = ({ embedUrl, mapUrl }) => {
  return (
    <div className="w-full bg-white rounded-2xl border border-gray-200 p-4 md:p-6 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 text-left">
        <div>
          <span className="text-[10px] font-bold text-[#C5A059] tracking-[0.25em] uppercase block">
            Interactive Navigation
          </span>
          <h3 className="text-lg md:text-xl font-serif text-black uppercase tracking-wider">
            Find Us On The Map
          </h3>
        </div>

        <a 
          href={mapUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-black hover:text-[#C5A059] uppercase transition-colors"
        >
          <span>Open Full Google Maps</span>
          <ExternalLink size={14} />
        </a>
      </div>

      {/* الخريطة الخاصة بموقعك بالضبط */}
      <div className="w-full h-[380px] md:h-[480px] rounded-xl overflow-hidden bg-neutral-100 border border-gray-100">
        <iframe
          title="Nour Gallery Google Map Location"
          src={embedUrl}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
        ></iframe>
      </div>
    </div>
  );
};

export default MapSection;