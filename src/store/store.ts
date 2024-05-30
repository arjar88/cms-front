// src/store/store.ts
import { configureStore } from "@reduxjs/toolkit";
import selectedRowsReducer from "./selectedRowsSlice";
import userSlice from "./userSlice";
import clientSlice from "./clientSlice";
import objectSlice from "./objectSlice";

export const store = configureStore({
  reducer: {
    selectedRows: selectedRowsReducer,
    userSlice: userSlice,
    clientSlice: clientSlice,
    objectSlice: objectSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
