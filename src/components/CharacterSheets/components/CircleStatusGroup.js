import React from "react";
import PropTypes from "prop-types";
import { CircleStatus } from "./CircleStatus";

import st from './CircleStatusGroup.module.scss';

export function CircleStatusGroup( { columns = 10, count = 1 } ) {

	const generatePoints = () => {
		const response = [];

		for (let x = 0; x<count; x++) {
			if (x > 0 && x % columns == 0) {
				response.push(<div key={x} className={st.wrapper} />);
			}
			else response.push(<CircleStatus key={x} />);
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

CircleStatusGroup.propTypes = {
	columns: PropTypes.number,
	count: PropTypes.number
};