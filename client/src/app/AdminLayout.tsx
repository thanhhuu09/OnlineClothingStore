import Navbar from "@/components/Dashboard/Navbar/Navbar";
import Sidebar from "@/components/Dashboard/Sidebar/Sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-row dark:bg-slate-900 dark:text-white max-w-screen-2xl">
      <aside className="basis-1/4 ">
        <Sidebar />
      </aside>
      <div className="basis-full p-4 flex flex-col gap-4">
        <nav>
          <Navbar />
        </nav>
        <main>{children}</main>
      </div>
    </section>
  );
}
