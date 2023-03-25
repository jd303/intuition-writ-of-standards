import { PropTypes } from "prop-types";
import { useSelector } from "react-redux";

import AlchemyType from "../AlchemyType";
//import AlchemyRarity from "../AlchemyRarity";
import AlchemyPropertiesList from "../AlchemyPropertiesList";
import Medal from "../../Components/Medal/Medal";

import styles from "./AlchemyReagent.module.scss";
import ls from "../../Listings/Listings.module.scss";

// State
import { selectViewMode } from "../../../features/viewMode/viewModeSlice";

AlchemyReagent.propTypes = {
  reagent: PropTypes.object.isRequired,
};

function AlchemyReagent(props) {
  const { reagent } = props;

  const viewMode = useSelector(selectViewMode);

  return (
    <li className={styles.reagent + " " + styles[viewMode]}>
      <div className={styles.text}>
        <div className={ls["item-title"] + " card-title"}>{reagent.name}</div>
        <div className={styles.description}>{reagent.desc}</div>
      </div>
      <div className={styles.vitals}>
        <div className={styles.core}>
          <AlchemyType type={reagent.type} />
          <Medal className="rarity" rarity={reagent.rarity} />
          <div>{reagent.consume_effect}</div>
        </div>
        <AlchemyPropertiesList properties={reagent.properties} />
      </div>
    </li>
  );
}

export default AlchemyReagent;
