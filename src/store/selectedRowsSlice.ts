import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SelectedRowsState {
  selectedRows: any[];
}

const initialState: SelectedRowsState = {
  selectedRows: [],
};

const selectedRowsSlice = createSlice({
  name: "selectedRows",
  initialState,
  reducers: {
    addRow: (state, action: PayloadAction<any>) => {
      state.selectedRows.push(action.payload);
    },
    removeRow: (state, action: PayloadAction<any>) => {
      state.selectedRows = state.selectedRows.filter(
        (element) => element.id !== action.payload.id
      );
    },
    clearSelection: (state) => {
      state.selectedRows = [];
    },
  },
});

export const { addRow, removeRow, clearSelection } = selectedRowsSlice.actions;

export default selectedRowsSlice.reducer;
