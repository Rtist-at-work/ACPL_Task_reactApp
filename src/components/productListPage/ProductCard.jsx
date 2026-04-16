import { FaEdit, FaTrash } from "react-icons/fa";
import React from "react";
import FormButton from "../FormButton";

const ProductCard = React.memo(
  ({ product, onView, onEdit, setDeletingId, deletingId, setConfirmOpen }) => {
    const image = product.images?.[0]?.uri;

    const isDeleting = deletingId === product._id;

    const handleDelete = () => {
      setDeletingId(product._id);
      setConfirmOpen(true);
    };

    // price logic
    const price = product.price || 0;
    const finalPrice = product.finalPrice || price;
    const discount = product.discount || 0;
    const discountType = product.discountType;

    const hasDiscount = discount > 0 && finalPrice > 0 && finalPrice < price;

    return (
      <div
        onClick={() => onView(product)}
        className="bg-[#e6f4f3] rounded-3xl p-4 shadow-md hover:shadow-xl transition flex flex-col h-full cursor-pointer"
      >
        {/* image section*/}
        <div className="relative bg-white rounded-2xl p-4 flex justify-center items-center h-52">
          {/* featured tag */}
          {product.isFeatured && (
            <span className="absolute top-3 left-3 bg-orange-500 text-white text-xs px-3 py-1 rounded-full font-semibold">
              FEATURED
            </span>
          )}

          {/* discount badge */}
          {hasDiscount && (
            <span className="absolute top-3 right-3 bg-red-500 text-white text-xs px-3 py-1 rounded-full font-semibold">
              {discountType === "percentage"
                ? `${discount}% OFF`
                : `₹${discount} OFF`}
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

          {/* price section*/}
          <div className="mt-3 flex flex-col gap-1">
            <div className="flex items-center gap-2 flex-wrap">
              {/* final price */}
              <span className="text-purple-600 font-bold text-lg">
                ₹{finalPrice}
              </span>

              {/* original price */}
              {hasDiscount && (
                <span className="text-sm text-gray-400 line-through">
                  ₹{price}
                </span>
              )}
            </div>

            {/* saved money */}
            {hasDiscount && (
              <span className="text-xs text-green-600 font-medium">
                You save{" "}
                {discountType === "percentage"
                  ? `${Math.round((price * discount) / 100)}`
                  : `₹${discount}`}
              </span>
            )}
          </div>

          {/* action buttons */}
          <div className="flex gap-3 mt-auto pt-4">
            {/* edit */}
            <FormButton
              type="button"
              variant="primary"
              onClick={(e) => {
                e.stopPropagation();
                onEdit(product);
              }}
              className="flex-1"
            >
              <FaEdit /> Edit
            </FormButton>

            {/* delete */}
            <FormButton
              type="button"
              variant="danger"
              onClick={(e) => {
                e.stopPropagation();
                handleDelete();
              }}
              disabled={isDeleting}
              className="flex-1"
            >
              <FaTrash /> Delete
            </FormButton>
          </div>
        </div>
      </div>
    );
  },
);

export default ProductCard;
