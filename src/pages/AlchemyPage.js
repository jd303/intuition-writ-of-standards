import React, { useState } from "react";
import Header from "../components/Header";
import AlchemyReagentList from "../components/AlchemyReagentList";
import AlchemyRecipes from "../components/AlchemyRecipes";
import AlchemyReagentsFilter from "../components/AlchemyReagentsFilter";

function AlchemyPage() {
  const [filter, setFilters] = useState({ contains: "all", rarity: "all", type: "all" });

  /**
   * If a user changes a filter
   * */
  const onFilterChange = (event) => {
    console.log("CHANGE");
    const target = event.target;
    const targetProperty = target.getAttribute("name");
    const targetValue = target.value;
    setFilters(() => {
      switch (targetProperty) {
        case "contains":
          return { ...filter, contains: targetValue };

        case "rarity":
          return { ...filter, rarity: targetValue };

        case "reagenttype":
          return { ...filter, type: targetValue };

        default:
          return filter;
      }
    });
  };

  return (
    <React.Fragment>
      <Header />
      <AlchemyReagentsFilter onFilterChangeProp={onFilterChange} />
      <AlchemyReagentList filterProp={filter} />
      <AlchemyRecipes />
    </React.Fragment>
  );
}

export default AlchemyPage;
