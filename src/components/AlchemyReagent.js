import React, { useState } from "react";

import SelectionCheckbox from "./SelectionCheckbox";
import AlchemyType from "./AlchemyType";
import AlchemyRarity from "./AlchemyRarity";
import AlchemyPropertiesList from "./AlchemyPropertiesList";

import styles from "./AlchemyReagent.module.scss";

function AlchemyReagent(props) {
  const { reagentProp, updateSelectionProp } = props;
  return (
    <li className={styles.reagent}>
      <SelectionCheckbox selectedProp={reagentProp.selected} updateSelectionProp={updateSelectionProp} reagentProp={reagentProp} />
      <AlchemyRarity rarityProp={reagentProp.rarity} />
      <div className={styles.name}>{reagentProp.name}</div>
      <div className="">{reagentProp.desc}</div>
      <AlchemyType typeProp={reagentProp.type} />
      <AlchemyPropertiesList propertiesProp={reagentProp.properties} />
    </li>
  );
}

export default AlchemyReagent;
