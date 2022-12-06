import React, { useState } from "react";
import Header from "../../Header/Header";
import ListingWrapper from "../../Listings/ListingWrapper";
import Listing from "../../Listings/Listing";
import { recipesData, RecipeTypes } from "../../../assets/data/recipes_data.js";
import dcIcon from "../../../assets/images/icons/ico.dc.svg";
import timeIcon from "../../../assets/images/icons/ico.clock.svg";
import styles from "./AlchemicalRecipe.module.scss";

function AlchemyRecipesPage() {
  /**
   * Setup Filter Values
   * */
  const typeFilterValues = { all: "All", ...RecipeTypes };
  const [typeFilterValue, setTypeFilterValue] = useState("all");

  /**
   * A user changes the filter
   * r*/
  const onFilterChange = (event) => {
    if (event.target.name == "type") setTypeFilterValue(event.target.value);
  };

  /**
   * A user clears the filters
   * */
  const onFilterClear = () => {
    setTypeFilterValue("all");
  };

  /**
   * Filters by type of recipe
   * */
  const filterByType = (recipe) => {
    if (typeFilterValue == "all") return true;
    else return recipe.type == typeFilterValue;
  };

  /**
   * Define filters
   * */
  const filters = {
    dropdowns: [
      {
        name: "type",
        values: typeFilterValues,
      },
    ],
    change: onFilterChange,
    clear: onFilterClear,
  };

  /**
   * Collates same reagents before print
   * */
  const collateReagents = (reagents) => {
    const sortedReagents = reagents.sort((a, b) => (a.code < b.code && -1) || 1);
    const uniqueReagents = [];

    sortedReagents.forEach((consideredReagent) => {
      const reagentAdded = uniqueReagents.find((reagent) => reagent.code == consideredReagent.code);
      if (!reagentAdded) {
        uniqueReagents.push({ count: 1, ...consideredReagent });
      } else {
        reagentAdded.count += 1;
      }
    });

    return uniqueReagents;
  };

  /**
   * Return a component
   * */
  return (
    <React.Fragment>
      <Header title="Alchemy Recipes and Reagents" />
      <h2>Alchemy Recipes</h2>
      <ListingWrapper filter={true} filters={filters}>
        {recipesData.filter(filterByType).map((recipe, index) => (
          <Listing key={index} className={styles.recipe}>
            <div className={styles.recipe}>
              <div className={styles.title}>
                <div className={styles.type} data-type={recipe.type}></div>
                <div className={styles.name + " card-title"}>{recipe.name}</div>
              </div>
              <div className={styles.description}>{recipe.desc}</div>
              <div className={styles.effects}>{recipe.effects}</div>
              <div className={styles.dc}>
                <img src={dcIcon} />
                {recipe.dc}
              </div>
              <div className={styles.time}>
                <img src={timeIcon} /> {recipe.time}
              </div>

              <div className={styles.requirements}>
                {collateReagents(recipe.reagents).map((reagent, index) => {
                  return (
                    <div key={index} className={styles.reagent + " " + reagent.code.toLowerCase()}>
                      {reagent.name} {reagent.count > 1 && ` (${reagent.count})`}
                    </div>
                  );
                })}
              </div>
            </div>
          </Listing>
        ))}
      </ListingWrapper>
    </React.Fragment>
  );
}

export default AlchemyRecipesPage;
