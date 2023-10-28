import React from "react";
import { useSelector } from "react-redux";
import Header from "../Components/Header/Header";
import { PageTitle } from "../Components/PageTitle/PageTitle";
import ListingWrapper from "../Listings/ListingWrapper";
import Listing from "../Listings/Listing";
import ListingTitle from "../Listings/ListingTitle/ListingTitle";
import { Footer } from "../../components/Components/Footer/Footer";

// Styles
import st from './MenageriePage.module.scss';
import stlist from "../ListItem.module.scss";

// State
import { selectViewMode } from "../../features/viewMode/viewModeSlice";

function MenageriePage() {
	// State
	const viewMode = useSelector(selectViewMode);

	/**
	 * Filter States
	 * */
	const typeFilterValues = { all: "All", ...MenagerieTypes };

	/**
	 * Filter State Lifecycle Callbacks
	 * */
	const onFilterChange = () => {
		console.log("FILTER CHANGE");
	}

	const onFilterClear = () => {
		console.log("FILTER CLEAR");
	}

	/**
	 * Filters the menagerie by type
	 * */
	const filterByType = (item) => {
		return item;
	}

	/**
	 * Define filters
	 * */
	const filters = {
		dropdowns: [
			{
				name: "type",
				values: typeFilterValues,
			},
		],
		change: onFilterChange,
		clear: onFilterClear,
	};

	/**
	 * Debug data
	 * */
	const menagerie = [
		{
			name: "Zombie",
			type: MenagerieTypes.Undead,
			image: 'Zombie.png',
			description: "Creatures whose Egrennir (soul) has been blasted from their bodies, leaving a twisted Ihn’egretca and a mindless hunger for death and flesh.",
			cr: 1,
			movement: 3,
			resistances: [ "Fire" ],
			weaknesses_basic: [ "Fire" ],
			weaknesses_special: [ "Removing leg: movement reduced by 2 sq", "Removing legs: movement reduced to 1 sq" ],
			attacks_basic: [ Attacks.physical1 ],
			attacks_special: [ "Throw limb / head" ]
		}
	];

	/**
	 * CJSX
	 * */
	return (
		<React.Fragment>
			<Header colour="silver" />
			<PageTitle colour="silver">Managerie</PageTitle>
			<section>
				<ListingWrapper filter={true} filters={filters}>
					{menagerie.filter(filterByType).map((monster, index) => (
						<Listing key={index}>
							<div className={stlist.listitem + ' ' + st.menagerieLayout}>
								<ListingTitle>{monster.name}</ListingTitle>
								<div className={st.details}>
									<div className={st.image}>
										<img src={'images/creatures/'+monster.image} alt={monster.name} />
									</div>
									<div className={st.vitae}>
										<div><div className={st.title}>Type</div><div className={st.value}>{monster.type}</div></div>
										<div><div className={st.title}>CR</div><div className={st.value}>{monster.cr}</div></div>
										<div><div className={st.title}>Movement (sq)</div><div className={st.value}>{monster.movement}</div></div>
									</div>
									<div className={st.stats}>
										<div className={st.fullStat}><div className={st.title}>Resistances</div><div className={st.value}><ul>{monster.resistances.map((x, resIndex) => ( <li key={resIndex}>{x}</li> ))}</ul></div></div>
										<div className={st.fullStat}><div className={st.title}>Weaknesses</div><div className={st.value}><ul>{monster.weaknesses_basic.map((x, resIndex) => ( <li key={resIndex}>{x}</li> ))}</ul></div></div>
										<div className={st.fullStat}><div className={st.title}>Special Weaknesses</div><div className={st.value}><ul>{monster.weaknesses_special.map((x, resIndex) => ( <li key={resIndex}>{x}</li> ))}</ul></div></div>
										<div className={st.fullStat}><div className={st.title}>Basic Attacks</div><div className={st.value}><ul>{monster.attacks_basic.map((x, resIndex) => ( <li key={resIndex}>{x}</li> ))}</ul></div></div>
										<div className={st.fullStat}><div className={st.title}>Special Attacks</div><div className={st.value}><ul>{monster.attacks_special.map((x, resIndex) => ( <li key={resIndex}>{x}</li> ))}</ul></div></div>
										<div className={st.fullStat}><div className={st.title}>Description</div><div className={st.value}>{monster.description}</div></div>
									</div>
								</div>
							</div>
						</Listing>
					))}
				</ListingWrapper>
			</section>
			<Footer />
		</React.Fragment>
	);
}

export default MenageriePage;

const MenagerieTypes = {
	Beast: "Beast",
	Undead: "Undead"
}

const Attacks = {
	physical1: "Physical | 5"
}