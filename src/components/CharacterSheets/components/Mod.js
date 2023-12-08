import React, { useState } from "react";
import PropTypes from "prop-types";
import st from './Mod.module.scss';
import icoStaminaActive from "../../../assets/images/icons/ico.stamina.active.svg";
import icoStaminaUnactive from "../../../assets/images/icons/ico.stamina.unactive.svg";
import { PurchaseablePointGroup } from "./PurchaseablePointGroup";

export function Mod( { mod, descriptionPopupToggle }) {
	const showDescription = (mod, e) => {
		descriptionPopupToggle(mod, e.target);
	}

	const getStaminaIcon = (mod) => {
		if (mod.stamina) return <img className={st.staminaIcon} src={icoStaminaActive} alt="Stamina" />
		else return <img className={st.staminaIcon} src={icoStaminaUnactive} alt="No Stamina" />
	}

	return (
		<div className={st.el}>
			{getStaminaIcon(mod)} <PurchaseablePointGroup count={1} columns={1} />  <div className={st.name} onClick={showDescription.bind(mod, mod)}>{mod.name}</div>
		</div>
	);
}

Mod.propTypes = {
	mod: PropTypes.object.isRequired,
	descriptionPopupToggle: PropTypes.func
};