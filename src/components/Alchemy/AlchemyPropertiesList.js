import PropTypes from "prop-types";
import styles from "./AlchemyPropertiesList.module.scss";

AlchemyPropertiesList.propTypes = {
  viewMode: PropTypes.string.isRequired,
  properties: PropTypes.array.isRequired,
};

function AlchemyPropertiesList(props) {
  const { viewMode, properties } = props;

  return (
    <div className={styles.properties + " " + styles[viewMode]}>
      {properties.map((property, index) => (
        <span key={index} className={property.code.toLowerCase() + " " + styles.property}>
          {property.name}
        </span>
      ))}
    </div>
  );
}

export default AlchemyPropertiesList;
