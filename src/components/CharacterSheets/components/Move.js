import React from "react";
import PropTypes from "prop-types";
import { PurchaseablePoint } from './PurchaseablePoint';

import Dice from '../../../assets/images/ico.dice.svg';
import st from './Move.module.scss';
import { InputBox } from "./InputBox";
import { PurchaseablePointGroup } from "./PurchaseablePointGroup";
import { Mod } from "./Mod";

export function Move( { move, children, descriptionPopupToggle }) {

	return (
		<div className={st.el}>
			<div className={st.title}>{move.name}</div>
			<div className={st.pointTrack}><PurchaseablePointGroup count={10} columns={10} /></div>
			<div className={st.bonuses}><InputBox value="+3" /></div>
			<div className={st.buttons}><button className={st.diceRoll}><img src={Dice} alt="Roll this Move" /></button></div>
			<div className={st.description}>{move.short_desc} {children}</div>
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
	children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]).isRequired,
	descriptionPopupToggle: PropTypes.func
};