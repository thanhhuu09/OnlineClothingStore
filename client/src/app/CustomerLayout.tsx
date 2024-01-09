"use client";
import ReduxProvider from "@/redux/provider";
import { PersistGate } from "redux-persist/lib/integration/react";
import RouteChangeListener from "./route-change-listener";
import { persistor } from "@/redux/store";
import Navbar from "@/components/navbar/Navbar";
import Cart from "@/components/cart/Cart";
import Footer from "@/components/Footer";

// App Component
export default function CustomerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ReduxProvider>
      <PersistGate loading={null} persistor={persistor}>
        <RouteChangeListener />
        <Navbar />
        <Cart />
        {children}
        <Footer />
      </PersistGate>
    </ReduxProvider>
  );
}
