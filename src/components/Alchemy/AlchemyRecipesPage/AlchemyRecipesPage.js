import React, { useState } from "react";
import { useSelector } from "react-redux";
import Header from "../../Components/Header/Header";
import { PageTitle } from "../../Components/PageTitle/PageTitle";
import ListingWrapper from "../../Listings/ListingWrapper";
import Listing from "../../Listings/Listing";
import ListingTitle from "../../Listings/ListingTitle/ListingTitle";
import { RecipeTypes } from "../../../assets/data/recipes_data.js";
import { selectAlchemicalsData } from "../../../features/firebase/alchemicalsDataSlice";
import dcIcon from "../../../assets/images/icons/ico.dc.svg";
import timeIcon from "../../../assets/images/icons/ico.clock.svg";
import styles from "./AlchemicalRecipe.module.scss";
import { Footer } from "../../../components/Components/Footer/Footer";

function AlchemyRecipesPage() {
	const alchemicals_data = useSelector(selectAlchemicalsData);
	const recipes_data = alchemicals_data.filter(item => item.type == "recipe");

	/**
	 * Setup Filter Values
	 * */
	const typeFilterValues = { all: "All", ...RecipeTypes };
	const [typeFilterValue, setTypeFilterValue] = useState("all");

	/**
	 * A user changes the filter
	 * r*/
	const onFilterChange = (event) => {
		if (event.target.name == "type") setTypeFilterValue(event.target.value);
	};

	/**
	 * A user clears the filters
	 * */
	const onFilterClear = () => {
		setTypeFilterValue("all");
	};

	/**
	 * Filters by type of recipe
	 * */
	const filterByType = (recipe) => {
		if (typeFilterValue == "all") return true;
		else return recipe.type == typeFilterValue;
	};

	/**
	 * Define filters
	 * */
	const filters = {
		dropdowns: [
			{
				name: "type",
				values: typeFilterValues,
			},
		],
		change: onFilterChange,
		clear: onFilterClear,
	};

	/**
	 * Collates same reagents before print
	 * */
	const collateReagents = (reagents) => {
		const reagentsArray = reagents.split("-");
		const sortedReagents = reagentsArray.sort((a, b) => (a < b && -1) || 1);
		const uniqueReagents = [];

		sortedReagents.forEach((consideredReagent) => {
			const reagentAdded = uniqueReagents.find((reagent) => reagent.reagent == consideredReagent);
			if (!reagentAdded) {
				uniqueReagents.push({ count: 1, reagent: consideredReagent });
			} else {
				reagentAdded.count += 1;
			}
		});
		
		return uniqueReagents;
	};

	/**
	 * Return a component
	 * */
	return (
		<React.Fragment>
			<Header colour="cyan" title="Alchemy Recipes and Reagents" />
			<PageTitle colour="cyan">Alchemy &gt; Recipes</PageTitle>
			<div className="mainContent">
				<ListingWrapper filter={true} filters={filters}>
					{recipes_data.filter(filterByType).map((recipe, index) => (
						<Listing key={index} className={styles.recipe}>
							<div className={styles.recipeTitle}>
								<div className={styles.type} data-type={recipe.subtype}></div>
								<div className={styles.name}><ListingTitle>{recipe.name}</ListingTitle></div>
							</div>
							<div className={styles.description}>{recipe.desc}</div>
							<div className={styles.effects}>{recipe.effects}</div>
							<div className={styles.dc}>
								<img src={dcIcon} />
								{recipe.rarity}
							</div>
							<div className={styles.time}>
								<img src={timeIcon} /> {recipe.time}
							</div>

							<div className={styles.requirements}>
								{collateReagents(recipe.reagents).map((reagent, index) => {
									return (
										<div key={index} className={styles.reagent + " " + reagent.reagent.toLowerCase()}>
											{reagent.reagent} {reagent.count > 1 && ` (${reagent.count})`}
										</div>
									);
								})}
							</div>
						</Listing>
					))}
				</ListingWrapper>
			</div>
			<Footer />
		</React.Fragment>
	);
}

export default AlchemyRecipesPage;
