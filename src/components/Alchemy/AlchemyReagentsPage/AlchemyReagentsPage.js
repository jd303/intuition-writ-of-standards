import React, { useState } from "react";
import { useSelector } from "react-redux";
import Header from "../../Components/Header/Header";
import { PageTitle } from "../../Components/PageTitle/PageTitle";
import ListingWrapper from "../../Listings/ListingWrapper";
import Listing from "../../Listings/Listing";
import ListingTitle from "../../Listings/ListingTitle/ListingTitle";
import { selectAlchemicalsData } from "../../../features/firebase/alchemicalsDataSlice";
import { Rarity, ReagentProperties, AlchemicalTypes } from "../../../assets/data/reagents_data.js";
import Medal from "../../Components/Medal/Medal";
import { Footer } from "../../../components/Components/Footer/Footer";

// Styles and images
import styles from "./AlchemyReagentsPage.module.scss";

function AlchemyReagentsPage() {
	const alchemicals_data = useSelector(selectAlchemicalsData);
	let reagents = alchemicals_data.filter(item => item.type == "reagent");
	reagents = reagents.map(reagent => { return { ...reagent, reagents: reagent.reagents.split('-') }});

	/**
	 * Setup Filters
	 */
	const baseFilters = { contains: "All", rarity: "All", type: "All" };
	const [filterValues, setFilters] = useState(baseFilters);
	const [searchValue, setSearchValue] = useState('');

	/**
	 * A user changes the filter
	 * r*/
	const onFilterChange = (event) => {
		const target = event.target;
		const targetProperty = target.getAttribute("name");
		const targetValue = target.value;

		switch (true) {
			case event.target instanceof HTMLInputElement:
				setSearchValue(targetValue);
			break;
			default:
				setFilters(() => {
					switch (targetProperty) {
						case "contains":
							return { ...filterValues, contains: targetValue };
		
						case "rarity":
							return { ...filterValues, rarity: targetValue };
		
						case "type":
							return { ...filterValues, type: targetValue };
		
						default:
							return filterValues;
					}
				});
			break;
		}
	};

	/**
	 * A user clears the filters
	 * */
	const onFilterClear = () => {
		setFilters(() => {
			return baseFilters;
		});
		setSearchValue('');
	};

	/**
	 * Filters by various requirements
	 * */
	const filterByType = (reagent) => {
		if (filterValues.type !== "All") {
			if (reagent.subtype != filterValues.type) return false;
		}
		
		return true;
	};

	const filterByRarity = (reagent) => {
		if (filterValues.rarity !== "All") {
			if (reagent.rarity != filterValues.rarity) return false;
		}
		
		return true;
	};

	const filterByReagents = (reagent) => {
		if (filterValues.contains !== "All") {
			if (!reagent.reagents.find(prop => prop == filterValues.contains)) return false;
		}
		
		return true;
	};

	const filterBySearch = (reagent) => {
		if (!searchValue.length) return true;
		const searchLower = searchValue.toLowerCase();
		if (reagent.name.toLowerCase().indexOf(searchLower) !== -1 || reagent.desc.toLowerCase().indexOf(searchLower) !== -1) return true;
		return false;
	}

	/**
	 * Define filters
	 * */
	const filters = {
		dropdowns: [
			{
				name: "type",
				values: { All: "All", ...AlchemicalTypes },
			},
			{
				name: "contains",
				values: { All: "All", ...ReagentProperties },
			},
			{
				name: "rarity",
				values: { All: "All", ...Rarity },
			}
		],
		search: [
			{
				name: "title",
				startingValue: searchValue
			}
		],
		change: onFilterChange,
		clear: onFilterClear,
	};

	/**
	 * Return a component
	 * */
	return (
		<React.Fragment>
			<Header colour="cyan" title="Alchemy Recipes and Reagents" />
			<PageTitle colour="cyan">Alchemy &gt; Reagents</PageTitle>
			<div className="mainContent">
				<ListingWrapper filter={true} filters={filters}>
					{reagents.filter(filterByType).filter(filterByRarity).filter(filterByReagents).filter(filterBySearch).map((reagent, index) => (
						<Listing key={index}>
							<div className={styles.reagentLayout}>
								<div className={styles.name}>
									<div className={styles.name}><ListingTitle>{reagent.name}</ListingTitle></div>
								</div>
								<div className={styles.meta}>
									<div className={styles.rarity}><Medal className="rarity" rarity={reagent.rarity} /></div>
									<div className={styles.type}>{reagent.subtype}</div>
								</div>
								<div className={styles.properties}>
									{reagent.reagents?.map((property, index) => (
										<div key={index} className={styles.property + ' ' + property.toLowerCase()}>{property}</div>
									))}
								</div>
								<div className={styles.location}>{reagent.desc}</div>
								<div key={index} className={styles.description}>{reagent.effects}</div>
							</div>
						</Listing>
					))}
				</ListingWrapper>
			</div>
			<Footer />
		</React.Fragment>
	);
}

export default AlchemyReagentsPage;
