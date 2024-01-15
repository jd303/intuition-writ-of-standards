import { createSlice } from "@reduxjs/toolkit";

export const equipmentDataSlice = createSlice({
	name: "equipmentData",
	initialState: {
		value: [],
	},
	reducers: {
		updateEquipmentData: (state, data) => {
			const payload = data.payload.data;
			state.value = payload;
		},
	},
});

export const { updateEquipmentData } = equipmentDataSlice.actions;

export const selectEquipmentData = (state) => {
	return state.equipmentData.value;
}

export default equipmentDataSlice.reducer;