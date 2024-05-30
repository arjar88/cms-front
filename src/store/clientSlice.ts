import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ClientState {
  clients: any[];
  selectedClient: any;
}

const initialState: ClientState = {
  clients: [],
  selectedClient: null,
};

const clientSlice = createSlice({
  name: "client",
  initialState,
  reducers: {
    setClients: (state, action: PayloadAction<any>) => {
      state.clients = action.payload;
    },
    setSelectedClient: (state, action: PayloadAction<any>) => {
      state.selectedClient = action.payload;
    },
  },
});

export const { setClients, setSelectedClient } = clientSlice.actions;

export default clientSlice.reducer;
