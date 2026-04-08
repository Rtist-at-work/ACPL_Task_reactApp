import axios from "axios";

const API_URL = import.meta.env.API_URI;

// get products
export const getAllProducts = async (page, limit, category) => {
  try {
    const response = await axios.get(`${API_URL}`, {
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
    const response = await axios.post(API_URL, formData);
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
    const response = await axios.put(`${API_URL}${id}`, data);
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
    const response = await axios.delete(`${API_URL}${id}`);
    return response.data;
  } catch (error) {
    console.error(
      "Error deleting product:",
      error.response?.data || error.message
    );
    throw error;
  }
};