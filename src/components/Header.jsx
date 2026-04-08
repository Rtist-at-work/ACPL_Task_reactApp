const Header = ({ title = "Organic Store", handleToggle }) => {
  return (
    <header className="w-full h-16 bg-[#ADFFFE] flex items-center justify-between px-4 sm:px-6 md:px-10 lg:px-12 ">
      <h1 className="text-base sm:text-lg md:text-xl font-bold text-[#004F4F]">
        {title}
      </h1>
      <button onClick={()=>handleToggle()} className="px-3 py-1.5 sm:px-4 bg-[#004F4F] rounded-md text-sm sm:text-base font-semibold text-[#ADFFFE] hover:bg-[#002020] transition border-0 cursor-pointer">
        + Add Product
      </button>
    </header>
  );
};

export default Header;
