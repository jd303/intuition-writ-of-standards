import React from "react";
import Header from "../Components/Header/Header";
import Listing from "../Listings/Listing";
import ListingTitle from "../Listings/ListingTitle/ListingTitle";
import ListingWrapper from "../Listings/ListingWrapper";
import st from "./AnimalCompanionsPage.module.scss";
import { PageTitle } from "../Components/PageTitle/PageTitle";
import { useSelector } from "react-redux";
import { selectAnimalCompanionsData } from "../../features/firebase/animalCompanionsDataSlice";
import { Footer } from "../../components/Components/Footer/Footer";

import styles from './AnimalCompanionsPage.module.scss';

function AnimalCompanionsPage() {
	const animal_companions = useSelector(selectAnimalCompanionsData);

	return (
		<React.Fragment>
			<Header colour="mustard" />
			<PageTitle colour="mustard">Animal Companions (incomplete)</PageTitle>
			<div className="mainContent">
				<ListingWrapper filter={false}>
					{animal_companions.filter(comp => comp.type == "beast").map((companion, index) => (
						<Listing key={index} className={styles.animalCompanionLayout}>
						<div className={st.name}><ListingTitle>{companion.name}</ListingTitle></div>
						<div className={st.type}>{companion.type}</div>
						<div className={st.description}>{companion.desc}</div>
						<div className={st.abilities}>{companion.abilities}</div>
						<div className={st.stats}>{companion.stats}</div>
					</Listing>
					))}
				</ListingWrapper>
			</div>
			<Footer />
		</React.Fragment>
	);
}

export default AnimalCompanionsPage;
