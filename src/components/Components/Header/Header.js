import React from "react";
import PropTypes from "prop-types";

import { NavLink } from "react-router-dom";
import { Nav } from "../../Nav/Nav";
import { IntuitionLogo } from "../IntuitionLogo/IntuitionLogo";

import styles from "./HeaderStyle.module.scss";

Header.propTypes = {
	colour: PropTypes.string
}

function Header({ colour = 'black' }) {
	return (
		<React.Fragment>
			<div className={styles.header}>
				<div className={styles.site}>
					<NavLink to="/">
						<IntuitionLogo colour="black" />
					</NavLink>
				</div>
				<Nav style="regular" colour={colour} />
			</div>
		</React.Fragment>
	);
}

export default Header;
