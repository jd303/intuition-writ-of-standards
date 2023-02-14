import { PropTypes } from "prop-types";
import styles from "./ListingTitle.module.scss";

ListingTitle.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
};

function ListingTitle(props) {
  const { children } = props;

  const style = () => {
    let combinedStyles = "";
    combinedStyles += " " + styles.listingTitle;
    return combinedStyles;
  };

  return <div className={style()}>{children}</div>;
}

export default ListingTitle;
