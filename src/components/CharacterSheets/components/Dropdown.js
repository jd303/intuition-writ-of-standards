import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import st from './Dropdown.module.scss';
import { InputBox } from "./InputBox";

export function Dropdown( { source, onChange, val, noDefault = false }) {

	const prepareValue = (val) => {
		if (val) return val.name || val;
		else return "";
	}
	const prepareDisplay = (item) => {
		let response;
		if (item.name) response = item.name;
		else response = item;
		if (item.value || item.description) response += ': ' + (item.value || item.description);

		return response;
	}

	let extractedValue = prepareValue(val);
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
			<select onChange={updateValue} className={st.el + ' notForPrint'} value={val}>
				{!noDefault && <option key="option-default" value=""></option>}
				{source.map((i, index) => (
					<option key={`option-${index}`} value={i.id}>{prepareDisplay(i)}</option>
				))}
			</select>
			<InputBox className='forPrint' />
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