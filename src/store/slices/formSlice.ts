import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define a union type for different possible form values
export type FormValue = string | File[] | Date;

interface FormState {
  formData: Record<string, FormValue>;
}

const initialState: FormState = {
  formData: {},
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    updateFormData: (
      state,
      action: PayloadAction<{ key: string; value: FormValue }>
    ) => {
      const { key, value } = action.payload;
      state.formData[key] = value;
    },
    resetFormData: (state) => {
      state.formData = {};
    },
  },
});

export const { updateFormData, resetFormData } = formSlice.actions;

export default formSlice.reducer;
