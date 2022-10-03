import React, { useState } from "react";
import { recipesData } from "../assets/data/recipes_data.js";
import AlchemicalRecipe from "./AlchemicalRecipe";
import styles from "./AlchemicalRecipesList.module.scss";

function AlchemyRecipesList() {
  return (
    <React.Fragment>
      <h2>Alchemy Recipes</h2>
      <ul>
        {recipesData.map((recipe) => {
          return <AlchemicalRecipe recipeProp={recipe} />;
        })}
      </ul>
    </React.Fragment>
  );
}

export default AlchemyRecipesList;
