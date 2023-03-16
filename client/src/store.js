import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./utilities/userSlice";
import serviceReducer from "./utilities/serviceSlice";
export const store = configureStore({
  reducer: {
    user: userReducer,
    service: serviceReducer,
  },
});
