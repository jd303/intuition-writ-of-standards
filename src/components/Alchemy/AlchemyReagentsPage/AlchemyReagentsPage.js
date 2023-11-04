import React, { useState } from "react";
import Header from "../../Components/Header/Header";
import { PageTitle } from "../../Components/PageTitle/PageTitle";
import ListingWrapper from "../../Listings/ListingWrapper";
import Listing from "../../Listings/Listing";
import ListingTitle from "../../Listings/ListingTitle/ListingTitle";
import { Rarity, ReagentProperties, AlchemicalTypes } from "../../../assets/data/reagents_data.js";
import { reagentData } from "../../../assets/data/reagents_data.js";
import Medal from "../../Components/Medal/Medal";
import { Footer } from "../../../components/Components/Footer/Footer";

// Styles and images
import styles from "./AlchemyReagentsPage.module.scss";

function AlchemyReagentsPage() {
	/**
	 * Setup Filters
	 */
	const baseFilters = { contains: "All", rarity: "All", type: "All" };
	const [filterValues, setFilters] = useState(baseFilters);

	/**
	 * A user changes the filter
	 * r*/
	const onFilterChange = (event) => {
		const target = event.target;
		const targetProperty = target.getAttribute("name");
		const targetValue = target.value;
		setFilters(() => {
			switch (targetProperty) {
				case "contains":
					return { ...filterValues, contains: targetValue };

				case "rarity":
					console.log(filterValues, targetValue);
					return { ...filterValues, rarity: targetValue };

				case "type":
					return { ...filterValues, type: targetValue };

				default:
					return filterValues;
			}
		});
	};

	/**
	 * A user clears the filters
	 * */
	const onFilterClear = () => {
		setFilters(() => {
			return baseFilters;
		});
	};

	/**
	 * Filters by type of recipe
	 * */
	const filterReagents = (reagent) => {
		if (filterValues.type !== "All") {
			if (reagent.type != filterValues.type) return false;
		}

		if (filterValues.rarity !== "All") {
			if (reagent.rarity != filterValues.rarity) return false;
		}

		if (filterValues.contains !== "All") {
			console.log(filterValues.contains, reagent.properties);
			if (!reagent.properties.find(prop => prop.name == filterValues.contains)) return false;
		}
		
		return true;
	};

	/**
	 * Define filters
	 * */
	const filters = {
		dropdowns: [
			{
				name: "type",
				values: { all: "All", ...AlchemicalTypes },
			},
			{
				name: "contains",
				values: { all: "All", ...ReagentProperties },
			},
			{
				name: "rarity",
				values: { all: "All", ...Rarity },
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
				<ListingWrapper filter={true} filters={filters} statusBarChildren={costsList()}>
					{reagentData.filter(filterReagents).map((reagent, index) => (
						<Listing key={index}>
							<div className={styles.reagentLayout}>
								<div className={styles.name}>
									<div className={styles.type} data-type={reagent.type}></div>
									<div className={styles.name}><ListingTitle>{reagent.name}</ListingTitle></div>
								</div>
								<div className={styles.meta}>
									<div className={styles.rarity}><Medal className="rarity" rarity={reagent.rarity} /></div>
									<div className={styles.type}>{reagent.type}</div>
								</div>
								<div className={styles.description}>{reagent.desc}</div>
								<div className={styles.properties}>
									{reagent.properties.map((property, index) => (
										<div key={index} className={styles.property + ' ' + property.code.toLowerCase()}>{property.name}</div>
									))}
								</div>
								{reagent.consume_effect.map((consume_effect, index) => (
									(consume_effect !== "None" && reagent.consume_effect !== "") ?
										<div key={index} className={styles.consumeEffect}>When consuming raw: {reagent.consume_effect}</div> :
										<div key={index} className={styles.empty}></div>
								))}
							</div>
						</Listing>
					))}
				</ListingWrapper>
			</div>
			<Footer />
		</React.Fragment>
	);
}

/**
 * Returns a costs list
 * @returns JSX
 */
function costsList() {
	return (
		<div className={styles.costs}>
			<div>Costs:</div>
			<div className={styles.cost}>
				<Medal rarity="bronze" /><div className={styles.label}>1 ST</div>
			</div>
			<div className={styles.cost}>
				<Medal rarity="silver" /><div className={styles.label}>3 ST</div>
			</div>
			<div className={styles.cost}>
				<Medal rarity="gold" /><div className={styles.label}>6 ST</div>
			</div>
		</div>
	)
}

export default AlchemyReagentsPage;
