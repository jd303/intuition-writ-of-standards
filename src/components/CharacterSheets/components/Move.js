import React from "react";
import PropTypes from "prop-types";
import { PurchaseablePoint } from './PurchaseablePoint';

import icoDice from '../../../assets/images/ico.dice.svg';
import st from './Move.module.scss';
import { InputBox } from "./InputBox";
import { PurchaseablePointGroup } from "./PurchaseablePointGroup";
import { Mod } from "./Mod";

export function Move( { move, pointsSpent = 0, statBonus = 0, descriptionPopupToggle, rollPopupToggle }) {

	return (
		<div className={st.el}>
			<div className={st.title}>{move.name}</div>
			<div className={st.pointTrack}><PurchaseablePointGroup count={10} columns={10} /></div>
			<div className={st.bonuses}><InputBox value={`+${pointsSpent+statBonus}`} /></div>
			<div className={st.buttons}><button className={st.diceRoll} onClick={rollPopupToggle.bind(null, pointsSpent+statBonus)}><img src={icoDice} alt="Roll this Move" /></button></div>
			<div className={st.description}>{move.short_desc}</div>
			<div className={st.mods}>
				{move.mods.map((mod, index) => (
					<Mod key={index} mod={mod} descriptionPopupToggle={descriptionPopupToggle} />
				))}
			</div>
		</div>
	);
}

Move.propTypes = {
	move: PropTypes.object.isRequired,
	pointsSpent: PropTypes.number,
	statBonus: PropTypes.number,
	descriptionPopupToggle: PropTypes.func,
	rollPopupToggle: PropTypes.func,
};