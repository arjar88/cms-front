import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PropertyState {
  properties: any[];
}

const initialState: PropertyState = {
  properties: [],
};

const propertySlice = createSlice({
  name: "property",
  initialState,
  reducers: {
    setProperties: (state, action: PayloadAction<any>) => {
      state.properties = action.payload;
    },
  },
});

export const { setProperties } = propertySlice.actions;

export default propertySlice.reducer;
