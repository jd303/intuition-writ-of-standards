import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useAuthState } from "../../../firebase";
import { Navigate } from "react-router-dom";
import Header from "../../Components/Header/Header";
import { PageTitle } from "../../Components/PageTitle/PageTitle";
import Monster from '../Monster';
import { Footer } from "../../../components/Components/Footer/Footer";

// State
import { prepareMonster } from '../monsterUtils';
import { getDatabase, ref, set } from "firebase/database";
import { selectMenagerieData } from "../../../features/firebase/menagerieDataSlice";
import { selectCombatsData } from "../../../features/firebase/combatsDataSlice";

// Styles
import st from './CombatPage.module.scss';

function MenageriePage() {
	const { ...auth } = useAuthState();
	if (auth.user?.uid !== "LrOb5kepZdSNuzkH6qGlmIrphas1") return <Navigate to="/" />

	const removeCreature = (monster) => {
		setCombats({ ...combats, creatures: combats.creatures.filter(mon => mon._unique_id !== monster._unique_id) });
		saveCombats();
	}

	const newRound = () => {
		let updatedCreatures = combats.creatures;
		updatedCreatures = updatedCreatures.map(creature => {
			const newCreature = { ...creature };
			newCreature.current_charge = Math.min(newCreature.max_charge, newCreature.current_charge + 1);
			return newCreature;
		});
		setCombats({ ...combats, creatures: updatedCreatures });
		saveCombats();
	}

	const modifyMonster = () => {
		console.log("Modify");
	}

	const showMonsterVerveAdjustment = () => {
		console.log("ADust verve");
	}

	const showMonsterChargeAdjustment = () => {
		console.log("ADust Charge");
	}

	const showMonsterStatusAdd = () => {
		console.log("Add Status to monster");
	}
	const combat_data = useSelector(selectCombatsData);
	console.log(combat_data);

	const [combats, setCombats] = useState(combat_data);

	const saveCombats = () => {
		const db = getDatabase();
		set(ref(db, `combats`), combats);
	}

	/**
	 * CJSX
	 * */
	return (
		<React.Fragment>
			<Header colour="silver" />
			<PageTitle colour="silver">Combat</PageTitle>
			<div className={"mainContent " + st.combatLayout}>
				<header className={st.header}>
					{<button onClick={newRound}>New Round</button>}
				</header>
				<div className={st.monsters}>
					{combat_data.creatures?.map((monster, index) => (
						<Monster key={`monster-${monster._unique_id}`} viewMode={false} monster={monster} modifyMonster={modifyMonster} removeClick={removeCreature} />
					))}
				</div>
			</div>
			<Footer />
		</React.Fragment>
	);
}

export default MenageriePage;