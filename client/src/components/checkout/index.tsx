"use client";

import { useAppSelector } from "@/redux/store";
import React, { useEffect, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as yup from "yup";
import ProductTable from "./ProductTable";
import TotalPriceTable from "./TotalPriceTable";
import VoucherSection from "./VoucherSection";
interface OrderInfo {
  fullName: string;
  email: string;
  address: string;
  items: any[];
  shipFee: number;
  totalPrice: number;
  voucher: number;
  paymentMethod: string;
}
export default function Checkout() {
  const { cartItems } = useAppSelector((state: any) => state.cart);
  const [orderInfo, setOrderInfo] = useState<OrderInfo>({
    fullName: "",
    email: "",
    address: "",
    items: cartItems,
    shipFee: 30000,
    totalPrice: 0,
    voucher: 0,
    paymentMethod: "COD",
  });
  const validationSchema = yup.object().shape({
    fullName: yup.string().required("Họ và tên không được để trống"),
    email: yup
      .string()
      .email("Email không hợp lệ")
      .required("Email không được để trống"),
    address: yup.string().required("Vui lòng nhập địa chỉ giao hàng"),
    paymentMethod: yup.string().required("Required"),
  });
  const handleSubmit = async (values: OrderInfo) => {};
  return (
    <div className={`px-12 py-6 bg-primary-50`}>
      <h2 className="text-center text-3xl font-light mb-4">Giỏ hàng</h2>
      <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-3">
        <ProductTable />
        <div className="justify-self-end">
          <TotalPriceTable shipFee={orderInfo.shipFee} />
          <VoucherSection />
        </div>
      </div>
      {/* Form */}
      <Formik
        initialValues={orderInfo}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form className="bg-white p-6 rounded-lg shadow-md mt-4 grid md:grid-cols-2 gap-4">
          <h2 className="text-lg font-semibold mb-4 md:col-span-2">
            Thông tin khách hàng
          </h2>
          <div>
            {/* Full name */}
            <div className="flex flex-col mb-2">
              <label
                htmlFor="fullName"
                className="mb-1 font-semibold text-gray-700"
              >
                Họ và tên
              </label>
              <Field
                id="fullName"
                name="fullName"
                placeholder="Nhập họ và tên của bạn"
                className="border-gray-300 border focus:border-blue-500 focus:ring-blue-500 focus:outline-none text-gray-900 rounded-lg py-2 px-4"
              />
              <ErrorMessage
                name="fullName"
                component="span"
                className="text-red-500 text-xs italic font-light mt-1"
              />
            </div>
            {/* Email */}
            <div className="flex flex-col mb-2">
              <label
                htmlFor="email"
                className="mb-1 font-semibold text-gray-700"
              >
                Email
              </label>
              <Field
                id="email"
                name="email"
                placeholder="Nhập email của bạn"
                className="border-gray-300 border focus:border-blue-500 focus:ring-blue-500 focus:outline-none text-gray-900 rounded-lg py-2 px-4"
              />
              <ErrorMessage
                name="email"
                component="span"
                className="text-red-500 text-xs italic font-light mt-1"
              />
            </div>
          </div>
          <div>
            {/* Address */}
            <div className="flex flex-col mb-2">
              <label
                htmlFor="address"
                className="mb-1 font-semibold text-gray-700"
              >
                Địa chỉ
              </label>
              <Field
                id="address"
                name="address"
                placeholder="Nhập địa chỉ của bạn"
                className="border-gray-300 border focus:border-blue-500 focus:ring-blue-500 focus:outline-none text-gray-900 rounded-lg py-2 px-4"
              />
              <ErrorMessage
                name="address"
                component="span"
                className="text-red-500 text-xs italic font-light mt-1"
              />
            </div>
            {/* Payment Method */}
            <div className="flex flex-col mb-2">
              <label
                htmlFor="paymentMethod"
                className="mb-1 font-semibold text-gray-700"
              >
                Phương thức thanh toán
              </label>
              <Field
                as="select"
                id="paymentMethod"
                name="paymentMethod"
                className="border-gray-300 border focus:border-blue-500 focus:ring-blue-500 focus:outline-none text-gray-900 rounded-lg py-2 px-4"
              >
                <option value="COD">COD</option>
                <option value="VNPay">VNPay</option>
              </Field>
            </div>
            {/* Note is text area*/}
            <div className="flex flex-col mb-2">
              <label
                htmlFor="note"
                className="mb-1 font-semibold text-gray-700"
              >
                Ghi chú
              </label>
              <Field
                as="textarea"
                id="note"
                name="note"
                placeholder="Nhập ghi chú của bạn"
                className="border-gray-300 border focus:border-blue-500 focus:ring-blue-500 focus:outline-none text-gray-900 rounded-lg py-2 px-4"
              />
            </div>
          </div>
          {/* Submit button */}
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg mt-4 md:col-span-2"
          >
            Đặt hàng
          </button>
        </Form>
      </Formik>
    </div>
  );
}
