"use client";
import ProductTable from "@/components/checkout/ProductTable";
import TotalPriceTable from "@/components/checkout/TotalPriceTable";
import CustomerInfo from "@/components/checkout/CustomerInfo";
import PaymentMethod from "@/components/checkout/PaymentMethod";

// CHECKOUT PAGE
export default function Page() {
  return (
    <div className="px-12 py-6 bg-primary-50">
      <h1 className="text-center text-3xl font-light mb-4">GIỎ HÀNG</h1>
      {/* Product Info */}
      <div className="grid grid-cols-3 gap-3 justify-between ">
        <ProductTable />
        <TotalPriceTable />
      </div>
      {/* Information section of customer */}
      <div className="grid grid-cols-2 gap-9 px-12 py-6 mt-9 bg-white shadow-md">
        <CustomerInfo />
        <PaymentMethod />
      </div>
    </div>
  );
}
