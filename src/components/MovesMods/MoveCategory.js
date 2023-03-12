//import React, { useState } from "react";
//import React from "react";
import { PropTypes } from "prop-types";
import MoveComponent from "./MoveComponent";
import st from "./MovesAndModsPage.module.scss";

MoveCategoryComponent.propTypes = {
  category: PropTypes.object.isRequired,
};

function MoveCategoryComponent(props) {
  let { category } = props;

  return (
    <div className={st.categoryContainer}>
      <h3 className={st.categoryTitle}>{category.name} Moves</h3>
      {category.moves.map((move, index) => {
        return <MoveComponent key={index} move={move} />;
      })}
    </div>
  );
}

export default MoveCategoryComponent;
