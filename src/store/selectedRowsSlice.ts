// src/store/selectedRowsSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SelectedRowsState {
  selectedRowIds: string[];
}

const initialState: SelectedRowsState = {
  selectedRowIds: [],
};

const selectedRowsSlice = createSlice({
  name: "selectedRows",
  initialState,
  reducers: {
    toggleRowSelection: (state, action: PayloadAction<string>) => {
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
