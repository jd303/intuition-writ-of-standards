import React from "react";
import PropTypes from "prop-types";
import st from './CircleStatus.module.scss';

export function CircleStatus( { selected = false }) {
	
	return (
		<React.Fragment>
			<div className={[st.el, selected && st.selected || ''].join(' ')}></div>
		</React.Fragment>
	);
}

CircleStatus.propTypes = {
	selected: PropTypes.bool
};