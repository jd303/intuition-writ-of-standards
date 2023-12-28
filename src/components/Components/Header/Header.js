import React from "react";
import PropTypes from "prop-types";
import { Nav } from "../../Nav/Nav";

import styles from "./Header.module.scss";

Header.propTypes = {
	colour: PropTypes.string
}

function Header({ colour = 'black' }) {

	return (
		<div className={styles.container + ' printHeader'}>
			<div className={styles.header}>
				<div className={styles.navContainer}>
					<Nav style="regular" colour={colour} />
				</div>
			</div>
		</div>
	);
}

export default Header;
