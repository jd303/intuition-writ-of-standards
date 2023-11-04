import React from "react";
import Header from "../Components/Header/Header";
import { PageTitle } from "../Components/PageTitle/PageTitle";
import { Footer } from "../../components/Components/Footer/Footer";

function AnimalCompanionsGuidePage() {
	return (
		<React.Fragment>
			<Header colour="mustard" />
			<PageTitle colour="mustard">Animal Companions (incomplete)</PageTitle>
			<div className="mainContent">
				<section>
					Coming soon
				</section>
			</div>
			<Footer />
		</React.Fragment>
	);
}

export default AnimalCompanionsGuidePage;
