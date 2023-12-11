import { User, X, CaretDown } from "@phosphor-icons/react";
import Link from "next/link";
import Dropdown from "./Dropdown";
import { useEffect, useRef } from "react";

interface NavSidebarProps {
  isSidebarOpen: boolean;
  setSidebarOpen: (value: boolean) => void;
}

export default function NavSidebar({
  isSidebarOpen,
  setSidebarOpen,
}: NavSidebarProps) {
  const sidebarRef = useRef<HTMLDivElement | null>(null);

  return (
    <>
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-40 z-10"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
      <aside
        ref={sidebarRef}
        className={`${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:hidden fixed w-64 h-screen z-20 bg-white shadow-sm top-0 left-0 transform transition-transform duration-300 ease-in-out`}
      >
        <div className="flex justify-between border-b items-center p-4">
          <button
            className="p-2 hover:bg-gray-200 rounded"
            onClick={() => setSidebarOpen(!isSidebarOpen)}
          >
            <X size={26} />
          </button>
          <button className="p-2 hover:bg-gray-200 rounded">
            <Link href="/auth/login">
              <User size={26} />
            </Link>
          </button>
        </div>
        <div className="px-3 py-4">
          <ul className="space-y-4 font-medium text-primary-600 uppercase">
            <li className="font-bold underline">Tất cả sản phẩm</li>
            <li>Trang chủ</li>
            <li>Khuyến mãi</li>
            <li>Giới thiệu</li>
            <li>Sản phẩm mới</li>
            <li>
              <Dropdown
                label="Áo"
                items={["Áo thun", "Áo sơ mi", "Áo khoác"]}
              />
            </li>
            <li>
              <Dropdown label="Quần" items={["Quần jean", "Quần kaki"]} />
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
}
