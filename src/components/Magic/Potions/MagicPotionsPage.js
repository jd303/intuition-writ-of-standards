import React from "react";
import Header from "../../Components/Header/Header";
import ListingWrapper from "../../Listings/ListingWrapper";
import Listing from "../../Listings/Listing";
import ListingTitle from "../../Listings/ListingTitle/ListingTitle";
import CircledText from "../../Components/CircledText/CircledText";
import st from "./MagicPotionsPage.module.scss";
import { MagicSchools } from "../../../interfaces/magic_interfaces";
import timeIcon from "../../../assets/images/icons/ico.clock.svg";
import { Footer } from "../../../components/Components/Footer/Footer";
import { useSelector } from "react-redux";

import { PageTitle } from "../../Components/PageTitle/PageTitle";
import { selectPotionsData } from "../../../features/firebase/potionsDataSlice";

function MagicPotionsPage() {
	/**
	 * Redux State: ViewMode
	 * */
	const potions = useSelector(selectPotionsData);

	/**
	 * Filter State
	 * */
	const schoolFilterValues = { all: "All", ...MagicSchools };
	const [schoolFilterValue, setSchoolFilterValue] = React.useState("all");

	/**
	 * When a filter is changed
	 * */
	const onFilterChange = (filterChangeEvent) => {
		const filterName = filterChangeEvent.target.name;
		const filterValue = filterChangeEvent.target.value;

		if (filterName == "school") {
			setSchoolFilterValue(filterValue);
		}
	};

	/**
	 * When filters are cleared
	 * */
	const onFilterClear = () => {
		setSchoolFilterValue("all");
	};

	/**
	 * Fiter results by school
	 * */
	const filterBySchool = (potion) => {
		if (schoolFilterValue == "all") return true;
		else return potion.school == schoolFilterValue;
	};

	/**
	 * Define filters
	 * */
	const filters = {
		dropdowns: [
			{
				name: "school",
				values: schoolFilterValues,
			},
		],
		change: onFilterChange,
		clear: onFilterClear,
	};

	return (
		<React.Fragment>
			<Header colour="purple" />
			<PageTitle colour="purple">Potions</PageTitle>
			<div className="mainContent">
				<ListingWrapper filter={true} filters={filters}>
					{potions.filter(filterBySchool).map((potion, index) => (
						<Listing key={index} className={st.potionLayout}>
							<ListingTitle>{potion.name}</ListingTitle>
							<div className={st.potionCost}>
								<CircledText text={potion.cost.toString()} colour="bronze" />
							</div>
							<div className={st.school}>{potion.school}</div>
							<div className={st.mechanics}>
								<div className={st.duration}>
									<img src={timeIcon} />
									{potion.duration}
								</div>
							</div>
							<ul className={st.effects}>
								<li className={st.effect}>{potion.effect}</li>
							</ul>
						</Listing>
					))}
				</ListingWrapper>
			</div>
			<Footer />
		</React.Fragment>
	);
}

export default MagicPotionsPage;
