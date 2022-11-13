import bronzeMedal from "../../assets/images/icons/ico.medal.bronze.svg";
import silverMedal from "../../assets/images/icons/ico.medal.silver.svg";
import goldMedal from "../../assets/images/icons/ico.medal.gold.svg";

import { styles } from "./AlchemyRarityStyle.scss";

function AlchemyRarity(props) {
  switch (props.rarityProp.toLowerCase()) {
    case "common":
      return <img src={bronzeMedal} />;
      break;

    case "uncommon":
      return <img src={silverMedal} />;
      break;

    case "rare":
      return <img src={goldMedal} />;
      break;

    default:
      return "";
  }
}

export default AlchemyRarity;
