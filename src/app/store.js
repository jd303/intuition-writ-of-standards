import { configureStore } from "@reduxjs/toolkit";
import viewModeReducer from "../features/viewMode/viewModeSlice";
import dataStandardsReducer from "../features/firebase/dataStandardsDataSlice";
import spellsDataReducer from "../features/firebase/spellsDataSlice";
import movesDataReducer from "../features/firebase/movesDataSlice";
import potionsDataReducer from "../features/firebase/potionsDataSlice";
import animalCompanionsDataReducer from "../features/firebase/animalCompanionsDataSlice";

export default configureStore({
	reducer: {
		viewMode: viewModeReducer,
		dataStandardsData: dataStandardsReducer,
		spellsData: spellsDataReducer,
		movesData: movesDataReducer,
		potionsData: potionsDataReducer,
		animalCompanionsData: animalCompanionsDataReducer
	},
});
