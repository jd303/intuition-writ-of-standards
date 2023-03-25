import React, { useState } from "react";
import { PropTypes } from "prop-types";
import { Rarity, ReagentProperties, AlchemicalTypes } from "../../../assets/data/reagents_data.js";
import styles from "../../FilterShared.module.scss";
import { useDispatch } from "react-redux";
import { toggleViewMode } from "../../../features/viewMode/viewModeSlice.js";

AlchemyReagentsFilter.propTypes = {
  onFilterChange: PropTypes.func.isRequired,
  onFilterClear: PropTypes.func.isRequired,
  filterValues: PropTypes.object.isRequired,
  startingViewMode: PropTypes.object.isRequired,
};

function AlchemyReagentsFilter(props) {
  const { onFilterChange, onFilterClear, filterValues } = props;

  // References to elements
  const containsRef = React.useRef(null);
  const rarityRef = React.useRef(null);
  const reagentTypeRef = React.useRef(null);

  const onFilterChangeHandler = (event) => {
    onFilterChange(event);
  };

  const clearFilter = () => {
    containsRef.value = "all";
    rarityRef.value = "all";
    reagentTypeRef.value = "all";
    onFilterClear();
  };

  /**
   * Redux Store: viewMode
   * */
  const dispatch = useDispatch();
  const toggleView = () => dispatch(toggleViewMode());

  /**
   * Component
   * */
  return (
    <div className="">
      <div className={styles.filterOptions}>
        <div className={styles.contains}>
          <h3>Contains</h3>
          <select name="contains" value={filterValues.contains} ref={containsRef} onChange={onFilterChangeHandler}>
            <option value="all">All</option>
            {Object.keys(ReagentProperties).map((key) => (
              <option key={key} value={key}>
                {ReagentProperties[key].name}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.rarity}>
          <h3>Rarity</h3>
          <select name="rarity" value={filterValues.rarity} ref={rarityRef} onChange={onFilterChangeHandler}>
            <option value="all">All</option>
            {Object.keys(Rarity).map((key) => (
              <option key={key} value={Rarity[key]}>
                {Rarity[key]}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.type}>
          <h3>Type</h3>
          <select name="reagenttype" value={filterValues.type} ref={reagentTypeRef} onChange={onFilterChangeHandler}>
            <option value="all">All</option>
            {Object.keys(AlchemicalTypes).map((key) => (
              <option key={key} value={AlchemicalTypes[key]}>
                {AlchemicalTypes[key]}
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
          <button onClick={toggleView}>Switch View Mode</button>
        </div>
      </div>
    </div>
  );
}

export default AlchemyReagentsFilter;
