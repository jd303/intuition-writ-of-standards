import { PropTypes } from "prop-types";
import styles from "./Listings.module.scss";

Listing.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  className: PropTypes.string
};

function Listing(props) {
  const { children, className } = props;

  const addCustomClasses = () => {
	if (className) return className;
	else return '';
  }

  return <div className={styles.listing + ' ' + addCustomClasses()}>{children}</div>;
}

export default Listing;
