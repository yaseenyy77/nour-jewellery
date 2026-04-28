import { FiX } from 'react-icons/fi';

const TopBar = ({ onClose }) => {
  return (
    <div className="w-full bg-[#0f0f0f] text-[#C5A059] text-[10px] tracking-[0.2em] uppercase py-2.5 relative flex justify-center items-center">
      <span>FREE WORLDWIDE SHIPPING ON ORDERS OVER $500</span>
      <button 
        onClick={onClose}
        className="absolute right-6 text-[#C5A059] hover:text-white transition-colors cursor-pointer"
      >
        <FiX size={16} />
      </button>
    </div>
  );
};

export default TopBar;