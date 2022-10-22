import React, { useState } from "react";
import { reagentData } from "../assets/data/reagents_data.js";
import AlchemyReagent from "./AlchemyReagent.js";

import styles from "./AlchemyReagentList.scss";

function AlchemyReagentList(props) {
  /**
   * Deconstruct properties
   * */
  const { filterProp, viewProp } = props;

  /**
   * Applies state to data
   * */
  const applyStateToData = (reagentData) => {
    return reagentData.map((reagent, index) => {
      return { visibility: true, selected: false, id: index, ...reagent };
    });
  };

  /**
   * Set State
   * */
  const [reagents, setReagents] = useState(applyStateToData(reagentData));

  /**
   * Sets whether a reagent is selected
   * */
  const updateSelection = (id) => {
    setReagents((prevState) => {
      return reagents.map((reagent) => {
        if (reagent.id === id) {
          return {
            ...reagent,
            selected: !reagent.selected,
          };
        }
        return reagent;
      });
    });
  };

  /**
   * The user wants to filter the reagents by properties it contains
   * */
  const filterContainsCallback = (reagent) => {
    switch (true) {
      case props.filterProp.contains !== "all":
        return reagent.properties.find((prop) => prop.code == props.filterProp.contains);
        break;

      case "all":
      default:
        return true;
    }
  };

  /**
   * The user wants to filter the reagents by properties it contains
   * */
  const filterRarityCallback = (reagent) => {
    switch (true) {
      case props.filterProp.rarity !== "all":
        return reagent.rarity == props.filterProp.rarity;
        break;

      case "all":
      default:
        return true;
    }
  };

  /**
   * The user wants to filter the reagents by properties it contains
   * */
  const filterTypeCallback = (reagent) => {
    switch (true) {
      case props.filterProp.type !== "all":
        return reagent.type == props.filterProp.type;
        break;

      case "all":
      default:
        return true;
    }
  };

  return (
    <React.Fragment>
      <ul>
        {reagents
          .filter(filterContainsCallback)
          .filter(filterRarityCallback)
          .filter(filterTypeCallback)
          .map((reagent, index) => {
            return <AlchemyReagent key={index} reagentProp={reagent} updateSelectionProp={updateSelection} viewModeProp={viewProp.mode} />;
          })}
      </ul>
    </React.Fragment>
  );
}

export default AlchemyReagentList;
