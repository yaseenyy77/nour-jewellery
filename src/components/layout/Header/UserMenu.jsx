import { FiHeart, FiSearch, FiUser, FiShoppingCart } from 'react-icons/fi';

const UserMenu = () => {
  return (
    <div className="flex items-center gap-1 sm:gap-4">
      {/* أيقونة الحساب - مخفية في الموبايل وتظهر في الشاشات الكبيرة */}
      <button className="hidden md:flex p-2 text-black hover:text-[#C5A059] transition-colors cursor-pointer">
        <FiUser size={22} strokeWidth={1.5} />
      </button>

      {/* أيقونة الويش ليست - مخفية في الموبايل وتظهر في الشاشات الكبيرة */}
      <button className="hidden md:flex p-2 text-black hover:text-[#C5A059] transition-colors cursor-pointer">
        <FiHeart size={22} strokeWidth={1.5} />
      </button>

      {/* أيقونة البحث - ظاهرة في كله (موبايل وكبير) */}
      <button className="p-2 text-black hover:text-[#C5A059] transition-colors cursor-pointer">
        <FiSearch size={22} strokeWidth={1.5} />
      </button>

      {/* أيقونة السلة - ظاهرة في كله (موبايل وكبير) */}
      <div className="relative p-2 cursor-pointer group">
        <FiShoppingCart size={22} strokeWidth={1.5} className="text-black group-hover:text-[#C5A059] transition-colors" />
        <span className="absolute top-1 right-0 bg-black text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
          0
        </span>
      </div>
    </div>
  );
};

export default UserMenu;