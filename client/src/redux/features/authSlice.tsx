import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface IUserState {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  accessToken: string;
}
interface IRequestState {
  isFetching: boolean;
  error: boolean;
}
interface IAuthState {
  login: IRequestState & { currentUser: IUserState | null };
  register: IRequestState;
  logout: IRequestState;
}

const initialRequestState: IRequestState = {
  isFetching: false,
  error: false,
};

const initialState: IAuthState = {
  login: {
    ...initialRequestState,
    currentUser: null,
  },
  register: initialRequestState,
  logout: initialRequestState,
};
const startRequest = (state: IRequestState) => {
  state.isFetching = true;
  state.error = false;
};
const requestSuccess = (state: IRequestState) => {
  state.isFetching = false;
  state.error = false;
};
const requestFailure = (state: IRequestState) => {
  state.isFetching = false;
  state.error = true;
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // LOGIN
    loginRequest: (state) => {
      startRequest(state.login);
    },
    loginSuccess: (state, action: PayloadAction<IUserState>) => {
      requestSuccess(state.login);
      state.login.currentUser = action.payload;
    },
    loginFailure: (state) => {
      requestFailure(state.login);
    },
    // REGISTER
    registerRequest: (state) => {
      startRequest(state.register);
    },
    registerSuccess: (state) => {
      requestSuccess(state.register);
    },
    registerFailure: (state) => {
      requestFailure(state.register);
    },
    // LOGOUT
    logoutRequest: (state) => {
      startRequest(state.logout);
    },
    logoutSuccess: (state) => {
      requestSuccess(state.logout);
      state.login.currentUser = null;
    },
    logoutFailure: (state) => {
      requestFailure(state.logout);
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
  logoutRequest,
  logoutSuccess,
  logoutFailure,
} = authSlice.actions;
export default authSlice.reducer;
