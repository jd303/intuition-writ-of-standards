import React, { useState, useRef, useEffect } from "react";
import { PropTypes } from "prop-types";
import icoClose from '../../assets/images/icons/ico.close.svg';
import st from './MinimalModePopup.module.scss';

function MinimalModePopup( { hideableSections, showPopupProp, closePopupProp, onUpdate }) {

	const popup = useRef(null);
	const [popupShowing, setPopupShowing] = useState(showPopupProp);

	useEffect(() => {
		setPopupShowing(showPopupProp);
	}, [showPopupProp]);

	// JSX
	return (
		<div className={st.el + ' ' + (popupShowing && st.open || '')} ref={popup}>
			<button className={st.closer} onClick={closePopupProp}><img src={icoClose} alt="Close" /></button>
			<div className={st.hider} onClick={closePopupProp}></div>
			<div className={st.content + ' ' + st.rollContent}>
				<div className={st.headingMedium}>View Mode</div>
				<p>You can hide and show certain sections and Move groups from display and print.</p>
				{Object.keys(hideableSections).map((key, index) => (
					<div className={st.hideable} key={index}>
						<div className={st.name}>{key.replace(/_/g, ' ')}</div>
						<div className={st.toggle}><input type="checkbox" checked={hideableSections[key]} onChange={() => onUpdate(key)} /></div>
					</div>
				))}
			</div>
		</div>
	);
}

MinimalModePopup.propTypes = {
	hideableSections: PropTypes.object.isRequired,
	showPopupProp: PropTypes.bool,
	closePopupProp: PropTypes.func,
	onUpdate: PropTypes.func.isRequired
}

export default MinimalModePopup;
