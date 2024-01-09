"use client";
import { usePathname } from "next/navigation";
import AdminLayout from "./AdminLayout";
import CustomerLayout from "./CustomerLayout";

export default function App({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (pathname.startsWith("/dashboard")) {
    return <AdminLayout>{children}</AdminLayout>;
  } else {
    return <CustomerLayout>{children}</CustomerLayout>;
  }
}
