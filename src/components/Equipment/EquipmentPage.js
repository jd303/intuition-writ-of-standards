import React from "react";
import Header from "../Components/Header/Header";
import ListingWrapper from "../Listings/ListingWrapper";
import { PageTitle } from "../Components/PageTitle/PageTitle";

function EquipmentPage(props) {
 
  return (
	<React.Fragment>
		<Header colour="silver" />
		<PageTitle colour="silver">Equipment List</PageTitle>
		<ListingWrapper filter={false}>
			Coming soon
		</ListingWrapper>
	</React.Fragment>
  );
}

export default EquipmentPage;
