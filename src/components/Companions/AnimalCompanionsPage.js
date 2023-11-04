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

import { animal_companions } from '../../assets/data/animal_companions_data';

function AnimalCompanionsPage() {
	//const animal_companions = useSelector(selectAnimalCompanionsData);
	console.log(animal_companions);

	return (
		<React.Fragment>
			<Header colour="mustard" />
			<PageTitle colour="mustard">Animal Companions (incomplete)</PageTitle>
			<div className="mainContent">
				<ListingWrapper filter={false}>
					{animal_companions.map((companion, index) => {
						return (
							<Listing key={index} className={styles.animalCompanionLayout}>
								<div className={st.name}><ListingTitle>{companion.name}</ListingTitle></div>
								<div className={st.type}>{companion.type}</div>
								<div className={st.description}>{companion.description}</div>
								<div className={st.abilities}>
									<ListingTitle>Abilities</ListingTitle>
									{companion.abilities.map((ability, index) => (
										<div key={index} className={st.ability}>{ability}</div>
									))}
								</div>
							</Listing>
						);
					})}
				</ListingWrapper>
			</div>
			<Footer />
		</React.Fragment>
	);
}

export default AnimalCompanionsPage;
