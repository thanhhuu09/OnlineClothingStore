// Auth Slice
import { createSlice } from "@reduxjs/toolkit";

export interface ICurrentUser {
  userInfo: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    isVerified: boolean;
    avatar: string;
    createdAt: string;
    updatedAt: string;
  };
  accessToken: string;
}
interface IAuthState {
  login: {
    currentUser: ICurrentUser | null;
    isFetching: boolean;
    error: boolean;
  };
  register: {
    isFetching: boolean;
    error: boolean;
  };
}
const initialState: IAuthState = {
  login: {
    currentUser: null,
    isFetching: false,
    error: false,
  },
  register: {
    isFetching: false,
    error: false,
  },
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Login
    loginRequest: (state) => {
      state.login.isFetching = true;
      state.login.error = false;
    },
    loginSuccess: (state, action) => {
      state.login.isFetching = false;
      state.login.currentUser = action.payload;
    },
    loginFailure: (state) => {
      state.login.isFetching = false;
      state.login.error = true;
    },
    // Register
    registerRequest: (state) => {
      state.register.isFetching = true;
      state.register.error = false;
    },
    registerSuccess: (state) => {
      state.register.isFetching = false;
      state.register.error = false;
    },
    registerFailure: (state) => {
      state.register.isFetching = false;
      state.register.error = true;
    },
  },
});

export const {
  loginRequest,
  loginSuccess,
  loginFailure,
  registerFailure,
  registerRequest,
  registerSuccess,
} = authSlice.actions;
export default authSlice.reducer;
