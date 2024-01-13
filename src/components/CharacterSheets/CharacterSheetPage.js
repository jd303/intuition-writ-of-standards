import React, { useState, useEffect, useRef, useMemo, createContext } from "react";
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
import { selectSpellsData } from "../../features/firebase/spellsDataSlice";
import { selectSourcesData } from "../../features/firebase/sourcesDataSlice";
import { selectCharactersData } from "../../features/firebase/charactersDataSlice";
import { selectRacialBonusData } from "../../features/firebase/racialBonusDataSlice";
import { selectWeaponSpecialisationData } from "../../features/firebase/weaponSpecialisationDataSlice";
import { useAuthState } from "../../firebase";
import { Navigate } from "react-router-dom";
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
import icoP from '../../assets/images/icons/ico.p.svg';

import st from './CharacterSheetPage.module.scss';
import { selectLanguageData } from "../../features/firebase/languageDataSlice";

export const CharacterContext = createContext();

function CharacterSheetPage() {
	const debounceSaveTime = 2000;

	const { isAuthenticated } = useAuthState();
	if (isAuthenticated === false) return <Navigate to="/account" />

	// Params and data
	const params = useParams();
	const moves_and_mods = useSelector(selectMovesData);
	const status_data = useSelector(selectStatusData);
	const spells_data = useSelector(selectSpellsData);
	const sources_data = useSelector(selectSourcesData);
	const racial_bonus_data = useSelector(selectRacialBonusData);
	const languages_data = useSelector(selectLanguageData);
	const weapon_specialisations = useSelector(selectWeaponSpecialisationData);
	let charactersData = useSelector(selectCharactersData);
	console.log("CHARS", charactersData);

	// Moves Data
	let movesAndMods = {};
	movesAndMods = prepareMovesAndMods(moves_and_mods);

	const getCommonMoves = () => {
		let response = [];
		if (movesAndMods['athletics']) response = response.concat(movesAndMods['athletics'].moves);
		if (movesAndMods['body']) response = response.concat(movesAndMods['body'].moves);
		if (movesAndMods['perception']) response = response.concat(movesAndMods['perception'].moves);
		return response;
	}
	const getAdvancedMoves = () => {
		let response = [];
		if (movesAndMods['knowledge']) response = response.concat(movesAndMods['knowledge'].moves);
		if (movesAndMods['influence']) response = response.concat(movesAndMods['influence'].moves);
		if (movesAndMods['deception']) response = response.concat(movesAndMods['deception'].moves);
		if (movesAndMods['arts']) response = response.concat(movesAndMods['arts'].moves);
		return response;
	}

	const getMasterMoves = () => {
		let response = [];
		if (movesAndMods['engineering']) response = response.concat(movesAndMods['engineering'].moves);
		if (movesAndMods['alchemy']) response = response.concat(movesAndMods['alchemy'].moves);
		return response;
	}

	// Static Data
	const stats = [ { full: 'Strength', short: 'STR' }, { full: 'Constitution', short: 'CON' }, { full: 'Dexterity', short: 'DEX' }, { full: 'Intelligence', short: 'INT' }, { full: 'Wisdom', short: 'WIS' }, { full: 'Charisma', short: 'CHA' }];
	const bonusDice = [ "d4", "d6", "d8", "d10", "2d6", "2d8", "2d10" ];
	const magical_synergies = [ "Pyral (fire)", "Cryal (cold)", "Arcanic (pure)", "Electric (Lightning)", "Acidic (Acid)", "Luminal (Light)", "Umbral (Decay)", "Sonic (Sound)", "Zephyral (Wind)" ];
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
	const sections = ['Core', 'Wellness', 'Defences', 'Combat', 'Moves', 'Magic', 'Inner Power', 'Psionics', 'Notes', 'Inventory'];
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

	// Section Printables
	const [printableSections, setPrintableSections] = useState({ combat: true, magic: true, inner_power: true, psionics: true, notes: true, inventory: true });
	const togglePrintable = (type) => {
		const printables = { ...printableSections };
		printables[type] = !printables[type];
		setPrintableSections(printables);
	}
	const getPrintable = (type) => {
		if (!printableSections[type]) return ' notForPrint';
		else return '';
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

	const adjustSpell = (id, addMode = true) => {
		const newCharacter = new CharacterObject(structuredClone(theCharacter.characterData));
		const success = newCharacter.adjustSpells(id, addMode);

		if (success) setTheCharacter(newCharacter);
		else console.log("ERROR Saving");

	}

	// Spells Data
	const sourceSpells = useMemo(() => {
		return spells_data.filter(spell => spell.sources.indexOf(theCharacter.characterData.source) != -1);
	}, [spells_data, theCharacter.characterData.source]);

	const getSpellName = (id) => {
		return spells_data.find(spell => spell.id == id).name || 'missing data';
	}

	useEffect(() => {
		setAvailablePoints(theCharacter.getAvailablePoints());
	}, [theCharacter.characterData.sessions]);

	useEffect(() => {
		saveCharacter();
	}, [debouncedCharacter]);

	// Save the characters
	const saveCharacter = () => {
		// Prepare Characters
		charactersData = charactersData.map(char => char.id == theCharacter.characterData.id && theCharacter.characterData || char);
		writeDataForCurrentUser(charactersData);

		// Also create local backups
		let backups = localStorage.getItem('characterbackups');
		if (!backups) backups = { 'date': new Date().getTime(), 'bak1': charactersData, 'bak2': '', 'bak3': '' };
		else backups = JSON.parse(backups);

		const now = new Date().getTime();
		const day = 24*60*60*1000;
		if (now - backups['date'] > day) {
			backups['bak3'] = backups['bak2'];
			backups['bak2'] = backups['bak1'];
			backups['bak1'] = charactersData;
			backups['date'] = new Date().getTime();
		}

		localStorage.setItem('characterbackups', JSON.stringify(backups));
	}

	const copyCharacterBackupsToClipboard = () => {
		let textarea;
		let result;
		const string = localStorage.getItem('characterbackups');

		try {
			textarea = document.createElement('textarea');
			textarea.setAttribute('readonly', true);
			textarea.setAttribute('contenteditable', true);
			textarea.style.position = 'fixed'; // prevent scroll from jumping to the bottom when focus is set.
			textarea.value = string;

			document.body.appendChild(textarea);

			textarea.focus();
			textarea.select();

			const range = document.createRange();
			range.selectNodeContents(textarea);

			const sel = window.getSelection();
			sel.removeAllRanges();
			sel.addRange(range);

			textarea.setSelectionRange(0, textarea.value.length);
			result = document.execCommand('copy');
		} catch (err) {
			console.error(err);
			result = null;
		} finally {
			document.body.removeChild(textarea);
		}

		return true;
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
								<div className={st.headingMedium}>Name</div>
								<InputBox val={theCharacter.characterData.name} onUpdate={(value) => updateValueFromInput('name', value)} />
							</div>
							<div className={st.standardFlex}>
								<div className={st.headingMedium}>Sessions</div>
								<InputBox type="number" val={theCharacter.characterData.sessions} onUpdate={(value) => updateValueFromInput('sessions', value, true)} />
								<div className={st.sessionPoints + ' ' + st.littleNote}>{1 + Math.ceil(theCharacter.characterData.sessions / 8)} Max Move Points</div>
							</div>
							<div className={st.standardFlex}>
								<div className={st.headingMedium}>Points</div> <InputBox className="notForPrint" val={`${theCharacter.characterData.purchases.spentPoints} / ${theCharacter.getMaxPoints()}`} disabled={true} /> <InputBox className="forPrint" />
								<div className={st.headingSmall}>Bonus </div> <InputBox val={theCharacter.characterData.bonusPoints} onUpdate={(value) => updateValueFromInput('bonusPoints', value, true)} type="number" />
								<div className={st.sessionPoints + ' ' + st.littleNote}>{theCharacter.baseCharacterPoints} + num sessions</div>
							</div>
							<div className={st.standardFlex}><div className={st.headingMedium}>Race</div> <InputBox val={theCharacter.characterData.race} onUpdate={(value) => updateValueFromInput('race', value)} /></div>
							<div className={st.standardFlex}><div className={st.headingMedium}>Move sq.</div> <InputBox val={theCharacter.characterData.movesq} onUpdate={(value) => updateValueFromInput('movesq', value)} /></div>
							<div className={st.standardFlex}><div className={st.headingMedium}>Source </div><Dropdown source={sources_data} val={theCharacter.characterData.source} onChange={(value) => updateValueFromInput('source', value, false)} noDefault={true} /></div>
						</div>
						<div className={st.racialModifiers}>
							<div className={st.headingMedium}>Racial Modifiers</div>
							<Dropdown source={racial_bonus_data.filter(i => i.type == "primary")} val={theCharacter.characterData.racial_modifiers.primary} onChange={(value) => updateValueFromInput('racial_modifiers.primary', value, true)} />
							<Dropdown source={racial_bonus_data.filter(i => i.type == "secondary")} val={theCharacter.characterData.racial_modifiers.secondary} onChange={(value) => updateValueFromInput('racial_modifiers.secondary', value, true)} />
							<Dropdown source={racial_bonus_data.filter(i => i.type == "stature")} val={theCharacter.characterData.racial_modifiers.stature} onChange={(value) => updateValueFromInput('racial_modifiers.stature', value, true)} />
						</div>
						<div className={st.knownLanguages}>
							<div className={st.headingMedium}>Known Languages <PurchaseablePointGroup count={3} purchased={theCharacter.characterData.purchases.known_languages} purchaseKey='known_languages' clickCallback={adjustPoints} /></div>
							<InputBox val="Common" disabled={true} />
							{Array.from(Array(theCharacter.characterData.purchases.known_languages)).map((i, index) => (
								<Dropdown key={index} source={languages_data} val={theCharacter.characterData.known_languages[0]} onChange={(value) => updateValueFromInput(`known_languages[${0}]`, value, true)} />
							))}
						</div>
					</div>
				</section>

				<section ref={sectionRefs['Core']} className={st.open}>
					<div className={st.collapser} onClick={toggleSection}><div className={st.headingLarge}><img className={st.titleIcon} src={icoPoison} alt="" /> Core</div></div>
					<div  className={st.collapsable + ' ' + st.abilitiesLayout}>
						<div className={st.sectionMeta}>
							<div className={st.stats + ' ' + st.sectionMetaInner}>
								<div className={st.standardFlex}><div className={st.headingMedium}>Abilities</div> <div className={st.littleNote}>(Max 20 points)</div></div>
								<div className={st.list}>
									{stats.map((stat, index) => (
										<div className={st.stat} key={index}>
											<img src={abilityIcons[index]} alt="Icon" />
											<div className={st.statName + ' ' + st.fullName}><div className={st.headingSmall}>{stat.full}</div></div>
											<div className={st.statPurchases}>
												<PurchaseablePointGroup count={6} columns={6} automaticPurchases={1} purchased={theCharacter.characterData.purchases.abilities[stat.short.toLowerCase()]} clickCallback={adjustPoints} purchaseKey={`ability.${stat.short.toLowerCase()}`} />
											</div>
										</div>
									))}
									<div className={st.statLabels}>
										<div>1</div><div>2</div><div>3</div><div>4</div><div>5</div><div>6</div>
									</div>
								</div>
							</div>
							<div className={st.buffs + ' ' + st.sectionMetaInner}>
								<div className={st.standardFlex}><div className={st.headingMedium}>Buffs</div><span className={st.littleNote}>Effect + Source</span></div>
								{Array.from(Array(Math.max(4, theCharacter.characterData.buffs.filter(buff => buff !== "").length + 1))).map((i, index) => (
									<div className={st.buffDetails} key={index}><InputBox placeholder="Effect & Source" val={theCharacter.characterData.buffs[index]} onUpdate={(value) => updateValueFromInput(`buffs[${index}]`, value)} /></div>
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
										<div className={st.standardFlex}><div className={st.headingSmall}>Current</div> <InputBox className="notForPrint" val={theCharacter.characterData.current_verve} onUpdate={(value) => updateValueFromInput(`current_verve`, value)} /><InputBox className="forPrint" /></div>
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
										status_data.map((status, index) => (
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
							<div className={st.sectionMetaInner + ' ' + st.armourTable}>
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
									<div className={st.label}>Poison (PoRed)</div> <div className={st.standardFlex}><CircleStatusGroup count={3} gap={5} usedKey="pores" clickCallback={adjustCircleStatus} /></div>
									<div className={st.label}>Acidic (AcidRes)</div> <div className={st.standardFlex}><CircleStatusGroup count={3} gap={5} usedKey="acidres" clickCallback={adjustCircleStatus} /></div>
								</div>
								<div className={st.table2}>
									<div className={st.tableHeader}>
										<div className={st.headingSmall}>Elemental</div>
										<div className={st.values}><div className={st.fonted + ' ' + st.headLabel}>+3</div> <div className={st.fonted + ' ' + st.headLabel}>+5</div> <div className={st.fonted + ' ' + st.headLabel}>+10</div></div>
									</div>
									<div className={st.label}>Pyral (PyRes)</div> <div className={st.standardFlex}><CircleStatusGroup count={3} gap={5} usedKey="pyres" clickCallback={adjustCircleStatus} /></div>
									<div className={st.label}>Cryo (CryRes)</div> <div className={st.standardFlex}><CircleStatusGroup count={3} gap={5} usedKey="cryres" clickCallback={adjustCircleStatus} /></div>
									<div className={st.label}>Electric (ElecRes)</div> <div className={st.standardFlex}><CircleStatusGroup count={3} gap={5} usedKey="elecres" clickCallback={adjustCircleStatus} /></div>
									<div className={st.label}>Sonic (SonRes)</div> <div className={st.standardFlex}><CircleStatusGroup count={3} gap={5} usedKey="sonres" clickCallback={adjustCircleStatus} /></div>
									<div className={st.label}>Zephyr (ZephRes)</div> <div className={st.standardFlex}><CircleStatusGroup count={3} gap={5} usedKey="zephres" clickCallback={adjustCircleStatus} /></div>
								</div>
								<div className={st.table3}>
									<div className={st.tableHeader}>
										<div className={st.headingSmall}>Transcen.</div>
										<div className={st.values}><div className={st.fonted + ' ' + st.headLabel}>+3</div> <div className={st.fonted + ' ' + st.headLabel}>+5</div> <div className={st.fonted + ' ' + st.headLabel}>+10</div></div>
									</div>
									<div className={st.label}>Arcanic (ArcRes)</div> <div className={st.standardFlex}><CircleStatusGroup count={3} gap={5} usedKey="arcres" clickCallback={adjustCircleStatus} /></div>
									<div className={st.label}>Umbral (UmbRes)</div> <div className={st.standardFlex}><CircleStatusGroup count={3} gap={5} usedKey="umbres" clickCallback={adjustCircleStatus} /></div>
									<div className={st.label}>Luminal (LumRes)</div> <div className={st.standardFlex}><CircleStatusGroup count={3} gap={5} usedKey="lumres" clickCallback={adjustCircleStatus} /></div>
								</div>
							</div>
						</div>
						<div className={st.headingMedium + ' ' + st.movesHeader}>Defence Moves</div>
						<div className={st.moveList}>
						{
							movesAndMods['defences']?.moves?.map((move, index) => (
								<Move key={index} move={move} toggleRollPopup={toggleRollPopup} purchaseDetails={theCharacter.getMovePurchase(move.id)} clickCallback={adjustPoints}></Move>
							))
						}
						</div>
					</div>
				</section>

				<section ref={sectionRefs['Combat']} className={st.open + getPrintable('combat')}>
					<div className={st.collapser} onClick={toggleSection}><div className={st.headingLarge}><img className={st.titleIcon} src={icoCombat} alt="" /> Combat</div></div>
					<div className={st.collapsable + ' ' + st.combatLayout}>
						<div className={st.sectionMeta}>
							<div className={st.sectionMetaInner + ' ' + st.weaponTable}>
								<div className={st.weaponsHeader}>
									<div className={st.headingMedium + ' ' + st.headName}>Weapons</div>
									<div className={st.fonted + ' ' + st.headLabel}>Dam</div>
									<div className={st.fonted + ' ' + st.headLabel}>Abilities</div>
								</div>
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
								<div className={st.headingSmall}>Ranged</div> <Dropdown source={bonusDice} noDefault={true} val={theCharacter.characterData.bonus_damage.ranged} onChange={(value) => updateValueFromInput('bonus_damage.ranged', value, true)} />
								</div>
							</div>
							<div className={st.sectionMetaInner + ' ' + st.weaponSpecialisations}>
								<div className={st.weaponsHeader}>
									<div className={st.headingMedium + ' ' + st.headName}>Specialisations <PurchaseablePointGroup count={3} purchased={theCharacter.characterData.purchases.weapon_specialisations} purchaseKey='weapon_specialisations' clickCallback={adjustPoints}  /></div>
								</div>
								<div className="notForPrint">
									{Array.from(Array(Math.min(theCharacter.characterData.purchases.weapon_specialisations, theCharacter.characterData.weapon_specialisations.length + 1))).map((i, index) => (
										<div className={st.weaponFields} key={index}>
											<Dropdown source={weapon_specialisations} val={theCharacter.characterData.weapon_specialisations[index]} onChange={(value) => updateValueFromInput(`weapon_specialisations[${index}]`, value, true)} />
										</div>
									))}
								</div>
								<div className="forPrint">
									<InputBox />
									<InputBox />
									<InputBox />
								</div>
							</div>
						</div>
						<div className={st.headingMedium + ' ' + st.movesHeader}>Combat Moves</div>
						<div className={st.moveList}>
						{
							movesAndMods['combat']?.moves.map((move, index) => (
								<Move key={index} move={move} toggleRollPopup={toggleRollPopup} printableModsCount={8} purchaseDetails={theCharacter.getMovePurchase(move.id)} clickCallback={adjustPoints}></Move>
							))
						}
						</div>
					</div>
				</section>

				<section ref={sectionRefs['Moves']} className={st.open}>
					<div className={st.collapser} onClick={toggleSection}><div className={st.headingLarge}><img className={st.titleIcon} src={icoCircles} alt="" /> General Moves</div></div>
					<div className={st.collapsable + ' ' + st.movesLayout}>
						<div className={st.headingMedium + ' ' + st.movesHeader}>Common Moves</div>
						<div className={st.moveList}>
						{
							getCommonMoves().map((move, index) => (
								<Move key={index} move={move} toggleRollPopup={toggleRollPopup} purchaseDetails={theCharacter.getMovePurchase(move.id)} clickCallback={adjustPoints}></Move>
							))
						}
						</div>
						<div className={st.headingMedium + ' ' + st.movesHeader}>Advanced Moves</div>
						<div className={st.moveList}>
						{
							getAdvancedMoves().map((move, index) => (
								<Move key={index} move={move} toggleRollPopup={toggleRollPopup} purchaseDetails={theCharacter.getMovePurchase(move.id)} clickCallback={adjustPoints}></Move>
							))
						}
						</div>
						<div className={st.headingMedium + ' ' + st.movesHeader}>Master Moves</div>
						<div className={st.moveList}>
						{
							getMasterMoves().map((move, index) => (
								<Move key={index} move={move} toggleRollPopup={toggleRollPopup} purchaseDetails={theCharacter.getMovePurchase(move.id)} clickCallback={adjustPoints}></Move>
							))
						}
						</div>
					</div>
				</section>

				<section ref={sectionRefs['Inner Power']} className={st.open + getPrintable('inner_power')}>
					<div className={st.collapser} onClick={toggleSection}><div className={st.headingLarge}><img className={st.titleIcon} src={icoCircles} alt="" /> Inner Power</div></div>
					<div className={st.collapsable + ' ' + st.innerPowerLayout}>
						<div className={st.headingMedium + ' ' + st.movesHeader}>Inner Power Moves</div>
						<div className={st.moveList}>
						{
							movesAndMods['inner_power']?.moves?.map((move, index) => (
								<Move key={index} move={move} toggleRollPopup={toggleRollPopup} purchaseDetails={theCharacter.getMovePurchase(move.id)} clickCallback={adjustPoints}></Move>
							))
						}
						</div>
					</div>
				</section>

				<section ref={sectionRefs['Magic']} className={st.open + getPrintable('magic')}>
					<div className={st.collapser} onClick={toggleSection}><div className={st.headingLarge}><img className={st.titleIcon} src={icoMagic} alt="" /> Magic </div></div>
					<div className={st.collapsable + ' ' + st.magicLayout}>
						<div className={st.sectionMeta + ' ' + st.section1}>
							<div className={st.sectionMetaInner}>
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
						<div className={st.sectionMeta + ' ' + st.section2 + ' ' + (theCharacter.getMovePurchase('797d1feb').points == 0 ? st.hidden : '')}>
							<div className={st.sectionMetaInner}>
								<div className={st.damageType}><div className={st.headingMedium}>Spells</div></div>
								{theCharacter.characterData.spells.map((spell, index) => (
									<div key={index} className={st.spellFlex}><InputBox val={getSpellName(spell)} disabled={true} /> <button className={st.removeButton + ' notForPrint'} onClick={() => adjustSpell(spell, false)}>X</button></div>
								))}
								{theCharacter.characterData.spells.length < Math.min(theCharacter.getMovePurchase('797d1feb').points * 2 || 0)
								?
									<div className={st.spellChoice}><Dropdown source={sourceSpells || []} val='' onChange={adjustSpell} /></div>
								: <></>
								}
							</div>
						</div>
						<div className={st.headingMedium + ' ' + st.movesHeader}>Magic Moves</div>
						<div className={st.moveList}>
						{
							movesAndMods['magic']?.moves?.map((move, index) => (
								<Move key={index} move={move} toggleRollPopup={toggleRollPopup} purchaseDetails={theCharacter.getMovePurchase(move.id)} clickCallback={adjustPoints}></Move>
							))
						}
						</div>
					</div>
				</section>
				
				<section ref={sectionRefs['Psionics']} className={st.open + getPrintable('psionics')}>
					<div className={st.collapser} onClick={toggleSection}><div className={st.headingLarge}><img className={st.titleIcon} src={icoSpiral} alt="" /> Psionics</div></div>
					<div className={st.collapsable + ' ' + st.psionicsLayout}>
						<div className={st.headingMedium + ' ' + st.movesHeader}>Psionic Moves</div>
						<div className={st.moveList}>
						{
							movesAndMods['psionics']?.moves?.map((move, index) => (
								<Move key={index} move={move} toggleRollPopup={toggleRollPopup} purchaseDetails={theCharacter.getMovePurchase(move.id)} clickCallback={adjustPoints}></Move>
							))
						}
						</div>
					</div>
				</section>
				
				<section ref={sectionRefs['Inventory']} className={st.open + getPrintable('inventory')}>
					<div className={st.collapser} onClick={toggleSection}><div className={st.headingLarge}><img className={st.titleIcon} src={icoDocument} alt="" /> Inventory</div></div>
					<div className={st.collapsable + ' ' + st.inventoryLayout}>
					<div className="notForPrint">
						{Array.from(Array(38)).map((i, index) => (
							<InputBox key={`inv-${index}`} val={theCharacter.characterData.inventory[index]} onUpdate={(value) => updateValueFromInput(`inventory[${index}]`, value)} />
						))}
					</div>
					<div className="forPrint">
						{Array.from(Array(30)).map((i, index) => (
							<InputBox key={`inv-${index}`} val={theCharacter.characterData.inventory[index]} onUpdate={(value) => updateValueFromInput(`inventory[${index}]`, value)} />
						))}
					</div>
					</div>
				</section>

				<section ref={sectionRefs['Notes']} className={st.open + getPrintable('notes')}>
					<div className={st.collapser} onClick={toggleSection}><div className={st.headingLarge}><img className={st.titleIcon} src={icoDocument} alt="" /> Notes</div></div>
					<div className={st.collapsable + ' ' + st.notesLayout}>
						{Array.from(Array(30)).map((i, index) => (
							<InputBox key={`notes-${index}`} val={theCharacter.characterData.notes[index]} onUpdate={(value) => updateValueFromInput(`notes[${index}]`, value)} />
						))}
					</div>
				</section>

				<section className={st.open + ' ' + st.printablesLayout + ' notForPrint'}>
					<div>
						<div className={st.headingMedium + ' ' + (printableSections['combat'] ? st.on : st.off)} onClick={() => togglePrintable('combat')}>Print Combat: <div className={st.printableToggle}><img src={icoP} alt="Printable" /></div></div>
					</div>
					<div>
						<div className={st.headingMedium + ' ' + (printableSections['magic'] ? st.on : st.off)} onClick={() => togglePrintable('magic')}>Print Magic: <div className={st.printableToggle}><img src={icoP} alt="Printable" /></div></div>
					</div>
					<div>
						<div className={st.headingMedium + ' ' + (printableSections['inner_power'] ? st.on : st.off)} onClick={() => togglePrintable('inner_power')}>Print Inner Power: <div className={st.printableToggle}><img src={icoP} alt="Printable" /></div></div>
					</div>
					<div>
						<div className={st.headingMedium + ' ' + (printableSections['psionics'] ? st.on : st.off)} onClick={() => togglePrintable('psionics')}>Print Psionics: <div className={st.printableToggle}><img src={icoP} alt="Printable" /></div></div>
					</div>
					<div>
						<div className={st.headingMedium + ' ' + (printableSections['notes'] ? st.on : st.off)} onClick={() => togglePrintable('notes')}>Print Notes: <div className={st.printableToggle}><img src={icoP} alt="Printable" /></div></div>
					</div>
					<div>
						<div className={st.headingMedium + ' ' + (printableSections['inventory'] ? st.on : st.off)} onClick={() => togglePrintable('inventory')}>Print Inventory: <div className={st.printableToggle}><img src={icoP} alt="Printable" /></div></div>
					</div>
				</section>
			</div>
			
			<nav className={st.controlBar}>
				<button onClick={closeAllSections}><img src={icoChevronDown} /></button>
				<button onClick={openAllSections}><img src={icoChevronDown} className={st.flipY} /></button>
				<h3>Points:</h3>
				<button onClick={toggleLevelUpMode} className={levelUpMode ? st.active : ''} style={{ display: availablePoints > 0 && 'block' || 'none' }}>Spend ({availablePoints})</button>
				<button onClick={toggleLeveDownMode} className={levelDownMode ? st.active : ''} style={{ display: availablePoints != maxPoints && 'block' || 'none' }}>Remove</button>
				<button onClick={copyCharacterBackupsToClipboard}>&copy; BAKs</button>
			</nav>
			<Footer />
		</CharacterContext.Provider>
	);
}

export default CharacterSheetPage;
