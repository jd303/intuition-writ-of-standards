import { PropTypes } from "prop-types";
import styles from "./Listings.module.scss";

ListingTitle.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
};

function ListingTitle(props) {
  const { children } = props;

  return <div className={styles.listingTitle}>{children}</div>;
}

export default ListingTitle;
