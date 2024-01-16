//import React, { useState } from "react";
//import React from "react";
import { PropTypes } from "prop-types";
import ListingTitle from "../Listings/ListingTitle/ListingTitle";
import icoStaminaActive from "../../assets/images/icons/ico.stamina.active.svg";
import icoStaminaUnactive from "../../assets/images/icons/ico.stamina.unactive.svg";
import icoQuickActive from "../../assets/images/icons/ico.quick.active.svg";
import icoQuickUnactive from "../../assets/images/icons/ico.quick.unactive.svg";
import st from "./MovesAndModsPage.module.scss";

MoveCategoryComponent.propTypes = {
	move: PropTypes.object.isRequired,
};

function MoveCategoryComponent(props) {
	let { move } = props;

	return (
		<div className={st.move}>
			<ListingTitle>{move.name}</ListingTitle>
			<div className={st.moveDesc}>{move.description}</div>
			<ul className={st.modsList}>
				{move.mods?.map((mod, index3) => {
					return (
						<li key={index3} className={st.moveMod}>
							<div className={st.rankDetails}>
								<div className={st.modName}>{mod.name}</div>{" "}
								{(mod.stamina && <img className={st.icon} src={icoStaminaActive} alt="" />) || <img className={st.icon} src={icoStaminaUnactive} alt="" />}
								{(mod.quick && <img className={st.icon} src={icoQuickActive} alt="" />) || <img className={st.icon} src={icoQuickUnactive} alt="" />}
							</div>
							{mod.description}
						</li>
					);
				})}
			</ul>
		</div>
	);
}

export default MoveCategoryComponent;
