import React from "react";
import { PropTypes } from "prop-types";

import st from "./PageTitle.module.scss";

PageTitle.propTypes = {
	children: PropTypes.string,
	colour: PropTypes.string
};

/**
 * Export Component Function
 * */

export function PageTitle({ children, colour = 'black' }) {
	return <h1 className={st.title + ' ' + st[colour]}>{children}</h1>;
}
