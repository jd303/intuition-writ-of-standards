import React from "react";
import Header from "../Components/Header/Header";
import ListingWrapper from "../Listings/ListingWrapper";
import { PageTitle } from "../Components/PageTitle/PageTitle";

function GadgetsGuidePage() {
	return (
		<React.Fragment>
			<Header colour="black" />
			<PageTitle colour="black">Gadgets</PageTitle>
			<ListingWrapper>
				Coming soon
			</ListingWrapper>
		</React.Fragment>
	);
}

export default GadgetsGuidePage;
