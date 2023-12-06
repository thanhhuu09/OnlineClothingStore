import Image from "next/image";
export default function PaymentMethod() {
  return (
    <div className="w-[400px]">
      <h3 className="uppercase text-lg mb-4">Phương thức thanh toán</h3>
      {/* Payment method */}
      <ul className="border rounded-lg p-4 space-y-2 ">
        <li>
          <label className="flex items-center space-x-2 hover:bg-gray-100 p-2 rounded-lg h-10 cursor-pointer">
            <input
              type="radio"
              id="cash_payment"
              name="payment"
              value="cash_payment"
              className="text-blue-500 w-5 h-5"
            />
            <span>Thanh toán khi nhận hàng (COD)</span>
          </label>
        </li>
        <li>
          <label className="flex items-center space-x-2 hover:bg-gray-100 p-2 rounded-lg h-10 cursor-pointer">
            <input
              type="radio"
              name="payment"
              id="bank_transfer"
              value="bank_transfer"
              className="text-blue-500 w-5 h-5"
            />
            <span>Thanh toán qua</span>
            <div className="relative w-12 h-12 ml-2">
              <Image
                src="/images/vnpay.svg"
                alt="logo vnpay"
                fill
                style={{ objectFit: "contain" }}
              />
            </div>
          </label>
        </li>
      </ul>
      {/* Button place an order*/}
      <button className="w-full bg-primary-700 text-primary-100 p-2 rounded-lg active:bg-primary-950 hover:bg-primary-800 mt-4">
        Đặt hàng
      </button>
    </div>
  );
}
