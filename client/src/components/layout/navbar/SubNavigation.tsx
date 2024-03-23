import { useState } from "react";
import Submenu from "./Submenu";

function SubNavigation() {
  const [openSubmenu, setOpenSubmenu] = useState("");
  const handleMouseOver = (label: string) => {
    setOpenSubmenu(label);
  };
  return (
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
  );
}

export default SubNavigation;
