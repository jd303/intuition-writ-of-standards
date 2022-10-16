import React, { useState } from "react";
import { reagentData } from "../assets/data/reagents_data.js";
import AlchemyReagent from "./AlchemyReagent.js";

import styles from "./AlchemyReagentList.scss";

function AlchemyReagentList(props) {
  /**
   * Applies state to data
   * */
  const applyStateToData = (reagentData) => {
    return reagentData.map((reagent, index) => {
      return { visibility: true, selected: false, id: index, ...reagent };
    });
  };

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

  /**
   * View Mode States
   * */
  const [viewMode, setViewMode] = useState({ mode: "list-view", label: "Card View" });
  const toggleMode = () => {
    if (viewMode.mode == "list-view") {
      setViewMode({
        mode: "card-view",
        label: "List View",
      });
    } else {
      setViewMode({
        mode: "list-view",
        label: "Card View",
      });
    }
  };

  return (
    <React.Fragment>
      <h2>Reagents</h2>
      <button onClick={toggleMode}>{viewMode.label}</button>
      <ul>
        {reagents
          .filter(filterContainsCallback)
          .filter(filterRarityCallback)
          .filter(filterTypeCallback)
          .map((reagent, index) => {
            return <AlchemyReagent key={index} reagentProp={reagent} updateSelectionProp={updateSelection} viewModeProp={viewMode.mode} />;
          })}
      </ul>
    </React.Fragment>
  );
}

export default AlchemyReagentList;
