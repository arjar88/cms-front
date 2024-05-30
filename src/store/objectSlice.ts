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
    setClients: (state, action: PayloadAction<any>) => {
      state.objects = action.payload;
    },
    setSelectedClient: (state, action: PayloadAction<any>) => {
      state.selectedObject = action.payload;
    },
  },
});

export const { setClients, setSelectedClient } = objectSlice.actions;

export default objectSlice.reducer;
