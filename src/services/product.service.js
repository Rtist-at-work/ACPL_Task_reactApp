import axios from "axios";

const VITE_API_URI = import.meta.env.VITE_API_URI;

// get products
export const getAllProducts = async (page, limit, category) => {
  try {
    const response = await axios.get(`${VITE_API_URI}`, {
      params: { page, limit, category },
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching products:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// create product
export const createProduct = async (formData) => {
  try {
    const response = await axios.post(VITE_API_URI, formData);
    return response.data;
  } catch (error) {
    console.error(
      "Error creating product:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// update product
export const updateProduct = async (id, data) => {
  try {
    const response = await axios.put(`${VITE_API_URI}${id}`, data);
    return response.data;
  } catch (error) {
    console.error(
      "Error updating product:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// delete product
export const deleteProduct = async (id) => {
  try {
    const response = await axios.delete(`${VITE_API_URI}${id}`);
    return response.data;
  } catch (error) {
    console.error(
      "Error deleting product:",
      error.response?.data || error.message
    );
    throw error;
  }
};