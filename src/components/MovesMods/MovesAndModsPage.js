//import React, { useState } from "react";
import React from "react";
import Header from "../Components/Header/Header";
import MoveCategoryComponent from "./MoveCategory";

import { moves_and_mods } from "../../assets/data/moves_and_mods";

function MovesAndModsPage() {
  return (
    <React.Fragment>
      <Header />
      <h1>Moves and Mods</h1>
      <section>
        {moves_and_mods.map((category, index) => {
          return <MoveCategoryComponent key={index} category={category} />;
        })}
      </section>
    </React.Fragment>
  );
}

export default MovesAndModsPage;
