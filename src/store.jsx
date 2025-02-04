import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./slices/themeSlice";
import notificationReducer from "./slices/notificationSlice";

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    notification: notificationReducer,
  },
});
