"use client";
import { List, ShoppingBag } from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";
import NavSidebar from "./NavSidebar";
import { useState } from "react";
import Submenu from "./Submenu";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { toggleCart } from "@/redux/features/cartSlice";
import { User } from "@phosphor-icons/react/dist/ssr";

export default function Navbar() {
  const [isSidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const { totalQuantities } = useAppSelector((state) => state.cart);
  const currentUser = useAppSelector(
    (state) => state.auth.login.currentUser?.userInfo
  );

  const [openSubmenu, setOpenSubmenu] = useState<string>("");
  const [userDropdownOpen, setUserDropdownOpen] = useState<boolean>(false);
  const handleMouseOver = (label: string) => {
    setOpenSubmenu(label);
  };
  const handleToggleCart = () => {
    dispatch(toggleCart());
  };
  return (
    <nav className="bg-white sticky w-full z-20 top-0 left-0 border-b-slate-600">
      <div className="flex justify-between items-center px-12 py-2">
        <button className="md:hidden" onClick={() => setSidebarOpen(true)}>
          <List size={24} color="black" />
        </button>

        <div className="relative w-[200px] h-[60px]">
          <Link href="/">
            <Image
              src="/logo.svg"
              style={{ objectFit: "cover" }}
              alt="logo"
              fill
            />
          </Link>
        </div>
        <ul className="hidden md:flex gap-4 items-center text-primary-600">
          <Link href="/products">
            <li className="text-primary-700 text-base font-semibold border-b border-primary-950 hover:text-primary-950 ">
              Tất cả sản phẩm
            </li>
          </Link>
        </ul>
        {/* NavSidebar */}
        <NavSidebar
          isSidebarOpen={isSidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />
        <ul className="flex gap-4 items-center ">
          <li className="cursor-pointer">
            <form className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"></form>
          </li>
          <li className="cursor-pointer">
            <button
              className="relative flex justify-center"
              onClick={handleToggleCart}
            >
              <ShoppingBag size={24} color="black" />
              <p className="absolute bottom-3 left-3 bg-secondary-600 text-pr rounded-full p-3 text-xs text-secondary-50 w-5 h-5 flex justify-center items-center">
                {totalQuantities > 10 ? "10+" : totalQuantities}
              </p>
            </button>
          </li>
          <li className="hidden md:block">
            {currentUser ? (
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center justify-center relative"
              >
                <User size={24} color="black" />
                {/* If user click on this button, show a dropdown menu */}
                {userDropdownOpen && (
                  <>
                    <div className="fixed inset-0 z-10 cursor-default"></div>
                    <ul className="absolute z-10 top-12 right-0 bg-white border border-gray-200 rounded-lg shadow-lg w-48 py-2">
                      <li className="hover:bg-gray-100 px-4 py-2">
                        <Link href="/profile">Thông tin cá nhân</Link>
                      </li>
                      <li className="hover:bg-gray-100 px-4 py-2">
                        <Link href="/orders">Đơn hàng</Link>
                      </li>
                      <li className="hover:bg-gray-100 px-4 py-2">
                        <Link href="/auth/logout">Đăng xuất</Link>
                      </li>
                    </ul>
                  </>
                )}
              </button>
            ) : (
              <Link
                href="/auth/login"
                className="text-gray-900 hover:text-white border hover:bg-gray-900 focus:ring-2 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center transition-colors duration-300"
              >
                Đăng nhập
              </Link>
            )}
          </li>
        </ul>
      </div>
      {/* Submenu */}
      <div className="hidden md:block relative bg-primary-50 p-4 border-b border-primary-400 ">
        <ul className="flex justify-center gap-6 text-sm font-semibold flex-wrap">
          <li className="uppercase">Trang chủ</li>
          <li className="uppercase">Mua nhiều giảm sâu</li>
          <li className="uppercase">Giới thiệu</li>
          <li className="uppercase">Sản phẩm mới</li>
          <li className="uppercase">
            <Submenu
              label="Áo"
              items={["Áo thun", "Áo sơ mi", "Áo khoác"]}
              isOpen={openSubmenu === "Áo"}
              closeSubmenu={() => setOpenSubmenu("")}
              onMouseOver={() => handleMouseOver("Áo")}
            />
          </li>
          <li className="uppercase">
            <Submenu
              label="Quần"
              items={["Quần jean", "Quần kaki"]}
              isOpen={openSubmenu === "Quần"}
              closeSubmenu={() => setOpenSubmenu("")}
              onMouseOver={() => handleMouseOver("Quần")}
            />
          </li>
          <li className="uppercase">
            <Submenu
              label="Phụ kiện"
              items={["Ví", "Mũ", "Tất"]}
              isOpen={openSubmenu === "Phụ kiện"}
              closeSubmenu={() => setOpenSubmenu("")}
              onMouseOver={() => handleMouseOver("Phụ kiện")}
            />
          </li>
          <li className="uppercase">Bộ sưu tập</li>
        </ul>
      </div>
    </nav>
  );
}
