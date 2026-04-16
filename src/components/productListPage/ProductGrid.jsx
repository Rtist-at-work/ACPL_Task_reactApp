import ProductCard from "../productListPage/ProductCard";
import { FaBoxOpen } from "react-icons/fa";

const ProductGrid = ({
  loading,
  products,
  onView,
  onEdit,
  setDeletingId,
  setConfirmOpen,
  deletingId,
}) => {
  if (loading) {
    return (
      <div className="flex justify-center min-h-[60vh] items-center">
        <div className="w-12 h-12 border-4 border-teal-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!products.length) {
    return (
      <div className="flex flex-col items-center min-h-[60vh] justify-center">
        <FaBoxOpen className="text-6xl text-gray-400" />
        <h2 className="mt-4 text-xl">No products found</h2>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((p) => (
        <ProductCard
          key={p._id}
          product={p}
          onView={onView}
          onEdit={onEdit}
          setDeletingId={setDeletingId}
          setConfirmOpen={setConfirmOpen}
          deletingId={deletingId}
        />
      ))}
    </div>
  );
};

export default ProductGrid;
