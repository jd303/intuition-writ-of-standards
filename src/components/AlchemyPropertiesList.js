import styles from "./AlchemicalPropertiesList.module.scss";
import colourStyles from "./_SharedStyles.module.scss";

function AlchemyPropertiesList(props) {
  const { viewModeProp } = props;

  return (
    <div className={styles.properties + " " + styles[viewModeProp]}>
      {props.propertiesProp.map((property, index) => (
        <span key={index} className={colourStyles[property.code.toLowerCase()] + " " + styles.property}>
          {property.name}
        </span>
      ))}
    </div>
  );
}

export default AlchemyPropertiesList;
