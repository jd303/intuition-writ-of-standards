import React from "react";
import PropTypes from "prop-types";
import st from './PurchaseablePoint.module.scss';

export function PurchaseablePoint( { automatic, purchased = false }) {

	const automaticClass = automatic && st.automatic || '';
	const purchasedClass = purchased && st.purchased || '';

	return (
		<React.Fragment>
			<div className={[st.el, automaticClass, purchasedClass].join(' ')}></div>
		</React.Fragment>
	);
}

PurchaseablePoint.propTypes = {
	automatic: PropTypes.bool,
	purchased: PropTypes.bool,
};