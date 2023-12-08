import React from "react";
import PropTypes from "prop-types";
import st from './InputBox.module.scss';

export function InputBox( { value }) {

	return (
		<React.Fragment>
			<div className={st.el}>{value}</div>
		</React.Fragment>
	);
}

InputBox.propTypes = {
	value: PropTypes.string,
};