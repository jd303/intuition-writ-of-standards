import { PropTypes } from "prop-types";
import { routeSections, RouteDefinitions } from "../../Routes";
import { NavLink, useLocation } from "react-router-dom";

import styles from "./NavStyle.module.scss";

Nav.propTypes = {
	style: PropTypes.string.isRequired,
	colour: PropTypes.string
};

export function Nav({ style, colour = "black" }) {
	const location = useLocation();
	const allRoutes = RouteDefinitions();
	const currentRoute = allRoutes.find((rt) => rt.path == location.pathname);
	const currentRouteSection = routeSections.find((rt) => rt.navLabel == currentRoute.parent);
	const childRoutes = allRoutes.filter((rt) => rt.parent == currentRouteSection.navLabel);

	return (
		<div className={styles.nav}>
			<ol className={styles[style] + ' ' + styles[colour]}>
				{routeSections.map((rt, index) => (
					<li key={index} className={styles.routeLink}>
						<NavLink to={rt.path} className={currentRouteSection.navLabel == rt.navLabel ? styles.activeLink : ""}>
							{rt.navLabel}
						</NavLink>
					</li>
				))}
			</ol>
			<ol className={styles[style] + ' ' + styles[colour]}>
				{childRoutes?.map((rt, index) => (
					<li key={index} className={styles.subRouteLink}>
						<NavLink to={rt.path} className={({ isActive }) => (isActive ? styles.activeLink : "")}>
							{rt.navLabel}
						</NavLink>
					</li>
				))}
			</ol>
		</div>
	);
}

export function NavHome() {
	return (
		<ol className={styles.home}>
			{routeSections.map((rt, index) => (
				<li key={index} className={styles.routeLink}>
					<NavLink to={rt.path}>{rt.navLabel}</NavLink>
				</li>
			))}
		</ol>
	);
}
