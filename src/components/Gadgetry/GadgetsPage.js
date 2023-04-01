import React from "react";
import Header from "../Components/Header/Header";
import ListingWrapper from "../Listings/ListingWrapper";
import Listing from "../Listings/Listing";

import { gadgets } from "../../assets/data/gadgets";
import { PageTitle } from "../Components/PageTitle/PageTitle";

function GadgetsPage() {
	return (
		<React.Fragment>
			<Header colour="black" />
			<PageTitle colour="black">Gadgets</PageTitle>
			<ListingWrapper>
				{gadgets.map((gadget, index) => {
					return <Listing key={index}>{gadget.name}</Listing>;
				})}
			</ListingWrapper>
		</React.Fragment>
	);
}

export default GadgetsPage;
