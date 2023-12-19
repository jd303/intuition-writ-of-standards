import { createSlice } from "@reduxjs/toolkit";
import { convertDataStandards } from "./dataStandards";

export const movesDataSlice = createSlice({
	name: "movesData",
	initialState: {
		value: [],
	},
	reducers: {
		updateMovesData: (state, data) => {
			const payload = convertDataStandards(data.payload.data, data.payload.standards);

			/*const sortByRank = (a, b) => (a.rank < b.rank && -1) || 1;

			payload.forEach(category => {
				category.moves.forEach(move => {
					move.mods = move.mods.sort(sortByRank);
				});
			});*/

			state.value = payload;
		},
	},
});

export const { updateMovesData } = movesDataSlice.actions;

export const selectMovesData = (state) => {
	return state.movesData.value;
}

export default movesDataSlice.reducer;