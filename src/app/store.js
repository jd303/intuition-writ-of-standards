import { configureStore } from "@reduxjs/toolkit";
import viewModeReducer from "../features/viewMode/viewModeSlice";
import dataStandardsReducer from "../features/firebase/dataStandardsDataSlice";
import spellsDataReducer from "../features/firebase/spellsDataSlice";
import movesDataReducer from "../features/firebase/movesDataSlice";
import statusDataReducer from "../features/firebase/statusDataSlice";
import potionsDataReducer from "../features/firebase/potionsDataSlice";
import animalCompanionsDataReducer from "../features/firebase/animalCompanionsDataSlice";
import charactersData from "../features/firebase/charactersDataSlice";
import racialBonusData from "../features/firebase/racialBonusDataSlice";

export default configureStore({
	reducer: {
		viewMode: viewModeReducer,
		dataStandardsData: dataStandardsReducer,
		spellsData: spellsDataReducer,
		movesData: movesDataReducer,
		statusData: statusDataReducer,
		potionsData: potionsDataReducer,
		animalCompanionsData: animalCompanionsDataReducer,
		charactersData: charactersData,
		racialBonusData: racialBonusData
	},
});
