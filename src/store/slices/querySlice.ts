import { createSlice } from "@reduxjs/toolkit";

const initialState = { allData: [], showData: [], welcome: true };

const querySlice = createSlice({
  name: "query",
  initialState,
  reducers: {
    modifyAllData: (state, data) => {
      state.allData = data.payload;
    },
    modifyShowData: (state, data) => {
      state.showData = data.payload;
    },
    modifyWelcome: (state, data) => {
      state.welcome = data.payload;
    },
  },
});

export const { modifyAllData, modifyShowData, modifyWelcome } =
  querySlice.actions;

export default querySlice.reducer;
