// src/store/selectedRowsSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedRowIds: [],
};

const selectedRowsSlice = createSlice({
  name: "selectedRows",
  initialState,
  reducers: {
    toggleRowSelection: (state, action) => {
      const index = state.selectedRowIds.indexOf(action.payload);
      if (index === -1) {
        state.selectedRowIds.push(action.payload);
      } else {
        state.selectedRowIds.splice(index, 1);
      }
    },
    clearSelection: (state) => {
      state.selectedRowIds = [];
    },
  },
});

export const { toggleRowSelection, clearSelection } = selectedRowsSlice.actions;

export default selectedRowsSlice.reducer;
