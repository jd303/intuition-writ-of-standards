import React from "react";
import { PropTypes } from "prop-types";
import styles from "./CostsListStyles.module.scss";
import ls from "../Listings/Listings.module.scss";

CostsList.propTypes = {
  costsList: PropTypes.array.isRequired,
};

function CostsList(props) {
  const { costsList } = props;

  /**
   * Returns an object with 2 arrays: basics and luxuries
   * */
  const filterCategories = (costCategories, type) => {
    return costCategories.filter((category) => category.type == type);
  };

  const categoryJSX = (cost, index) => {
    return (
      <div key={index} className={styles.category}>
        <div className={ls["item-title"]}>{cost.name}</div>
        <ul className={styles.costList}>
          {cost.costs.map((costing, index2) => {
            return (
              <li key={index2}>
                <span>{costing.name}</span> {costing.cost}
              </li>
            );
          })}
        </ul>
      </div>
    );
  };

  return (
    <React.Fragment>
      <div className={styles.columns}>
        <div className={styles.column}>
          <h3>Basics</h3>
          {filterCategories(costsList, "basic").map(categoryJSX)}
        </div>
        <div className={styles.column}>
          <h3>Luxuries</h3>
          {filterCategories(costsList, "luxury").map(categoryJSX)}
        </div>
      </div>
    </React.Fragment>
  );
}

export default CostsList;
