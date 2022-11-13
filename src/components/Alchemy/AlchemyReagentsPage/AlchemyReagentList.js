import React, { useState } from "react";
import { PropTypes } from "prop-types";
import { reagentData } from "../../../assets/data/reagents_data.js";
import AlchemyReagent from "./AlchemyReagent.js";
import styles from "./AlchemyReagentList.module.scss";

AlchemyReagentList.propTypes = {
  filter: PropTypes.object.isRequired,
  view: PropTypes.object.isRequired,
};

function AlchemyReagentList(props) {
  /**
   * Deconstruct properties
   * */
  const { filter, view } = props;

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
    setReagents((/*prevState*/) => {
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
      case filter.contains !== "all":
        return reagent.properties.find((prop) => prop.code == filter.contains);

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
      case filter.rarity !== "all":
        return reagent.rarity == filter.rarity;

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
      case filter.type !== "all":
        return reagent.type == filter.type;

      case "all":
      default:
        return true;
    }
  };

  return (
    <React.Fragment>
      <ul className={styles.reagentList}>
        {reagents
          .filter(filterContainsCallback)
          .filter(filterRarityCallback)
          .filter(filterTypeCallback)
          .map((reagent, index) => {
            return <AlchemyReagent key={index} reagent={reagent} updateSelection={updateSelection} viewMode={view.mode} />;
          })}
      </ul>
    </React.Fragment>
  );
}

export default AlchemyReagentList;
