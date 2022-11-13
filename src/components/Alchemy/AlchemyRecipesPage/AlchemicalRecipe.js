import styles from "./AlchemicalRecipe.module.scss";
import dcIcon from "../../../assets/images/icons/ico.dc.svg";
import timeIcon from "../../../assets/images/icons/ico.clock.svg";

function AlchemicalRecipe(props) {
  const { recipeProp, viewModeProp } = props;

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
    <li className={styles.recipe + " " + styles[viewModeProp]}>
      <div className={styles.type} data-type={recipeProp.type}></div>
      <div className={styles.name + " card-title"}>{recipeProp.name}</div>
      <div className={styles.description}>{recipeProp.desc}</div>
      <div className={styles.effects}>{recipeProp.effects}</div>
      <div className={styles.creation}>
        <div className={styles.dc}>
          <img src={dcIcon} />
          {recipeProp.dc}
        </div>
        <div className={styles.time}>
          <img src={timeIcon} /> {recipeProp.time}
        </div>
        <div className={styles.requirements}>
          {collateReagents(recipeProp.reagents).map((reagent, index) => {
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
