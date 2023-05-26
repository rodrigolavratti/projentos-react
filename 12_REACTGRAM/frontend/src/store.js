import { configureStore } from "@reduxjs/toolkit";

// Reducer
import authReducer from "./slices/authSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});
