import React from "react";
import { useSelector } from "react-redux";
import Header from "../Components/Header/Header";
import ListingWrapper from "../Listings/ListingWrapper";
import Listing from "../Listings/Listing";
import ListingTitle from "../Listings/ListingTitle/ListingTitle";

//import { gadgets } from "../../assets/data/gadgets_data";
import { selectGadgetsData } from "../../features/firebase/gadgetsDataSlice";
import { PageTitle } from "../Components/PageTitle/PageTitle";
import { Footer } from "../../components/Components/Footer/Footer";

import styles from "./GadgetsPage.module.scss";
import CircledText from "../Components/CircledText/CircledText";

function GadgetsPage() {
	const gadgets_data = useSelector(selectGadgetsData);

	return (
		<React.Fragment>
			<Header colour="cobalt" />
			<PageTitle colour="cobalt">Gadgets</PageTitle>
			<div className="mainContent">
				<ListingWrapper>
					{gadgets_data.map((gadget, index) => {
						return <Listing key={index} className={styles.gadget}>
							<div className={styles.name}><ListingTitle>{gadget.name}</ListingTitle></div>
							<div className={styles.costs}>
								<div className={styles.materials}>{gadget.materials}</div>
								<div className={styles.standards}><CircledText text={gadget.standards} colour="bronze" /></div>
								<div className={styles.dc}><CircledText text={gadget.dc} colour="cobalt" /></div>
							</div>
							<div className={styles.description}>{gadget.effect}</div>
						</Listing>;
					})}
				</ListingWrapper>
			</div>
			<Footer />
		</React.Fragment>
	);
}

export default GadgetsPage;
