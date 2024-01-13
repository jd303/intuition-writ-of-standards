import React from "react";
import PropTypes from "prop-types";
import { PurchaseablePoint } from "./PurchaseablePoint";

import st from './PurchaseablePointGroup.module.scss';

export function PurchaseablePointGroup( { columns = 10, count = 1, automaticPurchases = 0, purchased = 0, gap = 3, clickCallback, purchaseKey } ) {

	const generatePoints = () => {
		const response = [];

		for (let x = 0; x<count; x++) {
			if (x > 0 && x % columns == 0) {
				response.push(<div key={x} className={st.wrapper} />);
				response.push(<PurchaseablePoint key={'cap-'+x} purchased={x <= automaticPurchases+purchased-1} />);
			}
			else response.push(<PurchaseablePoint key={x} purchased={x <= automaticPurchases+purchased-1} />);
		}

		return response;
	}

	return (
		<div className={st.container} data-count={`${purchased} purchased`}>
			<div className={st.el + ' ' + (purchased + automaticPurchases >= count && st.complete || '') + (purchased == 0 && st.empty || '')} onClick={() => clickCallback(purchaseKey)} style={{ gap: gap }}>
				{generatePoints()}
			</div>
		</div>
	);
}

PurchaseablePointGroup.propTypes = {
	columns: PropTypes.number,
	count: PropTypes.number,
	automaticPurchases: PropTypes.number,
	purchased: PropTypes.number,
	gap: PropTypes.number,
	clickCallback: PropTypes.func.isRequired,
	purchaseKey: PropTypes.string.isRequired,
};