import React, { useState } from "react";

import SelectionCheckbox from "./SelectionCheckbox";
import AlchemyType from "./AlchemyType";
import AlchemyRarity from "./AlchemyRarity";
import AlchemyPropertiesList from "./AlchemyPropertiesList";

import styles from "./AlchemyReagent.module.scss";

function AlchemyReagent(props) {
  const { reagentProp, updateSelectionProp, viewModeProp } = props;

  return (
    <li className={styles.reagent + " " + styles[viewModeProp]}>
      <div className={styles.text}>
        <div className={styles.name + " card-title"}>{reagentProp.name}</div>
        <div className={styles.description}>{reagentProp.desc}</div>
      </div>
      <div className={styles.vitals}>
        <div className={styles.core}>
          <AlchemyType typeProp={reagentProp.type} />
          <AlchemyRarity className="rarity" rarityProp={reagentProp.rarity} />
        </div>
        <AlchemyPropertiesList propertiesProp={reagentProp.properties} viewModeProp={viewModeProp} />
      </div>
    </li>
  );
}

export default AlchemyReagent;

// Was under <AlchemyPropertiesList>
//<SelectionCheckbox selectedProp={reagentProp.selected} updateSelectionProp={updateSelectionProp} reagentProp={reagentProp} />
