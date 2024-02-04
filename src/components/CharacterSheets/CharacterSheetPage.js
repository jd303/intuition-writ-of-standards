import React, { useState, useEffect, useRef, useMemo, createContext } from "react";
import { useSelector } from "react-redux";
import { useParams } from 'react-router';
import { useDebounce } from "@uidotdev/usehooks";
import { useAuthState } from "../../firebase";
import { Navigate } from "react-router-dom";
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
import RollingPopup from "./RollingPopup";
import MinimalModePopup from "./MinimalModePopup";
import SpellInfoPopup from "./SpellInfoPopup";

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
import icoBear from '../../assets/images/icons/ico.bear.svg';

import st from './CharacterSheetPage.module.scss';
import { selectLanguageData } from "../../features/firebase/languageDataSlice";
import { selectAnimalCompanionsData } from "../../features/firebase/animalCompanionsDataSlice";

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
	const companions_data = useSelector(selectAnimalCompanionsData);
	const weapon_specialisations = useSelector(selectWeaponSpecialisationData);
	let charactersData = useSelector(selectCharactersData);
	console.log("CHARS", charactersData);

	// Moves Data
	let movesAndMods = {};
	movesAndMods = prepareMovesAndMods(moves_and_mods);

	const getBodyMoves = () => {
		let response = [];
		if (movesAndMods['body']) response = response.concat(movesAndMods['body'].moves);
		return response;
	}
	const getCommonMoves = () => {
		let response = [];
		if (movesAndMods['athletics']) response = response.concat(movesAndMods['athletics'].moves);
		if (movesAndMods['general']) response = response.concat(movesAndMods['general'].moves);
		if (movesAndMods['perception']) response = response.concat(movesAndMods['perception'].moves);
		if (movesAndMods['knowledge']) response = response.concat(movesAndMods['knowledge'].moves);
		return response;
	}
	const getSocialMoves = () => {
		let response = [];
		if (movesAndMods['influence']) response = response.concat(movesAndMods['influence'].moves);
		if (movesAndMods['arts']) response = response.concat(movesAndMods['arts'].moves);
		return response;
	}

	const getBeastMasteryMoves = () => {
		let response = [];
		if (movesAndMods['beast_mastery']) response = response.concat(movesAndMods['beast_mastery'].moves);
		return response;
	}

	const getStealthMoves = () => {
		let response = [];
		if (movesAndMods['deception']) response = response.concat(movesAndMods['deception'].moves);
		return response;
	}

	const getCraftyMoves = () => {
		let response = [];
		if (movesAndMods['crafty']) response = response.concat(movesAndMods['crafty'].moves);
		return response;
	}

	const getEngineeringMoves = () => {
		let response = [];
		if (movesAndMods['engineering']) response = response.concat(movesAndMods['engineering'].moves);
		return response;
	}

	// Static Data
	const vervePerPoint = 5;
	const stats = [ { full: 'Strength', short: 'STR' }, { full: 'Constitution', short: 'CON' }, { full: 'Dexterity', short: 'DEX' }, { full: 'Intelligence', short: 'INT' }, { full: 'Wisdom', short: 'WIS' }, { full: 'Charisma', short: 'CHA' }];
	const weaponDamageDice = [ "d4", "d8", "d6", "d10", "d12" ];
	const bonusDice = [ "d6", "d8", "d10", "2d6", "2d8", "2d10" ];
	const magical_synergies = [ "Pyral (fire, Burning)", "Cryal (cold, Chilled)", "Arcanic (pure, +5 Verve Loss)", "Electric (Lightning, Shocked)", "Acidic (Acid, Melting)", "Luminal (Light, Blind)", "Umbral (Decay, Decaying)", "Sonic (Sound, Deaf)", "Zephyral (Wind, Gusted)" ];
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
	const sections = ['Vitae', 'Core', 'Wellness', 'Defences', 'Combat', 'Moves', 'Magic', 'Beast Mastery', 'Inner Power', 'Psionics', 'Notes', 'Inventory'];
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
	const [minimalModePopupShowing, setMinimalModePopupShowing] = useState(false);
	const toggleMinimalModePopupShowing = () => {
		setMinimalModePopupShowing(!minimalModePopupShowing);
	}

	const getMinimalModeStatus = (key) => {
		if (!theCharacter.characterData.minimal_mode['1_on']) return '';
		if (!theCharacter.characterData.minimal_mode[key]) return ' ' + st.minimallyHidden;
		return '';
	}

	const getMinimalPrintRows = () => {
		if (theCharacter.characterData.minimal_mode['1_on'] && theCharacter.characterData.minimal_mode['3_minimal_print_mod_rows']) return true;
		return false;
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
	const maxCharacterAttributePoints = 6;

	const maxMovePoints = useMemo(() => {
		return Math.max(1, Math.ceil(theCharacter.characterData.sessions / 8));
	}, [theCharacter.characterData.sessions]);

	const calculateMaxPoints = (attr) => {
		attr = attr.toUpperCase();
		let stat;
		if (attr.indexOf(",") !== -1) {
			const split = attr.replace(/ /g,'').split(",");
			let highest = -1;
			split.forEach(at => highest = theCharacter.characterData.attributes[at] > highest ? theCharacter.characterData.attributes[at] : highest);
			stat = highest;
		} else {
			stat = theCharacter.characterData.attributes[attr];
		}
		return maxMovePoints + stat;
	}

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

	const updateCharacterAttribute = (key, value) => {
		const newCharacter = new CharacterObject(structuredClone(theCharacter.characterData));
		newCharacter.characterData.attributes[key] = Number(value);

		// Adjust for maximum points
		let index = 0;
		while (Object.values(newCharacter.characterData.attributes).reduce((x, y) => x + y, 0) > maxCharacterAttributePoints) {
			newCharacter.characterData.attributes[Object.keys(newCharacter.characterData.attributes)[index]] = 0;
			index += 1;
		}

		setTheCharacter(newCharacter);
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

	const adjustCompanionMove = (id, addMode = true) => {
		const newCharacter = new CharacterObject(structuredClone(theCharacter.characterData));
		const success = newCharacter.adjustCompanionMove(id, addMode);

		if (success) setTheCharacter(newCharacter);
		else console.log("ERROR Saving");
	}

	const adjustMinimalModeToggle = (key) => {
		const newCharacter = new CharacterObject(structuredClone(theCharacter.characterData));
		const success = newCharacter.adjustMinimalMode(key, !newCharacter.characterData.minimal_mode[key]);

		if (success) setTheCharacter(newCharacter);
		else console.log("ERROR Saving");
	}

	const getSkillDamages = () => {
		const meleeDamage = theCharacter.characterData.purchases.moves && theCharacter.characterData.purchases.moves['a72c2adb']?.points || 0;
		const rangedDamage = theCharacter.characterData.purchases.moves && theCharacter.characterData.purchases.moves['4bf8b06a']?.points || 0;
		return `${meleeDamage}/${rangedDamage}`;
	}

	// Spells Data / Optim note: this triggers on all changes due to theCharacter.characterData.purchases not being specific enough to detect changes
	const spellsForMyLevelAndSource = useMemo(() => {
		if (!spells_data.length) return [];
		const spellcraftPoints = theCharacter.characterData.purchases.moves && theCharacter.characterData.purchases.moves['797d1feb']?.points || 0;
		const maxSpellLevel = Math.max(1, Math.ceil(spellcraftPoints / 2));
		return spells_data.filter(spell => {
			const matchesMyLevel = spell.level <= maxSpellLevel;
			const matchesMySource = spell.sources.indexOf(theCharacter.characterData.source) != -1;
			return matchesMyLevel && matchesMySource;
		});
	}, [theCharacter.characterData.purchases, spells_data, theCharacter.characterData.source]);

	const getSpellName = (id) => {
		return spells_data.find(spell => spell.id == id).name || 'missing data';
	}

	const [spellPopupShowing, setSpellPopupShowing] = useState(false);
	const [shownSpell, setShownSpell] = useState(null);
	const showSpellInfo = (enable, spell) => {
		setShownSpell(spell);
		setSpellPopupShowing(enable);
	}

	const getSpellInfo = (spellID) => {
		return spellsForMyLevelAndSource.find(spell => spell.id == spellID);
	}

	const getCompanionMoveDetails = (id) => {
		const companionMove = companions_data.find(move => move.id == id);
		if (companionMove) return `${companionMove.name} - ${companionMove.desc}`;
		else return 'missing data';
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
			<MinimalModePopup showPopupProp={minimalModePopupShowing} closePopupProp={() => setMinimalModePopupShowing(false)} hideableSections={theCharacter.characterData.minimal_mode} onUpdate={adjustMinimalModeToggle} />
			<SpellInfoPopup showSpellPopupProp={spellPopupShowing} closePopupProp={() => showSpellInfo(false)} spell={shownSpell} />
			<div className={"mainContent " + (levelUpMode && ' characterSheetLevelUpMode ' || '') + (levelDownMode && ' characterSheetLevelDownMode ' || '')}>
				<section ref={sectionRefs['Vitae']} className={st.open}>
					<div className={st.collapser} onClick={toggleSection}><div className={st.headingLarge}><img className={st.titleIcon} src={icoDocument} alt="" /> Vitae</div></div>
					<div className={st.collapsable + ' ' + st.vitaeLayout}>
						<img className={st.profileImage} src={GenericProfile} alt="Character Image" />
						<div className={st.about}>
							<div className={st.standardFlex}>
								<div className={st.headingMedium}>Name</div>
								<InputBox val={theCharacter.characterData.name} onUpdate={(value) => updateValueFromInput('name', value)} />
							</div>
							<div className={st.standardFlex}>
								<div className={st.headingMedium}>Sessions</div>
								<InputBox type="number" val={theCharacter.characterData.sessions} onUpdate={(value) => updateValueFromInput('sessions', value, true)} />
								<div className={st.sessionPoints + ' ' + st.littleNote}>{Math.min(12, maxMovePoints)} Max Skill Points</div>
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
							<div className={st.headingMedium}>Known Languages <PurchaseablePointGroup count={2} purchased={theCharacter.characterData.purchases.known_languages} purchaseKey='known_languages' clickCallback={adjustPoints} /></div>
							{Array.from(Array(theCharacter.characterData.purchases.known_languages + 2)).map((i, index) => (
								<Dropdown key={index} source={languages_data} val={theCharacter.characterData.known_languages[index]} onChange={(value) => updateValueFromInput(`known_languages[${index}]`, value, true)} />
							))}
						</div>
					</div>
				</section>

				<section ref={sectionRefs['Core']} className={st.open}>
					<div className={st.collapser} onClick={toggleSection}><div className={st.headingLarge}><img className={st.titleIcon} src={icoPoison} alt="" /> Core</div></div>
					<div  className={st.collapsable + ' ' + st.attributesLayout}>
						<div className={st.sectionMeta}>
							<div className={st.stats + ' ' + st.sectionMetaInner}>
								<div className={st.standardFlex}><div className={st.headingMedium}>Attributes</div> <div className={st.littleNote}>(Max {maxCharacterAttributePoints} points)</div></div>
								<div className={st.list}>
									{stats.map((stat, index) => (
										<div className={st.stat} key={index}>
											<img src={abilityIcons[index]} alt="Icon" />
											<div className={st.statName + ' ' + st.fullName}><div className={st.headingSmall}>{stat.full}</div></div>
											<div className={st.statPurchases}>
												{/*<PurchaseablePointGroup count={4} columns={4} automaticPurchases={1} purchased={theCharacter.characterData.purchases.attributes[stat.short.toLowerCase()]} clickCallback={adjustPoints} purchaseKey={`ability.${stat.short.toLowerCase()}`} />*/}
												{!theCharacter.characterData.attributeslocked ? 
													<Dropdown source={[0,1,2,3]} noDefault={true} val={theCharacter.characterData.attributes[stat.short]} onChange={(value) => updateCharacterAttribute(stat.short, value, true)} />
												:
													<InputBox val={theCharacter.characterData.attributes[stat.short]} disabled={true} />
												}
											</div>
										</div>
									))}
									{!theCharacter.characterData.attributeslocked ? <button className="notForPrint" onClick={() => updateValueFromInput('attributeslocked', true)}>Confirm</button> : <></>}
									{/*<div className={st.statLabels}>
										<div>1</div><div>2</div><div>3</div><div>4</div>
									</div>*/}
								</div>
							</div>
							<div className={st.buffs + ' ' + st.sectionMetaInner}>
								<div className={st.standardFlex}><div className={st.headingMedium}>Buffs</div><span className={st.littleNote}>Effect + Source</span></div>
								{Array.from(Array(Math.max(6, theCharacter.characterData.buffs.filter(buff => buff !== "").length + 1))).map((i, index) => (
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
										<div className={st.title}><div className={st.headingMedium}>Verve</div> <div className={st.littleNote}>{theCharacter.baseVerve} + {vervePerPoint}/point</div></div>
										<div className={st.healthPurchases}>
											<PurchaseablePointGroup count={36} columns={12} purchased={theCharacter.characterData.purchases.verve} clickCallback={adjustPoints} purchaseKey={'verve'} maxPurchases={theCharacter.characterData.sessions * 2} />
										</div>
									</div>
									<div className={st.totalAndCurrent}>
										<div className={st.standardFlex}><div className={st.headingSmall}>Bonus</div> <InputBox val={theCharacter.characterData.bonus_verve} onUpdate={(value) => updateValueFromInput(`bonus_verve`, value)} type="number" /></div>
										<div className={st.standardFlex}><div className={st.headingSmall}>Total</div> <InputBox val={theCharacter.baseVerve + Number(theCharacter.characterData.bonus_verve) + theCharacter.characterData.purchases.verve * vervePerPoint} disabled={true} /></div>
										<div className={st.standardFlex}><div className={st.headingSmall}>Current</div> <InputBox className="notForPrint" val={theCharacter.characterData.current_verve} onUpdate={(value) => updateValueFromInput(`current_verve`, value)} /><InputBox className="forPrint" /></div>
									</div>
								</div>
								<div className={st.stamina}>
									<div className={st.headingMedium}>Stamina</div>
									<div className={st.staminaPurchases}>
										<CircleStatusGroup count={3} columns={3} gap={3} usedKey="stamina" clickCallback={adjustCircleStatus} />
										<div className={st.staminaPointGroup}><PurchaseablePointGroup count={3} purchased={theCharacter.characterData.purchases.stamina} clickCallback={adjustPoints} purchaseKey='stamina' /></div>
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
						{
							getBodyMoves().map((move, index) => (
								<Move key={index} move={move} toggleRollPopup={toggleRollPopup} purchaseDetails={theCharacter.getMovePurchase(move.id)} maxPurchases={calculateMaxPoints(move.stat)} clickCallback={adjustPoints} minimalPrintRows={getMinimalPrintRows()}></Move>
							))
						}
					</div>
				</section>

				<section ref={sectionRefs['Defences']} className={st.open}>
					<div className={st.collapser} onClick={toggleSection}><div className={st.headingLarge}><img className={st.titleIcon} src={isoShield} alt="" /> Defences</div></div>
					<div className={st.collapsable + ' ' + st.defencesLayout}>
						<div className={st.sectionMeta}>
							<div className={st.sectionMetaInner + ' ' + st.armourTable}>
								<div className={st.armourHeader}>
									<div className={st.headingMedium + ' ' + st.headName}>Armour</div>
									<div className={st.fonted + ' ' + st.headLabel}>Max Block</div>
									<div className={st.fonted + ' ' + st.headLabel}>Max Dodge</div>
								</div>
								<div className={st.armourItem}>
									<InputBox val="Base" disabled={true} />
									<InputBox val={2} disabled={true} />
									<InputBox val={2} disabled={true} />
								</div>
								{Array.from(Array(Math.max(1, theCharacter.characterData.armours.filter(armr => Object.values(armr).join('') !== '').length + 1))).map((i, index) => (
									<div key={`'armour-${index}`} className={st.armourItem}>
										<InputBox val={theCharacter.characterData.armours[index]?.name} onUpdate={(value) => updateValueFromInput(`armours[${index}].name`, value, true)} />
										<InputBox val={theCharacter.characterData.armours[index]?.block} onUpdate={(value) => updateValueFromInput(`armours[${index}].block`, value, true)} />
										<InputBox val={theCharacter.characterData.armours[index]?.dodge} onUpdate={(value) => updateValueFromInput(`armours[${index}].dodge`, value, true)} />
									</div>
								))}
								<div className={st.armourItem}>
									<div>Total</div>
									<InputBox val={theCharacter.characterData.armour_totals.block} onUpdate={(value) => updateValueFromInput(`armour_totals.block`, value, true)} />
									<InputBox val={theCharacter.characterData.armour_totals.dodge} onUpdate={(value) => updateValueFromInput(`armour_totals.dodge`, value, true)} />
								</div>
							</div>

							<div className={st.sectionMetaInner + ' ' + st.resistanceTable}>
								<div className={st.headingMedium + ' ' + st.headName}>Resistances</div>
								<div className={st.table1}>
									<div className={st.label}>Universal (URed)</div> <div className={st.standardFlex}><InputBox type="number" val={theCharacter.characterData.resistances.universal} onUpdate={(value) => updateValueFromInput('resistances.universal', value, true)} /></div>
									<div className={st.label}>Physical (PRed)</div> <div className={st.standardFlex}><InputBox type="number" val={theCharacter.characterData.resistances.physical} onUpdate={(value) => updateValueFromInput('resistances.physical', value, true)} /></div>
									<div className={st.label}>Magic (MRed)</div> <div className={st.standardFlex}><InputBox type="number" val={theCharacter.characterData.resistances.magic} onUpdate={(value) => updateValueFromInput('resistances.magic', value, true)} /></div>
									<div className={st.label}>Poison (PoRed)</div> <div className={st.standardFlex}><InputBox type="number" val={theCharacter.characterData.resistances.poisons} onUpdate={(value) => updateValueFromInput('resistances.poisons', value, true)} /></div>
								</div>
								<div className={st.table2}>
									<div className={st.label}>Pyral (PyRes)</div> <div className={st.standardFlex}><InputBox type="number" val={theCharacter.characterData.resistances.pyral} onUpdate={(value) => updateValueFromInput('resistances.pyral', value, true)} /></div>
									<div className={st.label}>Cryo (CryRes)</div> <div className={st.standardFlex}><InputBox type="number" val={theCharacter.characterData.resistances.cryo} onUpdate={(value) => updateValueFromInput('resistances.cryo', value, true)} /></div>
									<div className={st.label}>Electric (ElecRes)</div> <div className={st.standardFlex}><InputBox type="number" val={theCharacter.characterData.resistances.electric} onUpdate={(value) => updateValueFromInput('resistances.electric', value, true)} /></div>
									<div className={st.label}>Zephyr (ZephRes)</div> <div className={st.standardFlex}><InputBox type="number" val={theCharacter.characterData.resistances.zephyr} onUpdate={(value) => updateValueFromInput('resistances.zephyr', value, true)} /></div>
								</div>
								<div className={st.table3}>
									<div className={st.label}>Sonic (SonRes)</div> <div className={st.standardFlex}><InputBox type="number" val={theCharacter.characterData.resistances.sonic} onUpdate={(value) => updateValueFromInput('resistances.sonic', value, true)} /></div>
									<div className={st.label}>Acidic (AcidRes)</div> <div className={st.standardFlex}><InputBox type="number" val={theCharacter.characterData.resistances.acids} onUpdate={(value) => updateValueFromInput('resistances.acids', value, true)} /></div>
									<div className={st.label}>Umbral (UmbRes)</div> <div className={st.standardFlex}><InputBox type="number" val={theCharacter.characterData.resistances.umbral} onUpdate={(value) => updateValueFromInput('resistances.umbra;', value, true)} /></div>
									<div className={st.label}>Luminal (LumRes)</div> <div className={st.standardFlex}><InputBox type="number" val={theCharacter.characterData.resistances.luminal} onUpdate={(value) => updateValueFromInput('resistances.luminal', value, true)} /></div>
								</div>
							</div>
						</div>
						<div className={st.headingMedium + ' ' + st.movesHeader}>Defence Moves</div>
						<div className={st.moveList}>
						{
							movesAndMods['defences']?.moves?.map((move, index) => (
								<Move key={index} move={move} toggleRollPopup={toggleRollPopup} purchaseDetails={theCharacter.getMovePurchase(move.id)} maxPurchases={calculateMaxPoints(move.stat)} clickCallback={adjustPoints} minimalPrintRows={getMinimalPrintRows()}></Move>
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
								<div className={st.weaponsHeader}>
									<div className={st.headingMedium + ' ' + st.headName}>Weapons</div>
									<div className={st.fonted + ' ' + st.headLabel}>Dam</div>
									<div className={st.fonted + ' ' + st.headLabel}>Skill</div>
									<div className={st.fonted + ' ' + st.headLabel}>Abilities</div>
								</div>
								{Array.from(Array(Math.max(1, theCharacter.characterData.weapons.filter(weap => Object.values(weap).join('') !== '').length + 1))).map((i, index) => (
									<div className={st.weaponFields + ' notFoPrint'} key={index}>
										<InputBox val={theCharacter.characterData.weapons[index]?.name} onUpdate={(value) => updateValueFromInput(`weapons[${index}].name`, value, true)} />
										<Dropdown source={weaponDamageDice} noDefault={false} val={theCharacter.characterData.weapons[index]?.damage} onChange={(value) => updateValueFromInput(`weapons[${index}].damage`, value, true)} />
										<InputBox val={getSkillDamages()} onUpdate={(value) => updateValueFromInput(`weapons[${index}].baseDamage`, value, true)} disabled={true} />
										<InputBox val={theCharacter.characterData.weapons[index]?.bonusDamage} onUpdate={(value) => updateValueFromInput(`weapons[${index}].notes`, value, true)} />
									</div>
								))}
								{Array.from(Array(3)).map((i, index) => (
									<div className={st.weaponFields} key={index}>
										<InputBox className='forPrint' val="" />
										<InputBox className='forPrint' val="" />
										<InputBox className='forPrint' val="" />
										<InputBox className='forPrint' val="" />
									</div>
								))}
							</div>
							<div className={st.sectionMetaInner + ' ' + st.weaponSpecialisations}>
								<div className={st.headingMedium}>Bonus Dice</div>
								<div className={st.standardFlex}>
									<Dropdown source={bonusDice} noDefault={true} val={theCharacter.characterData.bonus_damage} onChange={(value) => updateValueFromInput('bonus_damage', value, true)} />
								</div>
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
						{/*<div className={st.headingMedium + ' ' + st.movesHeader}>Combat Moves</div>*/}
						<div className={st.moveList}>
						{
							movesAndMods['combat']?.moves.map((move, index) => (
								<Move key={index} move={move} toggleRollPopup={toggleRollPopup} basePrintableModsCount={10} purchaseDetails={theCharacter.getMovePurchase(move.id)} maxPurchases={calculateMaxPoints(move.stat)} clickCallback={adjustPoints} minimalPrintRows={getMinimalPrintRows()}></Move>
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
								<Move key={index} move={move} toggleRollPopup={toggleRollPopup} purchaseDetails={theCharacter.getMovePurchase(move.id)} maxPurchases={calculateMaxPoints(move.stat)} clickCallback={adjustPoints} minimalPrintRows={getMinimalPrintRows()}></Move>
							))
						}
						</div>
						<div className={st.headingMedium + ' ' + st.movesHeader + getMinimalModeStatus('2a_social')}>Social Moves</div>
						<div className={st.moveList + getMinimalModeStatus('2a_social')}>
						{
							getSocialMoves().map((move, index) => (
								<Move key={index} move={move} toggleRollPopup={toggleRollPopup} purchaseDetails={theCharacter.getMovePurchase(move.id)} maxPurchases={calculateMaxPoints(move.stat)} clickCallback={adjustPoints} minimalPrintRows={getMinimalPrintRows()}></Move>
							))
						}
						</div>
						<div className={st.headingMedium + ' ' + st.movesHeader + getMinimalModeStatus('2b_stealth')}>Stealth Moves</div>
						<div className={st.moveList + getMinimalModeStatus('2b_stealth')}>
						{
							getStealthMoves().map((move, index) => (
								<Move key={index} move={move} toggleRollPopup={toggleRollPopup} purchaseDetails={theCharacter.getMovePurchase(move.id)} maxPurchases={calculateMaxPoints(move.stat)} clickCallback={adjustPoints} minimalPrintRows={getMinimalPrintRows()}></Move>
							))
						}
						</div>
						<div className={st.headingMedium + ' ' + st.movesHeader + getMinimalModeStatus('2c_engineering')}>Engineering Moves</div>
						<div className={st.moveList + getMinimalModeStatus('2c_engineering')}>
						{
							getEngineeringMoves().map((move, index) => (
								<Move key={index} move={move} toggleRollPopup={toggleRollPopup} purchaseDetails={theCharacter.getMovePurchase(move.id)} maxPurchases={calculateMaxPoints(move.stat)} clickCallback={adjustPoints} minimalPrintRows={getMinimalPrintRows()}></Move>
							))
						}
						</div>
						<div className={st.headingMedium + ' ' + st.movesHeader + getMinimalModeStatus('2d_craft')}>Craft Moves</div>
						<div className={st.moveList + getMinimalModeStatus('2d_craft')}>
						{
							getCraftyMoves().map((move, index) => (
								<Move key={index} move={move} toggleRollPopup={toggleRollPopup} purchaseDetails={theCharacter.getMovePurchase(move.id)} maxPurchases={calculateMaxPoints(move.stat)} clickCallback={adjustPoints} minimalPrintRows={getMinimalPrintRows()}></Move>
							))
						}
						</div>
					</div>
				</section>

				<section ref={sectionRefs['Beast Mastery']} className={st.open + getMinimalModeStatus('2j_beast_mastery')}>
					<div className={st.collapser} onClick={toggleSection}><div className={st.headingLarge}><img className={st.titleIcon} src={icoBear} alt="" /> Beast Mastery</div></div>
						<div className={st.collapsable + ' ' + st.beastMasteryLayout}>
							<div className={st.moveList}>
							{
								getBeastMasteryMoves().map((move, index) => (
									<Move key={index} move={move} toggleRollPopup={toggleRollPopup} purchaseDetails={theCharacter.getMovePurchase(move.id)} maxPurchases={calculateMaxPoints(move.stat)} clickCallback={adjustPoints} minimalPrintRows={getMinimalPrintRows()}></Move>
								))
							}
							</div>
							<div className={st.beastList}>
								<div className={st.companionDetails}>
									<div className={st.headingSmall}>Companion</div> <div className={st.headingSmall}>Abilities</div>
									<InputBox val={theCharacter.characterData.companion?.name} onUpdate={(value) => updateValueFromInput(`companion.name`, value)} />
									<InputBox val={theCharacter.characterData.companion?.abilities} onUpdate={(value) => updateValueFromInput(`companion.abilities`, value)} />
								</div>
								<div className={st.companionMoves}>
									<div className={st.headingSmall}>Moves</div>
									{theCharacter.characterData.companion?.moves?.map((cmove, index) => (
										<div key={index} className={st.companionFlex}><InputBox val={getCompanionMoveDetails(cmove)} disabled={true} className="notForPrint" /> <button className='notForPrint' onClick={() => adjustCompanionMove(cmove, false)}>X</button></div>
									))}
									<div className='forPrint'>
										{Array.from(Array(5)).map((i, index) => (
											<div key={`printcompmove-${index}`}><InputBox val="" /></div>
										))}
									</div>
									{(theCharacter.characterData.companion?.moves?.length || 0) < (theCharacter.getMovePurchase('f73a1fd2').points || 0)
									?
										<div className={st.companionMoveChoice}><Dropdown source={companions_data.filter(cd => cd.type == "move")} val='' onChange={adjustCompanionMove} /></div>
									: <></>
									}
								</div>
							</div>
						</div>
				</section>

				<section ref={sectionRefs['Inner Power']} className={st.open + getMinimalModeStatus('2e_inner_power')}>
					<div className={st.collapser} onClick={toggleSection}><div className={st.headingLarge}><img className={st.titleIcon} src={icoCircles} alt="" /> Inner Power</div></div>
					<div className={st.collapsable + ' ' + st.innerPowerLayout}>
						{/*<div className={st.headingMedium + ' ' + st.movesHeader}>Inner Power Moves</div>*/}
						<div className={st.moveList}>
						{
							movesAndMods['inner_power']?.moves?.map((move, index) => (
								<Move key={index} move={move} toggleRollPopup={toggleRollPopup} purchaseDetails={theCharacter.getMovePurchase(move.id)} maxPurchases={calculateMaxPoints(move.stat)} clickCallback={adjustPoints} minimalPrintRows={getMinimalPrintRows()}></Move>
							))
						}
						</div>
					</div>
				</section>

				<section ref={sectionRefs['Magic']} className={st.open + getMinimalModeStatus('2f_magic')}>
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
									<PurchaseablePointGroup count={30} columns={10} clickCallback={adjustPoints} purchased={theCharacter.characterData.purchases.mana} purchaseKey={'mana'} maxPurchases={theCharacter.characterData.sessions}  /></div>
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
									<div key={index} className={st.spellFlex}><InputBox val={getSpellName(spell)} disabled={true} className="notForPrint" />  <button className='notForPrint' onClick={() => showSpellInfo(true, getSpellInfo(spell))}>Info</button> <button className='notForPrint' onClick={() => adjustSpell(spell, false)}>X</button></div>
								))}
								{theCharacter.characterData.spells.length < Math.min(theCharacter.getMovePurchase('797d1feb').points * 2 || 0)
								?
									<div className={st.spellChoice}><Dropdown source={spellsForMyLevelAndSource} val='' onChange={adjustSpell} /></div>
								: <></>
								}
							</div>
						</div>
						<div className={st.sectionMeta + ' forPrint'}>
							<div className={st.sectionMetaInner}>
								<div className={st.damageType}><div className={st.headingMedium}>Spells</div></div>
								{Array.from(Array(14)).map((i, index) => (
									<div key={`printspell-${index}`}><InputBox val="" /></div>
								))}
							</div>
						</div>
						{/*<div className={st.headingMedium + ' ' + st.movesHeader}>Magic Moves</div>*/}
						<div className={st.moveList}>
						{
							movesAndMods['magic']?.moves?.map((move, index) => (
								<Move key={index} move={move} toggleRollPopup={toggleRollPopup} purchaseDetails={theCharacter.getMovePurchase(move.id)} maxPurchases={calculateMaxPoints(move.stat)} clickCallback={adjustPoints} minimalPrintRows={getMinimalPrintRows()}></Move>
							))
						}
						</div>
					</div>
				</section>
				
				<section ref={sectionRefs['Psionics']} className={st.open + getMinimalModeStatus('2g_psionics')}>
					<div className={st.collapser} onClick={toggleSection}><div className={st.headingLarge}><img className={st.titleIcon} src={icoSpiral} alt="" /> Psionics</div></div>
					<div className={st.collapsable + ' ' + st.psionicsLayout}>
						<div className={st.headingMedium + ' ' + st.movesHeader}>Psionic Moves</div>
						<div className={st.moveList}>
						{
							movesAndMods['psionics']?.moves?.map((move, index) => (
								<Move key={index} move={move} toggleRollPopup={toggleRollPopup} purchaseDetails={theCharacter.getMovePurchase(move.id)} maxPurchases={calculateMaxPoints(move.stat)} clickCallback={adjustPoints} minimalPrintRows={getMinimalPrintRows()}></Move>
							))
						}
						</div>
					</div>
				</section>
				
				<section ref={sectionRefs['Inventory']} className={st.open + getMinimalModeStatus('2h_inventory')}>
					<div className={st.collapser} onClick={toggleSection}><div className={st.headingLarge}><img className={st.titleIcon} src={icoDocument} alt="" /> Inventory</div></div>
					<div className={st.collapsable + ' ' + st.inventoryLayout}>
						<div className="notForPrint">
							{Array.from(Array(38)).map((i, index) => (
								<InputBox key={`inv-${index}`} val={theCharacter.characterData.inventory[index]} onUpdate={(value) => updateValueFromInput(`inventory[${index}]`, value)} />
							))}
						</div>
						<div className="forPrint">
							{Array.from(Array(28)).map((i, index) => (
								<InputBox key={`inv-${index}`} val={theCharacter.characterData.inventory[index]} onUpdate={(value) => updateValueFromInput(`inventory[${index}]`, value)} />
							))}
						</div>
					</div>
				</section>

				<section ref={sectionRefs['Notes']} className={st.open + getMinimalModeStatus('2i_notes')}>
					<div className={st.collapser} onClick={toggleSection}><div className={st.headingLarge}><img className={st.titleIcon} src={icoDocument} alt="" /> Notes</div></div>
					<div className={st.collapsable + ' ' + st.notesLayout}>
						{Array.from(Array(30)).map((i, index) => (
							<InputBox key={`notes-${index}`} val={theCharacter.characterData.notes[index]} onUpdate={(value) => updateValueFromInput(`notes[${index}]`, value)} />
						))}
					</div>
				</section>
			</div>
			
			<nav className={st.controlBar}>
				<button onClick={closeAllSections}><img src={icoChevronDown} /></button>
				<button onClick={openAllSections}><img src={icoChevronDown} className={st.flipY} /></button>
				-
				<div className={st.headingSmall}>Points</div>
				<button onClick={toggleLevelUpMode} className={levelUpMode ? st.active : ''} style={{ display: availablePoints > 0 && 'block' || 'none' }}>Buy ({availablePoints})</button>
				<button onClick={toggleLeveDownMode} className={levelDownMode ? st.active : ''} style={{ display: availablePoints != maxPoints && 'block' || 'none' }}>Sell</button>
				-
				<button onClick={toggleMinimalModePopupShowing}>View</button>
				-
				<button onClick={copyCharacterBackupsToClipboard}>BAKs</button>
			</nav>
			<Footer />
		</CharacterContext.Provider>
	);
}

export default CharacterSheetPage;
