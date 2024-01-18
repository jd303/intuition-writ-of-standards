import React from "react";
import PropTypes from "prop-types";
import st from './PurchaseablePoint.module.scss';
import grSquareBlack from '../../../assets/images/icons/gr.square.black.svg';

export function PurchaseablePoint( { automatic, purchased = false }) {

	const automaticClass = automatic && st.automatic || '';
	const purchasedClass = purchased && st.purchased || '';

	return (
		<React.Fragment>
			<div className={[st.el, automaticClass, purchasedClass].join(' ')}>
				<div className={st.forPrint}><img src={grSquareBlack} alt="" /></div>
			</div>
		</React.Fragment>
	);
}

PurchaseablePoint.propTypes = {
	automatic: PropTypes.bool,
	purchased: PropTypes.bool,
};