import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { selectViewMode } from "../../features/viewMode/viewModeSlice";
import styles from "./AlchemyPropertiesList.module.scss";

AlchemyPropertiesList.propTypes = {
  properties: PropTypes.array.isRequired,
};

function AlchemyPropertiesList(props) {
  const { properties } = props;

  const viewMode = useSelector(selectViewMode);

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
