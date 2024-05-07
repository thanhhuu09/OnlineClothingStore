// Api Request Interface
export interface UpdateProductRequest {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  productImages: File[];
  variants: [
    {
      color: string;
      sizes: [
        {
          size: string;
          price: number;
          stock: number;
          sku: string;
        }
      ];
    }
  ];
}
