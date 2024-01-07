"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import userService from "@/services/userService";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { useRouter } from "next/navigation";
import FormInput from "@/components/FormInput";
import { IUserLogin } from "@/interfaces/userInterface";
import FormButton from "@/components/FormButton";

export default function Page() {
  const dispatch = useDispatch<AppDispatch>();
  const { isFetching } = useAppSelector((state) => state.auth.login); // Get error from redux store
  const router = useRouter();
  // State for form inputs
  const [formData, setFormData] = useState<IUserLogin>({
    email: "",
    password: "",
  });
  // Error state for form validation
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form validation field
  const validateForm = () => {
    let temp = { ...errors };
    temp.email = formData.email ? "" : "Email không được để trống";
    temp.password = formData.password ? "" : "Mật khẩu không được để trống";

    setErrors(temp);
    return temp;
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isErrors = Object.values(validateForm()).some((x) => x !== ""); // Check if there is any error in form validation
    if (isErrors) return;
    const isLoginSuccess = await userService.login(formData, dispatch, router);
    if (!isLoginSuccess) {
      setErrors({
        ...errors,
        email: " ",
        password: "Email hoặc mật khẩu không đúng",
      });
    }
  };
  return (
    <section className="bg-gray-50">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <Link
          href="/"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900"
        >
          <div style={{ width: "200px", height: "60px", position: "relative" }}>
            <Image
              className="mr-2"
              fill
              src="/logo.svg"
              alt="logo"
              objectFit="cover"
            />
          </div>
        </Link>
        <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Chào mừng bạn quay trở lại!👋
            </h1>
            <form onSubmit={handleLogin} noValidate>
              <div className="mb-2">
                <FormInput
                  label="Email"
                  id="email"
                  name="email"
                  onChange={handleInputChange}
                  errorMessages={errors.email}
                  placeholder="name@gmail.com"
                  type="email"
                  value={formData.email}
                />
              </div>
              <div className="mb-2">
                <FormInput
                  id="password"
                  label="Mật khẩu"
                  name="password"
                  onChange={handleInputChange}
                  errorMessages={errors.password}
                  placeholder="••••••••"
                  type="password"
                  value={formData.password}
                />
              </div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="remember" className="text-gray-500">
                      Ghi nhớ tôi
                    </label>
                  </div>
                </div>
                <Link
                  href="#"
                  className="text-sm font-medium text-primary-600 hover:underline"
                >
                  Quên mật khẩu?
                </Link>
              </div>
              <div className="mb-2">
                <FormButton
                  label="Đăng nhập"
                  isDisabled={isFetching}
                  isFetching={isFetching}
                />
              </div>

              <p className="text-sm font-light text-gray-500">
                Chưa có tài khoản?{" "}
                <Link
                  href="/auth/register"
                  className="font-medium text-primary-600 hover:underline"
                >
                  Đăng ký ngay
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
