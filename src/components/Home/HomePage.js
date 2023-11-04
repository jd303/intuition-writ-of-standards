import React, { useEffect } from "react";

import logo from "../../assets/images/lg.intuition.svg";
import { routeSections, RouteDefinitions } from "../../Routes";
import { IntuitionLogo } from "../Components/IntuitionLogo/IntuitionLogo";
import { NavLink } from "react-router-dom";
import styles from "./HomePage.module.scss";

function HomePage() {

	useEffect(() => {
		document.querySelectorAll(`.${styles.sectionItem}`).forEach(el => {
			el.setAttribute('data-multiplier', Math.floor(Math.random() * 8 + 2));
		});
	}, []);

	window.addEventListener('mousemove', (event) => {
		const percentLeft = event.pageX / window.innerWidth;
		document.querySelectorAll(`.${styles.sectionItem}`).forEach(el => {
			const elMultiplier = el.getAttribute('data-multiplier');
			el.style.backgroundPosition = `calc(50% - ${elMultiplier}% * ${percentLeft})`;
		});
	});

	return (
		<div className={styles.container}>
			<div className={styles.grid}>
				<div className={styles.header}>
					<IntuitionLogo colour="black" />
				</div>
				{routeSections.map((rt, index) => (
					<div key={index} className={styles.sectionItem + ' ' + styles[rt.id]}>
						<NavLink className={styles.link} to={rt.path}>{rt.navLabel}</NavLink>
					</div>
				))}
			</div>
		</div>
	);
}

export default HomePage;
