"use client";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import Image from "next/image";
import userService from "@/helpers/userHelpers";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { useRouter } from "next/navigation";
import LoadingSpinner from "../loadingSpinner";

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Email không hợp lệ")
    .required("Email không được để trống"),
  password: Yup.string().required("Mật khẩu không được để trống"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), ""], "Mật khẩu không khớp")
    .required("Xác nhận mật khẩu không được để trống"),
  firstName: Yup.string().required("Tên không được để trống"),
  lastName: Yup.string().required("Họ không được để trống"),
});
export default function Register() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const initialValues = {
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
  };

  return (
    <div className="bg-gray-50">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-5xl xl:p-0">
          <div className="flex flex-row">
            {/* Left Column */}
            <div className="w-full h-auto bg-primary-200 hidden lg:block lg:w-5/12 bg-cover rounded-l-lg">
              <Image
                className="object-cover w-full h-full rounded-l-lg"
                src="/register.svg"
                alt="register"
                width={500}
                height={500}
              />
            </div>
            {/* Right Column */}
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8 lg:w-7/12">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                Đăng ký tài khoản
              </h1>
              {/* Form */}
              <Formik
                initialValues={initialValues}
                onSubmit={async (values, { setSubmitting, setErrors }) => {
                  try {
                    // Call API
                    const isRegisterSuccess = await userService.register(
                      values,
                      dispatch,
                      router
                    );
                    if (!isRegisterSuccess) {
                      setErrors({
                        email: "Tài khoản đã tồn tại",
                      });
                    }
                  } catch (error: any) {
                    setErrors({ email: error.message });
                  } finally {
                    setSubmitting(false);
                  }
                }}
                validationSchema={validationSchema}
              >
                {({ isSubmitting }) => (
                  <Form noValidate>
                    <div className="grid grid-cols-2 gap-4">
                      {/* First Name */}
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
                        <ErrorMessage
                          name="firstName"
                          component="span"
                          className="text-red-500 text-sm font-normal italic mt-1"
                        />
                      </div>
                      {/* Last Name */}
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
                        <ErrorMessage
                          name="lastName"
                          component="span"
                          className="text-red-500 text-sm font-normal italic mt-1"
                        />
                      </div>
                      {/* Email */}
                      <div className="col-span-2">
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
                          placeholder="Email"
                          className="w-full border-gray-300 border focus:border-blue-500 focus:ring-blue-500 focus:outline-none text-gray-900 rounded-lg py-2 px-4"
                        />
                        <ErrorMessage
                          name="email"
                          component="span"
                          className="text-red-500 text-sm font-normal italic mt-1"
                        />
                      </div>
                      {/* Password */}
                      <div>
                        <label
                          htmlFor="password"
                          className="text-sm font-medium text-gray-700 block mb-2"
                        >
                          Mật khẩu
                        </label>
                        <Field
                          id="password"
                          name="password"
                          type="password"
                          placeholder="Mật khẩu"
                          className="w-full border-gray-300 border focus:border-blue-500 focus:ring-blue-500 focus:outline-none text-gray-900 rounded-lg py-2 px-4"
                        />
                        <ErrorMessage
                          name="password"
                          component="span"
                          className="text-red-500 text-sm font-normal italic mt-1"
                        />
                      </div>
                      {/* Confirm Password */}
                      <div>
                        <label
                          htmlFor="confirmPassword"
                          className="text-sm font-medium text-gray-700 block mb-2"
                        >
                          Xác nhận mật khẩu
                        </label>
                        <Field
                          id="confirmPassword"
                          name="confirmPassword"
                          type="password"
                          placeholder="Xác nhận mật khẩu"
                          className="w-full border-gray-300 border focus:border-blue-500 focus:ring-blue-500 focus:outline-none text-gray-900 rounded-lg py-2 px-4"
                        />
                        <ErrorMessage
                          name="confirmPassword"
                          component="span"
                          className="text-red-500 text-sm font-normal italic mt-1"
                        />
                      </div>
                    </div>
                    {/* Submit */}
                    <div>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full my-4 bg-primary-700 text-primary-100 p-2 rounded-lg active:bg-primary-950 hover:bg-primary-800"
                      >
                        {isSubmitting ? (
                          <LoadingSpinner text="Đang xử lý..." />
                        ) : (
                          "Đăng ký"
                        )}
                      </button>
                    </div>
                    {/* Sign in */}
                    <div className="text-center">
                      <span className="text-sm font-light text-gray-500">
                        Đã có tài khoản? {""}
                      </span>
                      <a
                        href="/auth/login"
                        className="font-medium text-primary-600 hover:underline"
                      >
                        Đăng nhập
                      </a>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
