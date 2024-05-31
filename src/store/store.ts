// src/store/store.ts
import { configureStore } from "@reduxjs/toolkit";
import selectedRowsReducer from "./selectedRowsSlice";
import userReducer from "./userSlice";
import clientReducer from "./clientSlice";
import objectReducer from "./objectSlice";
import propertyReducer from "./propertySlice";
import dataReducer from "./dataSlice";

export const store = configureStore({
  reducer: {
    selectedRows: selectedRowsReducer,
    user: userReducer,
    clients: clientReducer,
    objects: objectReducer,
    properties: propertyReducer,
    data: dataReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
