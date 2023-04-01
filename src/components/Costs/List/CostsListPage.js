import React from "react";
import Header from "../../Components/Header/Header";
import CostsList from "./CostsList";
import { Costs } from "../../../assets/data/costs_data";
import { PageTitle } from "../../Components/PageTitle/PageTitle";

function CostsListPage() {
	return (
		<React.Fragment>
			<Header colour="silver" />
			<PageTitle colour="silver">Costs</PageTitle>
			<section>
				<p>
					Costs are in
					<strong>
						<em> Standards</em>
					</strong>
					, a coin which is accepted in most nations of the world. The coin has developed a number of colloquial names, such as Stans and Newies.
				</p>
				<p>The below are indicative of typical prices across the Civil Holds. Market forces may apply pressure to prices.</p>
				<CostsList costsList={Costs} />
			</section>
		</React.Fragment>
	);
}

export default CostsListPage;
