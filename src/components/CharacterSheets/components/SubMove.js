import React, { useState } from "react";
import PropTypes from "prop-types";
import icoDice from '../../../assets/images/ico.dice.svg';
import st from './SubMove.module.scss';
import { InputBox } from "./InputBox";

export function SubMove( { move }) {

	const [descriptionVisible, setDescriptionVisible] = useState(false);
	const toggleDescriptionVisible = () => {
		setDescriptionVisible(!descriptionVisible);
	}

	return (
		<div className={st.el + ' ' + (descriptionVisible && st.descriptionVisible || '')}>
			<div className={st.mainBlock}>
				<div className={st.title} onClick={toggleDescriptionVisible}>{move.name}</div>
				<div className={st.spacer}></div>
				<div className={st.description}>{ move.type !== "Move" && <span className={st.type}>{move.type}</span>} {move.description}</div>
			</div>
		</div>
	);
}

SubMove.propTypes = {
	move: PropTypes.object.isRequired
};