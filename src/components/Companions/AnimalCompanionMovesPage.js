import React from "react";
import { useSelector } from "react-redux";
import Header from "../Components/Header/Header";
import Listing from "../Listings/Listing";
import ListingTitle from "../Listings/ListingTitle/ListingTitle";
import ListingWrapper from "../Listings/ListingWrapper";
import st from "./AnimalCompanionMovesPage.module.scss";
import { PageTitle } from "../Components/PageTitle/PageTitle";
import { selectAnimalCompanionsData } from "../../features/firebase/animalCompanionsDataSlice";
import { Footer } from "../../components/Components/Footer/Footer";

function AnimalCompanionMovesPage() {
	const animal_companion_moves = useSelector(selectAnimalCompanionsData);

	return (
		<React.Fragment>
			<Header colour="mustard" />
			<PageTitle colour="mustard">Animal Companion Moves</PageTitle>
			<div className="mainContent">
				<ListingWrapper filter={false}>
					{animal_companion_moves.filter(comp => comp.type == "move").map((move, index) => (
						<Listing key={index} className={st.moveLayout}>
							<ListingTitle>{move.name}</ListingTitle>
							<div className={st.type}>{move.type}</div>
							<div className="effect">{move.desc}</div>
						</Listing>
					))}
				</ListingWrapper>
			</div>
			<Footer />
		</React.Fragment>
	);
}

export default AnimalCompanionMovesPage;
