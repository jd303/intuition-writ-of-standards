import { createSlice } from "@reduxjs/toolkit";

export const sourcesDataSlice = createSlice({
	name: "sourcesData",
	initialState: {
		value: [],
	},
	reducers: {
		updateSourcesData: (state, data) => {
			const payload = data.payload.data;
			state.value = payload;
		},
	},
});

export const { updateSourcesData } = sourcesDataSlice.actions;

export const selectSourcesData = (state) => {
	return state.sourcesData.value;
}

export default sourcesDataSlice.reducer;