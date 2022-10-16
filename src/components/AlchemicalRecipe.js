import styles from "./AlchemicalRecipe.module.scss";
import dcIcon from "../assets/images/icons/ico.dc.svg";
import timeIcon from "../assets/images/icons/ico.clock.svg";

function AlchemicalRecipe(props) {
  const { recipeProp, viewModeProp } = props;

  return (
    <li className={styles.recipe + " " + styles[viewModeProp]}>
      <div className={styles.name + " card-title"}>{recipeProp.name}</div>
      <div className={styles.type} data-type={recipeProp.type}></div>
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
      </div>
    </li>
  );
}

export default AlchemicalRecipe;
