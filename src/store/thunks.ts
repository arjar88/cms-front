// src/store/thunks.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import { crudApi } from "../api/index";
import { setObjects, setSelectedObject } from "./slices/objectSlice";
import { setProperties } from "./slices/propertySlice";
import { setData } from "./slices/dataSlice";

// Fetches the clients objects,then fetches the default objects properties and data
export const fetchClientData = createAsyncThunk(
  "thunk/fetchClientData",
  async (clientId: string, { dispatch }) => {
    try {
      const objects = await crudApi.fetchItems("object", { clientId });
      const selectedObject = objects.length > 0 ? objects[0] : null;

      dispatch(setObjects(objects));
      dispatch(setSelectedObject(selectedObject));

      if (selectedObject) {
        // Fetch the properties and data of the selected object
        const properties = await crudApi.fetchItems("property", {
          objectId: selectedObject._id,
        });
        const data = await crudApi.fetchItems("data", {
          objectId: selectedObject._id,
        });

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

// Fetch client's objects and set them in the store
export const fetchObjects = createAsyncThunk(
  "thunk/fetchObjects",
  async (clientId: string, { dispatch }) => {
    try {
      const objects = await crudApi.fetchItems("object", { clientId });
      dispatch(setObjects(objects));
      return objects;
    } catch (error) {
      console.error("Error fetching client objects:", error);
      throw error;
    }
  }
);

// Fetch properties for a specific object and set them in the store
export const fetchProperties = createAsyncThunk(
  "thunk/fetchProperties",
  async (objectId: string, { dispatch }) => {
    try {
      const properties = await crudApi.fetchItems("property", { objectId });
      dispatch(setProperties(properties));
      return properties;
    } catch (error) {
      console.error("Error fetching object properties:", error);
      throw error;
    }
  }
);

// Fetch data for a specific object and set it in the store
export const fetchData = createAsyncThunk(
  "thunk/fetchData",
  async (objectId: string, { dispatch }) => {
    try {
      const data = await crudApi.fetchItems("data", { objectId });
      dispatch(setData(data));
      return data;
    } catch (error) {
      console.error("Error fetching object data:", error);
      throw error;
    }
  }
);
