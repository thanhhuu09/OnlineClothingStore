// Order service
// Handle all api related to order
interface IOrder {
  userId: string;
  orderedItems: {
    product: string;
    quantity: number;
    size: string;
    color: string;
  }[];
  totalPrice: number;
  shippingAddress: string;
  paymentMethod: string;
  shippingFee: number;
  voucher: string;
  voucherDiscount: number;
}

const orderService = {
  createOrder: async (order: IOrder) => {
    const res = await fetch("/api/v1/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
    });
    const data = await res.json();
    console.log("data: ", data);
    return data;
  },
};

export default orderService;
