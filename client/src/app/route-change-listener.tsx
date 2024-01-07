"use client";
import { toggleCart } from "@/redux/features/cartSlice";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export default function RouteChangeListener() {
  const pathname = usePathname(); // Get current path
  const dispatch = useDispatch<AppDispatch>();
  const { showCart } = useAppSelector((state) => state.cart);
  // Toggle cart when route changes
  useEffect(() => {
    if (showCart) {
      dispatch(toggleCart());
    }
  }, [pathname]);
  return <></>;
}
