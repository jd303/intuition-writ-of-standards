import { createSlice } from "@reduxjs/toolkit";

export const gadgetsDataSlice = createSlice({
	name: "gadgetsData",
	initialState: {
		value: [],
	},
	reducers: {
		updateGadgetsData: (state, data) => {
			const payload = data.payload.data;
			state.value = payload;
		},
	},
});

export const { updateGadgetsData } = gadgetsDataSlice.actions;

export const selectGadgetsData = (state) => {
	return state.gadgetsData.value;
}

export default gadgetsDataSlice.reducer;