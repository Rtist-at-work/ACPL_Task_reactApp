import Header from "./components/Header";
import { useState } from "react";
import ProductList from "./pages/ProductList";
import { Toaster } from "react-hot-toast";

const App = () => {
  // upload form toggle
  const [openForm, setOpenForm] = useState(false);

  // upload form toggle function
  const handleToggle = () => {
    setOpenForm(() => !openForm);
  };

  return (
    <div className="h-screen w-screen">
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          style: {
            background: "#333",
            color: "#fff",
            borderRadius: "8px",
            padding: "12px 16px",
          },
          success: {
            style: { background: "#16a34a" },
          },
          error: {
            style: { background: "#dc2626" },
          },
        }}
      />
      <Header handleToggle={handleToggle} />
      <ProductList openForm={openForm} setOpenForm={setOpenForm} />
    </div>
  );
};

export default App;
