import React from "react";
import { PropTypes } from "prop-types";
import { recipesData } from "../../../assets/data/recipes_data.js";
import AlchemicalRecipe from "./AlchemicalRecipe";
import styles from "./AlchemyRecipesList.module.scss";

AlchemyRecipesList.propTypes = {
  filterValues: PropTypes.object.isRequired,
  viewMode: PropTypes.object.isRequired,
};

function AlchemyRecipesList(props) {
  const { filterValues, viewMode } = props;

  const filterByType = (recipe) => {
    if (filterValues.type == "all") return true;
    else return recipe.type == filterValues.type;
  };

  return (
    <React.Fragment>
      <ul className={styles.recipeList}>
        {recipesData.filter(filterByType).map((recipe, index) => {
          return <AlchemicalRecipe key={index} recipe={recipe} viewMode={viewMode.mode} />;
        })}
      </ul>
    </React.Fragment>
  );
}

export default AlchemyRecipesList;
