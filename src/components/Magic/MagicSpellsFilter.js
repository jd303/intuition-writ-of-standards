import * as React from "react";
import { MagicSchools } from "../../assets/data/spells_data.js";
import filterStyles from "../FilterShared.module.scss";

function MagicSpellsFilter(props) {
  const { filterValuesProp, onFilterChangeProp } = props;

  const schoolRef = React.useRef(null);

  /**
   * Component
   * */
  return (
    <div className={filterStyles.filterContainer}>
      <div className={filterStyles.filterOptions}>
        <div className={filterStyles.contains}>
          <h3>Contains</h3>
          <select name="school" value={filterValuesProp.school} ref={schoolRef} onChange={onFilterChangeProp}>
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
