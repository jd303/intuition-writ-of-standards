import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import Header from "../Components/Header/Header";
import { InputBox } from './components/InputBox';
import { PurchaseablePointGroup } from "./components/PurchaseablePointGroup";
import { CircleStatusGroup } from "./components/CircleStatusGroup";
import { Move } from './components/Move';
import { PageTitle } from "../Components/PageTitle/PageTitle";
import { Footer } from "../../components/Components/Footer/Footer";
import { StatusEffect } from "./components/StatusEffect";

import Character from "./CharacterHandler";
import { prepareMovesAndMods } from "../../utils/prepareMovesAndMods";

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

import st from './CharacterSheetPage.module.scss';
import { CircleStatus } from "./components/CircleStatus";

function CharacterSheetPage() {
	const getMaxPoints = () => 20 + numSessions;
	const getAvailablePoints = (manualMaxPoints) => (manualMaxPoints || maxPoints) - character.purchases.spentPoints;

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
	const sections = ['Core', 'Wellness', 'Defences', 'Combat', 'Moves', 'Magic', 'Psionics', 'Notes', 'Inventory'];
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
		setLevelDownMode(false);
	}
	const [levelDownMode, setLevelDownMode] = useState(false);
	const toggleLeveDownMode = () => {
		setLevelDownMode(!levelDownMode);
		setLevelUpMode(false);
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

	// Character Data
	const characterInitial = new Character();
	const [numSessions, setNumSessions] = useState(20);
	const [maxPoints, setMaxPoints] = useState(getMaxPoints());
	const [character, setCharacter] = useState(characterInitial.loadCharacter());
	const [availablePoints, setAvailablePoints] = useState(getAvailablePoints());

	const adjustPoints = (purchaseKey) => {
		let addingMode = levelUpMode ? true : false;
		if (addingMode && availablePoints < 1) return false;

		const purchaseArray = purchaseKey.split(".");
		character.adjustPoint(addingMode, ...purchaseArray);
		const purchasesCopy = character.purchases;
		const newCharacter = new Character(purchasesCopy);
		setCharacter(newCharacter);
		setAvailablePoints(getAvailablePoints());
		
		if (addingMode && getAvailablePoints() < 1) {
			setLevelUpMode(false);
		} else if (!addingMode && getAvailablePoints() == maxPoints) {
			setLevelDownMode(false);
		}
	}

	const updateInputCharacterName = (value) => {
		console.log("UPDATE NAME: DO SOMETHING WITH THIS", value);
	}

	const updateInputSessionCount = (value) => {
		const asNum = Number(value);
		setNumSessions(asNum);
		setMaxPoints(20 + asNum);
	}
	useEffect(() => {
		setAvailablePoints(getAvailablePoints());
	}, [maxPoints]);

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
			<div className={"mainContent " + (levelUpMode && ' characterSheetLevelUpMode ' || '') + (levelDownMode && ' characterSheetLevelDownMode ' || '')}>
				<section className={st.open}>
					<div className={st.vitaeLayout}>
						<img className={st.profileImage} src={GenericProfile} alt="Character Image" />
						<div className={st.about}>
							<div className={st.standardFlex}>
								<div className={st.headingMedium}>Name</div> <InputBox val="Juniper The Red" onUpdate={updateInputCharacterName} />
							</div>
							<div className={st.standardFlex}>
								<div className={st.headingMedium}>Sessions</div> <InputBox type="number" val={numSessions} onUpdate={updateInputSessionCount} />
							</div>
							<div className={st.standardFlex}>
								<div className={st.headingMedium}>Points</div> <InputBox val={`${character.purchases.spentPoints} / ${maxPoints.toString()}`} disabled={true} debug={true} /> <div className={st.sessionPoints + ' ' + st.littleNote}>20 + num sessions</div>
							</div>
							<div className={st.standardFlex}><div className={st.headingMedium}>Race</div> <InputBox val="Human" /></div>
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
								<div className={st.standardFlex}><div className={st.headingMedium}>Abilities</div> <div className={st.littleNote}>(Max 18 points)</div></div>
								<div className={st.list}>
									{stats.map((stat, index) => (
										<div className={st.stat} key={index}>
											<img src={abilityIcons[index]} alt="Icon" />
											<div className={st.statName + ' ' + st.fullName}><div className={st.headingSmall}>{stat.full}</div></div>
											<div className={st.statPurchases}>
												<PurchaseablePointGroup count={7} columns={7} purchased={1 + character.purchases.abilities[stat.short.toLowerCase()]} clickCallback={adjustPoints} purchaseKey={`ability.${stat.short.toLowerCase()}`} />
											</div>
										</div>
									))}
									<div className={st.statLabels}>
										<div>0</div><div>1</div><div>2</div><div>3</div><div>4</div><div>5</div><div>6</div>
									</div>
								</div>
							</div>
							<div className={st.buffs + ' ' + st.sectionMetaInner}>
								<div className={st.headingMedium}>Buffs</div> <div className={st.headingSmall}>Source</div>
								<InputBox val="STR Moves +2" /> <InputBox val='Belt' />
								<InputBox val="Combat Move +1" /> <InputBox val='Brooch' />
								<InputBox val="UDR 1" /> <InputBox val='Spell' />
								<InputBox val="" /> <InputBox val='' />
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
											<PurchaseablePointGroup count={45} columns={15} purchased={character.purchases.verve} clickCallback={adjustPoints} purchaseKey={'verve'} />
										</div>
									</div>
									<div className={st.totalAndCurrent}>
										<div className={st.standardFlex}><div className={st.headingSmall}>Total</div> <InputBox /></div>
										<div className={st.standardFlex}><div className={st.headingSmall}>Current</div> <InputBox /></div>
									</div>
								</div>
								<div className={st.stamina}>
									<div className={st.headingMedium}>Stamina</div>
									<div className={st.staminaPurchases}>
										<CircleStatus /> <CircleStatus /> <CircleStatus />
										<div className={st.staminaPointGroup}><PurchaseablePointGroup count={3} purchased={character.purchases.stamina} gap={7} clickCallback={adjustPoints} purchaseKey='stamina' /></div>
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

				<section ref={sectionRefs['Defences']} className={st.open}>
					<div className={st.collapser} onClick={toggleSection}><div className={st.headingLarge}><img className={st.titleIcon} src={isoShield} alt="" /> Defences</div></div>
					<div className={st.collapsable + ' ' + st.defencesLayout}>
						<div className={st.sectionMeta}>
							<div className={st.sectionMetaInner + ' ' + st.armourClassTable}>
								<div className={st.headingMedium + ' ' + st.headName}>Armour</div> <div className={st.fonted + ' ' + st.headLabel}>Block</div> <div className={st.fonted + ' ' + st.headLabel}>Dodge</div> <div className={st.fonted + ' ' + st.headLabel}>Disadv.</div>
								<PurchaseablePointGroup count={1} purchased={1} clickCallback={adjustPoints} purchaseKey={'armour.none'} /> <div className={st.headingSmall}>None</div> <InputBox val="2" /> <InputBox val="4" /> <InputBox val="" />
								<PurchaseablePointGroup count={1} clickCallback={adjustPoints} purchaseKey={'armour.light'} /> <div className={st.headingSmall}>Light</div> <InputBox val="3" /> <InputBox val="3" /> <InputBox val="" />
								<PurchaseablePointGroup count={1} clickCallback={adjustPoints} purchaseKey={'armour.heavy'} /> <div className={st.headingSmall}>Heavy</div> <InputBox val="4" /> <InputBox val="2" /> <InputBox val="-1sq , -2 Dex Moves" />
								<PurchaseablePointGroup count={1} clickCallback={adjustPoints} purchaseKey={'armour.shield'} /> <div className={st.headingSmall}>Shield</div> <InputBox val="1" /> <InputBox val="0" /> <InputBox val="-3 Cast" />
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
							movesAndMods['defences']?.moves?.map((move, index) => (
								<Move key={index} move={move} rollPopupToggle={rollPopupToggle} purchaseDetails={character.getMovePurchase(move.name)} clickCallback={adjustPoints}></Move>
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
								<InputBox val="Sword" /> <InputBox val="d6" /> <InputBox val="1" /> <InputBox val="3" />
								<InputBox val="Throw. Knife" /> <InputBox val="d4" /> <InputBox val="+1" /> <InputBox val="2" />
								<InputBox val="" /> <InputBox val="" /> <InputBox val="" /> <InputBox val="" />
							</div>
						</div>
						<div className={st.headingMedium + ' ' + st.movesHeader}>Moves</div>
						<div className={st.moveList}>
						{
							movesAndMods['combat']?.moves.map((move, index) => (
								<Move key={index} move={move} rollPopupToggle={rollPopupToggle} printableModsCount={7} purchaseDetails={character.getMovePurchase(move.name)} clickCallback={adjustPoints}></Move>
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
								<Move key={index} move={move} rollPopupToggle={rollPopupToggle} purchaseDetails={character.getMovePurchase(move.name)} clickCallback={adjustPoints}></Move>
							))
						}
						</div>
						<div className={st.headingMedium + ' ' + st.movesHeader}>Trained Moves</div>
						<div className={st.moveList}>
						{
							getTrainedMoves().map((move, index) => (
								<Move key={index} move={move} rollPopupToggle={rollPopupToggle} purchaseDetails={character.getMovePurchase(move.name)} clickCallback={adjustPoints}></Move>
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
									<div className={st.manaPoints}><div className={st.headingMedium}>Mana</div><PurchaseablePointGroup count={30} columns={10} clickCallback={adjustPoints} purchaseKey={'mana'} /></div>
									<div className={st.manaTotal}><div className={st.headingMedium}>Total </div><InputBox /></div>
									<div className={st.manaCurrent}><div className={st.headingMedium}>Current </div><InputBox /></div>
								</div>
							</div>
						</div>
						<div className={st.sectionMeta + ' ' + st.section2}>
							<div className={st.sectionMetaInner}>
								<div className={st.damageType}><div className={st.headingMedium}>Spells</div></div>
								<div className={st.spellChoice}><PurchaseablePointGroup count={1} clickCallback={adjustPoints} purchaseKey='spells' /><InputBox /></div>
								<div className={st.spellChoice}><PurchaseablePointGroup count={1} clickCallback={adjustPoints} purchaseKey='spells' /><InputBox /></div>
								<div className={st.spellChoice}><PurchaseablePointGroup count={1} clickCallback={adjustPoints} purchaseKey='spells' /><InputBox /></div>
								<div className={st.spellChoice}><PurchaseablePointGroup count={1} clickCallback={adjustPoints} purchaseKey='spells' /><InputBox /></div>
								<div className={st.spellChoice}><PurchaseablePointGroup count={1} clickCallback={adjustPoints} purchaseKey='spells' /><InputBox /></div>
							</div>
						</div>
						<div className={st.headingMedium + ' ' + st.movesHeader}>Moves</div>
						<div className={st.moveList}>
						{
							movesAndMods['magic']?.moves?.map((move, index) => (
								<Move key={index} move={move} rollPopupToggle={rollPopupToggle} purchaseDetails={character.getMovePurchase(move.name)} clickCallback={adjustPoints}></Move>
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
								<Move key={index} move={move} rollPopupToggle={rollPopupToggle} purchaseDetails={character.getMovePurchase(move.name)} clickCallback={adjustPoints}></Move>
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
				<button onClick={toggleLevelUpMode} style={{ display: availablePoints > 0 && 'block' || 'none' }}>Spend {availablePoints} Points</button>
				<button onClick={toggleLeveDownMode}>Remove Points</button>
			</nav>
			<Footer />
		</React.Fragment>
	);
}

export default CharacterSheetPage;
