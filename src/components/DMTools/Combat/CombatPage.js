import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useAuthState } from "../../../firebase";
import { useDebounce } from "@uidotdev/usehooks";
import { Navigate } from "react-router-dom";
import Header from "../../Components/Header/Header";
import { PageTitle } from "../../Components/PageTitle/PageTitle";
import Monster from '../Monster';
import { Footer } from "../../../components/Components/Footer/Footer";

// State
import { getDatabase, ref, set } from "firebase/database";
import { selectCombatsData } from "../../../features/firebase/combatsDataSlice";

// Styles
import st from './CombatPage.module.scss';

function CombatPage() {
	const { ...auth } = useAuthState();
	if (auth.user?.uid !== "LrOb5kepZdSNuzkH6qGlmIrphas1") return <Navigate to="/" />;

	const debounceSaveTime = 1000;

	const combat_data = useSelector(selectCombatsData);
	const [combats, setCombats] = useState(combat_data);
	const debouncedCombats = useDebounce(combats, debounceSaveTime);

	useEffect(() => {
		saveCombats();
	}, [debouncedCombats]);

	const removeCreature = (monster) => {
		setCombats({ ...combats, creatures: combats.creatures.filter(mon => mon._unique_id !== monster._unique_id) });
	}

	const newRound = () => {
		let updatedCreatures = combats.creatures;
		updatedCreatures = updatedCreatures.map(creature => {
			const newCreature = { ...creature };
			newCreature.current_charge = Math.min(newCreature.max_charge, newCreature.current_charge + 1);
			newCreature.turnTaken = false;

			if (newCreature.statuses) {
				newCreature.statuses = [...newCreature.statuses.map(status => { return { ...status } })];
				newCreature.statuses.forEach(status => status.duration -= 1);
				newCreature.statuses = newCreature.statuses.filter(status => status.duration > 0);
			}
			return newCreature;
		});
		setCombats({ ...combats, creatures: updatedCreatures });
	}

	const [isMinimal, setIsMinimal] = useState(true);
	const minimalMode = () => {
		setIsMinimal(!isMinimal);
	}

	const [quirksOpen, setQuirksOpen] = useState(false);
	const toggleQuirks = () => {
		setQuirksOpen(!quirksOpen);
	}

	const modifyMonster = (monster) => {
		setCombats(
			{
				creatures: combats.creatures.map(mon => {
					if (mon._unique_id == monster._unique_id) {
						return monster;
					}

					return mon;
				})
			}
		);
	}

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
					<em>Apply new round on player turns</em>
					<button onClick={newRound}>New Round</button>
					<button onClick={minimalMode} className={isMinimal && st.minimalMode || ''}>Minimal Mode</button>
					<button onClick={toggleQuirks} className={quirksOpen && st.quirksMode || ''}>Quirks</button>
				</header>
				<div className={[st.quirks, quirksOpen && st.open || ''].join(' ')}>
					<div className={st.block}>
						Consider quirks:
						<ul>
							<li>Defend a position or item - stop enemy approaching, or even doing enough damage to it.</li>
							<li>Last x rounds</li>
							<li>Escape, not win</li>
							<li>Get past dangerous enemies</li>
							<li>Prime target: interrupt a ritual, stop a caster, stop a thief</li>
							<li>Ever changing scene - set over chase sequence</li>
							<li>Weather: wind, beaming sun, snow, rain.</li>
							<li>Traps, caltrops, gadgets, expected items.</li>
							<li>Give a buff or boon when the players do something.</li>
							<li>Give a buff or boon to the enemies when they do something.</li>
							<li>The enemy has a fixation on a particular character.</li>
							<li>Terrain concepts:
								<ul>
									<li>Difficult terrain</li>
									<li>Fire or high wind</li>
									<li>Moving things: water, carriage, stampeding herd.</li>
									<li>Deep holes, or high elevations</li>
									<li>Barricades or defenses</li>
								</ul>
							</li>
						</ul>
					</div>
				</div>
				<div className={st.monsters}>
					{combats.creatures?.map((monster, index) => (
						<Monster key={`monster-${monster._unique_id}`} viewMode={false} minimalMode={isMinimal} monster={monster} modifyMonster={modifyMonster.bind(this)} removeClick={removeCreature} />
					))}
				</div>
			</div>
			<Footer />
		</React.Fragment>
	);
}

export default CombatPage;