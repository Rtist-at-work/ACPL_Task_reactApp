import { useEffect, useState, useCallback } from "react";
import { getAllProducts, deleteProduct } from "../services/product.service";

const useProductList = (setOpenForm) => {
  const [productList, setProductList] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const [deletingId, setDeletingId] = useState(null);
  const [loading, setLoading] = useState(false);

  /* get products */
  const fetchProducts = useCallback(() => {
    setLoading(true);

    getAllProducts(page, limit, selectedCategory)
      .then((res) => {
        setProductList(res.data.products || []);
        setTotalPages(res.data.totalPages || 1);
        setCategories(res.data.categories || []);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [page, limit, selectedCategory]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  /* product list updation */
  const handleSaveProduct = useCallback((savedProduct, isEdit) => {
    if (isEdit) {
      setProductList((prev) =>
        prev.map((p) => (p._id === savedProduct._id ? savedProduct : p)),
      );
      setSelectedProduct(null)
    } else {
      setProductList((prev) => [savedProduct, ...prev]);
      setCategories((prev) => [...prev, savedProduct.category]);
    }
  }, []);

  /* delete product */
  const handleDelete = useCallback(() => {
    deleteProduct(deletingId)
      .then(() => {
        fetchProducts();
      })
      .finally(() => {
        setDeletingId(null);
        setConfirmOpen(false);
      });
  }, [deletingId, fetchProducts]);

  /* edit product */
  const handleEdit = useCallback(
    (product) => {
      setSelectedProduct(product);
      setOpenForm(true);
    },
    [setOpenForm],
  );

  return {
    // state
    productList,
    selectedProduct,
    confirmOpen,
    page,
    totalPages,
    categories,
    selectedCategory,
    deletingId,
    loading,

    // setters
    setPage,
    setSelectedProduct,
    setSelectedCategory,
    setDeletingId,
    setConfirmOpen,
    setCategories,

    // actions
    handleEdit,
    handleDelete,
    handleSaveProduct,
  };
};

export default useProductList;
