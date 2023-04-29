import React, { useEffect } from "react";
import { PropTypes } from "prop-types";
import { getDatabase, ref, onValue } from "firebase/database";
import { useDispatch, useSelector } from "react-redux";
import { updateDataStandardsData, selectDataStandardsData } from "../features/firebase/dataStandardsDataSlice";
import { updateMovesData } from "../features/firebase/movesDataSlice";
import { updateSpellsData } from "../features/firebase/spellsDataSlice";
import { updatePotionsData } from "../features/firebase/potionsDataSlice";
import { updateAnimalCompanionsData } from "../features/firebase/animalCompanionsDataSlice";

export const AppShell = function ({ children }) {

	const dispatch = useDispatch();


	useEffect(() => {
		async function collectData() {
			// Use firebase to listen for data changes
			const database = getDatabase(window.firebaseApp);
			let standards;

			// Collect data standards
			const dataStandardsRef = await ref(database, '/data_standards');
			onValue(dataStandardsRef, (snapshot) => {
				const data = snapshot.val();
				standards = data;
				dispatch(updateDataStandardsData({ data: data }));
			});

			// Collect moves data
			const movesRef = ref(database, '/move_categories');
			onValue(movesRef, (snapshot) => {
				const data = snapshot.val();
				dispatch(updateMovesData({ data: data, standards: standards }));
			});

			// Collect spells data
			const spellsRef = ref(database, '/spells');
			onValue(spellsRef, (snapshot) => {
				const data = snapshot.val();
				dispatch(updateSpellsData({ data: data, standards: standards }));
			});

			// Collect potions data
			const potionsRef = ref(database, '/potions');
			onValue(potionsRef, (snapshot) => {
				const data = snapshot.val();
				dispatch(updatePotionsData({ data: data, standards: standards }));
			});

			// Collect animal companions data
			const animalCompanionsRef = ref(database, '/animal_companions');
			onValue(animalCompanionsRef, (snapshot) => {
				const data = snapshot.val();
				dispatch(updateAnimalCompanionsData({ data: data, standards: standards }));
			});
		}

		collectData();
	}, []);

	return (
		<React.Fragment>
			{children}
		</React.Fragment>
	);
}

AppShell.propTypes = {
	children: PropTypes.object
};