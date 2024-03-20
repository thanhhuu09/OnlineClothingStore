import { useState } from "react";
import SideNavigation from "./SideNavigation";
import TopNavigation from "./TopNavigation";
import { useDispatch } from "react-redux";
import { toggleCart } from "@/redux/features/cartSlice";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { ShoppingBag } from "@phosphor-icons/react";
import Link from "next/link";
import Image from "next/image";

function Navbar() {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const dispatch = useDispatch<AppDispatch>();
  const { totalQuantities } = useAppSelector((state) => state.cart);
  const handleToggleCart = () => {
    dispatch(toggleCart());
  };

  return (
    <div className="sticky top-0 z-50 p-4 bg-white shadow-md flex items-center justify-between">
      <div className="hidden lg:block ">
        <TopNavigation />
      </div>
      <div className="block lg:hidden">
        <SideNavigation
          isSidebarOpen={isSidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />
      </div>
      {/* Common section */}
      <div>
        <div className="relative w-[180px] h-[60px]">
          <Link href="/">
            <Image
              src="/logo.svg"
              style={{ objectFit: "cover" }}
              alt="logo"
              fill
            />
          </Link>
        </div>
      </div>
      <div className="cursor-pointer ml-auto">
        <button
          className="relative flex justify-center"
          onClick={handleToggleCart}
        >
          <ShoppingBag size={24} color="black" />
          <p className="absolute bottom-3 left-3 bg-secondary-600 text-pr rounded-full p-3 text-xs text-secondary-50 w-5 h-5 flex justify-center items-center">
            {totalQuantities > 10 ? "10+" : totalQuantities}
          </p>
        </button>
      </div>
    </div>
  );
}

export default Navbar;
