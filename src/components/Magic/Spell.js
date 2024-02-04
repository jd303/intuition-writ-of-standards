import React from "react";
import { PropTypes } from "prop-types";
import ListingTitle from "../Listings/ListingTitle/ListingTitle";
import CircledText from "../Components/CircledText/CircledText";

// Styles
import st from "./Spell.module.scss";
import target from "../../assets/images/icons/ico.target.svg";
import timeIcon from "../../assets/images/icons/ico.clock.svg";
import mapPinIcon from "../../assets/images/icons/ico.map_pin.svg";

/**
 * Renders the Magic Spells page
 * */
function Spell({ spell }) {

	/**
	 * Component
	 * */
	return (
		<div className={st.spellLayout}>
			<div className={st.name}><ListingTitle>{spell.name}</ListingTitle> {spell.level}</div>
			<div className={st.school}>{spell.school}</div>
			<div className={st.mechanics}>
				<div className={st.challengeType}>
					<img src={target} />
					{spell.challenge_type}
				</div>
				<div className={st.range}>
					<img src={mapPinIcon} />
					{spell.shape}
				</div>
				<div className={st.duration}>
					<img src={timeIcon} />
					{spell.duration}
				</div>
			</div>
			<ul className={st.effects}>
				<li className={st.effect}>
					<CircledText text={spell.cantripcost?.toString()} colour="bronze" /> <div className={st.desc}>{spell.cantrip}</div>
				</li>
				<li className={st.effect}>
					<CircledText text={spell.standardcost?.toString()} colour="silver" /> <div className={st.desc}>{spell.standard}</div>
				</li>
				<li className={st.effect}>
					<CircledText text={spell.empoweredcost?.toString()} colour="gold" /> <div className={st.desc}>{spell.empowered}</div>
				</li>
			</ul>
		</div>
	);
}

Spell.propTypes = {
	spell: PropTypes.object,
}

export default Spell;
