import { createSlice } from "@reduxjs/toolkit";

export const charactersDataSlice = createSlice({
	name: "charactersData",
	initialState: {
		value: null,
	},
	reducers: {
		updateCharactersData: (state, data) => {
			if (data.payload.data == null) data.payload.data = [];

			// Filter out deleted items
			if (Array.isArray(data.payload.data)) {
				data.payload.data = data.payload.data.filter(i => typeof i === "object" || typeof i === 'function');
			}

			// Return
			state.value = data.payload.data;
		},
	},
});

export const { updateCharactersData } = charactersDataSlice.actions;

export const selectCharactersData = (state) => {
	return state.charactersData.value;
}

export default charactersDataSlice.reducer;