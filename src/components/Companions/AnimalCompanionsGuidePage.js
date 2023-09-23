import React from "react";
import Header from "../Components/Header/Header";
import ListingWrapper from "../Listings/ListingWrapper";
import { PageTitle } from "../Components/PageTitle/PageTitle";

function AnimalCompanionsGuidePage() {
	return (
		<React.Fragment>
			<Header colour="mustard" />
			<PageTitle colour="mustard">Animal Companions (incomplete)</PageTitle>
			<ListingWrapper filter={false}>
				Coming soon
			</ListingWrapper>
		</React.Fragment>
	);
}

export default AnimalCompanionsGuidePage;
