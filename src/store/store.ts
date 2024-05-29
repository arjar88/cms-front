// src/store/store.ts
import { configureStore } from "@reduxjs/toolkit";
import selectedRowsReducer from "./selectedRowsSlice";
import userSlice from "./userSlice";

export const store = configureStore({
  reducer: {
    selectedRows: selectedRowsReducer,
    userSlice: userSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
