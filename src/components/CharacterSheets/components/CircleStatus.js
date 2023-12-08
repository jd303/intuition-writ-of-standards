import React from "react";
import PropTypes from "prop-types";
import st from './CircleStatus.module.scss';

export function CircleStatus( { selected }) {

	const selectedClass = selected && st.selected || '';

	return (
		<React.Fragment>
			<div className={[st.el, selectedClass].join(' ')}></div>
		</React.Fragment>
	);
}

CircleStatus.propTypes = {
	selected: PropTypes.bool
};