//import React, { useState } from "react";
//import React from "react";
import { PropTypes } from "prop-types";
import MoveComponent from "./MoveComponent";
import Listing from "../Listings/Listing";
import ListingTitle from "../Listings/ListingTitle/ListingTitle";
import { prepareMovesAndMods } from "../../utils/prepareMovesAndMods";
import st from "./MovesAndModsPage.module.scss";

MoveCategoryComponent.propTypes = {
	name: PropTypes.string.isRequired,
	category: PropTypes.array.isRequired,
};

function MoveCategoryComponent(props) {
	let { name, category } = props;

	const movesAndMods = prepareMovesAndMods(category);

	return (
		<div className={st.categoryContainer}>
			<h3 className={st.categoryTitle}>{name}</h3>
			{category.map((move, index) => (
				<Listing key={index}>
					<MoveComponent key={index} move={move} />
				</Listing>
			))}
		</div>
	);
}

export default MoveCategoryComponent;
