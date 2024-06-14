import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

// Define a union type for different possible form values
type FormValue = string | File;

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
    updateFormDataArray: (
      state,
      action: PayloadAction<{ keyPrefix: string; values: File[] }>
    ) => {
      const { values } = action.payload;
      let fileId: string;
      values.forEach((file) => {
        fileId = uuidv4();
        state.formData[fileId] = {
          ...file,
          id: uuidv4(),
        } as File & { id: string };
      });
    },
    resetFormData: (state) => {
      state.formData = {};
    },
  },
});

export const { updateFormData, updateFormDataArray, resetFormData } =
  formSlice.actions;

export default formSlice.reducer;
