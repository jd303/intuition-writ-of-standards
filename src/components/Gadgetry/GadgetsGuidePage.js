import React from "react";
import Header from "../Components/Header/Header";
import ListingWrapper from "../Listings/ListingWrapper";
import { PageTitle } from "../Components/PageTitle/PageTitle";
import { Footer } from "../../components/Components/Footer/Footer";

function GadgetsGuidePage() {
	return (
		<React.Fragment>
			<Header colour="cobalt" />
			<PageTitle colour="cobalt">Gadgets</PageTitle>
			<ListingWrapper>
				Coming soon
			</ListingWrapper>
			<Footer />
		</React.Fragment>
	);
}

export default GadgetsGuidePage;
