import { useEffect, useState } from "react";
import SideNavigation from "./SideNavigation";
import { useDispatch } from "react-redux";
import { toggleCart } from "@/redux/features/cartSlice";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { ShoppingBag } from "@phosphor-icons/react";
import Link from "next/link";
import Image from "next/image";
import SubNavigation from "./SubNavigation";

function Navbar() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);

  useEffect(() => {
    setPrevScrollPos(window.scrollY);
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      const isScrollingDown = currentScrollPos > prevScrollPos;
      setIsNavbarVisible(!isScrollingDown || currentScrollPos < 100);
      setPrevScrollPos(currentScrollPos);
      console.log(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollPos]);

  const dispatch = useDispatch<AppDispatch>();
  const { totalQuantities } = useAppSelector((state) => state.cart);
  const handleToggleCart = () => {
    dispatch(toggleCart());
  };

  return (
    <div
      className={`sticky top-0 z-10 transition-transform duration-300
      ${isNavbarVisible ? "" : "-translate-y-full"}`}
    >
      <div className=" p-4 bg-white flex items-center justify-between">
        <div
          className="text-primary-700 text-base font-semibold border-b hidden lg:block
        border-primary-950 hover:text-primary-950"
        >
          <Link href="/products"> Tất cả sản phẩm </Link>
        </div>
        <div className="block lg:hidden">
          <SideNavigation
            isSidebarOpen={isSidebarOpen}
            setSidebarOpen={setSidebarOpen}
          />
        </div>

        {/* Common section */}
        <div className="relative w-[180px] h-[60px] lg:order-first">
          <Link href="/">
            <Image
              src="/logo.svg"
              style={{ objectFit: "cover" }}
              alt="logo"
              fill
            />
          </Link>
        </div>
        <div className="flex gap-5 items-center">
          <button
            className="relative flex justify-center"
            onClick={handleToggleCart}
          >
            <ShoppingBag size={24} color="black" />
            <p className="absolute bottom-3 left-3 bg-secondary-600 text-pr rounded-full p-3 text-xs text-secondary-50 w-5 h-5 flex justify-center items-center">
              {totalQuantities > 10 ? "10+" : totalQuantities}
            </p>
          </button>
          <button>
            <Link
              href="/auth/login"
              className="text-gray-900 hover:text-white border hover:bg-gray-900 
            focus:ring-2 focus:outline-none focus:ring-gray-300 
            font-medium rounded-lg text-sm px-4 py-2.5 text-center hidden lg:block"
            >
              Đăng nhập
            </Link>
          </button>
        </div>
      </div>
      {/* Sub navigation */}
      <div className="hidden lg:block bg-primary-50 p-4 border-primary-400 shadow-md">
        <SubNavigation />
      </div>
    </div>
  );
}

export default Navbar;
