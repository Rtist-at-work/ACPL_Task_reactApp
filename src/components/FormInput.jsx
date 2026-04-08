const FormInput = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  onWheel,
  textarea = false,
}) => {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}

      {textarea ? (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full px-3 py-2 border rounded-lg bg-white 
          focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
        />
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          onWheel={onWheel}
          className="w-full px-3 py-2 border rounded-lg bg-white 
          focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
        />
      )}
    </div>
  );
};

export default FormInput;