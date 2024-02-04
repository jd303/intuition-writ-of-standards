import React from "react";
import PropTypes from "prop-types";

// Styles
import st from './StatusPopup.module.scss';

StatusPopup.propTypes = {
	visible: PropTypes.bool,
	closePopup: PropTypes.func
}

function StatusPopup({ visible, closePopup }) {

	/**
	 * JSX
	 * */
	return (
		<div className={[st.el, visible && st.on || ''].join(' ')}>
			<button className={st.btClose} onClick={closePopup}>Close</button>
			<h2>Statuses</h2>
		</div>
	);
}

export default StatusPopup;