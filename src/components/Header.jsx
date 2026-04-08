import logo from '../assets/logo.png'

const Header = ({ title = "QuicKart", handleToggle }) => {
  return (
    <header className="w-full h-16 bg-[#ADFFFE] flex items-center justify-between px-4 sm:px-6 md:px-10 lg:px-12 ">
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Logo */}
        <img
          src={logo} // put your logo in public folder
          alt="logo"
          className="w-8 h-8 sm:w-9 sm:h-9 object-contain"
        />

        {/* Title */}
        <h1 className="text-base sm:text-lg md:text-xl font-bold text-[#004F4F]">
          {title}
        </h1>
      </div>
      <button onClick={()=>handleToggle()} className="px-3 py-1.5 sm:px-4 bg-[#004F4F] rounded-md text-sm sm:text-base font-semibold text-[#ADFFFE] hover:bg-[#002020] transition border-0 cursor-pointer">
        + Add Product
      </button>
    </header>
  );
};

export default Header;
