// src/store/store.ts
import { configureStore } from "@reduxjs/toolkit";
import selectedRowsReducer from "./slices/selectedRowsSlice";
import userReducer from "./slices/userSlice";
import clientReducer from "./slices/clientSlice";
import objectReducer from "./slices/objectSlice";
import propertyReducer from "./slices/propertySlice";
import dataReducer from "./slices/dataSlice";
import formReducer from "./slices/formSlice";

export const store = configureStore({
  reducer: {
    selectedRows: selectedRowsReducer,
    user: userReducer,
    clients: clientReducer,
    objects: objectReducer,
    properties: propertyReducer,
    data: dataReducer,
    form: formReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
