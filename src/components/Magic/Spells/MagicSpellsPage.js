import React, { useState } from "react";
import Header from "../../Components/Header/Header";
import ListingWrapper from "../../Listings/ListingWrapper";
import Listing from "../../Listings/Listing";
import ListingTitle from "../../Listings/ListingTitle/ListingTitle";
import Medal from "../../Components/Medal/Medal";
import CircledText from "../../Components/CircledText/CircledText";

// Styles
import st from "./MagicSpellsPage.module.scss";
import target from "../../../assets/images/icons/ico.target.svg";
import timeIcon from "../../../assets/images/icons/ico.clock.svg";
import mapPinIcon from "../../../assets/images/icons/ico.map_pin.svg";

// Data
import { spells, MagicSchools } from "../../../assets/data/spells_data.js";

/**
 * Renders the Magic Spells page
 * */
function MagicSpellsPage() {
  /**
   * Filter State
   * */
  const schoolFilterValues = { all: "All", ...MagicSchools };
  const [schoolFilterValue, setSchoolFilterValue] = React.useState("all");

  /**
   * When a filter is changed
   * */
  const onFilterChange = (filterChangeEvent) => {
    const filterName = filterChangeEvent.target.name;
    const filterValue = filterChangeEvent.target.value;

    if (filterName == "school") {
      setSchoolFilterValue(filterValue);
    }
  };

  /**
   * When filters are cleared
   * */
  const onFilterClear = () => {
    setSchoolFilterValue("all");
  };

  /**
   * Fiter results by school
   * */
  const filterBySchool = (spell) => {
    if (schoolFilterValue == "all") return true;
    else return spell.school == schoolFilterValue;
  };

  /**
   * Define filters
   * */
  const filters = {
    dropdowns: [
      {
        name: "school",
        values: schoolFilterValues,
      },
    ],
    change: onFilterChange,
    clear: onFilterClear,
  };

  /**
   * Watch view state
   * */
  const [viewMode, setTheViewMode] = useState({ mode: "list" });
  const updateViewMode = (update) => {
    setTheViewMode(() => {
      return update;
    });
  };

  /**
   * Component
   * */
  return (
    <React.Fragment>
      <Header />
      <h2>Spells</h2>
      <ListingWrapper filter={true} filters={filters} onViewModeChange={updateViewMode}>
        {spells.filter(filterBySchool).map((spell, index) => (
          <Listing key={index}>
            <div className={st.spell + " " + st["view-" + viewMode.mode]}>
              <ListingTitle bottomborder>{spell.name}</ListingTitle>
              <div className={st.cost}>
                <CircledText text={spell.cost.toString()} />
              </div>
              <div className={st.school}>{spell.school}</div>
              <div className={st.mechanics}>
                <div className={st.challengeType}>
                  <img src={target} />
                  {spell.challenge_type}
                </div>
                <div className={st.range}>
                  <img src={mapPinIcon} />
                  {spell.range}
                </div>
                <div className={st.duration}>
                  <img src={timeIcon} />
                  {spell.duration}
                </div>
              </div>
              <ul className={st.effects}>
                <li className={st.effect}>
                  <Medal size="small" rarity="bronze" /> {spell.effect_cantrip}
                </li>
                <li className={st.effect}>
                  <Medal size="small" rarity="gold" /> {spell.effect_full}
                </li>
              </ul>
            </div>
          </Listing>
        ))}
      </ListingWrapper>
    </React.Fragment>
  );
}

export default MagicSpellsPage;
