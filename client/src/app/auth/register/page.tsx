"use client";
import LoadingSpinner from "@/components/LoadingSpinner";
import Link from "next/link";
import Image from "next/image";
import React, { use, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { IUserRegister } from "@/interfaces/userInterface";
import FormInput from "@/components/FormInput";
import FormButton from "@/components/FormButton";
import userService from "@/services/userService";
import { useRouter } from "next/navigation";
export default function Page() {
  const dispatch = useDispatch<AppDispatch>();
  const { isFetching } = useAppSelector((state) => state.auth.register);
  const router = useRouter();
  const [user, setUser] = useState<IUserRegister>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<IUserRegister>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  // Handle form validation field
  const validateForm = () => {
    let temp = { ...errors };
    temp.firstName = user.firstName ? "" : "Tên không được để trống";
    temp.lastName = user.lastName ? "" : "Họ không được để trống";
    temp.password = user.password ? "" : "Mật khẩu không được để trống";

    // Check email format
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regexEmail.test(user.email)) {
      temp.email = "Email không đúng định dạng";
    } else {
      temp.email = "";
    }
    // Check password match confirm password
    if (user.password !== user.confirmPassword) {
      temp.confirmPassword = "Mật khẩu không khớp";
    } else {
      temp.confirmPassword = "";
    }

    // Set errors state
    setErrors(temp);
    return temp;
  };

  // Submit form
  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validateForm();
    const formIsValid = Object.values(validationErrors).every((x) => x === ""); // Check if all errors state is empty
    if (formIsValid) {
      const isSuccess = await userService.register(user, dispatch, router);
      if (isSuccess) {
        alert("Đăng ký thành công");
      } else {
        setErrors({ ...errors, email: "Email đã tồn tại" });
      }
    }
  };
  return (
    <div className="h-full bg-primary-50 ">
      <div className="mx-auto">
        <div className="flex justify-center px-6 py-12">
          <div className="w-full xl:w-3/4 lg:w-11/12 flex">
            <div className="w-full h-auto bg-primary-200 hidden lg:block lg:w-5/12 bg-cover rounded-l-lg">
              <Image
                className="object-cover w-full h-full rounded-l-lg"
                src="/register.svg"
                alt="register"
                width={500}
                height={500}
              />
            </div>

            <div className="w-full lg:w-7/12 bg-white p-5 rounded-lg lg:rounded-l-none">
              <h3 className="py-4 text-2xl text-center text-gray-900 font-semibold">
                Đăng ký tài khoản
              </h3>
              <form
                className="px-8 pt-6 pb-8 mb-4 bg-white rounded"
                onSubmit={handleRegister}
                noValidate
              >
                <div className="mb-4 md:flex md:justify-between">
                  <div className="mb-4 md:mr-2 md:mb-0">
                    <FormInput
                      id="firstName"
                      type="text"
                      name="firstName"
                      value={user.firstName}
                      label="Họ"
                      placeholder="Họ"
                      errorMessages={errors.firstName}
                      onChange={handleOnChange}
                    />
                  </div>
                  <div className="md:ml-2">
                    <FormInput
                      id="lastName"
                      type="text"
                      name="lastName"
                      value={user.lastName}
                      label="Tên"
                      placeholder="Tên"
                      errorMessages={errors.lastName}
                      onChange={handleOnChange}
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <FormInput
                    id="email"
                    type="email"
                    name="email"
                    value={user.email}
                    label="Email"
                    placeholder="Email"
                    errorMessages={errors.email}
                    onChange={handleOnChange}
                  />
                </div>
                <div className="mb-4 md:flex md:justify-between">
                  <div className="mb-4 md:mr-2 md:mb-0">
                    <FormInput
                      id="password"
                      type="password"
                      name="password"
                      value={user.password}
                      label="Mật khẩu"
                      placeholder="Mật khẩu"
                      errorMessages={errors.password}
                      onChange={handleOnChange}
                    />
                  </div>
                  <div className="md:ml-2">
                    <FormInput
                      id="confirmPassword"
                      type="password"
                      name="confirmPassword"
                      value={user.confirmPassword}
                      label="Xác nhận mật khẩu"
                      placeholder="Xác nhận mật khẩu"
                      errorMessages={errors.confirmPassword}
                      onChange={handleOnChange}
                    />
                  </div>
                </div>
                <div className="mb-6 text-center">
                  <FormButton
                    label="Đăng ký"
                    isDisabled={isFetching}
                    isFetching={isFetching}
                  />
                </div>
                <hr className="mb-6 border-t" />
                <div className="text-center">
                  <Link
                    className="inline-block text-sm font-medium text-primary-600 align-baseline hover:text-primary-800"
                    href="#"
                  >
                    Quên mật khẩu?
                  </Link>
                </div>
                <div className="text-center">
                  <Link
                    className="inline-block text-sm font-medium text-primary-600 align-baseline hover:text-primary-800"
                    href="/auth/login"
                  >
                    Đã có tài khoản? Đăng nhập!
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
