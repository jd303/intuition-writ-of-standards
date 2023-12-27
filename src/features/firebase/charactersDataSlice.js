import { createSlice } from "@reduxjs/toolkit";
import { convertDataStandards } from "./dataStandards";

export const charactersDataSlice = createSlice({
	name: "charactersData",
	initialState: {
		value: [],
	},
	reducers: {
		updateCharactersData: (state, data) => {
			const payload = convertDataStandards(data.payload.data, data.payload.standards);
			state.value = payload;
		},
	},
});

export const { updateCharactersData } = charactersDataSlice.actions;

export const selectCharactersData = (state) => {
	return state.charactersData.value;
}

export default charactersDataSlice.reducer;