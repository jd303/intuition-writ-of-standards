import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import st from './Dropdown.module.scss';

export function Dropdown( { source, onChange, val, noDefault = false }) {

	const extractedValue = val.value || val;
	const [value, setValue] = useState(extractedValue);

	useEffect(() => {
		setValue(val);
	}, [val]);

	const updateValue = (event) => {
		setValue(event.target.value);
		if (onChange) onChange(event.target.value);
	}



	return (
		<React.Fragment>
			<select onChange={updateValue} className={st.el} value={value}>
				{!noDefault && <option key="option-default" value=""></option>}
				{source.map((i, index) => (
					<option key={`option-${index}`} value={i}>{i}</option>
				))}
			</select>
		</React.Fragment>
	);
}

Dropdown.propTypes = {
	source: PropTypes.array,
	onChange: PropTypes.func,
	val: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number
	]),
	noDefault: PropTypes.bool
};