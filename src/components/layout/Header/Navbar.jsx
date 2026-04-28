import { FiMenu } from 'react-icons/fi';

const Navbar = ({ onOpenMenu }) => {
  return (
    <div className="flex items-center">
      <button 
        onClick={onOpenMenu}
        className="text-black hover:text-[#C5A059] transition-colors cursor-pointer p-2"
      >
        <FiMenu size={28} strokeWidth={1.2} />
      </button>
    </div>
  );
};

export default Navbar;