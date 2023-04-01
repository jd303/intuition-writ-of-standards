import React from "react";
import Header from "../Components/Header/Header";
import { PageTitle } from "../Components/PageTitle/PageTitle";
import MoveCategoryComponent from "./MoveCategory";

import { moves_and_mods } from "../../assets/data/moves_and_mods";

function MovesAndModsPage() {
	return (
		<React.Fragment>
			<Header colour='orange' />
			<PageTitle colour='orange'>Moves &amp; Mods</PageTitle>
			<section>
				{moves_and_mods.map((category, index) => {
					return <MoveCategoryComponent key={index} category={category} />;
				})}
			</section>
		</React.Fragment>
	);
}

export default MovesAndModsPage;
