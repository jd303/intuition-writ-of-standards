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
	lockView: PropTypes.string
};

function StatusBar(props) {
	/**
	 * Destructure Properties
	 * */
	const { filter, filters, children, lockView } = props;

	// References to elements
	const dropdownRef = React.useRef(null);
	const searchFieldRef = React.useRef(null);

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
				{filter && addFilters(filters, { dropdowns: dropdownRef, searchField: searchFieldRef })}
				<div className={styles.divider}></div>
				<div className={styles.view}>
					{ !lockView && (
					<div className={styles.viewItems}>
						<div>View</div>
						<button className={styles.viewButton} onClick={toggleView}>{viewMode} View</button>
					</div>
					)}
				</div>
				<div className={styles.divider}></div>
				{children}
			</div>
		</div>
	);
}

function addFilters(filters, refs) {
	/**
	 * Filter change callbacks
	 * */
	const onFilterChangeHandler = (event) => {
		filters.change(event);
	};

	const clearFilter = () => {
		if (refs.dropdowns.current) refs.dropdowns.current.value = "all";
		if (refs.dropdowns.current) refs.dropdowns.current.selectedIndex = 0;
		if (refs.searchField.current) refs.searchField.current.value = '';
		filters.clear();
	};

	return (
		<React.Fragment>
			<div className={styles.filterContainer}>
				<div className={styles.filterDropdowns}>
					{filters.dropdowns?.map((filter, index) => (
						<div key={index} className={styles.dropdownGroup}>
							{filter.name}
							<select name={filter.name} ref={refs.dropdowns} onChange={onFilterChangeHandler}>
								{Object.entries(filter.values).map((entry, index) => (
									<option key={index} value={entry[0]}>
										{entry[1].name ? entry[1].name : entry[1]}
									</option>
								))}
							</select>
						</div>
					))}
					{filters.search?.map((filter, index) => (
						<div key={index} className={styles.dropdownGroup}>
							{filter.name}
							<input name={filter.name} value={filter.startingValue} ref={refs.searchField} onChange={onFilterChangeHandler} />
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
