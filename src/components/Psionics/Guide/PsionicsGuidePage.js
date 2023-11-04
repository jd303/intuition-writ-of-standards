import React from "react";
import Header from "../../Components/Header/Header";
import { PageTitle } from "../../Components/PageTitle/PageTitle";
import { Footer } from "../../../components/Components/Footer/Footer";

function PsionicsGuidePage() {
	return (
		<React.Fragment>
			<Header colour="scarlet" />
			<PageTitle colour="scarlet">Psionics &gt; Guide</PageTitle>
			<div className="mainContent">
				<section>Content</section>
			</div>
			<Footer />
		</React.Fragment>
	);
}

export default PsionicsGuidePage;
