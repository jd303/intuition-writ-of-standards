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
import st from './CharacterSheetPage.module.scss';
import { CircleStatus } from "./components/CircleStatus";

function CharacterSheetPage() {
	const moves_and_mods = useSelector(selectMovesData);

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
	const sections = ['Core', 'Wellness', 'Defenses', 'Combat', 'Moves', 'Magic', 'Psionics'];
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

	// Move Description Popup
	const descriptionPopup = useRef(null);
	const [descriptionPopupShowing, setDescriptionPopupShowing] = useState(false);
	const descriptionPopupToggle = (mod, target) => {
		descriptionPopup.current.querySelector('.'+st.content).innerHTML = mod.description;
		setDescriptionPopupShowing(true);

		//const targetLocation = target.getBoundingClientRect();
		const offsetParent = target.offsetParent;
		const offsetParent2 = offsetParent.offsetParent;
		descriptionPopup.current.style.top = `${offsetParent.offsetTop + offsetParent2.offsetTop + target.offsetTop + target.offsetHeight + 5}px`;
		descriptionPopup.current.style.left = "50%";
	}

	const closeDescriptionPopup = () => {
		setDescriptionPopupShowing(false);
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
		closeDescriptionPopup()
		closeRollPopup()
	}

	// Section togglers
	const openAllSections = () => {
		Object.keys(sectionRefs).forEach(key => sectionRefs[key].current.classList.add(st.open));
	}

	const closeAllSections = () => {
		Object.keys(sectionRefs).forEach(key => sectionRefs[key].current.classList.remove(st.open));
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
					<h2>Roll for Move:</h2>
					<button onClick={performRoll}><img className={st.diceRollImage} src={icoDice} alt="Roll this Move" /></button> <div className={st.fonted}>Bonus: {rollBonus}</div> <div className={st.fonted}>=</div> <div className={st.result + ' ' + st.fonted}>Total: </div>					
				</div>
			</div>
			<div className="mainContent">
				<div className={st.descriptionPopup + ' ' + (descriptionPopupShowing && st.open || '')} ref={descriptionPopup}><div className={st.hider} onClick={closeDescriptionPopup}></div><div className={st.content}></div></div>

				<section className={st.open}>
					<div className={st.vitaeLayout}>
						<img className={st.profileImage} src={GenericProfile} alt="Character Image" />
						<div className={st.about}>
							<div className={st.row1}>
								<h2>Name: </h2> <InputBox value="Juniper The Red" />
								<h2>Sessions:</h2> <div className={st.sessionBox}><InputBox /></div>
							</div>
							<div className={st.standardFlex}><h2>Race: </h2> <InputBox value="Human" /></div>
							<div className={st.racialBonuses}>
								<h2>Racial Bonuses:</h2>
								<InputBox />
								<InputBox />
								<InputBox />
							</div>
						</div>
					</div>
				</section>

				<section ref={sectionRefs['Core']} className={st.open}>
					<div className={st.collapser} onClick={toggleSection}><h1><img className={st.titleIcon} src={icoPoison} alt="" /> Core</h1></div>
					<div  className={st.collapsable + ' ' + st.abilitiesLayout}>
						<div className={st.stats}>
							<div className={st.standardFlex}><h2>Abilities</h2> <div className={st.littleNote}>(Max 15 points)</div></div>
							<div className={st.list}>
								{stats.map((stat, index) => (
									<div className={st.stat} key={index}>
										<img src={abilityIcons[index]} alt="Icon" />
										<div className={st.statName + ' ' + st.fullName}><h3>{stat.full}</h3></div>
										<div className={st.statName + ' ' + st.shortName}><h3>{stat.short}</h3></div>
										<div className={st.statValue}>+3</div>
										<div className={st.statPurchases}>
											<PurchaseablePointGroup count={7} columns={7} purchased={2} />
										</div>
									</div>
								))}
							</div>
						</div>
						<div className={st.buffs}>
							<h2>Buffs</h2> <h3>Source</h3>
							<InputBox value="STR Moves +2" /> <InputBox value='Belt' />
							<InputBox value="Combat Move +1" /> <InputBox value='Brooch' />
							<InputBox value="UDR 1" /> <InputBox value='Spell' />
							<InputBox value="" /> <InputBox value='' />
						</div>
					</div>
				</section>

				<section ref={sectionRefs['Wellness']} className={st.open}>
					<div className={st.collapser} onClick={toggleSection}><h1><img className={st.titleIcon} src={icoWellness} alt="" /> Wellness</h1></div>
					<div className={st.collapsable + ' ' + st.wellnessLayout}>
						<div className={st.verve}>
							<h2>Verve</h2>
							<div className={st.healthPurchases}>
								<PurchaseablePointGroup count={40} columns={10} />
							</div>
							<div className={st.standardFlex}><h3>Total</h3> <InputBox /></div>
							<div className={st.standardFlex}><h3>Current</h3> <InputBox /></div>
						</div>
						<div className={st.debilities}>
							<h2>Debilities</h2>
							<div className={st.debilityTrack}>
								<h3>Exhaust</h3>
								<CircleStatusGroup count={6} />
							</div>
							<div className={st.debilityTrack}>
								<h3>Daze</h3>
								<CircleStatusGroup count={6} />
							</div>
							<div className={st.debilityTrack}>
								<h3>Stagger</h3>
								<CircleStatusGroup count={6} />
							</div>
							<div className={st.debilityTrack}>
								<h3>Other</h3>
								<InputBox value="Confused" />
							</div>
							<div className={st.debilityTrack}>
								<h3>Other</h3>
								<InputBox value="Wounded" />
							</div>
							<div className={st.debilityTrack}>
								<h3>Other</h3>
								<InputBox value="Cursed" />
							</div>
							<div className={st.debilityTrack}>
								<h3>Other</h3>
								<InputBox value="Weakened" />
							</div>
						</div>
						{/*<div className={st.wounds}>
							<h2>Wounds</h2>
							<div className={st.woundTrack}>
								<div className={st.standardFlex}><h3>Null Wound</h3> <PurchaseablePointGroup count={1} /> <CircleStatus /></div>
							</div>
							<div className={st.woundTrack}>
								<div className={st.standardFlex}><h3>Head Wound</h3> <CircleStatus /> You cannot concentrate on spells, and [other]</div>
							</div>
							<div className={st.woundTrack}>
								<div className={st.standardFlex}><h3>Chest Wound</h3> <CircleStatus /> [effect]</div>
							</div>
							<div className={st.woundTrack}>
								<div className={st.standardFlex}><h3>Arm Wound</h3> <CircleStatus /> [combat and defense loss]</div>
							</div>
							<div className={st.woundTrack}>
								<div className={st.standardFlex}><h3>Leg Wound</h3> <CircleStatus /> [combat and defense loss]</div>
							</div>
						</div>*/}
					</div>
				</section>

				<section ref={sectionRefs['Defenses']} className={st.open}>
					<div className={st.collapser} onClick={toggleSection}><h1><img className={st.titleIcon} src={isoShield} alt="" /> Defenses</h1></div>
					<div className={st.collapsable + ' ' + st.defensesLayout}>
						<div className={st.sectionMeta}>
							<h2>Armour Class </h2>
							<div className={st.tabledData + ' ' + st.armourClassTable}>
								<h2 className={st.headName}>Armour</h2> <div className={st.fonted + ' ' + st.headLabel}>Block</div> <div className={st.fonted + ' ' + st.headLabel}>Dodge</div> <div className={st.fonted + ' ' + st.headLabel}>Disadv.</div>
								<PurchaseablePointGroup count={1} /> <h3>None</h3> <InputBox value={2} /> <InputBox value={4} /> <InputBox value="" />
								<PurchaseablePointGroup count={1} /> <h3>Light</h3> <InputBox value={3} /> <InputBox value={3} /> <InputBox value="" />
								<PurchaseablePointGroup count={1} /> <h3>Heavy</h3> <InputBox value={4} /> <InputBox value={2} /> <InputBox value="-1sq , -2 Dex Moves" />
								<PurchaseablePointGroup count={1} /> <h3>Shield</h3> <InputBox value={1} /> <InputBox value={0} /> <InputBox value="-3 Cast" />
							</div>

							<div className={st.tabledData + ' ' + st.resistanceTable}>
								<h2 className={st.headName}>Resistances</h2>  <div className={st.narrowFlex}><div className={st.fonted + ' ' + st.headLabel}>+3</div> <div className={st.fonted + ' ' + st.headLabel}>+5</div> <div className={st.fonted + ' ' + st.headLabel}>+10</div></div>
								<h3>Universal (UDR)</h3> <div className={st.standardFlex}><CircleStatusGroup count={3} gap={5} /></div>
								<h3>Physical (PDR)</h3> <div className={st.standardFlex}><CircleStatusGroup count={3} gap={5} /></div>
								<h3>Magic (PDR)</h3> <div className={st.standardFlex}><CircleStatusGroup count={3} gap={5} /></div>
								<h3>Soul (SDR)</h3> <div className={st.standardFlex}><CircleStatusGroup count={3} gap={5} /></div>
							</div>

							<div className={st.resistanceTable}>
							<h2 className={st.headName}>Resistances</h2> <div className={st.narrowFlex}><div className={st.fonted + ' ' + st.headLabel}>+3</div> <div className={st.fonted + ' ' + st.headLabel}>+5</div> <div className={st.fonted + ' ' + st.headLabel}>+10</div></div>
								<h3>Fire (FDR)</h3> <div className={st.standardFlex}><CircleStatusGroup count={3} gap={5} /></div>
								<h3>Cold (CDR)</h3> <div className={st.standardFlex}><CircleStatusGroup count={3} gap={5} /></div>
								<h3>Lightning (LDR)</h3> <div className={st.standardFlex}><CircleStatusGroup count={3} gap={5} /></div>
								<h3>Poisons (PoDR)</h3> <div className={st.standardFlex}><CircleStatusGroup count={3} gap={5} /></div>
							</div>
						</div>
						<h2 className={st.movesHeader}>Moves</h2>
						<div className={st.moveList}>
						{
							moves_and_mods.find(item => item.category == 'Defenses')?.moves?.map((move, index) => (
								<Move key={index} move={move} descriptionPopupToggle={descriptionPopupToggle} rollPopupToggle={rollPopupToggle}></Move>
							))
						}
						</div>
					</div>
				</section>

				<section ref={sectionRefs['Combat']} className={st.open}>
					<div className={st.collapser} onClick={toggleSection}><h1><img className={st.titleIcon} src={icoCombat} alt="" /> Combat</h1></div>
					<div className={st.collapsable + ' ' + st.combatLayout}>
						<div className={st.sectionMeta}>
							<h2>Weapon Damage</h2>
							<div className={st.tabledData + ' ' + st.weaponTable}>
								<h2 className={st.headName}>Weapon</h2> <div className={st.fonted + ' ' + st.headLabel}>Resolved Dam.</div>
								<InputBox value="Sword" /> <InputBox value="d6 + 0" />
								<InputBox value="Throw. Knife" /> <InputBox value="d4 + 1" />
								<InputBox value="" /> <InputBox value="" />
							</div>
						</div>
						<h2 className={st.movesHeader}>Moves</h2>
						<div className={st.moveList}>
						{
							moves_and_mods.filter(item => item.category == 'Combat')?.map((category, index) => (
								category.moves.map((move, index) => (
									<Move key={index} move={move} descriptionPopupToggle={descriptionPopupToggle} rollPopupToggle={rollPopupToggle}></Move>
								))
							))
						}
						</div>
					</div>
				</section>

				<section ref={sectionRefs['Moves']} className={st.open}>
					<div className={st.collapser} onClick={toggleSection}><h1><img className={st.titleIcon} src={icoCircles} alt="" /> General</h1></div>
					<div className={st.collapsable + ' ' + st.movesLayout}>
						<h2 className={st.movesHeader}>Moves</h2>
						<div className={st.moveList}>
						{
							moves_and_mods.filter(item => ['Defenses', 'Magic', 'Combat'].includes(item.category) == 0)?.map((category, index) => (
								category.moves.map((move, index) => (
									<Move key={index} move={move} descriptionPopupToggle={descriptionPopupToggle} rollPopupToggle={rollPopupToggle}></Move>
								))
							))
						}
						</div>
					</div>
				</section>

				<section ref={sectionRefs['Magic']} className={st.open}>
					<div className={st.collapser} onClick={toggleSection}><h1><img className={st.titleIcon} src={icoMagic} alt="" /> Magic</h1></div>
					<div className={st.collapsable + ' ' + st.magicLayout}>
						<div className={st.sectionMeta}>
							<div className={st.damageType}><h2>Mana: </h2><PurchaseablePointGroup count={30} columns={10} /></div>
							<div className={st.damageType}><h2>Total: </h2><InputBox /></div>
							<div className={st.damageType}><h2>Current: </h2><InputBox /></div>
						</div>
						<div className={st.sectionMeta + ' ' + st.vertical}>
							<div className={st.damageType}><h2>Spells: </h2></div>
							<div className={st.spellChoice}><PurchaseablePointGroup count={1} /><InputBox /></div>
							<div className={st.spellChoice}><PurchaseablePointGroup count={1} /><InputBox /></div>
							<div className={st.spellChoice}><PurchaseablePointGroup count={1} /><InputBox /></div>
							<div className={st.spellChoice}><PurchaseablePointGroup count={1} /><InputBox /></div>
							<div className={st.spellChoice}><PurchaseablePointGroup count={1} /><InputBox /></div>
						</div>
						<h2 className={st.movesHeader}>Moves</h2>
						<div className={st.moveList}>
						{
							moves_and_mods.find(item => item.category == 'Magic')?.moves?.map((move, index) => (
								<Move key={index} move={move} descriptionPopupToggle={descriptionPopupToggle} rollPopupToggle={rollPopupToggle}></Move>
							))
						}
						</div>
					</div>
				</section>
				
				<section ref={sectionRefs['Psionics']} className={st.open}>
					<div className={st.collapser} onClick={toggleSection}><h1><img className={st.titleIcon} src={icoSpiral} alt="" /> Psionics</h1></div>
					<div className={st.collapsable + ' ' + st.psionics}>
						<h2 className={st.movesHeader}>Moves</h2>
						<div className={st.moveList}>
						{
							moves_and_mods.find(item => item.category == 'Psionics')?.moves?.map((move, index) => (
								<Move key={index} move={move} descriptionPopupToggle={descriptionPopupToggle} rollPopupToggle={rollPopupToggle}></Move>
							))
						}
						</div>
					</div>
				</section>
			</div>
			<nav className={st.sheetNav}>
			<button onClick={closeAllSections}><img src={icoChevronDown} /></button>
			<button onClick={openAllSections}><img src={icoChevronDown} className={st.flipY} /></button>
			</nav>
			<Footer />
		</React.Fragment>
	);
}

export default CharacterSheetPage;
