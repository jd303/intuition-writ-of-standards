import { createSlice } from "@reduxjs/toolkit";

export const dcsDataSlice = createSlice({
	name: "dcsData",
	initialState: {
		value: [],
	},
	reducers: {
		updateDCsData: (state, data) => {
			const payload = data.payload.data;
			state.value = payload;
		},
	},
});

export const { updateDCsData } = dcsDataSlice.actions;

export const selectDCsData = (state) => {
	return state.dcsData.value;
}

export default dcsDataSlice.reducer;