import React from "react";
import { PropTypes } from "prop-types";
import styles from "./StatusBar.module.scss";
import icoClear from "../../../assets/images/icons/ico.clear.svg";

ListingsFilter.propTypes = {
  filters: PropTypes.object,
  onViewModeChange: PropTypes.func.isRequired,
  viewMode: PropTypes.object.isRequired,
};

function ListingsFilter(props) {
  /**
   * Destructure Properties
   * */
  const { filters, viewMode, onViewModeChange } = props;

  // References to elements
  const dropdownRef = React.useRef(null);

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

  filters.dropdowns.forEach((filter) => {
    console.log(filter);
  });

  /**
   * Component
   * */
  return (
    <div className={styles.filterOptions}>
      <div className={styles.filterContainer}>
        <div className={styles.contains}>
          <h3>Filters</h3>
          {filters.dropdowns.map((filter, index) => (
            <select key={index} name={filter.name} ref={dropdownRef} onChange={onFilterChangeHandler}>
              {Object.entries(filter.values).map((entry) => (
                <option key={entry[0]} value={entry[0]}>
                  {entry[1]}
                </option>
              ))}
            </select>
          ))}
        </div>
        <button className={styles.btClear} onClick={clearFilter}>
          <img src={icoClear} />
        </button>
        <div className={styles.divider}></div>
        <div className={styles.view}>
          <h3>View: {viewMode.mode}</h3>
          <button onClick={onViewModeChange}>Switch to {viewMode.switchLabel}</button>
        </div>
      </div>
    </div>
  );
}

export default ListingsFilter;
