import React from "react";
import { PropTypes } from "prop-types";
import styles from "./StatusBar.module.scss";
import icoClear from "../../../assets/images/icons/ico.clear.svg";

StatusBar.propTypes = {
  filter: PropTypes.bool,
  filters: PropTypes.object,
  onViewModeChange: PropTypes.func.isRequired,
  viewMode: PropTypes.object.isRequired,
};

function StatusBar(props) {
  /**
   * Destructure Properties
   * */
  const { filter, filters, viewMode, onViewModeChange } = props;

  // References to elements
  const dropdownRef = React.useRef(null);

  /**
   * Component
   * */
  return (
    <div className={styles.statusBar}>
      <div className={styles.statusBarContainer}>
        {filter && addFilters(filters, dropdownRef)}
        <div className={styles.view}>
          <h3>View: {viewMode.mode}</h3>
          <button onClick={onViewModeChange}>Switch to {viewMode.switchLabel}</button>
        </div>
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
        <h3>Filters</h3>
        <div className={styles.filterDropdowns}>
          {filters.dropdowns.map((filter, index) => (
            <div key={index} className={styles.dropdownGroup}>
              {filter.name}
              <select name={filter.name} ref={dropdownRef} onChange={onFilterChangeHandler}>
                {Object.entries(filter.values).map((entry) => (
                  <option key={entry[0]} value={entry[0]}>
                    {entry[1]}
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
      <div className={styles.divider}></div>
    </React.Fragment>
  );
}

export default StatusBar;
