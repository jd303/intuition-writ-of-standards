import styles from "./AlchemyPropertiesList.module.scss";

function AlchemyPropertiesList(props) {
  const { viewModeProp } = props;

  return (
    <div className={styles.properties + " " + styles[viewModeProp]}>
      {props.propertiesProp.map((property, index) => (
        <span key={index} className={property.code.toLowerCase() + " " + styles.property}>
          {property.name}
        </span>
      ))}
    </div>
  );
}

export default AlchemyPropertiesList;
