import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    isFetching: false,
    error: false,
  },
  reducers: {
    // get user by id
  },
});
