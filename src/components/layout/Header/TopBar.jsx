import { FiX } from 'react-icons/fi';

const TopBar = ({ onClose }) => {
  return (
    <div className="w-full bg-[#0f0f0f] text-[#C5A059] py-3 px-4 relative flex justify-center items-center">
      {/* - تم تقليل حجم الخط للموبايل (text-[8px] أو 9px) لضمان ظهوره في سطر واحد.
         - إضافة text-center لضمان توسيط النص عند صغر الشاشة.
      */}
      <span className="text-[8px] md:text-[10px] font-medium tracking-[0.2em] uppercase text-center leading-tight">
        FREE WORLDWIDE SHIPPING ON ORDERS OVER $500
      </span>
      
      {/* زر الإغلاق مع تعديل موقعه ليكون مريحاً على الموبايل */}
      <button 
        onClick={onClose}
        className="absolute right-3 md:right-6 text-[#C5A059] hover:text-white transition-colors cursor-pointer p-1"
      >
        <FiX size={14} md:size={16} />
      </button>
    </div>
  );
};

export default TopBar;