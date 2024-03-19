// Users Page:
// - Includes a list of all users,
// - Search bar to search for users by name or email.
// - And a button to add a new user.
// Table columns: Tên, Email, Ngày tạo, Vai trò, Trạng thái, Chi tiết: Xem, Xóa
// Limit the number of users to 10 per page.
"use client";
import Search from "@/components/Dashboard/Navbar/Search/Search";
import ModalAddUser from "@/components/Dashboard/Users/ModalAddUser.tsx/ModalAddUser";
import { useState } from "react";
const users = [
  {
    id: 1,
    name: "John Doe",
    email: "john@gmail.com",
    createdAt: "12/12/2021",
    role: "admin",
    status: "đã xác thực",
  },
  {
    id: 2,
    name: "John Doe",
    email: "tommy@gmail.com",
    createdAt: "12/12/2021",
    role: "user",
    status: "chưa xác thực",
  },
];
// - Each user has a button to edit (View) or delete the user.
export default function Page() {
  const [isModelOpen, setIsModelOpen] = useState(false);

  // Handle close modal from child component
  const handleCloseModal = () => {
    setIsModelOpen(false);
  };

  return (
    <div className="bg-slate-800 p-4 rounded-md ">
      <div className="flex justify-between mb-4">
        <Search placeholder="Tìm kiếm người dùng" />
        <button
          onClick={() => setIsModelOpen(true)}
          className="bg-indigo-500 text-white rounded-md px-4 py-2"
        >
          Thêm người dùng
        </button>
      </div>
      {/* Modal Add user */}
      {isModelOpen && <ModalAddUser onClose={handleCloseModal} />}
      {/* Table section */}
      <table className="w-full text-left">
        <thead>
          <tr>
            <th>Tên</th>
            <th>Email</th>
            <th>Ngày tạo</th>
            <th>Vai trò</th>
            <th>Trạng thái</th>
            <th>Chi tiết</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className="py-4">{user.name}</td>
              <td className="py-4">{user.email}</td>
              <td className="py-4">{user.createdAt}</td>
              <td className="py-4">{user.role}</td>
              <td className="py-4">{user.status}</td>
              <td className="py-4">
                <button className="bg-teal-700 text-teal-50 rounded-md px-4 py-2">
                  Xem
                </button>
                <button className="bg-red-500 text-white rounded-md px-4 py-2 ml-2">
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Pagination */}
      <div className="flex justify-end mt-4 gap-4">
        <button className="bg-teal-700 text-teal-50 rounded-md px-4 py-2">
          Trang trước
        </button>
        <button className="bg-teal-700 text-teal-50 rounded-md px-4 py-2">
          Trang sau
        </button>
      </div>
    </div>
  );
}
