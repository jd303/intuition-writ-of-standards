import React, { useState } from "react";
import { recipesData } from "../assets/data/recipes_data.js";
import AlchemicalRecipe from "./AlchemicalRecipe";
import styles from "./AlchemicalRecipesList.module.scss";

function AlchemyRecipesList() {
  let [viewMode, setViewMode] = useState({ label: "Card View", mode: "list-view" });

  const toggleViewMode = () => {
    if (viewMode.mode == "list-view") {
      setViewMode({ label: "List View", mode: "card-view" });
    } else {
      setViewMode({ label: "Card View", mode: "list-view" });
    }
  };

  return (
    <React.Fragment>
      <h2>Alchemy Recipes</h2>
      <button onClick={toggleViewMode}>{viewMode.label}</button>
      <ul>
        {recipesData.map((recipe, index) => {
          return <AlchemicalRecipe key={index} recipeProp={recipe} viewModeProp={viewMode.mode} />;
        })}
      </ul>
    </React.Fragment>
  );
}

export default AlchemyRecipesList;
