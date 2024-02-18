import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useAuthState } from "../../../firebase";
import { useDebounce } from "@uidotdev/usehooks";
import { Navigate } from "react-router-dom";
import Header from "../../Components/Header/Header";
import { PageTitle } from "../../Components/PageTitle/PageTitle";
import ListingWrapper from "../../Listings/ListingWrapper";
import Monster from "../Monster";
import { Footer } from "../../../components/Components/Footer/Footer";

// Styles
import st from './MenageriePage.module.scss';

// State
import { v4 as uuidv4 } from 'uuid';
import { prepareMonster } from '../monsterUtils';
import { getDatabase, ref, set } from "firebase/database";
import { selectMenagerieData } from "../../../features/firebase/menagerieDataSlice";
import { selectCombatsData } from "../../../features/firebase/combatsDataSlice";
import { selectViewMode } from "../../../features/viewMode/viewModeSlice";

function MenageriePage() {
	const { ...auth } = useAuthState();
	if (auth.user?.uid !== "LrOb5kepZdSNuzkH6qGlmIrphas1") return <Navigate to="/" />

	const debounceSaveTime = 350;

	// State
	const combat_data = useSelector(selectCombatsData);
	const [combats, setCombats] = useState(combat_data);
	const debouncedCombats = useDebounce(combats, debounceSaveTime);
	const viewMode = useSelector(selectViewMode);

	useEffect(() => {
		saveCombats();
	}, [debouncedCombats]);

	/**
	 * Filter States
	 * */
	const [filterTypeValue, setFilterTypeValue] = useState("all");
	const typeFilterValues = { all: "All", ...MenagerieTypes };
	const [filterDCValue, setFilterDCValue] = useState(0);
	const dcFilterValues = { 0: "All", 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6 };
	const [titleSearchValue, setTitleSearchValue] = useState('');

	/**
	 * Filter State Lifecycle Callbacks
	 * */
	const onFilterChange = (filterChangeEvent) => {
		const filterName = filterChangeEvent.target.name;
		const filterValue = filterChangeEvent.target.value;

		switch (true) {
			case filterChangeEvent.target instanceof HTMLInputElement:
				setTitleSearchValue(filterValue);
				localStorage.setItem('magic_spells_search', filterValue);
			break;
			default:
				if (filterName == "type") {
					setFilterTypeValue(filterValue);
				} else if (filterName == "DC") {
					setFilterDCValue(filterValue);
				}
			break;
		}
	}

	const onFilterClear = () => {
		setTitleSearchValue("");
		setFilterDCValue("0");
		setFilterTypeValue("all");
	}

	/**
	 * Filters the menagerie by type
	 * */
	const filterByType = (item) => {
		if (filterTypeValue == "all") return true;
		if (item.type == filterTypeValue) return true;
		return false;
	}
	const filterByDC = (item) => {
		if (filterDCValue == 0) return true;
		if (item.dc == filterDCValue) return true;
		return false;
	}
	const filterByTitle = (item) => {
		return (item.name.toLowerCase().indexOf(titleSearchValue.toLowerCase()) !== -1);
	}

	const menagerie_data = useSelector(selectMenagerieData);
	const menageriePrepared = menagerie_data.map(prepareMonster);
	const [creatures, setCreatures] = useState(menageriePrepared);

	// Stats
	const addCreatureToCombat = (newCreatureData) => {
		const newCreature = {
			_unique_id: uuidv4(),
			...newCreatureData,
		}
		const creatures = combats.creatures ? [ ...combats.creatures, newCreature ] : [ newCreature ];

		setCombats({ ...combats, creatures: creatures });
		saveCombats();
	}

	const saveCombats = () => {
		const db = getDatabase();
		set(ref(db, `combats`), combats);
	}
	
	const [isMinimal, setIsMinimal] = useState(true);
	const minimalMode = () => {
		setIsMinimal(!isMinimal);
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
			{
				name: "DC",
				values: dcFilterValues,
			},
		],
		search: [
			{
				name: "title",
				startingValue: titleSearchValue
			}
		],
		customElements: [
			{
				name: "Minimal Mode",
				element: <button onClick={minimalMode} className={isMinimal && st.minimalMode || ''}>{isMinimal && 'On' || 'Off'}</button>
			}
		],
		change: onFilterChange,
		clear: onFilterClear,
	};

	/**
	 * CJSX
	 * */
	return (
		<React.Fragment>
			<Header colour="silver" />
			<PageTitle colour="silver">Managerie</PageTitle>
			<div className="mainContent">
				<ListingWrapper filter={true} filters={filters}>
					{creatures.filter(filterByType).filter(filterByDC).filter(filterByTitle).map((monster, index) => (
						<Monster key={`monster-${monster.id}`} monster={monster} minimalMode={isMinimal} addClick={addCreatureToCombat} />
					))}
				</ListingWrapper>
			</div>
			<Footer />
		</React.Fragment>
	);
}

export default MenageriePage;

const MenagerieTypes = {
	Beast: "Beast",
	Undead: "Undead",
	Monstrous: "Monstrous",
	Fae: "Fae",
	Arcanic: "Arcanic",
	Draconic: "Draconic",
	Generic: "Generic",
	NPC: "NPC"
}

const Attacks = {
	physical1: "Physical | 5"
}