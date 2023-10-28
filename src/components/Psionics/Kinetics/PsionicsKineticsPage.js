import React from "react";
import { useSelector } from "react-redux";
import { selectViewMode } from "../../../features/viewMode/viewModeSlice";
import Header from "../../Components/Header/Header";
import { PageTitle } from "../../Components/PageTitle/PageTitle";
import { ViewModeToggler } from "../../Components/ViewModeToggler/ViewModeToggler";
import ListingWrapper from "../../Listings/ListingWrapper";
import Listing from "../../Listings/Listing";
import ListingTitle from "../../Listings/ListingTitle/ListingTitle";
import CircledText from "../../Components/CircledText/CircledText";
import { Footer } from "../../../components/Components/Footer/Footer";

// Styles
import stsh from "../PsionicsShared.module.scss";
import stlist from "../../ListItem.module.scss";
import target from "../../../assets/images/icons/ico.target.svg";
import timeIcon from "../../../assets/images/icons/ico.clock.svg";
import mapPinIcon from "../../../assets/images/icons/ico.map_pin.svg";

// Data
import { powers, PsionicTalents } from "../../../assets/data/psionics_data";

/**
 * Export Component Function
 * */
function PsionicsKineticsPage() {
	/**
	 * Redux State: viewMode
	 * */
	const viewMode = useSelector(selectViewMode);

	/**
	 * Filter: Only Kinetics
	 * */
	const filterByKinetics = (power) => power.talent == PsionicTalents.Kinetics;

	/**
	 * Component
	 * */
	return (
		<React.Fragment>
			<Header colour="scarlet" />
			<PageTitle colour="scarlet">
				Psionics &gt; Kinetics <ViewModeToggler></ViewModeToggler>
			</PageTitle>
			<ListingWrapper>
				{powers.filter(filterByKinetics).map((power, index) => (
					<Listing key={index}>
						<div className={stlist.listitem + " " + stsh["view-" + viewMode]}>
							<ListingTitle>{power.name}</ListingTitle>
							<div className={stlist.cost}>
								<CircledText text={power.cost.toString()} />
							</div>
							<div className={stlist.school}>{power.school}</div>
							<div className={stlist.mechanics}>
								<div className={stlist.challengeType}>
									<img src={target} />
									{power.challenge_type}
								</div>
								<div className={stlist.range}>
									<img src={mapPinIcon} />
									{power.range}
								</div>
								<div className={stlist.duration}>
									<img src={timeIcon} />
									{power.duration}
								</div>
							</div>
							<ul className={stlist.effects}>
								<li className={stlist.effect}>{power.description}</li>
								<li className={stlist.effect}>{power.effect_channeled}</li>
								<li className={stlist.effect}>{power.effect_overchanneled}</li>
							</ul>
						</div>
					</Listing>
				))}
			</ListingWrapper>
			<Footer />
		</React.Fragment>
	);
}

export default PsionicsKineticsPage;
