import React, { useState } from "react";
import Header from "../../Header/Header";
import AlchemyReagentList from "../AlchemyReagentsPage/AlchemyReagentList";
import AlchemyReagentsFilter from "../AlchemyReagentsPage/AlchemyReagentsFilter";

// Styles and images
import styles from "./AlchemyReagentsPage.module.scss";
import bronzeMedal from "../../../assets/images/icons/ico.medal.bronze.svg";
import silverMedal from "../../../assets/images/icons/ico.medal.silver.svg";
import goldMedal from "../../../assets/images/icons/ico.medal.gold.svg";

function AlchemyReagentsPage() {
  const baseFilters = { contains: "all", rarity: "all", type: "all" };
  const startingViewStorage = localStorage.getItem("reagents-view");
  const startingView = startingViewStorage && JSON.parse(startingViewStorage);
  const [filterValues, setFilters] = useState(baseFilters);
  const [viewValue, setView] = useState(startingView);

  /**
   * If a user changes a filter
   * */
  const onFilterChange = (event) => {
    const target = event.target;
    const targetProperty = target.getAttribute("name");
    const targetValue = target.value;
    setFilters(() => {
      switch (targetProperty) {
        case "contains":
          return { ...filterValues, contains: targetValue };

        case "rarity":
          return { ...filterValues, rarity: targetValue };

        case "reagenttype":
          return { ...filterValues, type: targetValue };

        default:
          return filterValues;
      }
    });
  };

  /**
   * A user clears a filter
   * */
  const onFilterClear = () => {
    setFilters(() => {
      return baseFilters;
    });
  };

  /**
   * A user changes the view
   * */
  const onChangeView = (viewMode) => {
    setView(() => {
      return viewMode;
    });
  };

  /**
   * Return a component
   * */
  return (
    <React.Fragment>
      <Header title="Alchemy Recipes and Reagents" />
      <h2>Reagents</h2>
      <div className={styles.costs}>
        <h3>Costs</h3>
        <div className={styles.cost + " " + styles.common}>
          <img src={bronzeMedal} /> 1 Coin
        </div>
        <div className={styles.cost + " " + styles.uncommon}>
          <img src={silverMedal} /> 3 Coin
        </div>
        <div className={styles.cost + " " + styles.rare}>
          <img src={goldMedal} /> 6 Coin
        </div>
      </div>
      <AlchemyReagentsFilter
        onFilterChange={onFilterChange}
        onFilterClear={onFilterClear}
        filterValues={filterValues}
        startingViewMode={startingView}
        onViewModeChange={onChangeView}
      />
      <AlchemyReagentList filter={filterValues} view={viewValue} />
    </React.Fragment>
  );
}

export default AlchemyReagentsPage;
