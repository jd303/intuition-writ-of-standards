import { createSlice } from "@reduxjs/toolkit";
import { convertDataStandards } from "./dataStandards";

export const spellsDataSlice = createSlice({
	name: "spellsData",
	initialState: {
		value: [],
	},
	reducers: {
		updateSpellsData: (state, data) => {
			const payload = convertDataStandards(data.payload.data, data.payload.standards);
			state.value = payload;
		},
	},
});

export const { updateSpellsData } = spellsDataSlice.actions;

export const selectSpellsData = (state) => state.spellsData.value;

export default spellsDataSlice.reducer;