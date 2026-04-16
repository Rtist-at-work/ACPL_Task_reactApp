import FormButton from "../FormButton";
const CategoryFilter = ({
  categories,
  selectedCategory,
  setSelectedCategory,
  setPage,
}) => {
  const handleSelect = (cat) => {
    setSelectedCategory(cat);
    setPage(1);
  };

  return (
    <div className="mb-6">
      <div className="flex gap-2 sm:flex-wrap overflow-x-auto items-center">
        <FormButton
          type="button"
          variant={selectedCategory === "" ? "primary" : "secondary"}
          onClick={() => handleSelect("")}
        >
          All
        </FormButton>

        {categories.map((cat, i) => (
          <FormButton
            key={i}
            type="button"
            variant={selectedCategory === cat ? "primary" : "secondary"}
            onClick={() => handleSelect(cat)}
          >
            {cat}
          </FormButton>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter