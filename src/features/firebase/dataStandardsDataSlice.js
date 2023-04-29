import { createSlice } from "@reduxjs/toolkit";
import { convertDataStandards } from "./dataStandards";

export const dataStandardsDataSlice = createSlice({
	name: "dataStandardsData",
	initialState: {
		value: [],
	},
	reducers: {
		updateDataStandardsData: (state, data) => {
			state.value = data.payload;
		},
	},
});

export const { updateDataStandardsData } = dataStandardsDataSlice.actions;

export const selectDataStandardsData = (state) => state.dataStandardsData.value;

export default dataStandardsDataSlice.reducer;