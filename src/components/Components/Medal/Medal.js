import PropTypes from "prop-types";
import styles from "./Medal.module.scss";
import bronzeMedal from "../../../assets/images/icons/ico.medal.bronze.svg";
import silverMedal from "../../../assets/images/icons/ico.medal.silver.svg";
import goldMedal from "../../../assets/images/icons/ico.medal.gold.svg";

Medal.propTypes = {
  rarity: PropTypes.string.isRequired,
  size: PropTypes.string,
};

function Medal(props) {
  const { rarity, size = "small" } = props;

  let source;
  let alt;
  switch (rarity.toLowerCase()) {
    case "bronze":
    case "common":
      source = bronzeMedal;
      alt = "bronze";
      break;
    case "silver":
    case "uncommon":
      source = silverMedal;
      alt = "silver";
      break;
    case "gold":
    case "rare":
      source = goldMedal;
      alt = "gold";
      break;
  }

  return <img className={styles.medal + " " + styles[size]} src={source} alt={alt} />;
}

export default Medal;
