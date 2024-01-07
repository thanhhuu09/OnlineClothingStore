"use client";
import ProductTable from "@/components/Checkout/ProductTable";
import TotalPriceTable from "@/components/Checkout/TotalPriceTable";
import CustomerInfo from "@/components/Checkout/CustomerInfo";
import PaymentMethod from "@/components/Checkout/PaymentMethod";
import { useAppSelector } from "@/redux/store";
import VoucherSection from "@/components/Checkout/VoucherSection";

// CHECKOUT PAGE
export default function Page() {
  const { cartItems } = useAppSelector((state) => state.cart);

  const handleSubmitOrder = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(e);
  };
  return (
    <div
      className={`px-12 py-6 bg-primary-50 ${
        cartItems.length === 0 && "h-screen"
      }`}
    >
      <h1 className="text-center text-3xl font-light mb-4">GIỎ HÀNG</h1>
      {/* Cart is empty */}
      {cartItems.length === 0 && <p className="text-center">Giỏ hàng trống</p>}
      {cartItems.length !== 0 && (
        <>
          <form onSubmit={handleSubmitOrder} noValidate>
            <div className="grid grid-cols-3 gap-3 ">
              <ProductTable />
              <div className="justify-self-end">
                <TotalPriceTable />
              </div>
            </div>
            <div className="flex justify-end">
              <VoucherSection />
            </div>
            {/* Information section of customer */}
            <div className="grid grid-cols-2 gap-9 px-12 py-6 mt-9 bg-white shadow-md">
              <CustomerInfo onSubmit={handleSubmitOrder} />
              <PaymentMethod />
            </div>
            <button
              type="submit"
              className="w-full bg-primary-700 text-primary-100 p-2 rounded-lg active:bg-primary-950 hover:bg-primary-800 mt-4"
            >
              Đặt hàng
            </button>
          </form>
        </>
      )}
    </div>
  );
}
