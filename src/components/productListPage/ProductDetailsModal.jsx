import { useEffect, useState } from "react";
import { FaTimes, FaStar, FaChevronLeft, FaChevronRight } from "react-icons/fa";

const ProductDetailsModal = ({ product, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!product) return null;

  const images = product.images || [];

  const price = product.price || 0;
  const finalPrice = product.finalPrice || price;
  const discount = product.discount || 0;
  const discountType = product.discountType;

  const hasDiscount = discount > 0 && finalPrice < price;

  const savedAmount =
    discountType === "percentage"
      ? Math.round((price * discount) / 100)
      : discount;

  /* keyboard actions */
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  });

  const next = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#e6f4f3] w-full max-w-6xl rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
        {/* left image carousel */}
        <div className="md:w-1/2 bg-white p-6 flex flex-col justify-center items-center relative">
          {/* close */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-600 hover:text-black"
          >
            <FaTimes size={18} />
          </button>

          {/* main image */}
          <div className="relative w-full flex items-center justify-center">
            {images.length > 1 && (
              <>
                {/* previous */}
                <button
                  onClick={prev}
                  className="absolute left-0 bg-black/40 text-white p-2 rounded-full hover:bg-black/60"
                >
                  <FaChevronLeft />
                </button>

                {/* next */}
                <button
                  onClick={next}
                  className="absolute right-0 bg-black/40 text-white p-2 rounded-full hover:bg-black/60"
                >
                  <FaChevronRight />
                </button>
              </>
            )}

            <img
              src={images[currentIndex]?.uri}
              alt="product"
              className="max-h-[320px] object-contain transition duration-300"
            />
          </div>

          {/* image list */}
          {images.length > 1 && (
            <div className="flex gap-2 mt-4 overflow-x-auto">
              {images.map((img, i) => (
                <img
                  key={i}
                  src={img.uri}
                  onClick={() => setCurrentIndex(i)}
                  className={`h-16 w-16 object-cover rounded-lg cursor-pointer border-2 p-2 ${
                    i === currentIndex
                      ? "border-gray-600"
                      : "border-transparent"
                  }`}
                />
              ))}
            </div>
          )}

          {/* badges */}
          {product.isFeatured && (
            <span className="absolute top-4 left-4 bg-orange-500 text-white text-xs px-3 py-1 rounded-full">
              FEATURED
            </span>
          )}

          {hasDiscount && (
            <span className="absolute bottom-4 left-4 bg-red-500 text-white text-sm px-3 py-1 rounded-full">
              {discountType === "percentage"
                ? `${discount}% OFF`
                : `₹${discount} OFF`}
            </span>
          )}
        </div>

        {/* product details */}
        <div className="md:w-1/2 p-6 flex flex-col gap-4 overflow-y-auto max-h-[85vh]">

          {/* title */}
          <h2 className="text-2xl font-bold text-teal-900">{product.title}</h2>

          {/* brand */}
          <div className="text-sm text-gray-600 flex gap-3">
            <span>
              <b>Brand:</b> {product.brand}
            </span>
            <span>
              <b>Category:</b> {product.category}
            </span>
          </div>

          {/* rating */}

          <div className="flex items-center gap-2 text-orange-500">
            <FaStar />
            <span>{product.averageRating || 0}</span>
            <span className="text-gray-500 text-sm">
              ({product.ratingsCount || 0})
            </span>
          </div>

          {/* price */}
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-3xl font-bold text-purple-700">
              ₹{finalPrice}
            </span>

            {hasDiscount && (
              <span className="line-through text-gray-400">₹{price}</span>
            )}
          </div>

          {hasDiscount && (
            <span className="text-green-600 font-medium text-sm">
              You save ₹{savedAmount}
            </span>
          )}

          {/* description */}
          <div>
            <h3 className="font-semibold text-teal-800 mb-1">Description</h3>
            <p className="text-sm text-gray-700">{product.description}</p>
          </div>

          {/* stock */}
          <div className="flex gap-4 text-sm">
            <span>
              <b>Stock:</b> {product.stock}
            </span>
            <span>
              <b>Sold:</b> {product.sold}
            </span>
          </div>

          {/* spec */}
          {product.specification && (
            <div>
              <h3 className="font-semibold text-teal-800 mb-2">
                Specifications
              </h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                {Object.entries(product.specification).map(([k, v]) => (
                  <div
                    key={k}
                    className="bg-white px-3 py-2 rounded-lg shadow-sm"
                  >
                    <span className="font-medium">{k}:</span> {v}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* variants */}
          {product.variants?.length > 0 && (
            <div>
              <h3 className="font-semibold text-teal-800 mb-2">Variants</h3>
              {product.variants.map((v, i) => (
                <div
                  key={i}
                  className="bg-white rounded-lg px-3 py-2 flex justify-between text-sm mb-2"
                >
                  <span>{v.name}</span>
                  <span>
                    +₹{v.additionalPrice} | {v.stock}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* meta */}
          <div className="text-xs text-gray-400 mt-auto pt-4">
            <p>Created: {new Date(product.createdAt).toLocaleString()}</p>
            <p>Updated: {new Date(product.updatedAt).toLocaleString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsModal;
