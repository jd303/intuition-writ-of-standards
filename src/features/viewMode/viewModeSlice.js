import { createSlice } from "@reduxjs/toolkit";

export const viewModeSlice = createSlice({
  name: "viewMode",
  initialState: {
    value: "card",
  },
  reducers: {
    switchViewMode: (state, value) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value = value.payload;
    },
    toggleViewMode: (state) => {
      if (state.value == "card") state.value = "list";
      else state.value = "card";
    },
  },
});

export const { switchViewMode, toggleViewMode } = viewModeSlice.actions;

export const selectViewMode = (state) => state.viewMode.value;

export default viewModeSlice.reducer;
