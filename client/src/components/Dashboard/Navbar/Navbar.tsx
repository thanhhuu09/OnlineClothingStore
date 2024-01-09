import Notification from "@/components/Dashboard/Navbar/Notification/Notification";
import Search from "@/components/Dashboard/Navbar/Search/Search";

// Navbar for dashboard
export default function Navbar() {
  return (
    <div className="bg-slate-800 p-4 rounded-md flex justify-between items-center">
      <h1>Dashboard</h1>
      <div className="flex items-center gap-4">
        <Search />
        <Notification />
      </div>
    </div>
  );
}
