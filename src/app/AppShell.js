import React, { useEffect } from "react";
import { PropTypes } from "prop-types";
import { app, AuthContextProvider } from '../firebase';
import { getDatabase, ref, onValue } from "firebase/database";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { updateDataStandardsData } from "../features/firebase/dataStandardsDataSlice";
import { updateMovesData } from "../features/firebase/movesDataSlice";
import { updateStatusData } from "../features/firebase/statusDataSlice";
import { updateSpellsData } from "../features/firebase/spellsDataSlice";
import { updatePotionsData } from "../features/firebase/potionsDataSlice";
import { updateAnimalCompanionsData } from "../features/firebase/animalCompanionsDataSlice";
import { updateCharactersData } from "../features/firebase/charactersDataSlice";
import { updateRacialBonusData } from "../features/firebase/racialBonusDataSlice";
import { updateLanguageData } from "../features/firebase/languageDataSlice";
import { updateSourcesData } from "../features/firebase/sourcesDataSlice";
import { updateEquipmentData } from "../features/firebase/equipmentDataSlice";
import { updateWeaponSpecialisationData } from "../features/firebase/weaponSpecialisationDataSlice";
import { updateGadgetsData } from "../features/firebase/gadgetsDataSlice";
import { updateDCsData } from "../features/firebase/dcsDataSlice";
import { updateMenagerieData } from '../features/firebase/menagerieDataSlice';
import { updateCombatsData } from '../features/firebase/combatsDataSlice';

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

			// Collect racial modifiers data
			const racialBonusRef = ref(database, '/racial_bonuses');
			onValue(racialBonusRef, (snapshot) => {
				const data = snapshot.val();
				dispatch(updateRacialBonusData({ data: data }));
			});

			// Collect languages data
			const languagesRef = ref(database, '/languages');
			onValue(languagesRef, (snapshot) => {
				const data = snapshot.val();
				dispatch(updateLanguageData({ data: data }));
			});

			// Collect sources data
			const sourcesRef = ref(database, '/sources');
			onValue(sourcesRef, (snapshot) => {
				const data = snapshot.val();
				dispatch(updateSourcesData({ data: data }));
			});

			// Collect sources data
			const equipmentRef = ref(database, '/equipment');
			onValue(equipmentRef, (snapshot) => {
				const data = snapshot.val();
				dispatch(updateEquipmentData({ data: data }));
			});

			// Collect weapon specialisation data
			const weaponSpecialisationRef = ref(database, '/weapon_specialisations');
			onValue(weaponSpecialisationRef, (snapshot) => {
				const data = snapshot.val();
				dispatch(updateWeaponSpecialisationData({ data: data }));
			});

			// Collect gadgets data
			const gadgetsRef = ref(database, '/gadgets');
			onValue(gadgetsRef, (snapshot) => {
				const data = snapshot.val();
				dispatch(updateGadgetsData({ data: data }));
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

				if (user.uid === "LrOb5kepZdSNuzkH6qGlmIrphas1") {
					// Collect menagerie data
					const menagerieRef = ref(database, `/menagerie`);
					onValue(menagerieRef, (snapshot) => {
						const data = snapshot.val();
						dispatch(updateMenagerieData({ data: data }));
					});

					// Collect combats data
					const combatsRef = ref(database, `/combats`);
					onValue(combatsRef, (snapshot) => {
						const data = snapshot.val();
						dispatch(updateCombatsData({ data: data }));
					});

					// Collect dcs data
					const dcsRef = ref(database, '/dcs');
					onValue(dcsRef, (snapshot) => {
						const data = snapshot.val();
						dispatch(updateDCsData({ data: data }));
					});
				}
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