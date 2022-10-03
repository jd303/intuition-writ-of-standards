import React, { useState } from "react";

import { Rarity, ReagentProperties, AlchemicalTypes } from "../assets/data/reagents_data.js";
import styles from "./AlchemyReagentsFilter.module.scss";

function AlchemyReagentsFilter(props) {
  const { onFilterChangeProp, onFilterClear, filterValuesProp } = props;

  // References to elements
  const containsRef = React.useRef(null);
  const rarityRef = React.useRef(null);
  const reagentTypeRef = React.useRef(null);

  const onFilterChange = (event) => {
    onFilterChangeProp(event);
  };

  const clearFilter = () => {
    containsRef.value = "all";
    rarityRef.value = "all";
    reagentTypeRef.value = "all";
    onFilterClear();
  };

  return (
    <div className="">
      <h2>Filters</h2>
      <div className={styles.filterOptions}>
        <div className={styles.contains}>
          <h3>Contains</h3>
          <select name="contains" value={filterValuesProp.contains} ref={containsRef} onChange={onFilterChange}>
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
          <select name="rarity" value={filterValuesProp.rarity} ref={rarityRef} onChange={onFilterChange}>
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
          <select name="reagenttype" value={filterValuesProp.type} ref={reagentTypeRef} onChange={onFilterChange}>
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
      </div>
    </div>
  );
}

export default AlchemyReagentsFilter;
