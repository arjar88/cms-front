import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  user: any;
}

const initialState: UserState = {
  user: {
    id: "6654be63d21e30992eed6fbe",
    clientIds: ["6655b1788083f16b408ab61d", "6658525caea2f4e6654c19b4"],
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<any>) => {
      state.user = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
