import { PropTypes } from "prop-types";
import styles from "./Listings.module.scss";

Listing.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
};

function Listing(props) {
  const { children } = props;

  return <div className={styles.listing}>{children}</div>;
}

export default Listing;
