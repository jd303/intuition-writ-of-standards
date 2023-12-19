import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import Header from "../Components/Header/Header";
import { InputBox } from './components/InputBox';
import { PurchaseablePointGroup } from "./components/PurchaseablePointGroup";
import { CircleStatusGroup } from "./components/CircleStatusGroup";
import { Move } from './components/Move';
import { PageTitle } from "../Components/PageTitle/PageTitle";
import { Footer } from "../../components/Components/Footer/Footer";

import { selectMovesData } from "../../features/firebase/movesDataSlice";
import { selectStatusData } from "../../features/firebase/statusDataSlice";

import GenericProfile from '../../assets/images/character_profiles/_Generic.Character.Male.webp';
import icoPoison from '../../assets/images/icons/ico.poison.svg';
import isoShield from '../../assets/images/icons/ico.shield.svg';
import icoWellness from '../../assets/images/icons/ico.wellness.svg';
import icoCombat from '../../assets/images/icons/ico.combat.svg';
import icoMagic from '../../assets/images/icons/ico.magic.svg';
import icoCircles from '../../assets/images/icons/ico.circles.svg';
import icoSpiral from '../../assets/images/icons/ico.spiral.svg';
import icoChevronDown from '../../assets/images/icons/ico.chevron.down.svg';
import icoFist from '../../assets/images/icons/ico.fist.svg';
import icoHeartbeat from '../../assets/images/icons/ico.heartbeat.svg';
import icoThumbsup from '../../assets/images/icons/ico.thumbsup.svg';
import icoRunningman from '../../assets/images/icons/ico.runningman.svg';
import icoPuzzlebrain from '../../assets/images/icons/ico.puzzlebrain.svg';
import icoBrain from '../../assets/images/icons/ico.brain.svg';
import icoDice from '../../assets/images/ico.dice.svg';
import icoDocument from '../../assets/images/icons/ico.document.svg';
import { prepareMovesAndMods } from "../../utils/prepareMovesAndMods";
import st from './CharacterSheetPage.module.scss';
import { StatusEffect } from "./components/StatusEffect";

