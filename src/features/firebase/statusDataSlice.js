import { createSlice } from "@reduxjs/toolkit";
import { convertDataStandards } from "./dataStandards";

export const statusDataSlice = createSlice({
	name: "statusData",
	initialState: {
		value: [],
	},
	reducers: {
		updateStatusData: (state, data) => {
			console.log(state, data);
			const payload = convertDataStandards(data.payload.data, data.payload.standards);
			state.value = payload;
		},
	},
});

export const { updateStatusData } = statusDataSlice.actions;

export const selectStatusData = (state) => {
	return state.statusData.value;
}

export default statusDataSlice.reducer;