import React, { useState } from "react";
import Header from "../Components/Header/Header";
import { PageTitle } from "../Components/PageTitle/PageTitle";
import MoveCategoryComponent from "./MoveCategory";
import { useSelector } from "react-redux";
import { selectMovesData } from "../../features/firebase/movesDataSlice";
import { Footer } from "../../components/Components/Footer/Footer";
import StatusBar from "../Listings/Filter/StatusBar"

function MovesAndModsPage() {
	const moves_and_mods = useSelector(selectMovesData);

	console.log(moves_and_mods);

	/**
	 * Setup type filters
	 */
	const [filterTypeValue, setFilterTypeValue] = useState("All");
	const filterTypeValues = { All: "All", Combat: "Combat", Ranged: "Ranged" }

	const onFilterChange = (event) => {
		const target = event.target;
		const targetProperty = target.getAttribute("name");
		const targetValue = target.value;
		setFilterTypeValue(targetValue);
	}

	const onFilterClear = () => {
		console.log("Clear filter");
	}

	const filterByType = (category) => {
		if (filterTypeValue == "All") return true;
		return category.name == filterTypeValue;
	}

	const filters = {
		dropdowns: [
			{
				name: "type",
				values: filterTypeValues,
			},
		],
		change: onFilterChange,
		clear: onFilterClear,
	};

	return (
		<React.Fragment>
			<Header colour='orange' />
			<PageTitle colour='orange'>Moves &amp; Mods</PageTitle>
			<div className="mainContent">
				<StatusBar filter={true} filters={filters} />
				<section>
					{moves_and_mods.filter(filterByType).map((category, index) => {
						return <MoveCategoryComponent key={index} category={category} />;
					})}
				</section>
			</div>
			<Footer />
		</React.Fragment>
	);
}

export default MovesAndModsPage;
