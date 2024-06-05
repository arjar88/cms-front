// src/store/thunks.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import { crudApi } from "../api/index";
import { setObjects, setSelectedObject } from "./slices/objectSlice";
import { setProperties } from "./slices/propertySlice";
import { setData } from "./slices/dataSlice";

export const fetchClientData = createAsyncThunk(
  "client/fetchClientData",
  async (clientId: string, { dispatch }) => {
    try {
      // Fetch the client's objects
      const objects = await crudApi.fetchItems("object", { clientId });
      const selectedObject = objects.length > 0 ? objects[0] : null;

      dispatch(setObjects(objects));
      dispatch(setSelectedObject(selectedObject));

      if (selectedObject) {
        console.log(selectedObject._id, "selectedObject");
        // Fetch the properties and data of the selected object
        const properties = await crudApi.fetchItems("property", {
          objectId: selectedObject._id,
        });
        const data = await crudApi.fetchItems("data", {
          objectId: selectedObject._id,
        });
        console.log(data, "data");

        dispatch(setProperties(properties));
        dispatch(setData(data));
      } else {
        dispatch(setProperties([]));
        dispatch(setData([]));
      }
    } catch (error) {
      console.error("Error fetching client data:", error);
    }
  }
);
