import * as React from "react";
import { PropTypes } from "prop-types";
import { MagicSchools } from "../../assets/data/spells_data.js";
import filterStyles from "../FilterShared.module.scss";

MagicSpellsFilter.propTypes = {
  filterValues: PropTypes.object.isRequired,
  onFilterChange: PropTypes.func.isRequired,
};

function MagicSpellsFilter(props) {
  const { filterValues, onFilterChange } = props;

  const schoolRef = React.useRef(null);

  /**
   * Component
   * */
  return (
    <div className={filterStyles.filterContainer}>
      <div className={filterStyles.filterOptions}>
        <div className={filterStyles.contains}>
          <h3>Contains</h3>
          <select name="school" value={filterValues.school} ref={schoolRef} onChange={onFilterChange}>
            <option value="all">All</option>
            {Object.keys(MagicSchools).map((key, index) => (
              <option key={index} value={key}>
                {MagicSchools[key]}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

export default MagicSpellsFilter;
