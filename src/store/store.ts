import { configureStore } from "@reduxjs/toolkit";
import querySlice from "./slices/querySlice";

export default configureStore({ reducer: { querySlice } });
