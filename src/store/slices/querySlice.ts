import { createSlice } from "@reduxjs/toolkit";

const initialState = { allData: [], showData: [], welcome: true };

const querySlice = createSlice({
  name: "query",
  initialState,
  reducers: {
    modifyAllData: (state, data) => {
      console.log("modifyAllData", data.payload);
      state.allData = data.payload;
    },
    modifyShowData: (state, data) => {
      console.log("modifyShowData", data.payload);
      state.showData = data.payload;
    },
    modifyWelcome: (state, data) => {
      console.log("modifyWelcome", data.payload);
      state.welcome = data.payload;
    },
  },
});

export const { modifyAllData, modifyShowData, modifyWelcome } =
  querySlice.actions;

export default querySlice.reducer;
