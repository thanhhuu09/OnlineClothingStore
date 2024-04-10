// Cart Service
const cartService = {
  getCart: async () => {
    const res = await fetch("/api/v1/cart");
    const data = await res.json();
    return data;
  },
};
