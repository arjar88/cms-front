import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ObjectState {
  objects: any[];
  selectedObject: any;
}

const initialState: ObjectState = {
  objects: [],
  selectedObject: null,
};

const objectSlice = createSlice({
  name: "object",
  initialState,
  reducers: {
    setObjects: (state, action: PayloadAction<any>) => {
      state.objects = action.payload;
    },
    setSelectedObject: (state, action: PayloadAction<any>) => {
      state.selectedObject = action.payload;
    },
  },
});

export const { setObjects, setSelectedObject } = objectSlice.actions;

export default objectSlice.reducer;
