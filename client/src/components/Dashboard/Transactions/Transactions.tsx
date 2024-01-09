"use client";
import { PencilSimpleLine } from "@phosphor-icons/react";
import Link from "next/link";

const userOrders = [
  //Status: Đang xử lý, Đang giao, Đã giao, Đã hủy
  {
    id: 1,
    name: "John Doe",
    status: "Đang giao",
    date: "12/12/2021",
    total: "200.000đ",
    path: "/orders/1",
  },
  {
    id: 2,
    name: "John Doe",
    status: "Đã giao",
    date: "12/12/2021",
    total: "200.000đ",
    path: "/orders/2",
  },
  {
    id: 3,
    name: "John Doe",
    status: "Đã hủy",
    date: "12/12/2021",
    total: "200.000đ",
    path: "/orders/3",
  },
  {
    id: 4,
    name: "John Doe",
    status: "Đang xử lý",
    date: "12/12/2021",
    total: "200.000đ",
    path: "/orders/4",
  },
];
export default function Transactions() {
  return (
    <div className="bg-slate-800 rounded-md p-4">
      <h3 className="text-xl font-semibold text-slate-400 mb-4">
        Đơn hàng mới
      </h3>
      {/* Columns: Tên, Trạng thái, Ngày đặt, Tổng tiền, Chi tiết */}
      <table className="w-full text-left">
        <thead className="text-base">
          <tr>
            <th>Tên</th>
            <th>Trạng thái</th>
            <th>Ngày đặt</th>
            <th>Tổng tiền</th>
            <th>Chi tiết</th>
          </tr>
        </thead>
        <tbody>
          {/* Dummy data */}
          {/* Status colors: Đang xử lý: màu xanh, Đang giao: màu vàng, Đã giao: màu xanh lá, Đã hủy: màu đỏ */}
          {userOrders.map((order) => (
            <tr className="hover:bg-slate-700 cursor-pointer" key={order.id}>
              <td className="py-4 rounded-l-md">{order.name}</td>
              <td className="py-4 ">
                <span
                  className={`${
                    order.status === "Đang xử lý"
                      ? "bg-sky-700 p-1 rounded-md text-sky-50 text-sm"
                      : order.status === "Đang giao"
                      ? "bg-neutral-700 p-1 rounded-md text-yellow-50 text-sm"
                      : order.status === "Đã giao"
                      ? "bg-green-700 p-1 rounded-md text-green-50 text-sm"
                      : "bg-red-700 p-1 rounded-md text-red-50 text-sm"
                  }`}
                >
                  {order.status}
                </span>
              </td>
              <td className="py-4">{order.date}</td>
              <td className="py-4">{order.total}</td>
              <td className="py-4 rounded-r-md">
                <Link href={order.path}>
                  <PencilSimpleLine size={24} />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
