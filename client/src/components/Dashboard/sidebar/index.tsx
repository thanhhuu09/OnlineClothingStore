// Sidebar for dashboard
import Image from "next/image";
import MenuLink from "./MenuLink";
import {
  CurrencyCircleDollar,
  ShoppingBagOpen,
  SignOut,
  SquaresFour,
  Tag,
  User,
  UserList,
} from "@phosphor-icons/react";
const menuItems = [
  {
    title: "Pages",
    list: [
      { title: "Dashboard", icon: <SquaresFour />, link: "/dashboard" },
      { title: "Users", icon: <UserList />, link: "/dashboard/users" },
      {
        title: "Products",
        icon: <ShoppingBagOpen />,
        link: "/dashboard/products",
      },
      {
        title: "Orders",
        icon: <CurrencyCircleDollar />,
        link: "/dashboard/orders",
      },
      {
        title: "Voucher",
        icon: <Tag />,
        link: "/dashboard/voucher",
      },
    ],
  },
  {
    title: "Analytics",
    list: [
      {
        title: "Revenue",
        icon: <CurrencyCircleDollar />,
        link: "/dashboard/revenue",
      },
      {
        title: "Teams",
        icon: <UserList />,
        link: "/dashboard/teams",
      },
    ],
  },
  {
    title: "Settings",
    list: [
      { title: "Profile", icon: <User />, link: "/dashboard/profile" },
      {
        title: "Logout",
        icon: <SignOut />,
        link: "/dashboard/logout",
      },
    ],
  },
];
export default function Sidebar() {
  return (
    <div className="sticky top-0 right-0 p-4 bg-white shadow-md h-screen w-72">
      {/* Avatar Section*/}
      <div className="flex items-center ">
        <Image
          className="rounded-full"
          src="/images/banner_header.png"
          width={50}
          height={50}
          alt="avatar"
        />
        {/* Position and name section */}
        <div className="ml-2">
          <h1 className="font-medium">Tommy Thach</h1>
          <p className="text-sm">Quản trị viên</p>
        </div>
      </div>
      {/* Menu Section */}
      <ul>
        {menuItems.map((cat) => (
          <li key={cat.title} className="my-4">
            {/* Category title */}
            <span className="text-primary-600 font-semibold">{cat.title}</span>
            {/*  Get list of menu items */}
            {cat.list.map((item) => (
              <MenuLink
                key={item.title}
                path={item.link}
                icon={item.icon}
                title={item.title}
              />
            ))}
          </li>
        ))}
      </ul>
    </div>
  );
}
