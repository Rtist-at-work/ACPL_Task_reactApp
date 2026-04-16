const FormButton = ({
  children,
  variant = "primary",
  loading,
  className = "",
  ...props
}) => {
  const base =
    "px-4 py-2 rounded-full text-sm font-medium transition inline-flex items-center justify-center gap-2";

  const variants = {
    primary: "bg-teal-600 text-white hover:bg-teal-700",
    secondary: "bg-white border hover:bg-gray-100",
    danger: "bg-red-500 text-white hover:bg-red-600",
  };

  return (
    <button
      className={`${base} ${variants[variant]} ${className}`}
      {...props}
    >
      {loading ? "Loading..." : children}
    </button>
  );
};

export default FormButton;