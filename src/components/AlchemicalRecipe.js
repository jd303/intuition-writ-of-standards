import styles from "./AlchemicalRecipe.module.scss";

function AlchemicalRecipe(props) {
  const { recipeProp } = props;

  return (
    <li className={styles.recipe}>
      <div className={styles.name}>{recipeProp.name}</div>
      <div className={styles.type}>{recipeProp.type}</div>
      <div className={styles.description}>{recipeProp.description}</div>
      <div className={styles.time}>{recipeProp.time}</div>
      <div className={styles.effects}>{recipeProp.effects}</div>
      <div className={styles.dc}>{recipeProp.dc}</div>
    </li>
  );
}

export default AlchemicalRecipe;
