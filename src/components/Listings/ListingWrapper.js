import { useState } from "react";
import { PropTypes } from "prop-types";
import StatusBar from "./Filter/StatusBar";
import styles from "./Listings.module.scss";

ListingWrapper.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  filter: PropTypes.bool,
  filters: PropTypes.object,
  onViewModeChange: PropTypes.func,
};

/**
 * Renders a listing of items
 * */
function ListingWrapper(props) {
  console.log(props);
  const { children, filter, filters, onViewModeChange = () => {} } = props;
  const [viewMode, setViewMode] = useState({ mode: "card", switchLabel: "List" });

  const toggleViewMode = () => {
    let newViewMode;
    if (viewMode.mode == "list") newViewMode = { ...viewMode, mode: "card", switchLabel: "List" };
    else newViewMode = { ...viewMode, mode: "list", switchLabel: "Card" };

    setViewMode(newViewMode);
    onViewModeChange(newViewMode);
  };

  return (
    <section className={styles.listingsSection}>
      <header className={styles.header}>
        <StatusBar filter={filter} filters={filters} viewMode={viewMode} onViewModeChange={toggleViewMode} />
      </header>
      <div className={`${styles.listingsWrapper} ${styles[`view_${viewMode.mode}`]}`}>{children}</div>
    </section>
  );
}

export default ListingWrapper;
