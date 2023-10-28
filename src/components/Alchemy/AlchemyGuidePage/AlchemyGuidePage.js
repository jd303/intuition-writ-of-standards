import React from "react";
import Header from "../../Components/Header/Header";
import { PageTitle } from "../../Components/PageTitle/PageTitle";
import { Footer } from "../../../components/Components/Footer/Footer";

function AlchemyGuidePage() {
	return (
		<React.Fragment>
			<Header colour="cyan" />
			<PageTitle colour="cyan">Alchemy</PageTitle>
			<section>Alchemy Guide</section>
			<Footer />
		</React.Fragment>
	);
}

export default AlchemyGuidePage;
