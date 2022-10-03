import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import todoSlice from "./todoSlice";
import portfolioSlice from "./portfolioSlice"

export const store = configureStore({
  reducer: {
    auth: authSlice,
    todoReducer: todoSlice,
    portFolioReducer: portfolioSlice
  },
});
