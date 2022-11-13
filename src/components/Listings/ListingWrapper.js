import { useState } from "react";
import { PropTypes } from "prop-types";
import styles from "./Listings.module.scss";

ListingWrapper.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
};

function ListingWrapper(props) {
  const { children } = props;
  const [viewMode, setViewMode] = useState({ mode: "list" });

  const toggleViewMode = () => {
    let newViewMode;
    if (viewMode.mode == "list") newViewMode = { ...viewMode, mode: "card" };
    else newViewMode = { ...viewMode, mode: "list" };
    console.log("VIEWs", newViewMode);

    setViewMode(newViewMode);
  };

  return (
    <section className={styles.listingsSection}>
      <button className={styles.listingSwitcher} onClick={toggleViewMode}>
        Swtich
      </button>
      <div className={`${styles.listingsWrapper} ${styles[`view_${viewMode.mode}`]}`}>{children}</div>
    </section>
  );
}

export default ListingWrapper;
