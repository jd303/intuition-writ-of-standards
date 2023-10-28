import React from "react";
import Header from "../../Components/Header/Header";
import { PageTitle } from "../../Components/PageTitle/PageTitle";
import { Footer } from "../../../components/Components/Footer/Footer";

/**
 * Renders the Magic Spells page
 * */
function MagicGuidePage() {
	/**
	 * Component
	 * */
	return (
		<React.Fragment>
			<Header colour="purple" />
			<PageTitle colour="purple">Guide</PageTitle>
			<section>
				Coming soon
			</section>
			<Footer />
		</React.Fragment>
	);
}

export default MagicGuidePage;
