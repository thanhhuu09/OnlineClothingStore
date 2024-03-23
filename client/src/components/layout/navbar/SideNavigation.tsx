import { ListDashes, User, X } from "@phosphor-icons/react";
import Dropdown from "./Dropdown";
import Link from "next/link";

interface SideNavigationProps {
  isSidebarOpen: boolean;
  setSidebarOpen: (isOpen: boolean) => void;
}

function SideNavigation({
  isSidebarOpen,
  setSidebarOpen,
}: SideNavigationProps) {
  return (
    <div>
      <ListDashes size={26} onClick={() => setSidebarOpen(!isSidebarOpen)} />
      {isSidebarOpen && (
        <div
          className="fixed inset-0 opacity-40 bg-black z-10"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
      <div
        className={`${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:hidden fixed w-64 h-screen z-20
        bg-white shadow-sm top-0 left-0 duration-300 ease-in-out`}
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
      </div>
    </div>
  );
}

export default SideNavigation;
