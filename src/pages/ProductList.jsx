import { useEffect, useState } from "react";
import {
  getAllProducts,
  deleteProduct,
  updateProduct,
  createProduct,
} from "../services/product.service";
import ProductCard from "../components/product/ProductCard";
import Modal from "../components/product/Modal";
import { FaBoxOpen } from "react-icons/fa";
import ConfirmModal from "../components/product/ConfirmModal";

const ProductList = ({ openForm, setOpenForm }) => {
  //  product list
  const [productList, setProductList] = useState([]);

  // edit product
  const [selectedProduct, setSelectedProduct] = useState(null);

  // confirm modal
  const [confirmOpen, setConfirmOpen] = useState(false);

  // pagination
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  // categories
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  // delete loader
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    fetchproductList();
  }, [page, selectedCategory]);

  // fetch productList
  const fetchproductList = async () => {
    try {
      const res = await getAllProducts(page, limit, selectedCategory);
      console.log(res);
      setProductList(res.data.products || []);
      setTotalPages(res.data.totalPages || 1);
      setCategories(res.data.categories || []);
    } catch (err) {
      console.log(err);
    }
  };

  // update productlist
  const handleSaveProduct = (savedProduct, isEdit) => {
    if (isEdit) {
      // update existing product
      setProductList((prev) =>
        prev.map((p) => (p._id === savedProduct._id ? savedProduct : p)),
      );
    } else {
      // add new product at top
      setProductList((prev) => [savedProduct, ...prev]);
    }
  };

  // delete product
  const handleDelete = async () => {
    try {
      await deleteProduct(deletingId);

      // refetch after empty
      const res = await getAllProducts(page, limit, selectedCategory);

      // empty page data load
      if (res.data.products.length === 0 && page > 1) {
        setPage((prev) => prev - 1);
      } else {
        setProductList(res.data.products || []);
        setTotalPages(res.data.totalPages || 1);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setDeletingId(null);
      setConfirmOpen(false);
    }
  };

  // edit product
  const handleEdit = (product) => {
    setSelectedProduct(product);
    setOpenForm(true);
  };

  // pagination
  const goToNext = () => {
    if (page < totalPages) setPage((prev) => prev + 1);
  };

  const goToPrev = () => {
    if (page > 1) setPage((prev) => prev - 1);
  };

  const goToPage = (p) => setPage(p);

  return (
    <div className="p-4 sm:p-6">
      {openForm && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"></div>
      )}
      {/* category filter*/}
      <div className="flex gap-3 flex-wrap mb-6">
        <button
          onClick={() => {
            setSelectedCategory("");
            setPage(1);
          }}
          className={`px-4 py-2 rounded-full border text-sm
            ${
              selectedCategory === ""
                ? "bg-teal-600 text-white"
                : "bg-white hover:bg-gray-100"
            }`}
        >
          All
        </button>

        {categories.map((cat, index) => (
          <button
            key={index}
            onClick={() => {
              setSelectedCategory(cat);
              setPage(1);
            }}
            className={`px-4 py-2 rounded-full border text-sm
              ${
                selectedCategory === cat
                  ? "bg-teal-600 text-white"
                  : "bg-white hover:bg-gray-100"
              }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* product grid */}

      {productList.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-full min-h-[60vh] text-center">
          <FaBoxOpen className="text-6xl text-gray-400" />

          <h2 className="text-xl font-semibold mt-4 text-gray-700">
            No products found
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Try adding a product or change category
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 items-stretch">
          {productList.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              onEdit={handleEdit}
              onDelete={handleDelete}
              setDeletingId={setDeletingId}
              deletingId={deletingId}
              setConfirmOpen={setConfirmOpen}
            />
          ))}
        </div>
      )}

      {/* pagination */}
      <div className="p-4 flex justify-center items-center gap-3 flex-wrap border-t bg-white">
        {page > 1 && (
          <button
            onClick={goToPrev}
            className="px-4 py-2 rounded-lg border bg-white hover:bg-gray-100"
          >
            Prev
          </button>
        )}

        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => goToPage(i + 1)}
            className={`px-4 py-2 rounded-lg border
          ${
            page === i + 1
              ? "bg-teal-600 text-white"
              : "bg-white hover:bg-gray-100"
          }`}
          >
            {i + 1}
          </button>
        ))}

        {page < totalPages && (
          <button
            onClick={goToNext}
            className="px-4 py-2 rounded-lg border bg-white hover:bg-gray-100"
          >
            Next
          </button>
        )}
      </div>

      {/* modal */}
      <Modal
        openForm={openForm}
        setOpenForm={setOpenForm}
        selectedProduct={selectedProduct}
        updateProduct={updateProduct}
        createProduct={createProduct}
        handleSaveProduct={handleSaveProduct}
      />

      <ConfirmModal
        isOpen={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleDelete}
      />
    </div>
  );
};

export default ProductList;
