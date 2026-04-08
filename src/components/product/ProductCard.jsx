import { FaStar, FaEdit, FaTrash } from "react-icons/fa";

const ProductCard = ({
  product,
  onEdit,
  setDeletingId,
  deletingId,
  setConfirmOpen,
}) => {
  // image uri
  const image = product.images?.[0]?.uri;
  // delete loader state
  const isDeleting = deletingId === product._id;

  return (
    <div className="bg-[#e6f4f3] rounded-3xl p-4 shadow-md hover:shadow-xl transition flex flex-col h-full">
      {/* image section */}
      <div className="relative bg-white rounded-2xl p-4 flex justify-center items-center h-52">
        {product.isFeatured && (
          <span className="absolute top-3 left-3 bg-orange-500 text-white text-xs px-3 py-1 rounded-full font-semibold">
            FEATURED
          </span>
        )}

        <img
          loading="lazy"
          src={image}
          alt={product.title}
          className="h-full object-contain"
        />
      </div>

      {/* content */}
      <div className="mt-4 flex flex-col flex-grow">
        {/* title */}
        <h2 className="text-lg font-semibold text-teal-900 line-clamp-1">
          {product.title}
        </h2>

        {/* description */}
        <p className="text-sm text-teal-700 mt-1 line-clamp-2 min-h-[40px]">
          {product.description}
        </p>

        {/* price + review*/}
        <div className="flex justify-between items-center mt-3">
          <span className="text-purple-600 font-bold text-lg">
            ₹{product.discountPrice || product.price}
          </span>

          <div className="flex items-center gap-1 text-orange-500 text-sm">
            <FaStar />
            <span>{product.averageRating || 0}</span>
          </div>
        </div>

        {/* action buttons */}
        <div className="flex gap-3 mt-auto pt-4">
          {/* EDIT */}
          <button
            onClick={() => onEdit(product)}
            className="flex-1 flex items-center justify-center gap-2 bg-teal-700 hover:bg-teal-800 text-white py-2.5 rounded-full text-sm font-medium transition"
          >
            <FaEdit /> Edit
          </button>
          <button
            onClick={() => {
              setDeletingId(product._id);
              setConfirmOpen(true);
            }}
            disabled={isDeleting}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-full text-sm font-medium transition
    ${
      isDeleting
        ? "bg-gray-400 cursor-not-allowed"
        : "bg-red-500 hover:bg-red-600 text-white"
    }`}
          >
            {isDeleting ? (
              <>
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                Deleting...
              </>
            ) : (
              <>
                <FaTrash /> Delete
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
