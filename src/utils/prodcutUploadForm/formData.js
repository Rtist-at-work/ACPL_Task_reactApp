export const buildFormData = (product, selectedProduct) => {
  const fd = new FormData();

  Object.keys(product).forEach((key) => {
    if (key !== "images") fd.append(key, JSON.stringify(product[key]));
  });

  product.images.forEach((img) => {
    if (img.file) fd.append("images", img.file);
  });

  if (selectedProduct) {
    const existing = product.images.filter((img) => !img.file);
    const deletedImages = selectedProduct.images
      .filter((img) => !existing.map((e) => e._id).includes(img._id))
      .map((img) => img._id);

    fd.append("existingImages", JSON.stringify(existing));
    fd.append("deletedImages", JSON.stringify(deletedImages));
  }

  return fd;
};