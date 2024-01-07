// import { configureStore } from "@reduxjs/toolkit";
// import cartReducer from "@/redux/features/cartSlice";
// import authReducer from "@/redux/features/authSlice";
// import { TypedUseSelectorHook, useSelector } from "react-redux";
// const store = configureStore({
//   reducer: {
//     cart: cartReducer,
//     auth: authReducer,
//   },
// });

// export default store;
// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;
// export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// Redux Persist
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "./storage";
import { TypedUseSelectorHook, useSelector } from "react-redux";

import cartReducer from "@/redux/features/cartSlice";
import authReducer from "@/redux/features/authSlice";
const persistConfig = {
  key: "root",
  version: 1,
  storage,
};
const rootReducer = combineReducers({
  cart: cartReducer,
  auth: authReducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

let persistor = persistStore(store);
export { persistor };
export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
