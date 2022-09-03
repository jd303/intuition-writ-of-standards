import React, { useState } from "react";

import { Rarity, ReagentProperties, AlchemicalTypes } from "../assets/data/reagents_data.js";
import styles from "./AlchemyReagentsFilter.module.scss";

function AlchemyReagentsFilter(props) {
  const { onFilterChangeProp } = props;

  return (
    <div className="">
      <h2>Filters</h2>
      <div className={styles.filterOptions}>
        <div className={styles.contains}>
          <h3>Contains</h3>
          <select name="contains" onChange={onFilterChangeProp}>
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
          <select name="rarity" onChange={onFilterChangeProp}>
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
          <select name="reagenttype" onChange={onFilterChangeProp}>
            <option value="all">All</option>
            {Object.keys(AlchemicalTypes).map((key) => (
              <option key={key} value={AlchemicalTypes[key]}>
                {AlchemicalTypes[key]}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

export default AlchemyReagentsFilter;
