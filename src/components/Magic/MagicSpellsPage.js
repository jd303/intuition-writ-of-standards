import * as React from "react";
import Header from "../Header/Header";
import MagicSpellsFilter from "./MagicSpellsFilter";

// Styles
import styles from "./MagicSpellsPage.module.scss";
import target from "../../assets/images/icons/ico.target.svg";
import timeIcon from "../../assets/images/icons/ico.clock.svg";
import mapPinIcon from "../../assets/images/icons/ico.map_pin.svg";

// Data
import { spells } from "../../assets/data/spells_data.js";

function MagicSpellsPage(props) {
  /**
   * Filter State
   * */
  const filters = { school: "all" };
  const [filterValues, setFilter] = React.useState(filters);

  const onFilterChange = () => {
    console.log("FILTER CHANGE");
  };

  /**
   * Component
   * */
  return (
    <React.Fragment>
      <Header />
      <h2>Spells</h2>
      <MagicSpellsFilter filterValuesProp={filterValues} onFilterChangeProp={onFilterChange} />
      <div className={styles.spells}>
        {spells.map((spell, index) => (
          <div key={index} className={styles.spell}>
            <div className={styles.title}>
              <div className={styles.name}>{spell.name}</div>
              <div className={styles.cost}>{spell.cost}</div>
              <div className={styles.school}>{spell.school}</div>
            </div>
            <div className={styles.mechanics}>
              <div className={styles.challengeType}>
                <img src={target} />
                {spell.challenge_type}
              </div>
              <div className={styles.range}>
                <img src={mapPinIcon} />
                {spell.range}
              </div>
              <div className={styles.duration}>
                <img src={timeIcon} />
                {spell.duration}
              </div>
            </div>
            <ul className={styles.effects}>
              <li className={styles.effect + " " + styles.effect_cantrip}>{spell.effect_cantrip}</li>
              <li className={styles.effect + " " + styles.effect_full}>{spell.effect_full}</li>
            </ul>
          </div>
        ))}
      </div>
    </React.Fragment>
  );
}

export default MagicSpellsPage;
