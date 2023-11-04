import React from "react";

// Data
import { powers, PsionicTalents, PsionicLevels } from "../../assets/data/psionics_data";

function PsionicFilters() {
	/**
	 * Filter State
	 * */
	const levelFilterValues = { All: "All", ...PsionicLevels };
	const [levelFilterValue, setLevelFilterValue] = React.useState("All");

	/**
	 * When a filter is changed
	 * */
	const onFilterChange = (filterChangeEvent) => {
		const filterName = filterChangeEvent.target.name;
		const filterValue = filterChangeEvent.target.value;

		if (filterName == "level") {
			setLevelFilterValue(filterValue);
		}
	};

	/**
	 * When filters are cleared
	 * */
	const onFilterClear = () => {
		setLevelFilterValue("All");
	};

	/**
	 * Fiter results by school
	 * */
	const filterPsionics = (power) => {
		console.log(levelFilterValue);
		if (levelFilterValue !== "All") {
			if (power.level !== parseInt(levelFilterValue)) return false;
		}

		return true;
	};

	/**
	 * Define filters
	 * */
	const filters = {
		dropdowns: [
			{
				name: "level",
				values: levelFilterValues,
			},
		],
		change: onFilterChange,
		clear: onFilterClear,
	};

	return {
		filters: filters,
		filterPsionics: filterPsionics,
		onFilterClear: onFilterClear,
		onFilterChange: onFilterChange
	}
}

export default PsionicFilters;
