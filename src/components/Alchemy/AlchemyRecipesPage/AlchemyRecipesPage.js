import React, { useState } from "react";
import Header from "../../Header/Header";
import AlchemyRecipesList from "../AlchemyRecipesPage/AlchemyRecipesList";
import AlchemicalRecipesFilter from "../AlchemyRecipesPage/AlchemicalRecipesFilter";

function AlchemyRecipesPage() {
  /**
   * Setup Filter Values
   * */
  const defaultFilterState = { type: "all" };
  const [filterValues, setFilterValues] = useState(Object.assign(defaultFilterState));

  /**
   * A user changes the filte
   * r*/
  const onFilterChange = (event) => {
    const property = event.target.getAttribute("name");
    setFilterValues({
      ...filterValues,
      [property]: event.target.value,
    });
  };

  /**
   * A user clears the filters
   * */
  const onFilterClear = () => {
    setFilterValues(Object.assign(defaultFilterState));
  };

  /**
   * Setup view mode
   * */
  const viewModeStorage = localStorage.getItem("recipes-view");
  const viewModeValue = (viewModeStorage && JSON.parse(viewModeStorage)) || { mode: "list-view", label: "Card View" };
  const [viewMode, setViewMode] = useState(viewModeValue);

  /**
   * Accept view mode change from the filter
   * */
  const onViewModeChange = () => {
    console.log("View Mode Change", viewMode);

    let newViewMode;
    if (viewMode.mode == "list-view") {
      newViewMode = { label: "List View", mode: "card-view" };
    } else {
      newViewMode = { label: "Card View", mode: "list-view" };
    }

    localStorage.setItem("recipes-view", JSON.stringify(newViewMode));
    setViewMode(newViewMode);
  };

  /**
   * Return a component
   * */
  return (
    <React.Fragment>
      <Header titleProp="Alchemy Recipes and Reagents" />
      <h2>Alchemy Recipes</h2>
      <AlchemicalRecipesFilter
        onFilterChangeProp={onFilterChange}
        onFilterClearProp={onFilterClear}
        filterValuesProp={filterValues}
        viewModeProp={viewMode}
        onViewModeChangeProp={onViewModeChange}
      />
      <AlchemyRecipesList viewModeProp={viewMode} filterValuesProp={filterValues} />
    </React.Fragment>
  );
}

export default AlchemyRecipesPage;
