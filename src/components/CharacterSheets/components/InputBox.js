import React from "react";
import PropTypes from "prop-types";
import st from './InputBox.module.scss';

export function InputBox( { value, inline = false, className = '' }) {

	return (
		<React.Fragment>
			<div className={st.el + ' ' + (inline && st.inline || '') + ' ' + className}>{value}</div>
		</React.Fragment>
	);
}

InputBox.propTypes = {
	value: PropTypes.string,
	inline: PropTypes.bool,
	className: PropTypes.string,
};