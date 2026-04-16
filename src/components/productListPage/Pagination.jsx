import FormButton from "../FormButton";

const Pagination = ({ page, totalPages, setPage }) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center gap-2 mt-6 flex-wrap">
      {page > 1 && (
        <FormButton variant="secondary" onClick={() => setPage(page - 1)}>
          Prev
        </FormButton>
      )}

      {[...Array(totalPages)].map((_, i) => (
        <FormButton
          key={i}
          variant={page === i + 1 ? "primary" : "secondary"}
          onClick={() => setPage(i + 1)}
        >
          {i + 1}
        </FormButton>
      ))}

      {page < totalPages && (
        <FormButton variant="secondary" onClick={() => setPage(page + 1)}>
          Next
        </FormButton>
      )}
    </div>
  );
};

export default Pagination;