import React from "react";
import { NavHome } from "../Nav/Nav";

import logo from "../../assets/images/lg.intuition.svg";
import styles from "./HomePageStyle.module.scss";
import { IntuitionLogo } from "../Components/IntuitionLogo/IntuitionLogo";

function HomePage() {
	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<IntuitionLogo colour="white" />
			</div>
			<div className={styles.nav}>
				<NavHome style="home"></NavHome>
			</div>
		</div>
	);
}

export default HomePage;
