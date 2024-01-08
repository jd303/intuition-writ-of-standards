import { createSlice } from "@reduxjs/toolkit";

export const racialBonusDataSlice = createSlice({
	name: "racialBonusData",
	initialState: {
		value: null,
	},
	reducers: {
		updateRacialBonusData: (state, data) => {
			if (data.payload.data == null) data.payload.data = [];
			console.log(data.payload.data);

			// Return
			state.value = data.payload.data;
		},
	},
});

export const { updateRacialBonusData } = racialBonusDataSlice.actions;

export const selectRacialBonusData = (state) => {
	return state.racialBonusData.value;
}

export default racialBonusDataSlice.reducer;