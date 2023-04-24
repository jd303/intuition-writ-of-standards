import React from "react";
import Header from "../Components/Header/Header";
import { PageTitle } from "../Components/PageTitle/PageTitle";
import MoveCategoryComponent from "./MoveCategory";
import { useSelector } from "react-redux";
import { selectMovesData } from "../../features/firebase/movesDataSlice";

function MovesAndModsPage() {
	const moves_and_mods = useSelector(selectMovesData);
	console.log("MAM", moves_and_mods);

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
