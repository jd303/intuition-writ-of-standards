import React from "react";
import { PropTypes } from "prop-types";
import { getDatabase, ref, onValue } from "firebase/database";
import { useDispatch } from "react-redux";
import { updateMovesData } from "../features/firebase/movesDataSlice";
import { updateSpellsData } from "../features/firebase/spellsDataSlice";
import { updatePotionsData } from "../features/firebase/potionsDataSlice";
import { updateAnimalCompanionsData } from "../features/firebase/animalCompanionsDataSlice";

export const AppShell = function ({ children }) {

	const dispatch = useDispatch();

	// Use firebase to listen for spell changes
	const database = getDatabase(window.firebaseApp);
	const spellsRef = ref(database, '/');
	onValue(spellsRef, (snapshot) => {
		const data = snapshot.val();
		dispatch(updateMovesData({ data: data.move_categories, standards: data.data_standards }));
		dispatch(updateSpellsData({ data: data.spells, standards: data.data_standards }));
		dispatch(updatePotionsData({ data: data.potions, standards: data.data_standards }));
		dispatch(updateAnimalCompanionsData({ data: data.animal_companion_moves, standards: data.data_standards }));
	});

	return (
		<React.Fragment>
			{children}
		</React.Fragment>
	);
}

AppShell.propTypes = {
	children: PropTypes.string
};