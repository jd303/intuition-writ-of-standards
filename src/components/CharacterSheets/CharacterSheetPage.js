import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import Header from "../Components/Header/Header";
import { InputBox } from './components/InputBox';
import { PurchaseablePointGroup } from "./components/PurchaseablePointGroup";
import { CircleStatus } from './components/CircleStatus';
import { Move } from './components/Move';
import { PageTitle } from "../Components/PageTitle/PageTitle";
import { Footer } from "../../components/Components/Footer/Footer";

import { selectMovesData } from "../../features/firebase/movesDataSlice";

import GenericProfile from '../../assets/images/character_profiles/_Generic.Character.Male.webp';
import bronzeMedal from "../../assets/images/icons/ico.medal.bronze.svg";
import st from './CharacterSheetPage.module.scss';
import icoPoison from '../../assets/images/icons/ico.poison.svg';
import isoShield from '../../assets/images/icons/ico.shield.svg';
import icoWellness from '../../assets/images/icons/ico.wellness.svg';
import icoCombat from '../../assets/images/icons/ico.combat.svg';
import icoMagic from '../../assets/images/icons/ico.magic.svg';
import icoCircles from '../../assets/images/icons/ico.circles.svg';
import icoSpiral from '../../assets/images/icons/ico.spiral.svg';
import icoChevronDown from '../../assets/images/icons/ico.chevron.down.svg';
import { CircleStatusGroup } from "./components/CircleStatusGroup";

