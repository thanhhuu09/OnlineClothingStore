"use client";
import { useAppSelector } from "@/redux/store";
import { Field, Form, Formik } from "formik";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import LoadingSpinner from "../loadingSpinner";

export default function Profile() {
  const { currentUser, isFetching } = useAppSelector(
    (state) => state.auth.login
  );
  if (!currentUser || isFetching)
    return (
      <div className="w-full min-h-screen flex items-center">
        <LoadingSpinner text="Loading..." />
      </div>
    );
  // Get initial values from redux store
  const initialValues = {
    firstName: currentUser?.firstName,
    lastName: currentUser?.lastName,
    email: currentUser?.email,
  };
  return (
    <main className="w-full min-h-screen py-1 md:w-2/3 lg:w-3/4">
      <title>Public Profile</title>
      <div className="p-2 md:p-4">
        <div className="w-full px-6 pb-8 mt-8 sm:max-w-xl sm:rounded-lg">
          <h2 className="pl-6 text-2xl font-bold sm:text-xl">Public Profile</h2>

          <div className="grid max-w-2xl mx-auto mt-8">
            {/* Profile picture and buttons */}
            <div className="flex flex-col items-center space-y-5 sm:flex-row sm:space-y-0">
              {/* Profile picture */}
              <div className="relative w-40 h-40">
                <Image
                  className="object-cover w-full h-full p-1 rounded-full ring-2 ring-indigo-300 dark:ring-indigo-500"
                  src="/images/four.jpg"
                  alt="profile"
                  width={500}
                  height={500}
                />
              </div>
              <div className="flex flex-col space-y-5 sm:ml-8">
                <button
                  type="button"
                  className="py-3.5 px-7 text-base font-medium text-indigo-100 focus:outline-none 
                  bg-[#202142] rounded-lg border border-indigo-200 hover:bg-indigo-900 
                  focus:z-10 focus:ring-4 focus:ring-indigo-200"
                >
                  Change picture
                </button>
                <button
                  type="button"
                  className="py-3.5 px-7 text-base font-medium text-indigo-900 focus:outline-none 
                  bg-white rounded-lg border border-indigo-200 hover:bg-indigo-100 hover:text-[#202142] 
                  focus:z-10 focus:ring-4 focus:ring-indigo-200"
                >
                  Delete picture
                </button>
              </div>
            </div>
            {/* Profile details */}
            <Formik
              initialValues={initialValues}
              onSubmit={() => {}}
              validate={() => {}}
            >
              {({ isSubmitting }) => (
                <Form
                  className="grid grid-cols-1 gap-6 mt-8 sm:grid-cols-2"
                  noValidate
                >
                  {/* Name */}
                  <div>
                    <label
                      htmlFor="firstName"
                      className="text-sm font-medium text-gray-700 block mb-2"
                    >
                      Tên
                    </label>
                    <Field
                      id="firstName"
                      name="firstName"
                      type="text"
                      placeholder="Tên"
                      className="w-full border-gray-300 border focus:border-blue-500 focus:ring-blue-500 focus:outline-none text-gray-900 rounded-lg py-2 px-4"
                    />
                  </div>
                  {/* Last name */}
                  <div>
                    <label
                      htmlFor="lastName"
                      className="text-sm font-medium text-gray-700 block mb-2"
                    >
                      Họ
                    </label>
                    <Field
                      id="lastName"
                      name="lastName"
                      type="text"
                      placeholder="Họ"
                      className="w-full border-gray-300 border focus:border-blue-500 focus:ring-blue-500 focus:outline-none text-gray-900 rounded-lg py-2 px-4"
                    />
                  </div>
                  {/* Email */}
                  <div>
                    <label
                      htmlFor="email"
                      className="text-sm font-medium text-gray-700 block mb-2"
                    >
                      Email
                    </label>
                    <Field
                      id="email"
                      name="email"
                      type="email"
                      placeholder="your.email@mail.com"
                      className="w-full border-gray-300 border focus:border-blue-500 focus:ring-blue-500 focus:outline-none text-gray-900 rounded-lg py-2 px-4"
                    />
                  </div>
                  {/* Address */}
                  <div>
                    <label
                      htmlFor="address"
                      className="text-sm font-medium text-gray-700 block mb-2"
                    >
                      Địa chỉ
                    </label>
                    <Field
                      id="address"
                      name="address"
                      type="text"
                      placeholder="Địa chỉ"
                      className="w-full border-gray-300 border focus:border-blue-500 focus:ring-blue-500 focus:outline-none text-gray-900 rounded-lg py-2 px-4"
                    />
                  </div>
                  {/* Submit button */}
                  <div className="sm:col-span-2">
                    <button
                      type="submit"
                      className="w-full py-3.5 px-7 text-base font-medium text-white focus:outline-none 
                        bg-[#202142] rounded-lg border border-indigo-200 hover:bg-indigo-900 
                        focus:z-10 focus:ring-4 focus:ring-indigo-200"
                    >
                      Lưu
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </main>
  );
}
