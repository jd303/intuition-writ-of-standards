import PropTypes from "prop-types";
import bronzeMedal from "../../assets/images/icons/ico.medal.bronze.svg";
import silverMedal from "../../assets/images/icons/ico.medal.silver.svg";
import goldMedal from "../../assets/images/icons/ico.medal.gold.svg";

AlchemyRarity.propTypes = {
  rarity: PropTypes.string.isRequired,
};

function AlchemyRarity(props) {
  const { rarity } = props;

  switch (rarity.toLowerCase()) {
    case "common":
      return <img src={bronzeMedal} alt="bronze" />;

    case "uncommon":
      return <img src={silverMedal} alt="silver" />;

    case "rare":
      return <img src={goldMedal} alt="gold" />;

    default:
      return "";
  }
}

export default AlchemyRarity;
