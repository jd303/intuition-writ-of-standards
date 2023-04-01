import React from "react";
import Header from "../Components/Header/Header";
import { animal_companion_moves } from "../../assets/data/animal_companion_moves";
import Listing from "../Listings/Listing";
import ListingTitle from "../Listings/ListingTitle/ListingTitle";
import ListingWrapper from "../Listings/ListingWrapper";
import st from "./AnimalCompanionsPage.module.scss";
import { PageTitle } from "../Components/PageTitle/PageTitle";

function AnimalCompanionsPage() {
	return (
		<React.Fragment>
			<Header colour="mustard" />
			<PageTitle colour="mustard">Animal Companions</PageTitle>
			<ListingWrapper filter={false}>
				{animal_companion_moves.map((move, index) => {
					return (
						<Listing key={index}>
							<div className={st.move}>
								<ListingTitle>{move.name}</ListingTitle>
								<div className={st.type}>{move.type}</div>
								<div className="effect">{move.effect}</div>
							</div>
						</Listing>
					);
				})}
			</ListingWrapper>
		</React.Fragment>
	);
}

export default AnimalCompanionsPage;
