import Navbar from "@/components/dashboard/navbar";
import Sidebar from "@/components/dashboard/sidebar";
import ReduxProvider from "@/redux/provider";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ReduxProvider>
      <section className="flex flex-row max-w-screen-2xl bg-slate-50">
        <aside className="basis-1/4">
          <Sidebar />
        </aside>
        <div className="basis-full p-4 flex flex-col gap-4">
          <nav>
            <Navbar />
          </nav>
          <main>{children}</main>
        </div>
      </section>
    </ReduxProvider>
  );
}
