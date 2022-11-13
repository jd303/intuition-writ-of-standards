import { PropTypes } from "prop-types";

import AlchemyType from "../AlchemyType";
import AlchemyRarity from "../AlchemyRarity";
import AlchemyPropertiesList from "../AlchemyPropertiesList";

import styles from "./AlchemyReagent.module.scss";

AlchemyReagent.propTypes = {
  reagent: PropTypes.object.isRequired,
  viewMode: PropTypes.string.isRequired,
};

function AlchemyReagent(props) {
  const { reagent, viewMode } = props;

  return (
    <li className={styles.reagent + " " + styles[viewMode]}>
      <div className={styles.text}>
        <div className={styles.name + " card-title"}>{reagent.name}</div>
        <div className={styles.description}>{reagent.desc}</div>
      </div>
      <div className={styles.vitals}>
        <div className={styles.core}>
          <AlchemyType type={reagent.type} />
          <AlchemyRarity className="rarity" rarity={reagent.rarity} />
        </div>
        <AlchemyPropertiesList properties={reagent.properties} viewMode={viewMode} />
      </div>
    </li>
  );
}

export default AlchemyReagent;
