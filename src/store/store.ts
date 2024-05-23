// src/store/store.ts
import { configureStore } from "@reduxjs/toolkit";
import selectedRowsReducer from "./selectedRowsSlice";

export const store = configureStore({
  reducer: {
    selectedRows: selectedRowsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
