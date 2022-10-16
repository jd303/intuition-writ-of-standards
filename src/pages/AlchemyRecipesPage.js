import React, { useState } from "react";
import Header from "../components/Header";
import AlchemyRecipesList from "../components/AlchemyRecipesList";

function AlchemyRecipesPage() {
  return (
    <React.Fragment>
      <Header titleProp="Alchemy Recipes and Reagents" />
      <AlchemyRecipesList />
    </React.Fragment>
  );
}

export default AlchemyRecipesPage;
