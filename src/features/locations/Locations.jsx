import React from 'react';
import LocationsHero from './components/LocationsHero';
import LocationCard from './components/LocationCard';
import MapSection from './components/MapSection';

// بيانات معرض نور جاليري الرئيسي بالتحديث الأخير
const storeData = {
  name: "Nour Gallery Showroom",
  description: "Welcome to Nour Gallery. Discover our finest gold and luxury jewelry collections, handcrafted with timeless precision and unmatched elegance.",
  address: "Railway Street, In Front of Safiya Zaghloul School, Ismailia, Egypt",
  phone: "+201224196130",
  whatsapp: "201224196130",
  hours: "Sunday – Friday: 10:00 AM – 10:00 PM",
  closedDay: "Saturday: Off / Day Closed",
  image: "https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?q=80&w=1200&auto=format&fit=crop",
  mapUrl: "https://www.google.com/maps?q=30.59504048850517,32.271682055304375",
  embedUrl: "https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d1272.9736612845663!2d32.271682055304375!3d30.59504048850517!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sen!2seg!4v1785698473747!5m2!1sen!2seg"
};

const Locations = () => {
  return (
    <div className="w-full bg-[#fcfcfc] min-h-screen pb-20" dir="ltr">
      {/* هيدر الصفحة */}
      <LocationsHero />

      {/* محتوى المعرض والخريطة */}
      <div className="max-w-[1200px] mx-auto px-4 lg:px-8 mt-10 md:mt-14 space-y-10">
        <LocationCard store={storeData} />
        <MapSection embedUrl={storeData.embedUrl} mapUrl={storeData.mapUrl} />
      </div>
    </div>
  );
};

export default Locations;