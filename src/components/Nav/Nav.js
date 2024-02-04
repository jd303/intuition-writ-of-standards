import React, { useState } from 'react';
import { useAuthState } from "../../firebase";
import { PropTypes } from "prop-types";
import { routeSections, RouteDefinitions } from "../../Routes";
import { NavLink, useLocation } from "react-router-dom";
import styles from "./Nav.module.scss";

Nav.propTypes = {
	style: PropTypes.string.isRequired,
	colour: PropTypes.string
};

export function Nav({ colour = "black" }) {
	// Check auth
	let filter;
	const { ...auth } = useAuthState();
	if (auth.user?.uid !== "LrOb5kepZdSNuzkH6qGlmIrphas1") filter = (item) => !item.requiresAdmin;
	else filter = () => true;

	const location = useLocation();
	const allRoutes = RouteDefinitions();
	const currentRoute = allRoutes.find((rt) => {
		if (rt.path == "/characters/:id") return /^\/characters\/([a-zA-Z0-9_-]+)$/.test(location.pathname);
		else return rt.path == location.pathname;
	});
	const currentRouteSection = routeSections.find((rt) => rt.navLabel == currentRoute.parent);
	const childRoutes = allRoutes.filter((rt) => rt.parent == currentRouteSection.navLabel && !rt.hide);

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
					{routeSections.filter(filter).map((rt, index) => (
						<li key={index} className={styles.routeLink}>
							<NavLink to={rt.path} className={currentRouteSection.navLabel == rt.navLabel ? styles.activeLink : ""}>
								{rt.navLabel}
							</NavLink>
						</li>
					))}
				</ol>
			</div>
			{childRoutes.length > 1 && (
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
			)}
		</div>
	);
}