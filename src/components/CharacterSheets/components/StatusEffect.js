import React, { useState } from "react";
import PropTypes from "prop-types";
import icoDice from '../../../assets/images/ico.dice.svg';
import st from './StatusEffect.module.scss';
import { InputBox } from "./InputBox";
import { CircleStatusGroup } from "./CircleStatusGroup";
import Medal from "../../Components/Medal/Medal";

export function StatusEffect( { status }) {

	const [descriptionVisible, setDescriptionVisible] = useState(false);
	const toggleDescriptionVisible = () => {
		setDescriptionVisible(!descriptionVisible);
	}

	const getStatusIcon = (statusType) => {
		switch (statusType) {
			case "short (1)":
				return <Medal size="tiny" rarity="bronze" />;
			case "standard (3)":
				return <Medal size="tiny" rarity="silver" />;
			default:
				return <Medal size="tiny" rarity="gold" />;
		}
	}

	const getStatusValue = (statusType) => {
		switch (statusType) {
			case "short (1)":
				return "(1)";
			case "standard (3)":
				return "(3)";
			default:
				return "(∞)";
		}
	}

	return (
		<div className={st.el + ' ' + (descriptionVisible && st.descriptionVisible || '')}>
			<div className={st.mainBlock}>
				<CircleStatusGroup count={1} />
				<div className={st.title} onClick={toggleDescriptionVisible}><div className={st.icon}>{getStatusIcon(status.type)}</div> {status.name}</div>
				<InputBox className="forPrint" /*value="Rounds"*/ />
				<div className={st.description}><span className={st.type}>{status.type}</span> {status.effect}</div>
			</div>
		</div>
	);
}

StatusEffect.propTypes = {
	status: PropTypes.object.isRequired
};