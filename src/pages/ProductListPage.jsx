import useProductList from "../hooks/useProductList";

import ProductUploadForm from "../components/productListPage/ProductUploadForm";
import ConfirmModal from "../components/productListPage/ConfirmModal";

import CategoryFilter from "../components/productListPage/CategoryFilter";
import ProductGrid from "../components/productListPage/ProductGrid";
import Pagination from "../components/productListPage/Pagination";
import ProductDetailsModal from "../components/productListPage/ProductDetailsModal";

const ProductList = ({ openForm, setOpenForm }) => {
  const {
    productList,
    selectedProduct,
    confirmOpen,
    page,
    totalPages,
    categories,
    selectedCategory,
    deletingId,
    loading,

    setPage,
    setSelectedCategory,
    setSelectedProduct,
    setDeletingId,
    setConfirmOpen,
    setCategories,

    handleEdit,
    handleDelete,
    handleSaveProduct,
  } = useProductList(setOpenForm);
  
 
  return (
    <div className="p-4 sm:p-6">
      {openForm && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"></div>
      )}

      {/* category */}
      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        setPage={setPage}
      />

      {/* product grid */}
      <ProductGrid
        loading={loading}
        products={productList}
        onView={setSelectedProduct}
        onEdit={handleEdit}
        setDeletingId={setDeletingId}
        setConfirmOpen={setConfirmOpen}
        deletingId={deletingId}
      />

      {selectedProduct && !openForm && (
        <ProductDetailsModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}

      {/* pagination */}
      <Pagination page={page} totalPages={totalPages} setPage={setPage} />

      {/* modals */}
      <ProductUploadForm
        openForm={openForm}
        setOpenForm={setOpenForm}
        setSelectedProduct={setSelectedProduct}
        selectedProduct={selectedProduct}
        setCategories={setCategories}
        handleSaveProduct={handleSaveProduct}
      />

      <ConfirmModal
        isOpen={confirmOpen}
        onClose={() => {
          setConfirmOpen(false);
          setDeletingId(null);
        }}
        onConfirm={handleDelete}
      />
    </div>
  );
};

export default ProductList;
