import React, { useState } from "react";
import { recipesData } from "../assets/data/recipes_data.js";
import AlchemicalRecipe from "./AlchemicalRecipe";
import styles from "./AlchemicalRecipesList.module.scss";

function AlchemyRecipesList(props) {
  const { filterValuesProp, viewModeProp, onViewModeChangeProp } = props;

  const filterByType = (recipe) => {
    if (filterValuesProp.type == "all") return true;
    else return recipe.type == filterValuesProp.type;
  };

  return (
    <React.Fragment>
      <ul>
        {recipesData.filter(filterByType).map((recipe, index) => {
          return <AlchemicalRecipe key={index} recipeProp={recipe} viewModeProp={viewModeProp.mode} />;
        })}
      </ul>
    </React.Fragment>
  );
}

export default AlchemyRecipesList;
