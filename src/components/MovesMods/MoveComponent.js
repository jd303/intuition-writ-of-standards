import { useRef } from 'react';
import { PropTypes } from "prop-types";
import ListingTitle from "../Listings/ListingTitle/ListingTitle";
import icoStaminaActive from "../../assets/images/icons/ico.stamina.active.svg";
import icoStaminaUnactive from "../../assets/images/icons/ico.stamina.unactive.svg";
import icoQuickActive from "../../assets/images/icons/ico.quick.active.svg";
import icoQuickUnactive from "../../assets/images/icons/ico.quick.unactive.svg";
import st from "./MovesAndModsPage.module.scss";

MoveCategoryComponent.propTypes = {
	move: PropTypes.object.isRequired,
	searchFilterValue: PropTypes.string,
};

function MoveCategoryComponent(props) {
	let { move, searchFilterValue } = props;

	const filterBySearch = (moveMod) => {
		if (!searchFilterValue.length) return true;
		const searchLower = searchFilterValue.toLowerCase();
		if (moveMod.name && moveMod.name.toLowerCase().indexOf(searchLower) !== -1 || moveMod.description && moveMod.description.toLowerCase().indexOf(searchLower) !== -1) return true;
		return false;
	}

	const containerRef = useRef(null);
	const subMoves = move.subMoves?.filter(filterBySearch);
	const mods = move.mods?.filter(filterBySearch);
	if (containerRef && containerRef.current && subMoves.length == 0 && mods.length == 0) {
		containerRef.current.style = "display: none";
	} else if (containerRef && containerRef.current) {
		containerRef.current.style = "display: block";
	}

	return (
		<div className={st.move} ref={containerRef}>
			<ListingTitle>{move.name}</ListingTitle>
			<div className={st.moveDesc}>{move.description}</div>
			<ul className={st.modsList}>
				{subMoves.map((subMove, index3) => {
					return (
						<li key={index3} className={st.moveMod}>
							<div className={st.rankDetails}>
								<div className={st.modName}>{subMove.name}</div>{" "}
							</div>
							{subMove.description}
						</li>
					);
				})}
			</ul>
			<ul className={st.modsList}>
				{mods.map((mod, index3) => {
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
