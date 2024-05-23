// src/store/store.js
import { configureStore } from "@reduxjs/toolkit";
import exampleReducer from "./exampleSlice";
import selectedRowsReducer from "./selectedRowsSlice";

export const store = configureStore({
  reducer: {
    example: exampleReducer,
    selectedRows: selectedRowsReducer,
  },
});
