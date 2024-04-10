"use client";
import { toggleCart, deleteFromCart } from "@/redux/features/cartSlice";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { X, ShoppingBag } from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";
import { useDispatch } from "react-redux";

function CartButton() {
  const dispatch = useDispatch<AppDispatch>();
  const { showCart, cartItems, totalPrice } = useAppSelector(
    (state) => state.cart
  );
  const { totalQuantities } = useAppSelector((state) => state.cart);
  const handleToggleCart = () => {
    dispatch(toggleCart());
  };
  const handleRemoveItem = (id: number) => {
    dispatch(deleteFromCart(id));
  };
  return (
    <div>
      <button
        className="relative flex justify-center"
        onClick={handleToggleCart}
      >
        <ShoppingBag size={24} color="black" />
        <p className="absolute bottom-3 left-3 bg-secondary-600 text-pr rounded-full p-3 text-xs text-secondary-50 w-5 h-5 flex justify-center items-center">
          {totalQuantities > 10 ? "10+" : totalQuantities}
        </p>
      </button>

      {showCart && (
        <div
          className="fixed inset-0 bg-black opacity-40 z-20"
          onClick={handleToggleCart}
        ></div>
      )}

      <aside
        className={`${
          showCart ? "translate-x-0" : "translate-x-full"
        } fixed top-0 right-0 z-20 bg-primary-50 w-80 h-screen shadow-lg transform transition-transform duration-300 ease-in-out`}
      >
        <div>
          {/* Close sidebar button */}
          <div className="justify-start items-center flex p-3 w-full">
            <button
              className="border border-primary-400 bg-secondary-500 hover:bg-secondary-600 active:bg-secondary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-opacity-50 rounded-lg text-slate-50 font-semibold px-3 py-1 shadow-lg transition duration-200 ease-in-out transform hover:scale-105"
              onClick={handleToggleCart}
            >
              <X size={24} />
            </button>
            <p className="text-lg font-medium ml-3">Giỏ hàng</p>
          </div>
        </div>
        {/* Items */}
        <div>
          {cartItems.length === 0 ? (
            // Empty cart
            <div className="flex flex-col justify-center items-center gap-4 px-3 py-2 h-screen">
              <ShoppingBag size={64} className="text-primary-700" />
              <p className="text-lg font-medium">Giỏ hàng trống</p>
            </div>
          ) : (
            // Cart items
            <div>
              <div className="overflow-y-auto max-h-[calc(100vh-195px)] no-scrollbar">
                {cartItems.map((item, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-center gap-4 px-3 py-2 border-b border-primary-400 border-solid">
                      {/* Image section */}
                      <div className="relative w-[50px] h-[50px]">
                        <Image
                          src={item.image}
                          fill
                          alt="product image"
                          style={{ objectFit: "contain" }}
                        />
                      </div>
                      {/* Info section */}
                      <div>
                        <p className="text-base font-medium truncate w-[200px]">
                          {item.title}
                        </p>
                        <p className="text-sm font-normal">Màu: Đen</p>
                        <p className="text-sm font-normal">Size: M</p>
                        <p className="text-sm font-normal">
                          Giá: {item.price}đ
                        </p>
                        <p className="text-sm font-normal">
                          Số lượng: {item.quantity}
                        </p>
                      </div>
                      {/* Remove item */}
                      <div className="border bg-white border-primary-400 border-solid p-1 rounded flex justify-center items-center hover:bg-primary-50 active:bg-primary-100 ">
                        <button
                          onClick={() => handleRemoveItem(item.id)}
                          className="transition duration-200 ease-in-out transform hover:scale-105"
                        >
                          <X size={24} className="text-primary-700" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="">
                {/* Total price section */}
                <div className="flex justify-between items-center px-3 py-2 border-b border-primary-400 border-solid">
                  <p className="text-base font-medium">Tổng tiền</p>
                  <p className="text-base font-medium">
                    {totalPrice.toFixed(2)}đ
                  </p>
                </div>
                {/* Checkout section */}
                <div className="flex justify-center items-center px-3 py-2">
                  <Link href="/checkout">
                    <button className="border border-primary-400 bg-secondary-500 hover:bg-secondary-600 active:bg-secondary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-opacity-50 rounded-lg text-slate-50 font-semibold px-8 py-2 shadow-lg transition duration-200 ease-in-out transform hover:scale-105">
                      Thanh toán
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </aside>
    </div>
  );
}
export default CartButton;
