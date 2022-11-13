import { PropTypes } from "prop-types";
import styles from "./AlchemicalRecipe.module.scss";
import dcIcon from "../../../assets/images/icons/ico.dc.svg";
import timeIcon from "../../../assets/images/icons/ico.clock.svg";

AlchemicalRecipe.propTypes = {
  recipe: PropTypes.object.isRequired,
  viewMode: PropTypes.string.isRequired,
};

function AlchemicalRecipe(props) {
  const { recipe, viewMode } = props;

  /**
   * Collates same reagents before print
   * */
  const collateReagents = (reagents) => {
    const sortedReagents = reagents.sort((a, b) => (a.code < b.code && -1) || 1);
    const uniqueReagents = [];

    sortedReagents.forEach((consideredReagent) => {
      const reagentAdded = uniqueReagents.find((reagent) => reagent.code == consideredReagent.code);
      if (!reagentAdded) {
        uniqueReagents.push({ count: 1, ...consideredReagent });
      } else {
        reagentAdded.count += 1;
      }
    });

    return uniqueReagents;
  };

  return (
    <li className={styles.recipe + " " + styles[viewMode]}>
      <div className={styles.type} data-type={recipe.type}></div>
      <div className={styles.name + " card-title"}>{recipe.name}</div>
      <div className={styles.description}>{recipe.desc}</div>
      <div className={styles.effects}>{recipe.effects}</div>
      <div className={styles.creation}>
        <div className={styles.dc}>
          <img src={dcIcon} />
          {recipe.dc}
        </div>
        <div className={styles.time}>
          <img src={timeIcon} /> {recipe.time}
        </div>
        <div className={styles.requirements}>
          {collateReagents(recipe.reagents).map((reagent, index) => {
            return (
              <div key={index} className={styles.reagent + " " + reagent.code.toLowerCase()}>
                {reagent.name} {reagent.count > 1 && ` (${reagent.count})`}
              </div>
            );
          })}
        </div>
      </div>
    </li>
  );
}

export default AlchemicalRecipe;
