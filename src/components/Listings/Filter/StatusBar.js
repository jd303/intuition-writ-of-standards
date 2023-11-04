import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { PropTypes } from "prop-types";
import styles from "./StatusBar.module.scss";
import icoClear from "../../../assets/images/icons/ico.clear.svg";

// State
import { toggleViewMode, selectViewMode } from "../../../features/viewMode/viewModeSlice";

StatusBar.propTypes = {
	children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
	filter: PropTypes.bool,
	filters: PropTypes.object,
};

function StatusBar(props) {
	/**
	 * Destructure Properties
	 * */
	const { filter, filters, children } = props;

	// References to elements
	const dropdownRef = React.useRef(null);

	// State
	const viewMode = useSelector(selectViewMode);
	const dispatch = useDispatch();
	const toggleView = () => dispatch(toggleViewMode());

	/**
	 * Component
	 * */
	return (
		<div className={styles.statusBar}>
			<div className={styles.statusBarContainer}>
				{filter && addFilters(filters, dropdownRef)}
				<div className={styles.divider}></div>
				<div className={styles.view}>
					<div className={styles.viewItems}>
						<div>View</div>
						<button className={styles.viewButton} onClick={toggleView}>{viewMode} View</button>
					</div>
				</div>
				<div className={styles.divider}></div>
				{children}
			</div>
		</div>
	);
}

function addFilters(filters, dropdownRef) {
	/**
	 * Filter change callbacks
	 * */
	const onFilterChangeHandler = (event) => {
		filters.change(event);
	};

	const clearFilter = () => {
		dropdownRef.current.value = "all";
		dropdownRef.current.selectedIndex = 0;
		filters.clear();
	};

	return (
		<React.Fragment>
			<div className={styles.filterContainer}>
				<div className={styles.filterDropdowns}>
					{filters.dropdowns.map((filter, index) => (
						<div key={index} className={styles.dropdownGroup}>
							{filter.name}
							<select name={filter.name} ref={dropdownRef} onChange={onFilterChangeHandler}>
								{Object.entries(filter.values).map((entry, index) => (
									<option key={index}>
										{entry[1].name ? entry[1].name : entry[1]}
									</option>
								))}
							</select>
						</div>
					))}
					<button className={styles.btClear} onClick={clearFilter}>
						<img src={icoClear} />
					</button>
				</div>
			</div>
		</React.Fragment>
	);
}

export default StatusBar;
