import React from "react";
import { PropTypes } from "prop-types";
import { RecipeTypes } from "../../../assets/data/recipes_data";
import styles from "../../FilterShared.module.scss";

AlcehmicalRecipesFilter.propTypes = {
  onFilterChange: PropTypes.func.isRequired,
  onFilterClear: PropTypes.func.isRequired,
  onViewModeChange: PropTypes.func.isRequired,
  filterValues: PropTypes.object.isRequired,
  viewMode: PropTypes.object.isRequired,
};

function AlcehmicalRecipesFilter(props) {
  /**
   * Destructure Properties
   * */
  const { onFilterChange, onFilterClear, filterValues, viewMode, onViewModeChange } = props;

  // References to elements
  const typeRef = React.useRef(null);

  /**
   * Filter change callbacks
   * */
  const onFilterChangeHandler = (event) => {
    onFilterChange(event);
  };

  const clearFilter = () => {
    typeRef.value = "all";
    onFilterClear();
  };

  /**
   * Component
   * */
  return (
    <div className="">
      <div className={styles.filterOptions}>
        <div className={styles.contains}>
          <h3>Type</h3>
          <select name="type" value={filterValues.contains} ref={typeRef} onChange={onFilterChangeHandler}>
            <option value="all">All</option>
            {Object.keys(RecipeTypes).map((key) => (
              <option key={key} value={key}>
                {RecipeTypes[key]}
              </option>
            ))}
          </select>
        </div>
        <button className={styles.btClear} onClick={clearFilter}>
          Clear
        </button>
        <div className={styles.divider}></div>
        <div className={styles.view}>
          <h3>View</h3>
          <button onClick={onViewModeChange}>{viewMode.label}</button>
        </div>
      </div>
    </div>
  );
}

export default AlcehmicalRecipesFilter;
