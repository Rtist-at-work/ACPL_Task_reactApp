import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import {
  initialState,
  validateForm,
} from "../utils/prodcutUploadForm/productSchema";
import { buildFormData } from "../utils/prodcutUploadForm/formData";
import { createProduct, updateProduct } from "../services/product.service";

export const useProductForm = ({
  selectedProduct,
  handleSaveProduct,
  setOpenForm,
}) => {
  const [product, setProduct] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [specKey, setSpecKey] = useState("");
  const [specValue, setSpecValue] = useState("");
  const [editingSpec, setEditingSpec] = useState(null);
  const [variant, setVariant] = useState({
    name: "",
    additionalPrice: "",
    stock: "",
  });
  const [editingVariantIndex, setEditingVariantIndex] = useState(null);

  useEffect(() => {
    setProduct(
      selectedProduct
        ? {
            ...selectedProduct,
            images: (selectedProduct.images || []).map((img, i) => ({
              uri: img.uri || img,
              altText: img.name || `image-${i}`,
              _id: img._id || null,
            })),
            specifications: selectedProduct.specification || {},
            variants: selectedProduct.variants || [],
          }
        : initialState,
    );
  }, [selectedProduct]);

  const handleChange = ({ target: { name, value, type, checked } }) =>
    setProduct((p) => ({
      ...p,
      [name]: type === "checkbox" ? checked : value,
    }));

  // file upload

  const handleFileChange = (e) => {
    const newImages = Array.from(e.target.files).map((file) => ({
      file,
      uri: URL.createObjectURL(file),
      altText: file.name,
    }));
    setProduct((p) => ({ ...p, images: [...p.images, ...newImages] }));
  };

  const removeImage = (index) =>
    setProduct((p) => ({
      ...p,
      images: p.images.filter((_, i) => i !== index),
    }));

  // specifications

  const addSpecification = () => {
    if (!specKey || !specValue) return;
    setProduct((p) => ({
      ...p,
      specifications: { ...p.specifications, [specKey]: specValue },
    }));
    setSpecKey("");
    setSpecValue("");
    setEditingSpec(null);
  };

  const deleteSpecification = (key) =>
    setProduct((p) => {
      const s = { ...p.specifications };
      delete s[key];
      return { ...p, specifications: s };
    });

  const editSpecification = (key, value) => {
    setSpecKey(key);
    setSpecValue(value);
    setEditingSpec(key);
  };

  //   variants

  const addVariant = () => {
    if (!variant.name) return;
    const formatted = {
      ...variant,
      additionalPrice: Number(variant.additionalPrice) || 0,
      stock: Number(variant.stock) || 0,
    };
    setProduct((p) => {
      const updated = [...p.variants];
      if (editingVariantIndex !== null)
        updated[editingVariantIndex] = formatted;
      else updated.push(formatted);
      return { ...p, variants: updated };
    });
    setVariant({ name: "", additionalPrice: "", stock: "" });
    setEditingVariantIndex(null);
  };

  const deleteVariant = (index) =>
    setProduct((p) => ({
      ...p,
      variants: p.variants.filter((_, i) => i !== index),
    }));

  const editVariant = (index) => {
    const v = product.variants[index];
    setVariant({
      ...v,
      additionalPrice: String(v.additionalPrice),
      stock: String(v.stock),
    });
    setEditingVariantIndex(index);
  };

  //   form submit function

  const handleSubmit = async (e) => {
    e.preventDefault();
    const error = validateForm(product);
    if (error) return toast.error(error);
    try {
      setLoading(true);
      const fd = buildFormData(product, selectedProduct);
      const res = selectedProduct
        ? await updateProduct(selectedProduct._id, fd)
        : await createProduct(fd);
      handleSaveProduct(res.data, !!selectedProduct);
      setProduct(initialState);
      setOpenForm(false);
    } catch (err) {
      console.log(err);
      toast.error(err?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return {
    product,
    loading,
    specKey,
    specValue,
    editingSpec,
    variant,
    editingVariantIndex,
    handleChange,
    handleFileChange,
    removeImage,
    setSpecKey,
    setSpecValue,
    addSpecification,
    deleteSpecification,
    editSpecification,
    addVariant,
    deleteVariant,
    editVariant,
    setVariant,
    handleSubmit,
  };
};
