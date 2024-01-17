import React, { useState, useRef, useEffect } from "react";
import { PropTypes } from "prop-types";
import icoClose from '../../assets/images/icons/ico.close.svg';
import st from './MinimalModePopup.module.scss';
import Spell from '../Magic/Spell';

function SpellInfoPopup( { showSpellPopupProp, spell, closePopupProp }) {

	const popup = useRef(null);
	const [popupShowing, setPopupShowing] = useState(showSpellPopupProp);

	useEffect(() => {
		setPopupShowing(showSpellPopupProp);
	}, [showSpellPopupProp]);

	// JSX
	return (
		<div className={st.el + ' ' + (popupShowing && st.open || '')} ref={popup}>
			<button className={st.closer} onClick={closePopupProp}><img src={icoClose} alt="Close" /></button>
			<div className={st.hider} onClick={closePopupProp}></div>
			<div className={st.content + ' ' + st.rollContent}>
				{spell && <Spell spell={spell} />}
			</div>
		</div>
	);
}

SpellInfoPopup.propTypes = {
	spell: PropTypes.object,
	showSpellPopupProp: PropTypes.bool,
	closePopupProp: PropTypes.func,
}

export default SpellInfoPopup;
