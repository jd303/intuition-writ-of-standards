import React, { useState, useEffect, useRef, createContext } from "react";
import { useSelector } from "react-redux";
import { useParams } from 'react-router';
import { useDebounce } from "@uidotdev/usehooks";
import { writeDataForCurrentUser } from '../../utils/writeDataForCurrentUser';
import Header from "../Components/Header/Header";
import { InputBox } from './components/InputBox';
import { Dropdown } from './components/Dropdown';
import { PurchaseablePointGroup } from "./components/PurchaseablePointGroup";
import { CircleStatusGroup } from "./components/CircleStatusGroup";
import { Move } from './components/Move';
import { PageTitle } from "../Components/PageTitle/PageTitle";
import { Footer } from "../../components/Components/Footer/Footer";
import { StatusEffect } from "./components/StatusEffect";
import { CharacterObject } from "./CharacterHandler";
import { prepareMovesAndMods } from "../../utils/prepareMovesAndMods";
import { selectMovesData } from "../../features/firebase/movesDataSlice";
import { selectStatusData } from "../../features/firebase/statusDataSlice";
import { useAuthState } from "../../firebase";
import { Navigate } from "react-router-dom";
import { selectCharactersData } from "../../features/firebase/charactersDataSlice";
import RollingPopup from "./RollingPopup";

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
import icoDocument from '../../assets/images/icons/ico.document.svg';

import st from './CharacterSheetPage.module.scss';

export const CharacterContext = createContext();

