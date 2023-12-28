import React, { useEffect } from "react";
import { PropTypes } from "prop-types";
import { app, AuthContextProvider, useAuthState } from '../firebase';
import { getDatabase, ref, onValue } from "firebase/database";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { updateDataStandardsData, selectDataStandardsData } from "../features/firebase/dataStandardsDataSlice";
import { updateMovesData } from "../features/firebase/movesDataSlice";
import { updateStatusData } from "../features/firebase/statusDataSlice";
import { updateSpellsData } from "../features/firebase/spellsDataSlice";
import { updatePotionsData } from "../features/firebase/potionsDataSlice";
import { updateAnimalCompanionsData } from "../features/firebase/animalCompanionsDataSlice";
import { updateCharactersData } from "../features/firebase/charactersDataSlice";

export const AppShell = function ({ children }) {

	const dispatch = useDispatch();
	const database = getDatabase(window.firebaseApp);

	useEffect(() => {
		async function collectData() {
			// Use firebase to listen for data changes
			let standards;

			// Collect data standards
			const dataStandardsRef = await ref(database, '/data_standards');
			onValue(dataStandardsRef, (snapshot) => {
				const data = snapshot.val();
				standards = data;
				dispatch(updateDataStandardsData({ data: data }));
			});

			// Collect moves data
			const movesRef = ref(database, '/moves');
			onValue(movesRef, (snapshot) => {
				const data = snapshot.val();
				dispatch(updateMovesData({ data: data, standards: standards }));
			});

			// Collect status data
			const statusRef = ref(database, '/statuses');
			onValue(statusRef, (snapshot) => {
				const data = snapshot.val();
				dispatch(updateStatusData({ data: data, standards: standards }));
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

	// Authenticated Data
	useEffect(() => {
		const unsubscribe = onAuthStateChanged(getAuth(app), 
		(user) => {
			if (user && user.uid) {
				const charactersRef = ref(database, `/characters/${user.uid}`);
				onValue(charactersRef, (snapshot) => {
					const data = snapshot.val();
					dispatch(updateCharactersData({ data: data }));
				});
			}
		}, (error) => {
			console.log("No user");
		})
		return () => unsubscribe()
	}, []);

	// JSX
	return (
		<AuthContextProvider>
			{children}
		</AuthContextProvider>
	);
}

AppShell.propTypes = {
	children: PropTypes.object
};