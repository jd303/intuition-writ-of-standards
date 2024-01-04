import React, { useState, useRef, useEffect } from "react";
import { PropTypes } from "prop-types";
import icoDice from '../../assets/images/ico.dice.svg';
import st from './RollingPopup.module.scss';

function RollingPopup( { rollBonusProp = 0, showPopupProp = false, closeRollPopupProp }) {
	const rollPopup = useRef(null);
	const [rollBonus, setRollBonus] = useState(rollBonusProp);
	const [rollPopupShowing, setRollPopupShowing] = useState(false);
	/*const rollPopupToggle = (bonus) => {
		const resultContainer = rollPopup.current.querySelector(`.${st.result}`);
		resultContainer.innerHTML = '';
		setRollPopupShowing(true);
	}*/

	const performRoll = () => {
		const random = Math.ceil(Math.random() * 20);
		const resultContainer = rollPopup.current.querySelector(`.${st.result}`);
		resultContainer.innerHTML = random + rollBonus;
	}

	useEffect(() => {
		const resultContainer = rollPopup.current.querySelector(`.${st.result}`);
		resultContainer.innerHTML = '';
		setRollBonus(rollBonusProp);
		setRollPopupShowing(showPopupProp);
	}, [rollBonusProp, showPopupProp]);

	// JSX
	return (
		<div className={st.rollPopup + ' ' + (rollPopupShowing && st.open || '')} ref={rollPopup}>
			<button className={st.closer} onClick={closeRollPopupProp}>Close</button>
			<div className={st.hider} onClick={closeRollPopupProp}></div>
			<div className={st.content + ' ' + st.rollContent}>
				<div className={st.headingMedium}>Roll for Move:</div>
				<button onClick={performRoll}><img className={st.diceRollImage} src={icoDice} alt="Roll this Move" /></button> <div className={st.fonted}>Bonus: {rollBonus}</div> <div className={st.fonted}>=</div> <div className={st.result + ' ' + st.fonted}>Total: </div>					
			</div>
		</div>
	);
}

RollingPopup.propTypes = {
	rollBonusProp: PropTypes.number,
	showPopupProp: PropTypes.bool,
	closeRollPopupProp: PropTypes.func.isRequired
}

export default RollingPopup;
