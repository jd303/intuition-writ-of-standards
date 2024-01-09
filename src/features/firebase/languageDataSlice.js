import { createSlice } from "@reduxjs/toolkit";

export const languageDataSlice = createSlice({
	name: "languageData",
	initialState: {
		value: [],
	},
	reducers: {
		updateLanguageData: (state, data) => {
			const payload = data.payload.data;
			state.value = payload;
		},
	},
});

export const { updateLanguageData } = languageDataSlice.actions;

export const selectLanguageData = (state) => {
	return state.languageData.value;
}

export default languageDataSlice.reducer;