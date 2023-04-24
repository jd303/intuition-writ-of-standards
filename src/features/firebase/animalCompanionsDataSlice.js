import { createSlice } from "@reduxjs/toolkit";
import { convertDataStandards } from "./dataStandards";

export const animalCompanionsDataSlice = createSlice({
	name: "animalCompanionsData",
	initialState: {
		value: [],
	},
	reducers: {
		updateAnimalCompanionsData: (state, data) => {
			const payload = convertDataStandards(data.payload.data, data.payload.standards);
			state.value = payload;
		},
	},
});

export const { updateAnimalCompanionsData } = animalCompanionsDataSlice.actions;

export const selectAnimalCompanionsData = (state) => state.animalCompanionsData.value;

export default animalCompanionsDataSlice.reducer;