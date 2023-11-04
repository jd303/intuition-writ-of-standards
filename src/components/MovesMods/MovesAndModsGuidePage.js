import React from "react";
import Header from "../Components/Header/Header";
import { PageTitle } from "../Components/PageTitle/PageTitle";
import { Footer } from "../../components/Components/Footer/Footer";

function MovesAndModsGuidePage() {
	return (
		<React.Fragment>
			<Header colour='orange' />
			<PageTitle colour='orange'>Guide</PageTitle>
			<div className="mainContent">
				<section>
					Coming soon
				</section>
			</div>
			<Footer />
		</React.Fragment>
	);
}

export default MovesAndModsGuidePage;
