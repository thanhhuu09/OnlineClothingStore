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
const userHelpers = {
  getAccessToken: async () => {
    // Get access token from httpOnly cookie
    try {
      const response = await fetch("/api/v1/auth/refresh", {
        method: "POST",
      });
      if (!response.ok) {
        throw new Error("Failed to get access token");
      }
      const data = await response.json();
      return data.accessToken;
    } catch (error) {
      console.log(error);
      return null;
    }
  },
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
      if (!response.ok) {
        throw new Error("Failed to logout");
      }
      dispatch(logoutSuccess());
      router.push("/");
    } catch (error) {
      console.log(error);
      dispatch(loginFailure());
    }
  },
  // get user by id through refresh token
  getUserById: async (dispatch: AppDispatch) => {
    dispatch(loginRequest());
    try {
      // Check if user has refresh token in cookie
      const response = await fetch("/api/v1/auth/refresh", {
        method: "POST",
      });
      if (!response.ok) {
        throw new Error("Failed to get access token");
      }
      const data = await response.json();
      const { accessToken, user } = data;
      // Get user info through access token and api
      const userResponse = await fetch(`/api/v1/users/${user.id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (!userResponse.ok) {
        throw new Error("Failed to get user info");
      }
      const userData = await userResponse.json();
      dispatch(
        loginSuccess({
          ...userData.data,
          accessToken,
        })
      );
    } catch (error) {
      console.log(error);
      dispatch(loginFailure());
    }
  },
};
export default userHelpers;
