import { useSelector } from "react-redux";
import { PropTypes } from "prop-types";
import StatusBar from "./Filter/StatusBar";
import styles from "./Listings.module.scss";

// State
import { selectViewMode } from "../../features/viewMode/viewModeSlice";

ListingWrapper.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  filter: PropTypes.bool,
  viewModeButton: PropTypes.bool,
  filters: PropTypes.object,
  onViewModeChange: PropTypes.func,
};

/**
 * Renders a listing of items
 * */
function ListingWrapper(props) {
  const { children, filter, viewModeButton, filters } = props;

  // State
  const viewMode = useSelector(selectViewMode);

  return (
    <section className={styles.listingsSection}>
      {(filter || viewModeButton) && (
        <header className={styles.header}>
          <StatusBar filter={filter} filters={filters} />
        </header>
      )}
      <div className={`${styles.listingsWrapper} ${styles[`view_${viewMode}`]}`}>{children}</div>
    </section>
  );
}

export default ListingWrapper;
