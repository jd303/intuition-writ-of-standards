import React from "react";
import PropTypes from "prop-types";
import { PurchaseablePoint } from "./PurchaseablePoint";

import st from './PurchaseablePointGroup.module.scss';

export function PurchaseablePointGroup( { columns = 10, count = 1, purchased = 0 } ) {

	const generatePoints = () => {
		const response = [];

		for (let x = 0; x<count; x++) {
			if (x > 0 && x % columns == 0) {
				response.push(<div key={x} className={st.wrapper} />);
				response.push(<PurchaseablePoint key={'cap-'+x} purchased={x <= purchased-1} />);
			}
			else response.push(<PurchaseablePoint key={x} purchased={x <= purchased-1} />);
		}

		return response;
	}

	return (
		<React.Fragment>
			<div className={st.el}>
				{generatePoints()}
			</div>
		</React.Fragment>
	);
}

PurchaseablePointGroup.propTypes = {
	columns: PropTypes.number,
	count: PropTypes.number,
	purchased: PropTypes.number
};