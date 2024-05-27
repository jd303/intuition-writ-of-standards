import React from "react";
import { useSelector } from "react-redux";
import Header from "../../Components/Header/Header";
import ListingWrapper from "../../Listings/ListingWrapper";
import Listing from "../../Listings/Listing";
import Spell from "../Spell";
import { PageTitle } from "../../Components/PageTitle/PageTitle";
import { Footer } from "../../../components/Components/Footer/Footer";

// Styles
import st from "./MagicSpellsPage.module.scss";

// Data
import { selectSourcesData } from "../../../features/firebase/sourcesDataSlice";

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
	const sourcePotableValues = { all: "All", potable: "Potable Only" };
	source_data.forEach(source => sourceFilterValues[source.id] = source.name);
	const [sourceFilterValue, setSourceFilterValue] = React.useState("all");
	const [potableFilterValue, setPotableFilterValue] = React.useState("all");
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
				if (filterName == "potability") {
					setPotableFilterValue(filterValue);
				}
			break;
		}
	};

	/**
	 * When filters are cleared
	 * */
	const onFilterClear = () => {
		setSourceFilterValue("all");
		setPotableFilterValue("all");
		setTitleSearchValue('');
		localStorage.setItem('magic_spells_search', '');
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
			return searchTerms.filter(term => (spell.name + spell.easyname).toLowerCase().indexOf(term) !== -1).length;
		}
		else return (spell.name + spell.easyname).toLowerCase().indexOf(titleSearchValue.toLowerCase()) !== -1;
	}

	const filterByPotable = (spell) => {
		if (potableFilterValue == "all") return true;
		else return spell.potable == "Yes";
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
			{
				name: "potability",
				values: sourcePotableValues
			}
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
					{spells.filter(filterBySource).filter(filterByTitle).filter(filterByPotable).map((spell, index) => (
						<Listing key={index}>
							<Spell spell={spell} />
						</Listing>
					))}
				</ListingWrapper>
			</div>
			<Footer />
		</React.Fragment>
	);
}

export default MagicSpellsPage;