function CharacterSheetPage() {
	const debounceSaveTime = 2000;

	const { isAuthenticated } = useAuthState();
	if (isAuthenticated === false) return <Navigate to="/account" />

	// Params and data
	const params = useParams();
	const moves_and_mods = useSelector(selectMovesData);
	const status_data = useSelector(selectStatusData);
	let charactersData = useSelector(selectCharactersData);
	console.log("CHARS", charactersData);

	// Moves Data
	let movesAndMods = {};
	movesAndMods = prepareMovesAndMods(moves_and_mods);

	const getUntrainedMoves = () => {
		let response = [];
		if (movesAndMods['athletics']) response = response.concat(movesAndMods['athletics'].moves);
		if (movesAndMods['body']) response = response.concat(movesAndMods['body'].moves);
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
		if (movesAndMods['inner_power']) response = response.concat(movesAndMods['inner_power'].moves);
		return response;
	}

	// Static Data
	const stats = [ { full: 'Strength', short: 'STR' }, { full: 'Constitution', short: 'CON' }, { full: 'Dexterity', short: 'DEX' }, { full: 'Intelligence', short: 'INT' }, { full: 'Wisdom', short: 'WIS' }, { full: 'Charisma', short: 'CHA' }];
	const bonusDice = [ "d4", "d6", "d8", "d10", "2d6", "2d8", "2d10" ];
	const sources = [ "Summer", "Autumn", "Winter", "Spring" ];
	const magical_synergies = [ "Pyral (fire)", "Cryal (cold)", "Arcanic (pure)", "Electric (Lightning)", "Acidic (Acid)", "Luminal (Light)", "Umbral (Decay)", "Sonic (Sound)", "Zephyral (Wind)" ];
	const weapon_specialisations = [ { "name": "Swords", "value": "Does thing" } ];
	const abilityIcons = [icoFist, icoHeartbeat, icoRunningman, icoBrain, icoPuzzlebrain, icoThumbsup];

	// Rolling Popup
	const [rollBonus, setRollBonus] = useState(0);
	const [rollMoveName, setRollMoveName] = useState('');
	const [rollPopupShowing, setRollPopupShowing] = useState(false);
	const toggleRollPopup = (name, bonus) => {
		setRollMoveName(name);
		setRollBonus(bonus);
		setRollPopupShowing(true);
	}
	const closeRollPopup = () => { setRollPopupShowing(false); }

	// Section Expanders
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

	// Bottom Menu Options
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
	
	// Character Data
	const current_character_data = charactersData?.find(char => char.id == params.id);
	if (!current_character_data) return <Navigate to="/characters" />
	
	// Setup the character
	const characterObject = new CharacterObject(current_character_data);
	const [theCharacter, setTheCharacter] = useState(characterObject);
	const [maxPoints, setMaxPoints] = useState(characterObject.getMaxPoints());
	const [availablePoints, setAvailablePoints] = useState(theCharacter.getAvailablePoints());
	const debouncedCharacter = useDebounce(theCharacter, debounceSaveTime);

	const updateValueFromInput = (property, valueProp, isNumber = false) => {
		const value = isNumber && Number(valueProp) || valueProp;
		const isArray = property.includes("[");
		const isObject = property.includes(".");
		const isArrayAndObject = isArray && isObject;
		const newCharacter = new CharacterObject(structuredClone(theCharacter.characterData));

		let parentProperty, arrayIndex, childProperty;

		switch (true) {
			case isArrayAndObject:
				parentProperty = property.substring(0, property.indexOf("["));
				arrayIndex = property.substring(property.indexOf("[") + 1, property.indexOf("]"));
				childProperty = property.substring(property.indexOf(".") + 1);
				if (!newCharacter.characterData[parentProperty]) newCharacter.characterData[parentProperty] = [];
				if (!newCharacter.characterData[parentProperty][arrayIndex]) newCharacter.characterData[parentProperty][arrayIndex] = {};
				if (!newCharacter.characterData[parentProperty][arrayIndex][childProperty]) newCharacter.characterData[parentProperty][arrayIndex][childProperty] = '';

				console.log(parentProperty, arrayIndex, childProperty);
				newCharacter.characterData[parentProperty][Number(arrayIndex)][childProperty] = value;
			break;
			case isArray:
				parentProperty = property.substring(0, property.indexOf("["));
				arrayIndex = property.substring(property.indexOf("[") + 1, property.indexOf("]"));
				if (!newCharacter.characterData[parentProperty]) newCharacter.characterData[parentProperty] = [];

				newCharacter.characterData[parentProperty][Number(arrayIndex)] = value;
			break;
			case isObject:
				parentProperty = property.substring(0, property.indexOf("."));
				childProperty = property.substring(property.indexOf(".") + 1);
				if (!newCharacter.characterData[parentProperty]) newCharacter.characterData[parentProperty] = undefined;

				newCharacter.characterData[parentProperty][childProperty] = value;
			break;
			default:
				newCharacter.characterData[property] = value;
		}

		setTheCharacter(newCharacter);
		setAvailablePoints(newCharacter.getAvailablePoints());
		setMaxPoints(newCharacter.getMaxPoints());
	}

	const adjustPoints = (purchaseKey) => {
		let addingMode = levelUpMode ? true : false;
		if (addingMode && availablePoints < 1) return false;

		const purchaseArray = purchaseKey.split(".");
		const newCharacter = new CharacterObject(structuredClone(theCharacter.characterData));
		const success = newCharacter.adjustPoint(addingMode, ...purchaseArray);

		if (success) {
			setTheCharacter(newCharacter);
			setAvailablePoints(newCharacter.getAvailablePoints());
			setMaxPoints(newCharacter.getMaxPoints());

			if (addingMode && newCharacter.getAvailablePoints() < 1) {
				setLevelUpMode(false);
			} else if (!addingMode && newCharacter.getAvailablePoints() == maxPoints) {
				setLevelDownMode(false);
			}
		} else {
			console.log("ERROR Saving");
		}
	}

	const adjustCircleStatus = (circleStatusKey, circleStatusValue) => {
		const newCharacter = new CharacterObject(structuredClone(theCharacter.characterData));
		const success = newCharacter.adjustCircleStatus(circleStatusKey, circleStatusValue);

		if (success) setTheCharacter(newCharacter);
		else console.log("ERROR Saving");
	}

	useEffect(() => {
		setAvailablePoints(theCharacter.getAvailablePoints());
	}, [theCharacter.characterData.sessions]);

	useEffect(() => {
		console.log("Saving the character");
		saveCharacter();
	}, [debouncedCharacter]);

	// Save the characters
	const saveCharacter = () => {
		charactersData = charactersData.map(char => char.id == theCharacter.characterData.id && theCharacter.characterData || char);
		writeDataForCurrentUser(charactersData);
	}

	// JSX
	return (
		<CharacterContext.Provider value={theCharacter}>
			<Header colour="silver" />
			<PageTitle colour="silver">Character Sheets</PageTitle>
			<RollingPopup showPopupProp={rollPopupShowing} rollMoveNameProp={rollMoveName} rollBonusProp={rollBonus} closeRollPopupProp={closeRollPopup} />
			<div className={"mainContent " + (levelUpMode && ' characterSheetLevelUpMode ' || '') + (levelDownMode && ' characterSheetLevelDownMode ' || '')}>
				<section className={st.open}>
					<div className={st.vitaeLayout}>
						<img className={st.profileImage} src={GenericProfile} alt="Character Image" />
						<div className={st.about}>
							<div className={st.standardFlex}>
								<div className={st.headingMedium}>Name</div> <InputBox val={theCharacter.characterData.name} onUpdate={(value) => updateValueFromInput('name', value)} />
							</div>
							<div className={st.standardFlex}>
								<div className={st.headingMedium}>Sessions</div> <InputBox type="number" val={theCharacter.characterData.sessions} onUpdate={(value) => updateValueFromInput('sessions', value, true)} />
							</div>
							<div className={st.standardFlex}>
								<div className={st.headingMedium}>Points</div> <InputBox val={`${theCharacter.characterData.purchases.spentPoints} / ${theCharacter.getMaxPoints()}`} disabled={true} />
								<div className={st.headingSmall}>Bonus </div> <InputBox val={theCharacter.characterData.purchases.bonusPoints} onUpdate={(value) => updateValueFromInput('bonusPoints', value, true)} type="number" />
								<div className={st.sessionPoints + ' ' + st.littleNote}>{theCharacter.baseCharacterPoints} + num sessions</div>
							</div>
							<div className={st.standardFlex}><div className={st.headingMedium}>Race</div> <InputBox val={theCharacter.characterData.race} onUpdate={(value) => updateValueFromInput('race', value)} /></div>
							<div className={st.standardFlex}><div className={st.headingMedium}>Move sq.</div> <InputBox val={theCharacter.characterData.movesq} onUpdate={(value) => updateValueFromInput('movesq', value)} /></div>
							<div className={st.racialModifiers}>
								<div className={st.headingMedium}>Racial Modifiers</div>
								<InputBox val={theCharacter.characterData.racial_modifiers[0]} onUpdate={(value) => updateValueFromInput('racial_modifiers[0]', value)} />
								<InputBox val={theCharacter.characterData.racial_modifiers[1]} onUpdate={(value) => updateValueFromInput('racial_modifiers[1]', value)} />
								<InputBox val={theCharacter.characterData.racial_modifiers[2]} onUpdate={(value) => updateValueFromInput('racial_modifiers[2]', value)} />
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
												<PurchaseablePointGroup count={7} columns={7} automaticPurchases={1} purchased={theCharacter.characterData.purchases.abilities[stat.short.toLowerCase()]} clickCallback={adjustPoints} purchaseKey={`ability.${stat.short.toLowerCase()}`} />
											</div>
										</div>
									))}
									<div className={st.statLabels}>
										<div>0</div><div>1</div><div>2</div><div>3</div><div>4</div><div>5</div><div>6</div>
									</div>
								</div>
							</div>
							<div className={st.buffs + ' ' + st.sectionMetaInner}>
								<div className={st.standardFlex}><div className={st.headingMedium}>Buffs</div><span className={st.littleNote}>Effect + Source</span></div>
								{Array.from(Array(5)).map((i, index) => (
									<div className={st.buffDetails} key={index}><InputBox placeholder="Effect - Source" val={theCharacter.characterData.buffs[index]} onUpdate={(value) => updateValueFromInput(`buffs[${index}]`, value)} /></div>
								))}
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
										<div className={st.title}><div className={st.headingMedium}>Verve</div> <div className={st.littleNote}>{theCharacter.baseVerve} + 3/point</div></div>
										<div className={st.healthPurchases}>
											<PurchaseablePointGroup count={45} columns={15} purchased={theCharacter.characterData.purchases.verve} clickCallback={adjustPoints} purchaseKey={'verve'} />
										</div>
									</div>
									<div className={st.totalAndCurrent}>
										<div className={st.standardFlex}><div className={st.headingSmall}>Bonus</div> <InputBox val={theCharacter.characterData.bonus_verve} onUpdate={(value) => updateValueFromInput(`bonus_verve`, value)} type="number" /></div>
										<div className={st.standardFlex}><div className={st.headingSmall}>Total</div> <InputBox val={theCharacter.baseVerve + Number(theCharacter.characterData.bonus_verve) + theCharacter.characterData.purchases.verve * 3} disabled={true} /></div>
										<div className={st.standardFlex}><div className={st.headingSmall}>Current</div> <InputBox val={theCharacter.characterData.current_verve} onUpdate={(value) => updateValueFromInput(`current_verve`, value)} /></div>
									</div>
								</div>
								<div className={st.stamina}>
									<div className={st.headingMedium}>Stamina</div>
									<div className={st.staminaPurchases}>
										<CircleStatusGroup count={3} columns={3} gap={7} usedKey="stamina" clickCallback={adjustCircleStatus} />
										<div className={st.staminaPointGroup}><PurchaseablePointGroup count={3} purchased={theCharacter.characterData.purchases.stamina} gap={9} clickCallback={adjustPoints} purchaseKey='stamina' /></div>
									</div>
								</div>
							</div>
							<div className={st.sectionMetaInner}>
								<div className={st.status}>
									<div className={st.headingMedium}>Statuses</div>
									{
										status_data.filter((item) => item.type == "short (1)").map((status, index) => (
											<StatusEffect key={index} status={status} circleStatusClickCallback={adjustCircleStatus} />
										))
									}
									{
										status_data.filter((item) => item.type == "standard (3)").map((status, index) => (
											<StatusEffect key={index} status={status} circleStatusClickCallback={adjustCircleStatus} />
										))
									}
									{
										status_data.filter((item) => item.type == "long (∞)").map((status, index) => (
											<StatusEffect key={index} status={status} circleStatusClickCallback={adjustCircleStatus} />
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
							<div className={st.sectionMetaInner}>
								<div className={st.armourHeader}>
									<div className={st.headingMedium + ' ' + st.headName}>Armour</div>
									<div className={st.fonted + ' ' + st.headLabel}>Block</div>
									<div className={st.fonted + ' ' + st.headLabel}>Dodge</div>
									<div className={st.fonted + ' ' + st.headLabel}>Disadv.</div>
								</div>
								{Array.from(Array(3)).map((i, index) => (
									<div key={`'armour-${index}`} className={st.armourItem}>
										<InputBox val={theCharacter.characterData.armours[index]?.name} onUpdate={(value) => updateValueFromInput(`armours[${index}].name`, value, true)} />
										<InputBox val={theCharacter.characterData.armours[index]?.block} onUpdate={(value) => updateValueFromInput(`armours[${index}].block`, value, true)} />
										<InputBox val={theCharacter.characterData.armours[index]?.dodge} onUpdate={(value) => updateValueFromInput(`armours[${index}].dodge`, value, true)} />
										<InputBox val={theCharacter.characterData.armours[index]?.disadvantages} onUpdate={(value) => updateValueFromInput(`armours[${index}].disadvantages`, value, true)} />
									</div>
								))}
							</div>

							<div className={st.sectionMetaInner + ' ' + st.resistanceTable}>
								<div className={st.headingMedium + ' ' + st.headName}>Resistances</div>
								<div className={st.table1}>
									<div className={st.tableHeader}>
										<div className={st.headingSmall}>Damage</div>
										<div className={st.values}><div className={st.fonted + ' ' + st.headLabel}>+3</div> <div className={st.fonted + ' ' + st.headLabel}>+5</div> <div className={st.fonted + ' ' + st.headLabel}>+10</div></div>
									</div>
									<div className={st.label}>Universal (URed)</div> <div className={st.standardFlex}><CircleStatusGroup count={3} gap={5} usedKey="ured" clickCallback={adjustCircleStatus} /></div>
									<div className={st.label}>Physical (PRed)</div> <div className={st.standardFlex}><CircleStatusGroup count={3} gap={5} usedKey="pred" clickCallback={adjustCircleStatus} /></div>
									<div className={st.label}>Magic (MRed)</div> <div className={st.standardFlex}><CircleStatusGroup count={3} gap={5} usedKey="mred" clickCallback={adjustCircleStatus} /></div>
								</div>
								<div className={st.table2}>
									<div className={st.tableHeader}>
										<div className={st.headingSmall}>Elemental</div>
										<div className={st.values}><div className={st.fonted + ' ' + st.headLabel}>+3</div> <div className={st.fonted + ' ' + st.headLabel}>+5</div> <div className={st.fonted + ' ' + st.headLabel}>+10</div></div>
									</div>
									<div className={st.label}>Fire (FRes)</div> <div className={st.standardFlex}><CircleStatusGroup count={3} gap={5} usedKey="fres" clickCallback={adjustCircleStatus} /></div>
									<div className={st.label}>Cold (CRes)</div> <div className={st.standardFlex}><CircleStatusGroup count={3} gap={5} usedKey="cres" clickCallback={adjustCircleStatus} /></div>
									<div className={st.label}>Lightning (LRes)</div> <div className={st.standardFlex}><CircleStatusGroup count={3} gap={5} usedKey="lres" clickCallback={adjustCircleStatus} /></div>
									<div className={st.label}>Poisons (PRes)</div> <div className={st.standardFlex}><CircleStatusGroup count={3} gap={5} usedKey="pres" clickCallback={adjustCircleStatus} /></div>
								</div>
							</div>
						</div>
						<div className={st.headingMedium + ' ' + st.movesHeader}>Moves</div>
						<div className={st.moveList}>
						{
							movesAndMods['defences']?.moves?.map((move, index) => (
								<Move key={index} move={move} toggleRollPopup={toggleRollPopup} purchaseDetails={theCharacter.getMovePurchase(move.name)} clickCallback={adjustPoints}></Move>
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
								<div className={st.weaponsHeader}><div className={st.headingMedium + ' ' + st.headName}>Weapons</div> <div className={st.fonted + ' ' + st.headLabel}>Base</div> <div className={st.fonted + ' ' + st.headLabel}>Abilities</div></div>
								{Array.from(Array(3)).map((i, index) => (
									<div className={st.weaponFields} key={index}>
										<InputBox val={theCharacter.characterData.weapons[index]?.name} onUpdate={(value) => updateValueFromInput(`weapons[${index}].name`, value, true)} />
										<InputBox val={theCharacter.characterData.weapons[index]?.baseDamage} onUpdate={(value) => updateValueFromInput(`weapons[${index}].baseDamage`, value, true)} />
										<InputBox val={theCharacter.characterData.weapons[index]?.bonusDamage} onUpdate={(value) => updateValueFromInput(`weapons[${index}].notes`, value, true)} />
									</div>
								))}
							</div>
							<div className={st.sectionMetaInner + ' ' + st.bonusDamageTable}>
								<div className={st.headingMedium}>Bonus Dice</div>
								<div className={st.standardFlex}>
									<div className={st.headingSmall}>Melee</div> <Dropdown source={bonusDice} noDefault={true} val={theCharacter.characterData.bonus_damage.melee} onChange={(value) => updateValueFromInput('bonus_damage.melee', value, true)} />
								</div>
								<div className={st.standardFlex}>
								<div className={st.headingSmall}>Melee</div> <Dropdown source={bonusDice} noDefault={true} val={theCharacter.characterData.bonus_damage.ranged} onChange={(value) => updateValueFromInput('bonus_damage.ranged', value, true)} />
								</div>
							</div>
							<div className={st.sectionMetaInner + ' ' + st.weaponSpecialisations}>
								<div className={st.weaponsHeader}>
									<div className={st.headingMedium + ' ' + st.headName}>Specialisations <PurchaseablePointGroup count={3} purchased={theCharacter.characterData.purchases.weapon_specialisations} purchaseKey='weapon_specialisations' clickCallback={adjustPoints}  /></div>
								</div>
								{Array.from(Array(Math.min(theCharacter.characterData.purchases.weapon_specialisations, theCharacter.characterData.weapon_specialisations.length + 1))).map((i, index) => (
									<div className={st.weaponFields} key={index}>
										<Dropdown source={weapon_specialisations} val={theCharacter.characterData.weapon_specialisations[index]} onChange={(value) => updateValueFromInput(`weapon_specialisations[${index}]`, value, true)} />
									</div>
								))}
							</div>
						</div>
						<div className={st.headingMedium + ' ' + st.movesHeader}>Moves</div>
						<div className={st.moveList}>
						{
							movesAndMods['combat']?.moves.map((move, index) => (
								<Move key={index} move={move} toggleRollPopup={toggleRollPopup} printableModsCount={7} purchaseDetails={theCharacter.getMovePurchase(move.name)} clickCallback={adjustPoints}></Move>
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
								<Move key={index} move={move} toggleRollPopup={toggleRollPopup} purchaseDetails={theCharacter.getMovePurchase(move.name)} clickCallback={adjustPoints}></Move>
							))
						}
						</div>
						<div className={st.headingMedium + ' ' + st.movesHeader}>Trained Moves</div>
						<div className={st.moveList}>
						{
							getTrainedMoves().map((move, index) => (
								<Move key={index} move={move} toggleRollPopup={toggleRollPopup} purchaseDetails={theCharacter.getMovePurchase(move.name)} clickCallback={adjustPoints}></Move>
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
								<div className={st.standardFlex + ' ' + st.magicFlex}>
									<div className={st.headingMedium}>
										<PurchaseablePointGroup count={1} automaticPurchases={1} purchaseKey={'source'} clickCallback={adjustPoints} /> Source 
									</div>
									<Dropdown source={sources} val={theCharacter.characterData.source} onChange={(value) => updateValueFromInput('source', value, true)} />
								</div>
								<div className={st.standardFlex + ' ' + st.magicFlex}>
									<div className={st.headingMedium}>
										<PurchaseablePointGroup count={1} automaticPurchases={1} purchaseKey={'magical_synergy.slot1'} clickCallback={adjustPoints} /> Synergy 1 
									</div>
									<Dropdown source={magical_synergies} val={theCharacter.characterData.magical_synergy.slot1} onChange={(value) => updateValueFromInput('magical_synergy.slot1', value, true)} />
								</div>
								<div className={st.standardFlex + ' ' + st.magicFlex}>
									<div className={st.headingMedium}>
										<PurchaseablePointGroup count={1} purchased={theCharacter.characterData.purchases.magical_synergy.slot2} purchaseKey={'magical_synergy.slot2'} clickCallback={adjustPoints} /> Synergy 2 
									</div>
									<Dropdown source={magical_synergies} val={theCharacter.characterData.magical_synergy.slot2} onChange={(value) => updateValueFromInput('magical_synergy.slot2', value, true)} />
								</div>
								<div className={st.standardFlex + ' ' + st.magicFlex}>
									<div className={st.headingMedium}>
										<PurchaseablePointGroup count={1} purchased={theCharacter.characterData.purchases.magical_synergy.slot3} purchaseKey={'magical_synergy.slot3'} clickCallback={adjustPoints} /> Synergy 3 
									</div>
									<Dropdown source={magical_synergies} val={theCharacter.characterData.magical_synergy.slot3} onChange={(value) => updateValueFromInput('magical_synergy.slot3', value, true)} />
								</div>
							</div>
							<div className={st.sectionMetaInner}>
								<div className={st.manaContainer}>
									<div className={st.manaPoints}><div className={st.standardFlex}><div className={st.headingMedium}>Mana</div> <div className={st.littleNote}>{theCharacter.baseMana} + 3/point</div></div>
									<PurchaseablePointGroup count={30} columns={10} clickCallback={adjustPoints} purchased={theCharacter.characterData.purchases.mana} purchaseKey={'mana'} /></div>
									<div className={st.manaBonus}><div className={st.headingMedium}>Bonus </div><InputBox val={theCharacter.characterData.bonus_mana} onUpdate={(value) => updateValueFromInput(`bonus_mana`, value)} type="number" /></div>
									<div className={st.manaTotal}><div className={st.headingMedium}>Total </div><InputBox val={theCharacter.baseMana + Number(theCharacter.characterData.bonus_mana) + theCharacter.characterData.purchases.mana * 3} disabled={true} /></div>
									<div className={st.manaCurrent}><div className={st.headingMedium}>Current </div><InputBox val={theCharacter.characterData.current_mana} onUpdate={(value) => updateValueFromInput(`current_mana`, value)} /></div>
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
								<Move key={index} move={move} toggleRollPopup={toggleRollPopup} purchaseDetails={theCharacter.getMovePurchase(move.name)} clickCallback={adjustPoints}></Move>
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
								<Move key={index} move={move} toggleRollPopup={toggleRollPopup} purchaseDetails={theCharacter.getMovePurchase(move.name)} clickCallback={adjustPoints}></Move>
							))
						}
						</div>
					</div>
				</section>
				
				<section ref={sectionRefs['Inventory']} className={st.open}>
					<div className={st.collapser} onClick={toggleSection}><div className={st.headingLarge}><img className={st.titleIcon} src={icoDocument} alt="" /> Inventory</div></div>
					<div className={st.collapsable + ' ' + st.inventoryLayout}>
					{Array.from(Array(38)).map((i, index) => (
						<InputBox key={`inv-${index}`} val={theCharacter.characterData.inventory[index]} onUpdate={(value) => updateValueFromInput(`inventory[${index}]`, value)} />
					))}
					</div>
				</section>

				<section ref={sectionRefs['Notes']} className={st.open}>
					<div className={st.collapser} onClick={toggleSection}><div className={st.headingLarge}><img className={st.titleIcon} src={icoDocument} alt="" /> Notes</div></div>
					<div className={st.collapsable + ' ' + st.notesLayout}>
						{Array.from(Array(20)).map((i, index) => (
							<InputBox key={`notes-${index}`} val={theCharacter.characterData.notes[index]} onUpdate={(value) => updateValueFromInput(`notes[${index}]`, value)} />
						))}
					</div>
				</section>
			</div>
			
			<nav className={st.controlBar}>
				<button onClick={closeAllSections}><img src={icoChevronDown} /></button>
				<button onClick={openAllSections}><img src={icoChevronDown} className={st.flipY} /></button>
				<h3>Points:</h3>
				<button onClick={toggleLevelUpMode} className={levelUpMode ? st.active : ''} style={{ display: availablePoints > 0 && 'block' || 'none' }}>Spend ({availablePoints})</button>
				<button onClick={toggleLeveDownMode} className={levelDownMode ? st.active : ''} style={{ display: availablePoints != maxPoints && 'block' || 'none' }}>Remove</button>
			</nav>
			<Footer />
		</CharacterContext.Provider>
	);
}

export default CharacterSheetPage;
