import React, { useState } from "react";
import Header from "../components/Header";
import AlchemyReagentList from "../components/AlchemyReagentList";
import AlchemyRecipesList from "../components/AlchemyRecipesList";
import AlchemyReagentsFilter from "../components/AlchemyReagentsFilter";

function AlchemyReagentsPage() {
  const baseFilters = { contains: "all", rarity: "all", type: "all" };
  const [filterValues, setFilters] = useState(baseFilters);

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

  const onFilterClear = (event) => {
    setFilters(() => {
      return baseFilters;
    });
  };

  return (
    <React.Fragment>
      <Header titleProp="Alchemy Recipes and Reagents" />
      <AlchemyReagentsFilter onFilterChangeProp={onFilterChange} onFilterClear={onFilterClear} filterValuesProp={filterValues} />
      <AlchemyReagentList filterProp={filterValues} />
    </React.Fragment>
  );
}

export default AlchemyReagentsPage;
