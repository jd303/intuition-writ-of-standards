//import React, { useState } from "react";
//import React from "react";
import { PropTypes } from "prop-types";
import ListingTitle from "../Listings/ListingTitle/ListingTitle";
import StaminaIcon from "../Components/StaminaIcon/StaminaIcon";
import st from "./MovesAndModsPage.module.scss";

MoveCategoryComponent.propTypes = {
  move: PropTypes.object.isRequired,
};

function MoveCategoryComponent(props) {
  let { move } = props;

  const rankSort = (a, b) => (a.rank < b.rank && -1) || 1;

  return (
    <div className={st.move}>
      <ListingTitle>{move.name}</ListingTitle>
      <div className={st.moveDesc}>{move.description}</div>
      <ul className={st.modsList}>
        {move.mods.sort(rankSort).map((mod, index3) => {
          return (
            <li key={index3} className={st.moveMod + " " + st[mod.rank]}>
              {(mod.stamina && <StaminaIcon on={true} />) || <StaminaIcon on={false} />} <div className={st.modName}>{mod.name}</div>{" "}
              {mod.description}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default MoveCategoryComponent;
