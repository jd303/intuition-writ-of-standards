import { createSlice } from "@reduxjs/toolkit";

export const charactersDataSlice = createSlice({
	name: "charactersData",
	initialState: {
		value: [],
	},
	reducers: {
		updateCharactersData: (state, data) => {
			state.value = data.payload.data;
		},
	},
});

export const { updateCharactersData } = charactersDataSlice.actions;

export const selectCharactersData = (state) => {
	return state.charactersData.value;
}

export default charactersDataSlice.reducer;