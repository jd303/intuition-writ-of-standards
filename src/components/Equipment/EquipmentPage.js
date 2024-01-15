import React from "react";
import { useSelector } from "react-redux";
import Header from "../Components/Header/Header";
import EquipmentList from "./EquipmentList";
import { PageTitle } from "../Components/PageTitle/PageTitle";
import { Footer } from "../../components/Components/Footer/Footer";

import { selectEquipmentData } from "../../features/firebase/equipmentDataSlice";

function EquipmentPage() {
	const equipment_data = useSelector(selectEquipmentData);

	return (
		<React.Fragment>
			<Header colour="silver" />
			<PageTitle colour="silver">Equipment List</PageTitle>
			<div className="mainContent">
				<section>
					<p>
						Costs are in
						<strong>
							<em> Standards</em>
						</strong>
						, a coin which is accepted in most nations of the world. The coin has developed a number of colloquial names, such as Stans and Newies.
					</p>
					<p>The below are indicative of typical prices across the Civil Holds. Market forces may apply pressure to prices.</p>
				</section>
				<section>
					<EquipmentList costsList={equipment_data} />
				</section>
			</div>
			<Footer />
		</React.Fragment>
	);
}

export default EquipmentPage;
