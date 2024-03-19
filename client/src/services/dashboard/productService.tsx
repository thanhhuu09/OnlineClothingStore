export const fetchProducts = async (page: number, limit: number) => {
  const res = await fetch(`/api/v1/products?limit=${limit}&page=${page}`);
  const products = await res.json();
  return products.data;
};

export const fetchProductById = async (id: string) => {
  const res = await fetch(`/api/v1/products/${id}`);
  const product = await res.json();
  return product.data;
};

// Delete product
export const deleteProduct = async (id: string) => {
  const res = await fetch(`/api/v1/products/${id}`, {
    method: "DELETE",
  });
  if (res.ok) {
    return true;
  }
  return false;
};

// Add Product
export const addProduct = async (product: any) => {
  // USE FORM DATA because of data was sent to server with file
  const formData = new FormData();
  const data = {
    name: product.productName,
    price: product.price,
    quantity: product.quantity,
    category: product.category,
    color: product.color,
    size: product.size,
    isFeatured: product.isFeatured,
    description: product.description,
  };
  // Append data to form data.
  formData.append("data", JSON.stringify(data));
  // Append images to form data
  for (let i = 0; i < product.imagesProduct.length; i++) {
    formData.append("images", product.imagesProduct[i]);
  }

  try {
    const res = await fetch("/api/v1/products", {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