function CharacterSheetPage() {
	const moves_and_mods = useSelector(selectMovesData);

	const [ sheets, setSheets ] = useState([]);

	useEffect(() => {
		let characters = JSON.parse(localStorage.getItem('characters') || '[]');
		console.log("Got characters");
		setSheets(characters);
	}, []);

	const [ stats, setStats ] = useState(['Strength', 'Constitution', 'Dexterity', 'Intelligence', 'Wisdom', 'Charisma']);

	// Section expanders
	const sections = ['Abilities', 'Wellness', 'Defenses', 'Combat', 'Moves', 'Magic', 'Psionics'];
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

	const descriptionPopup = useRef(null);
	const [popupShowing, setPopupShowing] = useState(false);
	const descriptionPopupToggle = (mod, target) => {
		descriptionPopup.current.querySelector('.'+st.content).innerHTML = mod.description;
		setPopupShowing(true);

		//const targetLocation = target.getBoundingClientRect();
		const offsetParent = target.closest('section');
		descriptionPopup.current.style.top = `${offsetParent.offsetTop + target.offsetTop}px`;
	}

	const closeDescriptionPopup = () => {
		setPopupShowing(false);
	}

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
			<div className="mainContent">
				<div className={st.descriptionPopup + ' ' + (popupShowing && st.open || '')} ref={descriptionPopup}><div className={st.hider} onClick={closeDescriptionPopup}></div><div className={st.content}></div></div>

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

				<section ref={sectionRefs['Abilities']} className={st.open}>
					<div className={st.collapser} onClick={toggleSection}><h1><img className={st.titleIcon} src={icoPoison} alt="" /> Abilities</h1></div>
					<div  className={st.collapsable + ' ' + st.abilitiesLayout}>
						<div className={st.stats}>
							<div className={st.standardFlex}><h2>Statistics</h2> <div className={st.littleNote}>(Max 15 points)</div></div>
							<div className={st.list}>
								{stats.map((stat, index) => (
									<div className={st.stat} key={index}>
										<img src={bronzeMedal} alt="Icon" />
										<div className={st.statName}><h3>{stat}</h3></div>
										<div className={st.statValue}>+3</div>
										<div className={st.statPurchases}>
											<PurchaseablePointGroup count={7} columns={7} purchased={2} />
										</div>
									</div>
								))}
							</div>
						</div>
						<div className={st.buffs}>
							<h2>Buffs</h2>
							<div className={st.list}>
								<div className={st.flex}><InputBox value="STR Moves" /> <InputBox value='+2' /></div>
								<div className={st.flex}><InputBox value="Combat" /> <InputBox value='+1' /></div>
								<div className={st.flex}><InputBox value="" /> <InputBox value='' /></div>
								<div className={st.flex}><InputBox value="" /> <InputBox value='' /></div>
							</div>
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
						<div className={st.moveListMeta}>
							<div>
								<div className={st.defenseType}><h2>Armour Class </h2><InputBox value="3" /></div>
							</div>
							<div>
								<h2>Universal Resistances</h2>
								<div className={st.defenseType}><h3>Universal (UDR): </h3><InputBox value="3" /></div>
								<div className={st.defenseType}><h3>Physical / Sonic (PDR): </h3><InputBox value="3" /></div>
								<div className={st.defenseType}><h3>Magic (MDR): </h3><InputBox value="3" /></div>
							</div>
							<div>
								<h2>Elemental Resistances</h2>
								<div className={st.defenseType}><h3>Fire (FDR): </h3><InputBox value="3" /></div>
								<div className={st.defenseType}><h3>Cold (CDR): </h3><InputBox value="3" /></div>
								<div className={st.defenseType}><h3>Lightning (LDR): </h3><InputBox value="3" /></div>
								<div className={st.defenseType}><h3>Acid / Poison (ADR): </h3><InputBox value="3" /></div>
							</div>
						</div>
						<h2>Moves</h2>
						<div className={st.moveList}>
						{
							moves_and_mods.find(item => item.category == 'Defenses')?.moves?.map((move, index) => (
								<Move key={index} move={move} descriptionPopupToggle={descriptionPopupToggle}>
									Max block calc
								</Move>
							))
						}
						</div>
					</div>
				</section>

				<section ref={sectionRefs['Combat']} className={st.open}>
					<div className={st.collapser} onClick={toggleSection}><h1><img className={st.titleIcon} src={icoCombat} alt="" /> Combat</h1></div>
					<div className={st.collapsable + ' ' + st.combatLayout}>
						<div className={st.moveListMeta}>
							<div>
								<h2>Melee Damage</h2>
								<div className={st.damageType}><h3>Base: </h3><InputBox value="3" /></div>
								<div className={st.damageType}><h3>Resolved: </h3><InputBox value="5" /></div>
							</div>
							<div>
								<h2>Ranged Damage</h2>
								<div className={st.damageType}><h3>Base: </h3><InputBox value="3" /></div>
								<div className={st.damageType}><h3>Resolved: </h3><InputBox value="5" /></div>
							</div>
						</div>
						<h2>Moves</h2>
						<div className={st.moveList}>
						{
							moves_and_mods.filter(item => item.category == 'Combat')?.map((category, index) => (
								category.moves.map((move, index) => (
									<Move key={index} move={move} descriptionPopupToggle={descriptionPopupToggle}>
										Max block calc
									</Move>
								))
							))
						}
						</div>
					</div>
				</section>

				<section ref={sectionRefs['Moves']} className={st.open}>
					<div className={st.collapser} onClick={toggleSection}><h1><img className={st.titleIcon} src={icoCircles} alt="" /> General</h1></div>
					<div className={st.collapsable + ' ' + st.movesLayout}>
						<h2>Moves</h2>
						<div className={st.moveList}>
						{
							moves_and_mods.filter(item => ['Defenses', 'Magic', 'Combat'].includes(item.category) == 0)?.map((category, index) => (
								category.moves.map((move, index) => (
									<Move key={index} move={move} descriptionPopupToggle={descriptionPopupToggle}>
										Max block calc
									</Move>
								))
							))
						}
						</div>
					</div>
				</section>

				<section ref={sectionRefs['Magic']} className={st.open}>
					<div className={st.collapser} onClick={toggleSection}><h1><img className={st.titleIcon} src={icoMagic} alt="" /> Magic</h1></div>
					<div className={st.collapsable + ' ' + st.magicLayout}>
						<div className={st.moveListMeta}>
							<div className={st.damageType}><h2>Mana: </h2><PurchaseablePointGroup count={30} columns={10} /></div>
							<div className={st.damageType}><h2>Total: </h2><InputBox /></div>
							<div className={st.damageType}><h2>Current: </h2><InputBox /></div>
						</div>
						<div className={st.spellListMeta + ' ' + st.vertical}>
							<div className={st.damageType}><h2>Spells: </h2></div>
							<div className={st.spellChoice}><PurchaseablePointGroup count={1} /><InputBox /></div>
							<div className={st.spellChoice}><PurchaseablePointGroup count={1} /><InputBox /></div>
							<div className={st.spellChoice}><PurchaseablePointGroup count={1} /><InputBox /></div>
							<div className={st.spellChoice}><PurchaseablePointGroup count={1} /><InputBox /></div>
							<div className={st.spellChoice}><PurchaseablePointGroup count={1} /><InputBox /></div>
						</div>
						<h2>Moves</h2>
						<div className={st.moveList}>
						{
							moves_and_mods.find(item => item.category == 'Magic')?.moves?.map((move, index) => (
								<Move key={index} move={move} descriptionPopupToggle={descriptionPopupToggle}>
									Additional rule
								</Move>
							))
						}
						</div>
					</div>
				</section>
				
				<section ref={sectionRefs['Psionics']} className={st.open}>
					<div className={st.collapser} onClick={toggleSection}><h1><img className={st.titleIcon} src={icoSpiral} alt="" /> Psionics</h1></div>
					<div className={st.collapsable + ' ' + st.psionics}>
						<h2>Moves</h2>
						<div className={st.moveList}>
						{
							moves_and_mods.find(item => item.category == 'Psionics')?.moves?.map((move, index) => (
								<Move key={index} move={move} descriptionPopupToggle={descriptionPopupToggle}>
									Additional rule
								</Move>
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
