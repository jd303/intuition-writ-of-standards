import { createSlice } from "@reduxjs/toolkit";

export const alchemicalsDataSlice = createSlice({
	name: "alchemicalsData",
	initialState: {
		value: [],
	},
	reducers: {
		updateAlchemicalsData: (state, data) => {
			const payload = data.payload.data;
			state.value = payload;
		},
	},
});

export const { updateAlchemicalsData } = alchemicalsDataSlice.actions;

export const selectAlchemicalsData = (state) => state.alchemicalsData.value;

export default alchemicalsDataSlice.reducer;