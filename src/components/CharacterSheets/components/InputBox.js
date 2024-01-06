import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import st from './InputBox.module.scss';

export function InputBox( { onUpdate, onBlur, val, type = "text", inline = false, className = '', disabled = false, placeholder = "" }) {

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
			<input type={type} value={value} onChange={updateValue} onBlur={onBlur} className={st.el + ' ' + (inline && st.inline || '') + ' ' + className} disabled={disabled} placeholder={placeholder} />
		</React.Fragment>
	);
}

InputBox.propTypes = {
	onUpdate: PropTypes.func,
	onBlur: PropTypes.func,
	val: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number
	]),
	type: PropTypes.string,
	inline: PropTypes.bool,
	className: PropTypes.string,
	disabled: PropTypes.bool,
	placeholder: PropTypes.string
};