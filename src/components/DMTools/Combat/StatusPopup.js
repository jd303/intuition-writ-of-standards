import React from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";

// Styles
import { selectStatusData } from "../../../features/firebase/statusDataSlice";
import st from './StatusPopup.module.scss';

StatusPopup.propTypes = {
	monster: PropTypes.object,
	applyStatusOrDuration: PropTypes.func,
	modifyStatusDuration: PropTypes.func,
	closePopup: PropTypes.func
}

function StatusPopup({ monster, applyStatusOrDuration, modifyStatusDuration, closePopup }) {

	const status_data = useSelector(selectStatusData);

	/**
	 * JSX
	 * */
	return (
		<div className={st.el}>
			<button className={st.btClose} onClick={closePopup}>Close</button>
			{monster.statuses?.length && (
				<h2>Existing Statuses</h2>
			) || <></>}
			{monster.statuses?.map(status => (
				<div key={`activestatus-${status.id}`} className={st.existingStatus}>
					<div className={st.activeStatus}>{status.name}: {status.duration}</div>
					<button className={st.addMonster} onClick={() => modifyStatusDuration(status, 1)}>+</button>
					<button className={st.addMonster} onClick={() => modifyStatusDuration(status, -1)}>-</button>
					<div>{status.effect}</div>
				</div>
			))}
			<h2>Negative Statuses</h2>
			<div className={st.statusList}>
				{status_data.filter(status => status.negative).map(status => (
					<button key={`status-${status.id}`} onClick={() => applyStatusOrDuration(status)}>{status.name}</button>
				))}
			</div>
			<h2>Positive Statuses</h2>
			<div className={st.statusList}>
				{status_data.filter(status => !status.negative).map(status => (
					<button key={`status-${status.id}`} onClick={() => applyStatusOrDuration(status)}>{status.name}</button>
				))}
			</div>
		</div>
	);
}

export default StatusPopup;