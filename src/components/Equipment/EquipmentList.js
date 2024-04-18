import React, { useState } from "react";
import { PropTypes } from "prop-types";
import ListingWrapper from "../Listings/ListingWrapper";
import st from "./EquipmentPageStyles.module.scss";
import ls from "../Listings/Listings.module.scss";
import Listing from "../Listings/Listing";
import { useMemo } from "react";

EquipmentList.propTypes = {
	costsList: PropTypes.array.isRequired,
};

function EquipmentList(props) {
	const { costsList } = props;

	const categorisedCosts = useMemo(() => {
		const categories = {};
		costsList.forEach(cost => {
			if (!categories[cost.type]) categories[cost.type] = [];
			categories[cost.type].push(cost);
		});
		return categories;
	}, [costsList]);

	/**
	 * Define filters
	 * */
	const [searchFilterValue, setSearchFilterValue] = useState('');
	const onFilterChange = (event) => {
		setSearchFilterValue(event.target.value.toLowerCase());
	}

	const onFilterClear = () => {
		setSearchFilterValue('');
	}

	const filters = {
		search: [
			{
				name: "title",
			}
		],
		change: onFilterChange,
		clear: onFilterClear,
	};

	/**
	 * Filters by the search term
	 * */
	const filterBySearch = (item) => {
		if (!searchFilterValue.length) return true;
		return Object.values(item).join(' ').toLowerCase().indexOf(searchFilterValue) !== -1;
	};

	return (
		<ListingWrapper filter={true} filters={filters}>
			{Object.keys(categorisedCosts).map((key, index) => (
				<div key={index} className={st.category}>
					<h2>{key}</h2>
					{categorisedCosts[key].filter(filterBySearch).map((item, costIndex) => (
						<Listing key={costIndex} className={st.equipmentLayout}>
							<div className={st.listingMeta}>
								<div className={st.listingName}>{item.name}</div>
								<div className={st.listingCost}>{item.cost}</div>
							</div>
							<div>{item.description}</div> 
						</Listing>
					))}
				</div>
			))}
		</ListingWrapper>
	);
}

export default EquipmentList;
