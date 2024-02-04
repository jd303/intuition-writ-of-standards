import { createSlice } from "@reduxjs/toolkit";

export const menagerieDataSlice = createSlice({
	name: "menagerieData",
	initialState: {
		value: [],
	},
	reducers: {
		updateMenagerieData: (state, data) => {
			const payload = data.payload.data;
			console.log("MENAG", payload);
			state.value = payload;
		},
	},
});

export const { updateMenagerieData } = menagerieDataSlice.actions;

export const selectMenagerieData = (state) => state.menagerieData.value;

export default menagerieDataSlice.reducer;