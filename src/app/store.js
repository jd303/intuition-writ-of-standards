import { configureStore } from "@reduxjs/toolkit";
import viewModeReducer from "../features/viewMode/viewModeSlice";

export default configureStore({
  reducer: {
    viewMode: viewModeReducer,
  },
});
