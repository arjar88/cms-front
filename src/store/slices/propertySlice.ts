import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { crudApi } from "../../api/index";

interface PropertyState {
  properties: any[];
  status: string;
  error: string | null;
}

const initialState: PropertyState = {
  properties: [],
  status: "idle",
  error: null,
};

export const fetchAndSetProperties = createAsyncThunk(
  "properties/fetchProperties",
  async (objectId: string) => {
    const response = await crudApi.fetchItems("property", {
      objectId,
    });
    console.log(response, "response");
    return response;
  }
);

const propertySlice = createSlice({
  name: "property",
  initialState,
  reducers: {
    setProperties: (state, action: PayloadAction<any>) => {
      state.properties = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAndSetProperties.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAndSetProperties.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.properties = action.payload;
      })
      .addCase(fetchAndSetProperties.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { setProperties } = propertySlice.actions;

export default propertySlice.reducer;
