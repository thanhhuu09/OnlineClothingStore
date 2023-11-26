// Product API calls
const API_URL = "https://fakestoreapi.com/products";

// Get all products
const getProducts = async () => {
  try {
    const res = await fetch(`${API_URL}`);
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

// Get product by id
const getProductById = async (id) => {
  try {
    const res = await fetch(`${API_URL}/${id}`);
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

// Get all categories
const getCategories = async () => {
  try {
    const res = await fetch(`${API_URL}/categories`);
    return res.json();
  } catch (error) {
    console.log(error);
  }
};
export { getProducts, getProductById, getCategories };
