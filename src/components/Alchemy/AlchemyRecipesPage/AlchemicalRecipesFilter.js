import React, { useState } from "react";
import { RecipeTypes } from "../../../assets/data/recipes_data";
import styles from "../../FilterShared.module.scss";

function AlcehmicalRecipesFilter(props) {
  /**
   * Destructure Properties
   * */
  const { onFilterChangeProp, onFilterClearProp, filterValuesProp, viewModeProp, onViewModeChangeProp } = props;

  console.log("VMP", viewModeProp);

  // References to elements
  const typeRef = React.useRef(null);
  const viewRef = React.useRef(null);

  /**
   * Filter change callbacks
   * */
  const onFilterChange = (event) => {
    onFilterChangeProp(event);
  };

  const clearFilter = () => {
    typeRef.value = "all";
    onFilterClearProp();
  };

  /**
   * Component
   * */
  return (
    <div className="">
      <div className={styles.filterOptions}>
        <div className={styles.contains}>
          <h3>Type</h3>
          <select name="type" value={filterValuesProp.contains} ref={typeRef} onChange={onFilterChange}>
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
          <button onClick={onViewModeChangeProp}>{viewModeProp.label}</button>
        </div>
      </div>
    </div>
  );
}

export default AlcehmicalRecipesFilter;
