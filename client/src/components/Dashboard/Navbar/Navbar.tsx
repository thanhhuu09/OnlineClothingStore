import Notification from "@/components/Dashboard/Navbar/Notification/Notification";
import Search from "@/components/Dashboard/Navbar/Search/Search";
import { usePathname } from "next/navigation";

// Navbar for dashboard
export default function Navbar() {
  const pathname = usePathname();
  console.log(pathname);

  return (
    <div className="bg-slate-800 p-4 rounded-md flex justify-between items-center">
      <h1 className="capitalize">
        {
          pathname.split("/").pop() // Get the last part of the pathname
        }
      </h1>
      <div className="flex items-center gap-4">
        <Search placeholder="Tìm kiếm" />
        <Notification />
      </div>
    </div>
  );
}
