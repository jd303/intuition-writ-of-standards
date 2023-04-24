import React from "react";
import { useSelector } from "react-redux";
import Header from "../../Components/Header/Header";
import ListingWrapper from "../../Listings/ListingWrapper";
import Listing from "../../Listings/Listing";
import ListingTitle from "../../Listings/ListingTitle/ListingTitle";
import Medal from "../../Components/Medal/Medal";
import CircledText from "../../Components/CircledText/CircledText";

// Styles
import st from "./MagicSpellsPage.module.scss";
import stlist from "../../ListItem.module.scss";
import target from "../../../assets/images/icons/ico.target.svg";
import timeIcon from "../../../assets/images/icons/ico.clock.svg";
import mapPinIcon from "../../../assets/images/icons/ico.map_pin.svg";

// Data
import { MagicSchools } from "../../../interfaces/magic_interfaces";
//import { spells } from "../../../assets/data/spells_data.js";

// State
import { selectViewMode } from "../../../features/viewMode/viewModeSlice";
import { PageTitle } from "../../Components/PageTitle/PageTitle";
import { selectSpellsData } from "../../../features/firebase/spellsDataSlice";

/**
 * Renders the Magic Spells page
 * */
function MagicSpellsPage() {
	// State
	const viewMode = useSelector(selectViewMode);

	let spells = useSelector(selectSpellsData);

	/**
	 * Filter State
	 * */
	const schoolFilterValues = { all: "All", ...MagicSchools };
	const [schoolFilterValue, setSchoolFilterValue] = React.useState("all");

	/**
	 * When a filter is changed
	 * */
	const onFilterChange = (filterChangeEvent) => {
		const filterName = filterChangeEvent.target.name;
		const filterValue = filterChangeEvent.target.value;

		if (filterName == "school") {
			setSchoolFilterValue(filterValue);
		}
	};

	/**
	 * When filters are cleared
	 * */
	const onFilterClear = () => {
		setSchoolFilterValue("all");
	};

	/**
	 * Fiter results by school
	 * */
	const filterBySchool = (spell) => {
		if (schoolFilterValue == "all") return true;
		else return spell.school == schoolFilterValue;
	};

	/**
	 * Define filters
	 * */
	const filters = {
		dropdowns: [
			{
				name: "school",
				values: schoolFilterValues,
			},
		],
		change: onFilterChange,
		clear: onFilterClear,
	};

	/**
	 * Component
	 * */
	return (
		<React.Fragment>
			<Header colour="purple" />
			<PageTitle colour="purple">Spells</PageTitle>
			<ListingWrapper filter={true} filters={filters}>
				{spells.filter(filterBySchool).map((spell, index) => (
					<Listing key={index}>
						<div className={stlist.listitem + " " + st["view-" + viewMode]}>
							<ListingTitle>{spell.name}</ListingTitle>
							<div className={stlist.cost}>
								<CircledText text={spell.cost.toString()} />
							</div>
							<div className={stlist.school}>{spell.school}</div>
							<div className={stlist.mechanics}>
								<div className={stlist.challengeType}>
									<img src={target} />
									{spell.challenge_type}
								</div>
								<div className={stlist.range}>
									<img src={mapPinIcon} />
									{spell.range}
								</div>
								<div className={stlist.duration}>
									<img src={timeIcon} />
									{spell.duration}
								</div>
							</div>
							<ul className={stlist.effects}>
								<li className={stlist.effect}>
									<Medal size="small" rarity="bronze" /> {spell.effect_cantrip}
								</li>
								<li className={stlist.effect}>
									<Medal size="small" rarity="silver" /> {spell.effect_channeled}
								</li>
								<li className={stlist.effect}>
									<Medal size="small" rarity="gold" /> {spell.effect_overchanneled}
								</li>
							</ul>
						</div>
					</Listing>
				))}
			</ListingWrapper>
		</React.Fragment>
	);
}

export default MagicSpellsPage;
