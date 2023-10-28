import React from "react";
import Header from "../Components/Header/Header";
import ListingWrapper from "../Listings/ListingWrapper";
import Listing from "../Listings/Listing";

import { gadgets } from "../../assets/data/gadgets";
import { PageTitle } from "../Components/PageTitle/PageTitle";
import { Footer } from "../../components/Components/Footer/Footer";

function GadgetsPage() {
	return (
		<React.Fragment>
			<Header colour="cobalt" />
			<PageTitle colour="cobalt">Gadgets</PageTitle>
			<ListingWrapper>
				{gadgets.map((gadget, index) => {
					return <Listing key={index}>{gadget.name}</Listing>;
				})}
			</ListingWrapper>
			<Footer />
		</React.Fragment>
	);
}

export default GadgetsPage;
