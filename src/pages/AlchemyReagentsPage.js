import React, { useState } from "react";
import Header from "../components/Header";
import AlchemyReagentList from "../components/AlchemyReagentList";
import AlchemyReagentsFilter from "../components/AlchemyReagentsFilter";

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
  const onFilterClear = (event) => {
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
      <Header titleProp="Alchemy Recipes and Reagents" />
      <h2>Reagents</h2>
      <AlchemyReagentsFilter
        onFilterChangeProp={onFilterChange}
        onFilterClear={onFilterClear}
        filterValuesProp={filterValues}
        startingViewModeProp={startingView}
        onViewModeChangeProp={onChangeView}
      />
      <AlchemyReagentList filterProp={filterValues} viewProp={viewValue} />
    </React.Fragment>
  );
}

export default AlchemyReagentsPage;
