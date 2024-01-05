import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import { CircleStatus } from "./CircleStatus";
import { CharacterContext } from '../CharacterSheetPage';

import st from './CircleStatusGroup.module.scss';

export function CircleStatusGroup( { columns = 10, count = 1, gap = 0, usedKey, clickCallback } ) {

	const characterContext = useContext(CharacterContext);
	const characterSelectedCount = characterContext.characterData.statuses && Object.prototype.hasOwnProperty.call(characterContext.characterData.statuses, usedKey) ? characterContext.characterData.statuses[usedKey] : 0;
	const [selectedCount, setSelectedCount] = useState(characterSelectedCount);

	const generatePoints = () => {
		const response = [];

		for (let x = 0; x<count; x++) {
			if (x > 0 && x % columns == 0) {
				response.push(<div key={x} className={st.wrapper} />);
			}
			else response.push(<CircleStatus key={x} selected={x + 1 <= selectedCount} />);
		}

		return response;
	}

	const toggleStatus = () => {
		var newSelectedCount = 0;
		if (selectedCount >= count) newSelectedCount = 0;
		else newSelectedCount = selectedCount + 1;
		
		setSelectedCount(newSelectedCount);
		clickCallback(usedKey, newSelectedCount);
	}

	return (
		<React.Fragment>
			<div className={st.el} style={{ gap: `${gap}px` }} onClick={toggleStatus}>
				{generatePoints()}
			</div>
		</React.Fragment>
	);
}

CircleStatusGroup.propTypes = {
	columns: PropTypes.number,
	count: PropTypes.number,
	gap: PropTypes.number,
	selected: PropTypes.number,
	usedKey: PropTypes.string.isRequired,
	clickCallback: PropTypes.func.isRequired
};