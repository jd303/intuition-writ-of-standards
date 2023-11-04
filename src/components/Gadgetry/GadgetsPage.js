import React from "react";
import Header from "../Components/Header/Header";
import ListingWrapper from "../Listings/ListingWrapper";
import Listing from "../Listings/Listing";
import ListingTitle from "../Listings/ListingTitle/ListingTitle";

import { gadgets } from "../../assets/data/gadgets_data";
import { PageTitle } from "../Components/PageTitle/PageTitle";
import { Footer } from "../../components/Components/Footer/Footer";

import styles from "./GadgetsPage.module.scss";
import CircledText from "../Components/CircledText/CircledText";

function GadgetsPage() {
	return (
		<React.Fragment>
			<Header colour="cobalt" />
			<PageTitle colour="cobalt">Gadgets</PageTitle>
			<div className="mainContent">
				<ListingWrapper>
					{gadgets.map((gadget, index) => {
						return <Listing key={index} className={styles.gadget}>
							<div className={styles.name}><ListingTitle>{gadget.name}</ListingTitle></div>
							<div className={styles.costs}>
								<div className={styles.materials}>{gadget.material}</div>
								<div className={styles.standards}><CircledText text={gadget.standards} colour="bronze" /></div>
								<div className={styles.dc}><CircledText text={gadget.dc} colour="cobalt" /></div>
							</div>
							<div className={styles.description}>{gadget.description}</div>
						</Listing>;
					})}
				</ListingWrapper>
			</div>
			<Footer />
		</React.Fragment>
	);
}

export default GadgetsPage;
