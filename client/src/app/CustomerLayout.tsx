"use client";
import ReduxProvider from "@/redux/provider";
import RouteChangeListener from "./route-change-listener";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";

// App Component
export default function CustomerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ReduxProvider>
      <RouteChangeListener />
      <Navbar />
      {children}
      <Footer />
    </ReduxProvider>
  );
}
