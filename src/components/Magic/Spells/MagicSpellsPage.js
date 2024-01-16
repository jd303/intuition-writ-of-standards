import React from "react";
import { useSelector } from "react-redux";
import Header from "../../Components/Header/Header";
import ListingWrapper from "../../Listings/ListingWrapper";
import Listing from "../../Listings/Listing";
import ListingTitle from "../../Listings/ListingTitle/ListingTitle";
import { PageTitle } from "../../Components/PageTitle/PageTitle";
import CircledText from "../../Components/CircledText/CircledText";
import { Footer } from "../../../components/Components/Footer/Footer";

// Styles
import st from "./MagicSpellsPage.module.scss";
import target from "../../../assets/images/icons/ico.target.svg";
import timeIcon from "../../../assets/images/icons/ico.clock.svg";
import mapPinIcon from "../../../assets/images/icons/ico.map_pin.svg";

// Data
import { selectSourcesData } from "../../../features/firebase/sourcesDataSlice";
//import { MagicSchools } from "../../../interfaces/magic_interfaces";
//import { spells } from "../../../assets/data/spells_data.js";

// State
import { selectViewMode } from "../../../features/viewMode/viewModeSlice";
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
	const source_data = useSelector(selectSourcesData);
	const sourceFilterValues = { all: "All" };
	source_data.forEach(source => sourceFilterValues[source.id] = source.name);
	const [sourceFilterValue, setSourceFilterValue] = React.useState("all");
	const [titleSearchValue, setTitleSearchValue] = React.useState(localStorage.getItem('magic_spells_search') || '');

	/**
	 * When a filter is changed
	 * */
	const onFilterChange = (filterChangeEvent) => {
		const filterName = filterChangeEvent.target.name;
		const filterValue = filterChangeEvent.target.value;

		switch (true) {
			case filterChangeEvent.target instanceof HTMLInputElement:
				setTitleSearchValue(filterValue);
				localStorage.setItem('magic_spells_search', filterValue);
			break;
			default:
				if (filterName == "source") {
					setSourceFilterValue(filterValue);
				}
			break;
		}
	};

	/**
	 * When filters are cleared
	 * */
	const onFilterClear = () => {
		setSourceFilterValue("all");
		setTitleSearchValue('');
	};

	/**
	 * Fiter results by school
	 * */
	const filterBySource = (spell) => {
		if (sourceFilterValue == "all") return true;
		else return spell.sources.indexOf(sourceFilterValue) !== -1;
	};

	const filterByTitle = (spell) => {
		let searchTerms = titleSearchValue.indexOf(',') == -1 ? titleSearchValue.toLowerCase() : titleSearchValue.toLowerCase().split(',');
		if (searchTerms instanceof Array && searchTerms.length > 1) {
			searchTerms = searchTerms.filter(term => term !== '');
			return searchTerms.filter(term => spell.name.toLowerCase().indexOf(term) !== -1).length;
		}
		else return spell.name.toLowerCase().indexOf(titleSearchValue.toLowerCase()) !== -1;
	}

	/**
	 * Define filters
	 * */
	const filters = {
		dropdowns: [
			{
				name: "source",
				values: sourceFilterValues,
			},
		],
		search: [
			{
				name: "title",
				startingValue: titleSearchValue
			}
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
			<div className="mainContent">
				<ListingWrapper filter={true} filters={filters}>
					{spells.filter(filterBySource).filter(filterByTitle).map((spell, index) => (
						<Listing key={index} className={st.spellLayout}>
							<div className={st.name}><ListingTitle>{spell.name}</ListingTitle></div>
							<div className={st.school}>{spell.school}</div>
							<div className={st.mechanics}>
								<div className={st.challengeType}>
									<img src={target} />
									{spell.challenge_type}
								</div>
								<div className={st.range}>
									<img src={mapPinIcon} />
									{spell.range}
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
						</Listing>
					))}
				</ListingWrapper>
			</div>
			<Footer />
		</React.Fragment>
	);
}

export default MagicSpellsPage;
