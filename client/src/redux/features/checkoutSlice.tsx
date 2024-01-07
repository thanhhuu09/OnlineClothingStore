// Checkout Slice
// {
//     "userId": "658051d78d33f65131b862c6",
//     "orderedItems": [
//       {
//         "product": "60d6c47e4094a45b0468e3c6",
//         "quantity": 2,
//         "size": "M",
//         "color": "Red"
//       },
//       {
//         "product": "60d6c47e4094a45b0468e3c7",
//         "quantity": 1,
//         "size": "XL",
//         "color": "Blue"
//       }
//     ],
//     "totalPrice": "133000",
//     "shippingAddress": "123 Main St, Anytown, USA",
//     "paymentMethod": "VNPay",
//     "shippingFee": 10,
//     "voucher": "60d6c47e4094a45b0468e3c8",
//     "voucherDiscount": 5
//   }

const initialState = {
  customerInfo: {
    name: "",
    email: "",
    phone: "",
    address: "",
    note: "",
    province: "",
    district: "",
  },
  paymentMethod: "COD",
  voucher: "",
  voucherDiscount: 0,
  shippingFee: 0,
  orderedItems: [],
  totalPrice: 0,
  userId: "",
};
