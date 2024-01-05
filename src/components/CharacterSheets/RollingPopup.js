import React, { useState, useRef, useEffect } from "react";
import { PropTypes } from "prop-types";
import icoDice from '../../assets/images/icons/ico.dice.svg';
import icoClose from '../../assets/images/icons/ico.close.svg';
import st from './RollingPopup.module.scss';

function RollingPopup( { rollMoveNameProp = "", rollBonusProp = 0, showPopupProp = false, closeRollPopupProp }) {

	const rollPopup = useRef(null);
	const [rollBonus, setRollBonus] = useState(rollBonusProp);
	const [rollPopupShowing, setRollPopupShowing] = useState(false);

	const performRoll = () => {
		const random = Math.ceil(Math.random() * 20);
		const resultContainer = rollPopup.current.querySelector(`.${st.result}`);
		resultContainer.innerHTML = random + rollBonus;
		const rawContainer = rollPopup.current.querySelector(`.${st.rawRoll}`);
		rawContainer.innerHTML = random;
	}

	const closePopup = () => {
		const resultContainer = rollPopup.current.querySelector(`.${st.result}`);
		resultContainer.innerHTML = '';
		const rawContainer = rollPopup.current.querySelector(`.${st.rawRoll}`);
		rawContainer.innerHTML = '';
		closeRollPopupProp();
	}

	useEffect(() => {
		const resultContainer = rollPopup.current.querySelector(`.${st.result}`);
		resultContainer.innerHTML = '';
		setRollBonus(rollBonusProp);
		setRollPopupShowing(showPopupProp);
	}, [rollBonusProp, showPopupProp]);

	// Add a move note
	const [moveNote, setMoveNote] = useState(rollBonusProp);
	useEffect(() => {
		switch (rollMoveNameProp) {
			case "Block":
			case "Dodge":
				setMoveNote("Note: The Block and Dodge Move have maximum bonuses, set by Armour and Shields.  Please manually adjust the Total if the stated Bonus exceeds your Maximum Bonus.");
			break;
			default:
				setMoveNote('');
		}
	}, [rollMoveNameProp]);

	// JSX
	return (
		<div className={st.rollPopup + ' ' + (rollPopupShowing && st.open || '')} ref={rollPopup}>
			<button className={st.closer} onClick={closePopup}><img src={icoClose} alt="Close" /></button>
			<div className={st.hider} onClick={closeRollPopupProp}></div>
			<div className={st.content + ' ' + st.rollContent}>
				<div className={st.headingMedium}>Perform a Roll: {rollMoveNameProp}</div>
				<button className={st.rollButton} onClick={performRoll}><img className={st.diceRollImage} src={icoDice} alt="Roll this Move" /></button>
				<div className={st.fonted}>Bonus &nbsp;&nbsp;&nbsp;+ </div> <div className={st.fonted}>Raw Roll</div> <div className={st.fonted}>=</div> <div className={st.fonted}>Total: </div>
				<div className={st.fonted}>{rollBonus}</div> <div className={st.rawRoll + ' ' + st.fonted}>{true}</div> <div></div> <div className={st.result + ' ' + st.fonted}></div>
				<div className={st.moveNotes}>{moveNote}</div>
				<div className={st.notes}>This roller automatically includes your Dice Roll and your Move Rank.  It does not include Bonuses such as those from Magic and Items - please manually add those to the total.</div>
			</div>
		</div>
	);
}

RollingPopup.propTypes = {
	rollMoveNameProp: PropTypes.string,
	rollBonusProp: PropTypes.number,
	showPopupProp: PropTypes.bool,
	closeRollPopupProp: PropTypes.func.isRequired
}

export default RollingPopup;
