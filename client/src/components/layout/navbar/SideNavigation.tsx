import { User, X, CaretDown, ListDashes } from "@phosphor-icons/react";
import Link from "next/link";
import Dropdown from "./Dropdown";
import { useEffect, useRef } from "react";
import Image from "next/image";

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
      {/* Hamburger menu */}
      <div>
        <ListDashes size={26} />
      </div>
    </div>
  );
}

export default SideNavigation;
