import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import st from './CircleStatus.module.scss';

export function CircleStatus( { selected = false }) {
	const [isSelected, setIsSelected ] = useState(selected);
	const toggleSelected = () => {
		const newIsSelected = !isSelected;
		setIsSelected(newIsSelected);
	}

	return (
		<React.Fragment>
			<div className={[st.el, isSelected && st.selected || ''].join(' ')} onClick={toggleSelected}></div>
		</React.Fragment>
	);
}

CircleStatus.propTypes = {
	selected: PropTypes.bool
};