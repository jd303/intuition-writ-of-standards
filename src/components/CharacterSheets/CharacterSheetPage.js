import React, { useState, useEffect } from "react";
import Header from "../Components/Header/Header";
import { InputBox } from './components/InputBox';
import { PurchaseablePoint } from './components/PurchaseablePoint';
import { PageTitle } from "../Components/PageTitle/PageTitle";
import { Footer } from "../../components/Components/Footer/Footer";

import bronzeMedal from "../../assets/images/icons/ico.medal.bronze.svg";
import st from './CharacterSheetPage.module.scss';

import GenericProfile from '../../assets/images/character_profiles/_Generic.Character.Male.webp';

function CharacterSheetPage() {

	const [ sheets, setSheets ] = useState([]);

	useEffect(() => {
		let characters = JSON.parse(localStorage.getItem('characters') || '[]');
		console.log("Got characters");
		setSheets(characters);
	}, []);

	const [ stats, setStats ] = useState(['Strength', 'Constitution', 'Dexterity', 'Intelligence', 'Wisdom', 'Charisma']);

	return (
		<React.Fragment>
			<Header colour="silver" />
			<PageTitle colour="silver">Character Sheets</PageTitle>
			<div className="mainContent">
				<section className={st.vitae}>
					<img className={st.profileImage} src={GenericProfile} alt="Character Image" />
					<div className={st.details}>
						<div className={st.row1}>
							<div className={st.name}>
								<h1>Juniper the Red</h1>
								<h2>Human</h2>
							</div>
							<div className={st.sessionCount}>Sessions: <InputBox /></div>
						</div>

					</div>
				</section>
				<section className={st.abilities}>
					<div className={st.stats}>
						<h2>Statistics</h2>
						<div className={st.list}>
							{stats.map((stat, index) => (
								<div className={st.stat} key={index}>
									<img src={bronzeMedal} alt="Icon" />
									<div className={st.statName}><h3>{stat}</h3></div>
									<div className={st.statValue}>+3</div>
									<div className={st.statPurchases}>
										<PurchaseablePoint />
										<PurchaseablePoint />
										<PurchaseablePoint />
										<PurchaseablePoint />
										<PurchaseablePoint />
										<PurchaseablePoint />
									</div>
								</div>
							))}
						</div>
					</div>
					<div className={st.stats}>
						<h2>Health</h2>
					</div>
				</section>
			</div>
			<Footer />
		</React.Fragment>
	);
}

export default CharacterSheetPage;
