import { IUserLogin, IUserRegister } from "@/interfaces/userInterface";
import {
  loginFailure,
  loginRequest,
  loginSuccess,
  registerFailure,
  registerRequest,
  registerSuccess,
} from "@/redux/features/authSlice";
import { AppDispatch } from "@/redux/store";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

// User service: use to call api related to user
const userService = {
  login: async (
    user: IUserLogin,
    dispatch: AppDispatch,
    router: AppRouterInstance
  ) => {
    dispatch(loginRequest());
    try {
      const response = await fetch("/api/v1/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      if (response.ok) {
        const user = await response.json();
        dispatch(loginSuccess(user.data));
        router.push("/");
        return true;
      } else {
        dispatch(loginFailure());
        return false;
      }
    } catch (error) {
      dispatch(loginFailure());
    }
  },
  register: async (
    user: IUserRegister,
    dispatch: AppDispatch,
    router: AppRouterInstance
  ) => {
    dispatch(registerRequest());
    try {
      const response = await fetch("/api/v1/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      if (response.ok) {
        dispatch(registerSuccess());
        router.push("/auth/login");
        return true;
      } else {
        dispatch(registerFailure());
        return false;
      }
    } catch (error) {
      dispatch(registerFailure());
      return false;
    }
  },
};

export default userService;
