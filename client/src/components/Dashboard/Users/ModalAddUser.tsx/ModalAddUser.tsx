"use client";
interface ModalAddUserProps {
  onClose: () => void;
}

// Modal Add User Component
// Information: Modal to add a new user to the database
// name, email, password, role, status
export default function ModalAddUser({ onClose }: ModalAddUserProps) {
  // If click outside the modal, close the modal
  const handleOnClose = (event: any) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };
  return (
    <div
      onClick={handleOnClose}
      className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center"
    >
      <div className="dark:bg-slate-700 p-4 rounded-md w-2/4">
        <h2 className="text-2xl font-semibold mb-4">Thêm người dùng</h2>
        <form className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="name">Tên</label>
            <input
              id="name"
              type="text"
              className=" bg-slate-800  rounded-md px-4 py-2 focus:ring-1 focus:ring-indigo-500 ring-inset focus:outline-none"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              className="bg-slate-800  rounded-md px-4 py-2 focus:ring-1 focus:ring-indigo-500 ring-inset focus:outline-none"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="password">Mật khẩu</label>
            <input
              id="password"
              type="password"
              className="bg-slate-800  rounded-md px-4 py-2 focus:ring-1 focus:ring-indigo-500 ring-inset focus:outline-none"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="role">Vai trò</label>
            <select
              id="role"
              className="bg-slate-800  rounded-md px-4 py-2 focus:ring-1 focus:ring-indigo-500 ring-inset focus:outline-none"
            >
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>
          </div>
          <div className="flex flex-col gap-2 col-span-2">
            <label htmlFor="status">Trạng thái</label>
            <select
              id="status"
              className=" bg-slate-800  rounded-md px-4 py-2 focus:ring-1 focus:ring-indigo-500 ring-inset focus:outline-none"
            >
              <option value="active">Hoạt động</option>
              <option value="inactive">Không hoạt động</option>
            </select>
          </div>
          <button
            type="submit"
            className="bg-indigo-500 text-white rounded-md px-4 py-2 w-fit h-fit col-span-2 justify-self-end"
          >
            Thêm
          </button>
        </form>
      </div>
    </div>
  );
}
