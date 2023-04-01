import * as React from "react";
import Header from "../../Components/Header/Header";
import { PageTitle } from "../../Components/PageTitle/PageTitle";

function MagicEnchantingPage() {
	return (
		<React.Fragment>
			<Header colour="purple" />
			<PageTitle colour="purple">Enchanting</PageTitle>
			<section>Rules to be decided</section>
		</React.Fragment>
	);
}

export default MagicEnchantingPage;
