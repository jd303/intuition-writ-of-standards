import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import st from './InputBox.module.scss';

export function InputBox( { onUpdate, val, type = "text", inline = false, className = '', disabled = false, debug = false }) {

	const [value, setValue] = useState(val);

	useEffect(() => {
		setValue(val);
	}, [val]);

	const updateValue = (event) => {
		setValue(event.target.value);
		if (onUpdate) onUpdate(event.target.value);
	}

	return (
		<React.Fragment>
			<input type={type} value={value} onChange={updateValue} className={st.el + ' ' + (inline && st.inline || '') + ' ' + className} disabled={disabled} />
		</React.Fragment>
	);
}

InputBox.propTypes = {
	onUpdate: PropTypes.func,
	val: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number
	]),
	type: PropTypes.string,
	inline: PropTypes.bool,
	className: PropTypes.string,
	disabled: PropTypes.bool,
	debug: PropTypes.bool
};