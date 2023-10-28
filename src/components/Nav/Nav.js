import React, { useState } from 'react';
import { PropTypes } from "prop-types";
import { routeSections, RouteDefinitions } from "../../Routes";
import { NavLink, useLocation } from "react-router-dom";
import { IntuitionLogo } from "../Components/IntuitionLogo/IntuitionLogo";

import styles from "./Nav.module.scss";

Nav.propTypes = {
	style: PropTypes.string.isRequired,
	colour: PropTypes.string
};

export function Nav({ colour = "black" }) {
	const location = useLocation();
	const allRoutes = RouteDefinitions();
	const currentRoute = allRoutes.find((rt) => rt.path == location.pathname);
	const currentRouteSection = routeSections.find((rt) => rt.navLabel == currentRoute.parent);
	const childRoutes = allRoutes.filter((rt) => rt.parent == currentRouteSection.navLabel);

	const [ navDisplay, setNavDisplay ] = useState(false);
	const toggleNav = () => {
		setNavDisplay(!navDisplay);
	}

	return (
		<div className={styles.container}>
			<div className={styles.nav}>
				<div className={styles[colour] + ' ' + styles.selectedPage}>
					{currentRoute.parent}
					<button onClick={toggleNav} className={styles.hamburger}>
						<div className={styles.hamburgerPart}></div>
						<div className={styles.hamburgerPart}></div>
						<div className={styles.hamburgerPart}></div>
					</button>
				</div>
				<ol className={styles[colour] + ' ' + styles.navContainer + ' ' + (navDisplay ? styles.on : 'off')}>
					<li className={styles.routeLink}>
						<NavLink to="/">
							Home
						</NavLink>
					</li>
					{routeSections.map((rt, index) => (
						<li key={index} className={styles.routeLink}>
							<NavLink to={rt.path} className={currentRouteSection.navLabel == rt.navLabel ? styles.activeLink : ""}>
								{rt.navLabel}
							</NavLink>
						</li>
					))}
				</ol>
			</div>
			<div className={styles.subNav}>
				<ol className={styles[colour] + ' ' + styles.subNavContainer}>
					{childRoutes?.map((rt, index) => (
						<li key={index} className={styles.subRouteLink}>
							<NavLink to={rt.path} className={({ isActive }) => (isActive ? styles.activeLink : "")}>
								{rt.navLabel}
							</NavLink>
						</li>
					))}
				</ol>
			</div>
		</div>
	);
}