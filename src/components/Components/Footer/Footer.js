import React from "react";
import { NavLink } from "react-router-dom";
import { IntuitionLogo } from "../IntuitionLogo/IntuitionLogo";
import styles from "./FooterStyle.module.scss";

export function Footer() {
	return (
		<div className={styles.container + ' printFooter'}>
			<div className={styles.logo}>
				<NavLink to="/">
					<IntuitionLogo colour="black" />
				</NavLink>
			</div>
		</div>
	);
}
