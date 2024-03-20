import React from "react";
import Image from "next/image";
import Link from "next/link";
// Redux import

function TopNavigation() {
  return (
    <div>
      <ul className="text-primary-600">
        <Link href="/products">
          <li className="text-primary-700 text-base font-semibold border-b border-primary-950 hover:text-primary-950 ">
            Tất cả sản phẩm
          </li>
        </Link>
      </ul>
    </div>
  );
}

export default TopNavigation;
