import React, { useState } from "react";
import PropTypes from "prop-types";
import st from './StatusEffect.module.scss';
import { InputBox } from "./InputBox";
import { CircleStatusGroup } from "./CircleStatusGroup";
import Medal from "../../Components/Medal/Medal";

export function StatusEffect( { status, circleStatusClickCallback }) {

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

	return (
		<div className={st.el + ' ' + (descriptionVisible && st.descriptionVisible || '')}>
			<div className={st.mainBlock}>
				<CircleStatusGroup count={1} usedKey={`statuses-${status.id}`} clickCallback={circleStatusClickCallback} />
				<div className={st.title} onClick={toggleDescriptionVisible}><div className={st.icon}>{getStatusIcon(status.type)}</div> {status.name}</div>
				<div className={st.description}><span className={st.type}>{status.type}</span> {status.effect}</div>
			</div>
		</div>
	);
}

StatusEffect.propTypes = {
	status: PropTypes.object.isRequired,
	circleStatusClickCallback: PropTypes.func.isRequired
};