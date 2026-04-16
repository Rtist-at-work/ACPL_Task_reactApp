export const initialState = {
  title: "",
  description: "",
  brand: "",
  category: "",
  price: "",
  discount: 0,
  discountType: "",
  stock: "",
  images: [], // { url, name, file }
  specifications: {},
  variants: [],
  isFeatured: false,
  isActive: true,
};

// form validation

export const validateForm = (product) => {
  if (!product.title.trim()) return "Title is required";
  if (!product.description.trim()) return "Description is required";
  if (!product.brand.trim()) return "Brand is required";
  if (!product.category.trim()) return "Category is required";

  if (!product.price || Number(product.price) <= 0)
    return "Valid price is required";

  /* Discount validation*/
  if (product.discount && Number(product.discount) > 0) {
    if (!product.discountType) return "Please select discount type";

    if (Number(product.discount) > Number(product.price))
      return "Discount cannot be greater than price";
  }

  if (!product.stock || Number(product.stock) < 0)
    return "Valid stock is required";

  return null;
};
