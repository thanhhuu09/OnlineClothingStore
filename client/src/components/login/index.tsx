"use client";
import { AppDispatch, useAppSelector } from "@/redux/store";
import userService from "@/helpers/userHelpers";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import LoadingSpinner from "../loadingSpinner";
import Link from "next/link";
import { useEffect } from "react";

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Email không hợp lệ")
    .required("Email không được để trống"),
  password: Yup.string().required("Mật khẩu không được để trống"),
});

export default function Login() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  return (
    <div className="bg-gray-50">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Chào mừng bạn quay trở lại!👋
            </h1>
            {/* Form */}
            <Formik
              initialValues={{ email: "", password: "", remember: false }}
              validationSchema={validationSchema}
              onSubmit={async (values, { setSubmitting, setErrors }) => {
                try {
                  const isLoginSuccess = await userService.login(
                    values,
                    dispatch,
                    router
                  );
                  if (!isLoginSuccess) {
                    setErrors({
                      email: " ",
                      password: "Email hoặc mật khẩu không đúng",
                    });
                  }
                } catch (error: any) {
                  setErrors({ email: error.message, password: error.message });
                } finally {
                  setSubmitting(false);
                }
              }}
            >
              {({ isSubmitting }) => (
                <Form noValidate>
                  {/* Email */}
                  <div className="mb-2">
                    <label
                      htmlFor="email"
                      className="text-sm font-medium text-gray-70 block mb-2"
                    >
                      Email
                    </label>
                    <Field
                      className="border-gray-300 border focus:outline-none text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                      id="email"
                      name="email"
                      placeholder="your.email@gmail.com"
                      type="email"
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-red-500 text-sm font-normal italic mt-1"
                    />
                  </div>
                  {/* Password */}
                  <div className="mb-2">
                    <label
                      htmlFor="password"
                      className="text-sm font-medium text-gray-70 block mb-2"
                    >
                      Mật khẩu
                    </label>
                    <Field
                      className="border-gray-300 border focus:outline-none text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                      id="password"
                      name="password"
                      placeholder="••••••••"
                      type="password"
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="text-red-500 text-sm font-normal italic mt-1"
                    />
                  </div>
                  {/* Remember me */}
                  <div className="flex items-center justify-between">
                    <div>
                      <label htmlFor="remember" className="flex justify-center">
                        <Field type="checkbox" id="remember" name="remember" />
                        <span className="ml-2 text-sm font-medium text-gray-500 hover:text-primary-600">
                          Ghi nhớ đăng nhập
                        </span>
                      </label>
                    </div>
                    {/* Quên mật khẩu*/}
                    <Link
                      href="#"
                      className="text-sm font-medium text-primary-600 hover:underline"
                    >
                      Quên mật khẩu?
                    </Link>
                  </div>
                  <div className="flex justify-end my-2">
                    {/* Chưa có tài khoản */}
                    <p className="text-sm font-light text-gray-500">
                      Chưa có tài khoản?{" "}
                      <Link
                        href="/auth/register"
                        className="font-medium text-primary-600 hover:underline"
                      >
                        Đăng ký ngay
                      </Link>
                    </p>
                  </div>
                  {/* Submit button */}
                  <button
                    type="submit"
                    className="w-full bg-primary-700 text-primary-100 p-2 rounded-lg active:bg-primary-950 hover:bg-primary-800"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <LoadingSpinner text="Đang xử lý..." />
                    ) : (
                      "Đăng nhập"
                    )}
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
}
