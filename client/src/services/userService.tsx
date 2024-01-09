// File này call api để login, register, logout

import { IUserLogin, IUserRegister } from "@/interfaces/userInterface";
import {
  loginFailure,
  loginRequest,
  loginSuccess,
  logoutRequest,
  logoutSuccess,
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
  logout: async (
    dispatch: AppDispatch,
    router: AppRouterInstance,
    accessToken: string
  ) => {
    dispatch(logoutRequest());
    try {
      const response = await fetch("/api/v1/auth/logout", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (response.ok) {
        dispatch(logoutSuccess());
        router.push("/");
      } else {
        dispatch(loginFailure());
      }
    } catch (error) {
      dispatch(loginFailure());
    }
  },
  // Create new access token from refresh token
  createNewAccessToken: async () => {
    try {
      // Get old refresh token from httpOnly cookie
      const response = await fetch("/api/v1/auth/refresh-token", {
        method: "POST",
      });
      if (response.ok) {
        const data = await response.json();
        return data.accessToken;
      } else {
        return null;
      }
    } catch (error) {
      return null;
    }
  },
};

export default userService;
