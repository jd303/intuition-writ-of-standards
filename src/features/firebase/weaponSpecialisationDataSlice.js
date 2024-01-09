import { createSlice } from "@reduxjs/toolkit";

export const weaponSpecialisationDataSlice = createSlice({
	name: "weaponSpecialisationData",
	initialState: {
		value: [],
	},
	reducers: {
		updateWeaponSpecialisationData: (state, data) => {
			const payload = data.payload.data;
			state.value = payload;
		},
	},
});

export const { updateWeaponSpecialisationData } = weaponSpecialisationDataSlice.actions;

export const selectWeaponSpecialisationData = (state) => {
	return state.weaponSpecialisationData.value;
}

export default weaponSpecialisationDataSlice.reducer;