function CharacterSheetPage() {
	const moves_and_mods = useSelector(selectMovesData);
	const status_data = useSelector(selectStatusData);

	const [ sheets, setSheets ] = useState([]);

	useEffect(() => {
		let characters = JSON.parse(localStorage.getItem('characters') || '[]');
		console.log("Got characters");
		setSheets(characters);
	}, []);

	const [ stats, setStats ] = useState([ { full: 'Strength', short: 'STR' }, { full: 'Constitution', short: 'CON' }, { full: 'Dexterity', short: 'DEX' }, { full: 'Intelligence', short: 'INT' }, { full: 'Wisdom', short: 'WIS' }, { full: 'Charisma', short: 'CHA' }]);

	// Icons
	const abilityIcons = [icoFist, icoHeartbeat, icoRunningman, icoBrain, icoPuzzlebrain, icoThumbsup];

	// Section expanders
	const sections = ['Core', 'Wellness', 'Defenses', 'Combat', 'Moves', 'Magic', 'Psionics', 'Notes', 'Inventory'];
	const sectionRefs = {};
	sections.forEach(section => sectionRefs[section] = useRef(null));

	const toggleSection = (e) => {
		const sectionParent = getSectionParent(e.target);
		if (sectionParent) sectionParent.classList.toggle(st.open);
	}

	const getSectionParent = (source) => {
		if (source.tagName == "SECTION") return source;
		else if (source.parentElement) return getSectionParent(source.parentElement);
		else return null;
	}

	// Rolling Popup
	const [rollBonus, setRollBonus] = useState(0);
	const rollPopup = useRef(null);
	const [rollPopupShowing, setRollPopupShowing] = useState(false);
	const rollPopupToggle = (bonus) => {
		const resultContainer = rollPopup.current.querySelector(`.${st.result}`);
		resultContainer.innerHTML = '';
		setRollBonus(bonus);
		setRollPopupShowing(true);
	}
	const closeRollPopup = () => { setRollPopupShowing(false); }

	const performRoll = () => {
		const random = Math.ceil(Math.random() * 20);
		const resultContainer = rollPopup.current.querySelector(`.${st.result}`);
		console.log(rollPopup, `.${st.result}`);
		resultContainer.innerHTML = random + rollBonus;
		console.log(`Base: ${random}, bonus: ${rollBonus}`);
	}

	const closePopup = () => {
		closeRollPopup()
	}

	// Section togglers
	const openAllSections = () => {
		Object.keys(sectionRefs).forEach(key => sectionRefs[key].current.classList.add(st.open));
	}

	const closeAllSections = () => {
		Object.keys(sectionRefs).forEach(key => sectionRefs[key].current.classList.remove(st.open));
	}

	const [levelUpMode, setLevelUpMode] = useState(false);
	const toggleLevelUpMode = () => {
		setLevelUpMode(!levelUpMode);
	}
	
	let movesAndMods = {};
	movesAndMods = prepareMovesAndMods(moves_and_mods);

	const getUntrainedMoves = () => {
		let response = [];
		if (movesAndMods['body']) response = response.concat(movesAndMods['body'].moves);
		if (movesAndMods['athletics']) response = response.concat(movesAndMods['athletics'].moves);
		if (movesAndMods['perception']) response = response.concat(movesAndMods['perception'].moves);
		if (movesAndMods['knowledge']) response = response.concat(movesAndMods['knowledge'].moves);
		if (movesAndMods['influence']) response = response.concat(movesAndMods['influence'].moves);
		if (movesAndMods['deception']) response = response.concat(movesAndMods['deception'].moves);
		if (movesAndMods['arts']) response = response.concat(movesAndMods['arts'].moves);
		return response;
	}

	const getTrainedMoves = () => {
		let response = [];
		if (movesAndMods['engineering']) response = response.concat(movesAndMods['engineering'].moves);
		if (movesAndMods['alchemy']) response = response.concat(movesAndMods['alchemy'].moves);
		return response;
	}

	// JSX
	return (
		<React.Fragment>
			<Header colour="silver" />
			<PageTitle colour="silver">Character Sheets</PageTitle>
			<div className={st.rollPopup + ' ' + (rollPopupShowing && st.open || '')} ref={rollPopup}>
				<button className={st.closer} onClick={closeRollPopup}>Close</button>
				<div className={st.hider} onClick={closePopup}></div>
				<div className={st.content + ' ' + st.rollContent}>
					<div className={st.headingMedium}>Roll for Move:</div>
					<button onClick={performRoll}><img className={st.diceRollImage} src={icoDice} alt="Roll this Move" /></button> <div className={st.fonted}>Bonus: {rollBonus}</div> <div className={st.fonted}>=</div> <div className={st.result + ' ' + st.fonted}>Total: </div>					
				</div>
			</div>
			<div className={"mainContent " + (levelUpMode && 'characterSheetLevelUpMode' || '')}>
				<section className={st.open}>
					<div className={st.vitaeLayout}>
						<img className={st.profileImage} src={GenericProfile} alt="Character Image" />
						<div className={st.about}>
							<div className={st.standardFlex}>
								<div className={st.headingMedium}>Name</div> <InputBox value="Juniper The Red" />
							</div>
							<div className={st.standardFlex}>
								<div className={st.headingMedium}>Sessions</div> <InputBox value="20" />
							</div>
							<div className={st.standardFlex}>
								<div className={st.headingMedium}>Points</div> <InputBox value="40" /> <div className={st.sessionPoints + ' ' + st.littleNote}>20 + num sessions</div>
							</div>
							<div className={st.standardFlex}><div className={st.headingMedium}>Race</div> <InputBox value="Human" /></div>
							<div className={st.racialBonuses}>
								<div className={st.headingMedium}>Racial Bonuses</div>
								<InputBox />
								<InputBox />
								<InputBox />
							</div>
						</div>
					</div>
				</section>

				<section ref={sectionRefs['Core']} className={st.open}>
					<div className={st.collapser} onClick={toggleSection}><div className={st.headingLarge}><img className={st.titleIcon} src={icoPoison} alt="" /> Core</div></div>
					<div  className={st.collapsable + ' ' + st.abilitiesLayout}>
						<div className={st.sectionMeta}>
							<div className={st.stats + ' ' + st.sectionMetaInner}>
								<div className={st.standardFlex}><div className={st.headingMedium}>Abilities</div> <div className={st.littleNote}>(Max 15 points)</div></div>
								<div className={st.list}>
									{stats.map((stat, index) => (
										<div className={st.stat} key={index}>
											<img src={abilityIcons[index]} alt="Icon" />
											<div className={st.statName + ' ' + st.fullName}><div className={st.headingSmall}>{stat.full}</div></div>
											<div className={st.statPurchases}>
												<PurchaseablePointGroup count={7} columns={7} purchased={2} />
											</div>
										</div>
									))}
								</div>
							</div>
							<div className={st.buffs + ' ' + st.sectionMetaInner}>
								<div className={st.headingMedium}>Buffs</div> <div className={st.headingSmall}>Source</div>
								<InputBox value="STR Moves +2" /> <InputBox value='Belt' />
								<InputBox value="Combat Move +1" /> <InputBox value='Brooch' />
								<InputBox value="UDR 1" /> <InputBox value='Spell' />
								<InputBox value="" /> <InputBox value='' />
							</div>
						</div>
					</div>
				</section>

				<section ref={sectionRefs['Wellness']} className={st.open}>
					<div className={st.collapser} onClick={toggleSection}><div className={st.headingLarge}><img className={st.titleIcon} src={icoWellness} alt="" /> Wellness</div></div>
					<div className={st.collapsable + ' ' + st.wellnessLayout}>
						<div className={st.sectionMeta}>
							<div className={st.sectionMetaInner}>
								<div className={st.verve}>
									<div className={st.titleAndPoints}>
										<div className={st.title}><div className={st.headingMedium}>Verve</div> <div className={st.littleNote}>3/point</div></div>
										<div className={st.healthPurchases}>
											<PurchaseablePointGroup count={45} columns={15} />
										</div>
									</div>
									<div className={st.totalAndCurrent}>
										<div className={st.standardFlex}><div className={st.headingSmall}>Total</div> <InputBox /></div>
										<div className={st.standardFlex}><div className={st.headingSmall}>Current</div> <InputBox /></div>
									</div>
								</div>
							</div>
							<div className={st.sectionMetaInner}>
								<div className={st.status}>
									<div className={st.headingMedium}>Statuses</div>
									{
										status_data.filter((item) => item.type == "short (1)").map((status, index) => (
											<StatusEffect key={index} status={status} />
										))
									}
									{
										status_data.filter((item) => item.type == "standard (3)").map((status, index) => (
											<StatusEffect key={index} status={status} />
										))
									}
									{
										status_data.filter((item) => item.type == "long (∞)").map((status, index) => (
											<StatusEffect key={index} status={status} />
										))
									}
								</div>
							</div>
						</div>
					</div>
				</section>

				<section ref={sectionRefs['Defenses']} className={st.open}>
					<div className={st.collapser} onClick={toggleSection}><div className={st.headingLarge}><img className={st.titleIcon} src={isoShield} alt="" /> Defenses</div></div>
					<div className={st.collapsable + ' ' + st.defensesLayout}>
						<div className={st.sectionMeta}>
							<div className={st.sectionMetaInner + ' ' + st.armourClassTable}>
								<div className={st.headingMedium + ' ' + st.headName}>Armour</div> <div className={st.fonted + ' ' + st.headLabel}>Block</div> <div className={st.fonted + ' ' + st.headLabel}>Dodge</div> <div className={st.fonted + ' ' + st.headLabel}>Disadv.</div>
								<PurchaseablePointGroup count={1} /> <div className={st.headingSmall}>None</div> <InputBox value="2" /> <InputBox value="4" /> <InputBox value="" />
								<PurchaseablePointGroup count={1} /> <div className={st.headingSmall}>Light</div> <InputBox value="3" /> <InputBox value="3" /> <InputBox value="" />
								<PurchaseablePointGroup count={1} /> <div className={st.headingSmall}>Heavy</div> <InputBox value="4" /> <InputBox value="2" /> <InputBox value="-1sq , -2 Dex Moves" />
								<PurchaseablePointGroup count={1} /> <div className={st.headingSmall}>Shield</div> <InputBox value="1" /> <InputBox value="0" /> <InputBox value="-3 Cast" />
							</div>

							<div className={st.sectionMetaInner + ' ' + st.resistanceTable}>
								<div className={st.headingMedium + ' ' + st.headName}>Resistances</div>  <div className={st.narrowFlex}><div className={st.fonted + ' ' + st.headLabel}>+3</div> <div className={st.fonted + ' ' + st.headLabel}>+5</div> <div className={st.fonted + ' ' + st.headLabel}>+10</div></div>
								<div className={st.headingSmall}>Universal (UDR)</div> <div className={st.standardFlex}><CircleStatusGroup count={3} gap={5} /></div>
								<div className={st.headingSmall}>Physical (PDR)</div> <div className={st.standardFlex}><CircleStatusGroup count={3} gap={5} /></div>
								<div className={st.headingSmall}>Magic (PDR)</div> <div className={st.standardFlex}><CircleStatusGroup count={3} gap={5} /></div>
								<div className={st.headingSmall}>Soul (SDR)</div> <div className={st.standardFlex}><CircleStatusGroup count={3} gap={5} /></div>
							</div>

							<div className={st.resistanceTable}>
							<div className={st.headingMedium + ' ' + st.headName}>Resistances</div> <div className={st.narrowFlex}><div className={st.fonted + ' ' + st.headLabel}>+3</div> <div className={st.fonted + ' ' + st.headLabel}>+5</div> <div className={st.fonted + ' ' + st.headLabel}>+10</div></div>
								<div className={st.headingSmall}>Fire (FDR)</div> <div className={st.standardFlex}><CircleStatusGroup count={3} gap={5} /></div>
								<div className={st.headingSmall}>Cold (CDR)</div> <div className={st.standardFlex}><CircleStatusGroup count={3} gap={5} /></div>
								<div className={st.headingSmall}>Lightning (LDR)</div> <div className={st.standardFlex}><CircleStatusGroup count={3} gap={5} /></div>
								<div className={st.headingSmall}>Poisons (PoDR)</div> <div className={st.standardFlex}><CircleStatusGroup count={3} gap={5} /></div>
							</div>
						</div>
						<div className={st.headingMedium + ' ' + st.movesHeader}>Moves</div>
						<div className={st.moveList}>
						{
							movesAndMods['defenses']?.moves?.map((move, index) => (
								<Move key={index} move={move} rollPopupToggle={rollPopupToggle}></Move>
							))
						}
						</div>
					</div>
				</section>

				<section ref={sectionRefs['Combat']} className={st.open}>
					<div className={st.collapser} onClick={toggleSection}><div className={st.headingLarge}><img className={st.titleIcon} src={icoCombat} alt="" /> Combat</div></div>
					<div className={st.collapsable + ' ' + st.combatLayout}>
						<div className={st.sectionMeta}>
							<div className={st.sectionMetaInner + ' ' + st.weaponTable}>
								<div className={st.headingMedium + ' ' + st.headName}>Weapon</div> <div className={st.fonted + ' ' + st.headLabel}>Base</div> <div className={st.fonted + ' ' + st.headLabel}>Bonus</div> <div className={st.fonted + ' ' + st.headLabel}>STR</div>
								<InputBox value="Sword" /> <InputBox value="d6" /> <InputBox value="1" /> <InputBox value="3" />
								<InputBox value="Throw. Knife" /> <InputBox value="d4" /> <InputBox value="+1" /> <InputBox value="2" />
								<InputBox value="" /> <InputBox value="" /> <InputBox value="" /> <InputBox value="" />
							</div>
						</div>
						<div className={st.headingMedium + ' ' + st.movesHeader}>Moves</div>
						<div className={st.moveList}>
						{
							movesAndMods['combat']?.moves.map((move, index) => (
								<Move key={index} move={move} rollPopupToggle={rollPopupToggle} printableModsCount={7}></Move>
							))
						}
						</div>
					</div>
				</section>

				<section ref={sectionRefs['Moves']} className={st.open}>
					<div className={st.collapser} onClick={toggleSection}><div className={st.headingLarge}><img className={st.titleIcon} src={icoCircles} alt="" /> Moves</div></div>
					<div className={st.collapsable + ' ' + st.movesLayout}>
						<div className={st.headingMedium + ' ' + st.movesHeader}>Untrained Moves</div>
						<div className={st.moveList}>
						{
							getUntrainedMoves().map((move, index) => (
								<Move key={index} move={move} rollPopupToggle={rollPopupToggle}></Move>
							))
						}
						</div>
						<div className={st.headingMedium + ' ' + st.movesHeader}>Trained Moves</div>
						<div className={st.moveList}>
						{
							getTrainedMoves().map((move, index) => (
								<Move key={index} move={move} rollPopupToggle={rollPopupToggle}></Move>
							))
						}
						</div>
					</div>
				</section>

				<section ref={sectionRefs['Magic']} className={st.open}>
					<div className={st.collapser} onClick={toggleSection}><div className={st.headingLarge}><img className={st.titleIcon} src={icoMagic} alt="" /> Magic</div></div>
					<div className={st.collapsable + ' ' + st.magicLayout}>
						<div className={st.sectionMeta + ' ' + st.section1}>
							<div className={st.sectionMetaInner}>
								<div className={st.standardFlex}><div className={st.headingMedium}>Source </div><InputBox /></div>
							</div>
							<div className={st.sectionMetaInner}>
								<div className={st.manaContainer}>
									<div className={st.manaPoints}><div className={st.headingMedium}>Mana</div><PurchaseablePointGroup count={30} columns={10} /></div>
									<div className={st.manaTotal}><div className={st.headingMedium}>Total </div><InputBox /></div>
									<div className={st.manaCurrent}><div className={st.headingMedium}>Current </div><InputBox /></div>
								</div>
							</div>
						</div>
						<div className={st.sectionMeta + ' ' + st.section2}>
							<div className={st.sectionMetaInner}>
								<div className={st.damageType}><div className={st.headingMedium}>Spells</div></div>
								<div className={st.spellChoice}><PurchaseablePointGroup count={1} /><InputBox /></div>
								<div className={st.spellChoice}><PurchaseablePointGroup count={1} /><InputBox /></div>
								<div className={st.spellChoice}><PurchaseablePointGroup count={1} /><InputBox /></div>
								<div className={st.spellChoice}><PurchaseablePointGroup count={1} /><InputBox /></div>
								<div className={st.spellChoice}><PurchaseablePointGroup count={1} /><InputBox /></div>
							</div>
						</div>
						<div className={st.headingMedium + ' ' + st.movesHeader}>Moves</div>
						<div className={st.moveList}>
						{
							movesAndMods['magic']?.moves?.map((move, index) => (
								<Move key={index} move={move} rollPopupToggle={rollPopupToggle}></Move>
							))
						}
						</div>
					</div>
				</section>
				
				<section ref={sectionRefs['Psionics']} className={st.open}>
					<div className={st.collapser} onClick={toggleSection}><div className={st.headingLarge}><img className={st.titleIcon} src={icoSpiral} alt="" /> Psionics</div></div>
					<div className={st.collapsable + ' ' + st.psionicsLayout}>
						<div className={st.headingMedium + ' ' + st.movesHeader}>Moves</div>
						<div className={st.moveList}>
						{
							movesAndMods['psonics']?.moves?.map((move, index) => (
								<Move key={index} move={move} rollPopupToggle={rollPopupToggle}></Move>
							))
						}
						</div>
					</div>
				</section>
				
				<section ref={sectionRefs['Inventory']} className={st.open}>
					<div className={st.collapser} onClick={toggleSection}><div className={st.headingLarge}><img className={st.titleIcon} src={icoDocument} alt="" /> Inventory</div></div>
					<div className={st.collapsable + ' ' + st.inventoryLayout}>
						<InputBox /> <InputBox />
						<InputBox /> <InputBox />
						<InputBox /> <InputBox />
						<InputBox /> <InputBox />
						<InputBox /> <InputBox />
						<InputBox /> <InputBox />
						<InputBox /> <InputBox />
						<InputBox /> <InputBox />
						<InputBox /> <InputBox />
						<InputBox /> <InputBox />
						<InputBox /> <InputBox />
						<InputBox /> <InputBox />
						<InputBox /> <InputBox />
						<InputBox /> <InputBox />
						<InputBox /> <InputBox />
						<InputBox /> <InputBox />
						<InputBox /> <InputBox />
					</div>
				</section>

				<section ref={sectionRefs['Notes']} className={st.open}>
					<div className={st.collapser} onClick={toggleSection}><div className={st.headingLarge}><img className={st.titleIcon} src={icoDocument} alt="" /> Notes</div></div>
					<div className={st.collapsable + ' ' + st.notesLayout}>
						<InputBox />
						<InputBox />
						<InputBox />
						<InputBox />
						<InputBox />
						<InputBox />
						<InputBox />
						<InputBox />
						<InputBox />
						<InputBox />
						<InputBox />
						<InputBox />
						<InputBox />
						<InputBox />
						<InputBox />
						<InputBox />
						<InputBox />
						<InputBox />
						<InputBox />
						<InputBox />
						<InputBox />
						<InputBox />
						<InputBox />
						<InputBox />
						<InputBox />
					</div>
				</section>
			</div>
			
			<nav className={st.controlBar}>
				<button onClick={closeAllSections}><img src={icoChevronDown} /></button>
				<button onClick={openAllSections}><img src={icoChevronDown} className={st.flipY} /></button>
				<button onClick={toggleLevelUpMode}>Spend Points</button>
			</nav>
			<Footer />
		</React.Fragment>
	);
}

export default CharacterSheetPage;
