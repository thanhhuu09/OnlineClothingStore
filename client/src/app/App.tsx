"use client";
import { usePathname } from "next/navigation";
import AdminLayout from "./AdminLayout";
import CustomerLayout from "./CustomerLayout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <>
      {pathname.startsWith("/dashboard") ? (
        <AdminLayout>{children}</AdminLayout>
      ) : (
        <CustomerLayout>{children}</CustomerLayout>
      )}
      <ToastContainer />
    </>
  );
}
