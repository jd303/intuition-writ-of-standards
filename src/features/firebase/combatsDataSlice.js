import { createSlice } from "@reduxjs/toolkit";

export const combatsDataSlice = createSlice({
	name: "combatsData",
	initialState: {
		value: null,
	},
	reducers: {
		updateCombatsData: (state, data) => {
			console.log("COmbats", data.payload.data)
			const payload = data.payload.data;
			state.value = payload;
		},
	},
});

export const { updateCombatsData } = combatsDataSlice.actions;

export const selectCombatsData = (state) => {
	return state.combatsData?.value || {};
}

export default combatsDataSlice.reducer;