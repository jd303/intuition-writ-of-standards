import React from "react";
import Header from "../Components/Header/Header";
import { PageTitle } from "../Components/PageTitle/PageTitle";
import { Footer } from "../../components/Components/Footer/Footer";

function GadgetsGuidePage() {
	return (
		<React.Fragment>
			<Header colour="cobalt" />
			<PageTitle colour="cobalt">Gadgets</PageTitle>
			<div className="mainContent">
				<section>
					Coming soon
				</section>
			</div>
			<Footer />
		</React.Fragment>
	);
}

export default GadgetsGuidePage;
