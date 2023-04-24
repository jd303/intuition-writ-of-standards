import { createSlice } from "@reduxjs/toolkit";
import { convertDataStandards } from "./dataStandards";

export const potionsDataSlice = createSlice({
	name: "potionsData",
	initialState: {
		value: [],
	},
	reducers: {
		updatePotionsData: (state, data) => {
			const payload = convertDataStandards(data.payload.data, data.payload.standards);
			state.value = payload;
		},
	},
});

export const { updatePotionsData } = potionsDataSlice.actions;

export const selectPotionsData = (state) => state.potionsData.value;

export default potionsDataSlice.reducer;