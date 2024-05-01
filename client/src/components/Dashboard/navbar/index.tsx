import Notification from "@/components/dashboard/navbar/Notification";
import Search from "@/components/dashboard/navbar/Search";
import { usePathname } from "next/navigation";
// Navbar for dashboard
export default function Navbar() {
  const pathname = usePathname();
  /// dashboard/products
  const path = pathname.split("/")[2];

  return (
    <div className="p-4 rounded-md flex justify-between items-center bg-white shadow-md">
      <h1 className="capitalize">{path}</h1>
      <div className="flex items-center gap-4">
        <Search />
        <Notification />
      </div>
    </div>
  );
}
