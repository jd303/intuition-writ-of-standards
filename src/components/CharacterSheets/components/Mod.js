import React, { useState } from "react";
import PropTypes from "prop-types";
import st from './Mod.module.scss';
import icoStaminaActive from "../../../assets/images/icons/ico.stamina.active.svg";
import icoStaminaUnactive from "../../../assets/images/icons/ico.stamina.unactive.svg";
import icoQuickActive from "../../../assets/images/icons/ico.quick.active.svg";
import icoQuickUnactive from "../../../assets/images/icons/ico.quick.unactive.svg";
import { PurchaseablePointGroup } from "./PurchaseablePointGroup";

export function Mod( { mod, moveID, clickCallback, purchased }) {
	const [descriptionVisible, setDesciptionVisible] = useState(false);
	const toggleDescriptionVisible = () => {
		setDesciptionVisible(!descriptionVisible);
	}

	const getStaminaIcon = (mod) => {
		if (mod.stamina) return <img className={st.staminaIcon} src={icoStaminaActive} alt="Stamina" />
		else return <img className={st.staminaIcon} src={icoStaminaUnactive} alt="No Stamina" />
	}

	const getQuickIcon = (mod) => {
		if (mod.quick) return <img className={st.quickIcon} src={icoQuickActive} alt="Stamina" />
		else return <img className={st.quickIcon} src={icoQuickUnactive} alt="No Stamina" />
	}

	return (
		<div className={st.el}>
			{getStaminaIcon(mod)} {getQuickIcon(mod)} <PurchaseablePointGroup count={1} columns={1} purchased={purchased && 1 || 0} clickCallback={clickCallback} purchaseKey={`mod.${moveID}.${mod.id}`} />  <div className={st.name} onClick={toggleDescriptionVisible}>{mod.name} {mod.type == "Passive" && <div className={st.passive}>(Passive)</div>}</div>
			<div className={st.description + ' ' + (descriptionVisible && st.visible || '')}>{mod.description}</div>
		</div>
	);
}

Mod.propTypes = {
	mod: PropTypes.object.isRequired,
	moveID: PropTypes.string,
	clickCallback: PropTypes.func.isRequired,
	purchased: PropTypes.bool.isRequired,
};