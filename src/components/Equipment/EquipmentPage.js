import React from "react";
import Header from "../Components/Header/Header";
import ListingWrapper from "../Listings/ListingWrapper";
import { PageTitle } from "../Components/PageTitle/PageTitle";
import { Footer } from "../../components/Components/Footer/Footer";

function EquipmentPage(props) {
 
  return (
	<React.Fragment>
		<Header colour="silver" />
		<PageTitle colour="silver">Equipment List</PageTitle>
		<div className="mainContent">
			<ListingWrapper filter={false}>
				Coming soon
			</ListingWrapper>
		</div>
		<Footer />
	</React.Fragment>
  );
}

export default EquipmentPage;
