import { FaTimes, FaTrash, FaEdit, FaPlus } from "react-icons/fa";
import FormInput from "../FormInput";
import FormButton from "../FormButton";
import { useProductForm } from "../../hooks/useProductForm";

// configs
const basicFields = [
  { label: "Title", name: "title", placeholder: "i phone" },
  {
    label: "Description",
    name: "description",
    textarea: true,
    placeholder:
      "Enter product details like features, specifications, and key highlights...",
  },
];

const brandFields = [
  { label: "Brand", name: "brand", placeholder: "Apple" },
  { label: "Category", name: "category", placeholder: "Mobile" },
];

const priceFields = [
  { label: "Price", name: "price", type: "number", placeholder: "100000" },
  { label: "Discount", name: "discount", type: "number", placeholder: "10" },
  { label: "Stock", name: "stock", type: "number", placeholder: "100" },
];
// input renderer
const renderInputs = (fields, product, handleChange, handleWheel) => {
  return fields.map((field) => {
    console.log("product :", product?.[field.name]);
    return (
      <FormInput
        key={field.name}
        {...field}
        value={product?.[field.name] ?? ""}
        onChange={handleChange}
        onWheel={
          field.type === "number" && handleWheel ? handleWheel : undefined
        }
      />
    );
  });
};

// component
const ProductUploadForm = ({
  openForm,
  setOpenForm,
  setSelectedProduct,
  selectedProduct,
  updateProduct,
  createProduct,
  handleSaveProduct,
}) => {
  const form = useProductForm({
    selectedProduct,
    updateProduct,
    createProduct,
    handleSaveProduct,
    setOpenForm,
  });

  const {
    product,
    handleChange,
    handleSubmit,
    handleWheel,
    handleFileChange,
    removeImage,
    loading,

    // specs
    specKey,
    specValue,
    setSpecKey,
    setSpecValue,
    addSpecification,
    editSpecification,
    deleteSpecification,
    editingSpec,

    // variants
    variant,
    setVariant,
    addVariant,
    editVariant,
    deleteVariant,
    editingVariantIndex,
  } = form;

  return (
    <div
      className={`fixed top-0 right-0 h-screen w-full sm:w-[90%] md:w-[600px] lg:w-[700px]
      bg-white shadow-2xl transform transition-transform duration-500 z-50
      ${openForm ? "translate-x-0" : "translate-x-full"}`}
    >
      {/* header */}
      <div className="flex justify-between items-center px-6 py-4 border-b bg-gray-50">
        <h2 className="text-lg font-semibold">
          {selectedProduct ? "Edit Product" : "Upload Product"}
        </h2>
        <FaTimes
          className="cursor-pointer"
          onClick={() => {
            setSelectedProduct(null);
            setOpenForm(false);
          }}
        />
      </div>

      <form
        onSubmit={handleSubmit}
        className="p-6 space-y-8 overflow-y-auto h-[calc(100%-70px)]"
      >
        {/* basic  */}
        <section className="space-y-4">
          <h3 className="text-lg font-semibold border-b pb-2">
            Basic Information
          </h3>

          {renderInputs(basicFields, product, handleChange)}

          <div className="grid sm:grid-cols-2 gap-5">
            {renderInputs(brandFields, product, handleChange)}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {renderInputs(priceFields, product, handleChange, handleWheel)}

            {/* Discount Type */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium">Discount Type</label>

              <select
                name="discountType"
                value={product?.discountType || ""}
                onChange={handleChange}
                className="border p-2 rounded-lg"
              >
                {/* ✅ Placeholder */}
                <option value="" disabled>
                  Select Discount Type
                </option>

                <option value="flat">Flat (₹)</option>
                <option value="percentage">Percentage (%)</option>
              </select>
            </div>
          </div>
        </section>

        {/* images */}
        <section className="space-y-4">
          <h3 className="text-lg font-semibold border-b pb-2">Images</h3>

          <input
            type="file"
            multiple
            className="w-full border p-2 rounded-lg"
            onChange={handleFileChange}
          />

          <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
            {product?.images?.map((img, i) => (
              <div key={i} className="relative">
                <img
                  src={img.uri}
                  className="h-24 w-full object-cover rounded-lg border"
                />
                <FaTrash
                  className="absolute top-1 right-1 cursor-pointer"
                  onClick={() => removeImage(i)}
                />
              </div>
            ))}
          </div>
        </section>

        {/* specifications*/}
        <section className="space-y-4">
          <h3 className="text-lg font-semibold border-b pb-2">
            Specifications
          </h3>

          <div className="grid sm:grid-cols-2 gap-4">
            <FormInput
              placeholder="Storage"
              value={specKey}
              onChange={(e) => setSpecKey(e.target.value)}
            />
            <FormInput
              placeholder="128gb"
              value={specValue}
              onChange={(e) => setSpecValue(e.target.value)}
            />
          </div>

          <FormButton
            type="button"
            variant="secondary"
            onClick={addSpecification}
          >
            <FaPlus /> {editingSpec ? "Update" : "Add"} Specification
          </FormButton>

          <div className="space-y-2">
            {Object.entries(product?.specifications || {}).map(
              ([key, value]) => (
                <div
                  key={key}
                  className="flex justify-between items-center border p-2 rounded-lg"
                >
                  <span>
                    {key} : {value}
                  </span>
                  <div className="flex gap-3">
                    <FaEdit onClick={() => editSpecification(key, value)} />
                    <FaTrash onClick={() => deleteSpecification(key)} />
                  </div>
                </div>
              ),
            )}
          </div>
        </section>

        {/* variants */}
        <section className="space-y-4">
          <h3 className="text-lg font-semibold border-b pb-2">Variants</h3>

          <div className="grid sm:grid-cols-3 gap-4">
            <FormInput
              label="Variant Name"
              value={variant.name}
              onChange={(e) => setVariant({ ...variant, name: e.target.value })}
            />
            <FormInput
              label="Extra Price"
              type="number"
              value={variant.additionalPrice}
              onWheel={handleWheel}
              onChange={(e) =>
                setVariant({
                  ...variant,
                  additionalPrice: e.target.value,
                })
              }
            />
            <FormInput
              label="Stock"
              type="number"
              value={variant.stock}
              onWheel={handleWheel}
              onChange={(e) =>
                setVariant({ ...variant, stock: e.target.value })
              }
            />
          </div>

          <FormButton type="button" variant="secondary" onClick={addVariant}>
            <FaPlus /> {editingVariantIndex !== null ? "Update" : "Add"} Variant
          </FormButton>

          <div className="space-y-2">
            {product?.variants?.map((v, i) => (
              <div
                key={i}
                className="flex justify-between items-center border p-2 rounded-lg"
              >
                <span>
                  {v.name} | ₹{v.additionalPrice} | Stock: {v.stock}
                </span>
                <div className="flex gap-3">
                  <FaEdit onClick={() => editVariant(i)} />
                  <FaTrash onClick={() => deleteVariant(i)} />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* flags */}
        <section className="flex gap-8">
          {["isFeatured", "isActive"].map((field) => (
            <label key={field} className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                name={field}
                checked={product?.[field] || false}
                onChange={handleChange}
              />
              {field === "isFeatured" ? "Featured" : "Active"}
            </label>
          ))}
        </section>

        {/* submit */}
        <FormButton loading={loading}>
          {selectedProduct ? "Update Product" : "Submit Product"}
        </FormButton>
      </form>
    </div>
  );
};

export default ProductUploadForm;
