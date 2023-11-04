import React from "react";
import { useSelector } from "react-redux";
import { selectViewMode } from "../../../features/viewMode/viewModeSlice";
import Header from "../../Components/Header/Header";
import { PageTitle } from "../../Components/PageTitle/PageTitle";
import ListingWrapper from "../../Listings/ListingWrapper";
import Listing from "../../Listings/Listing";
import ListingTitle from "../../Listings/ListingTitle/ListingTitle";
import CircledText from "../../Components/CircledText/CircledText";
import { Footer } from "../../../components/Components/Footer/Footer";

// Styles
import stsh from "../PsionicsShared.module.scss";
import target from "../../../assets/images/icons/ico.target.svg";
import timeIcon from "../../../assets/images/icons/ico.clock.svg";
import mapPinIcon from "../../../assets/images/icons/ico.map_pin.svg";

// Shared Filters
import PsionicFilters from "../PsionicFilters";

// Data
import { powers, PsionicTalents } from "../../../assets/data/psionics_data";

function PsionicsPsychometabolismPage() {

	/**
	 * Get Generic Filters
	 */
	const psionicFilters = PsionicFilters();

	/**
	 * Filter: Only Psychometabolism
	 * */
	const filterByPsychometabolism = (power) => power.talent == PsionicTalents.Psychometabolism;

	/**
	 * Component
	 * */
	return (
		<React.Fragment>
			<Header colour="scarlet" />
			<PageTitle colour="scarlet">
				Psionics &gt; Psychometabolism
			</PageTitle>
			<div className="mainContent">
				<ListingWrapper filter={true} filters={psionicFilters.filters}>
					{powers.filter(filterByPsychometabolism).filter(psionicFilters.filterPsionics).map((power, index) => (
						<Listing key={index} className={stsh.powerLayout}>
							<ListingTitle>{power.name}</ListingTitle>
							<div className={stsh.cost}>
								<CircledText text={power.cost.toString()} colour="scarlet" />
							</div>
							<div className={stsh.mechanics}>
								<div className={stsh.challengeType}>
									<img src={target} />
									{power.challenge_type}
								</div>
								<div className={stsh.range}>
									<img src={mapPinIcon} />
									{power.range}
								</div>
								<div className={stsh.duration}>
									<img src={timeIcon} />
									{power.duration}
								</div>
							</div>
							<ul className={stsh.effects}>
								<li className={stsh.effect}>{power.description}</li>
								<li className={stsh.effect}>{power.effect_channeled}</li>
								<li className={stsh.effect}>{power.effect_overchanneled}</li>
							</ul>
						</Listing>
					))}
				</ListingWrapper>
			</div>
			<Footer />
		</React.Fragment>
	);
}

export default PsionicsPsychometabolismPage;
