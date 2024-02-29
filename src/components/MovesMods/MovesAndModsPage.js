import React, { useMemo, useState } from "react";
import Header from "../Components/Header/Header";
import { PageTitle } from "../Components/PageTitle/PageTitle";
import MoveCategoryComponent from "./MoveCategory";
import { useSelector } from "react-redux";
import { selectMovesData } from "../../features/firebase/movesDataSlice";
import { Footer } from "../../components/Components/Footer/Footer";
import ListingWrapper from "../Listings/ListingWrapper";
import { prepareMovesAndMods } from "../../utils/prepareMovesAndMods";

function MovesAndModsPage() {
	const moves_and_mods = useSelector(selectMovesData);

	const movesCategorised = useMemo(() => {
		const preparedMoves = prepareMovesAndMods(moves_and_mods);
		return preparedMoves;
	}, [moves_and_mods]);

	/**
	 * Setup type filters
	 */
	const [filterTypeValue, setFilterTypeValue] = useState("All");
	const filterTypeValues = { All: "All", athletics: "Athletics", combat: "Combat", body: "Body", general: "General", defences: "Defences", perception: "Perception", knowledge: "Knowledge", deception: "Deception", influence: "Influence", arts: "Arts", engineering: "Engineering", crafty: "Crafty", beast_mastery: "Beast Mastery", magic: "Magic", inner_power: "Inner Power", psionics: "Psionics" };
	const [searchValue, setSearchValue] = useState('');

	const onFilterChange = (event) => {
		const target = event.target;
		const targetProperty = target.getAttribute("name");
		const targetValue = target.value;

		switch (true) {
			case event.target instanceof HTMLInputElement:
				setSearchValue(targetValue);
			break;
			default:
				setFilterTypeValue(targetValue);
			break;
		}
	}

	const onFilterClear = () => {
		setFilterTypeValue("All");
		setSearchValue("");
	}

	const filterByType = (category) => {
		if (filterTypeValue == "All") return true;
		return category == filterTypeValue;
	}

	const filters = {
		dropdowns: [
			{
				name: "type",
				values: filterTypeValues,
			},
		],
		search: [
			{
				name: "Text Search",
				startingValue: searchValue
			}
		],
		change: onFilterChange,
		clear: onFilterClear,
	};

	return (
		<React.Fragment>
			<Header colour='orange' />
			<PageTitle colour='orange'>Moves &amp; Mods</PageTitle>
			<div className="mainContent">
				<ListingWrapper filter={true} filters={filters} lockView="list">
					{Object.keys(movesCategorised)?.filter(filterByType).map((categoryKey, index) => (
						<MoveCategoryComponent key={index} name={categoryKey} category={movesCategorised[categoryKey].moves} searchFilterValue={searchValue} />
					))}
				</ListingWrapper>
			</div>
			<Footer />
		</React.Fragment>
	);
}

export default MovesAndModsPage;
