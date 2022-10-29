import React from "react";
import styles from "./CostsListStyles.module.scss";

function CostsList(props) {
  const { costsListProp } = props;

  /**
   * Returns an object with 2 arrays: basics and luxuries
   * */
  const filterCategories = (costCategories, type) => {
    return costCategories.filter((category) => category.type == type);
  };

  const categoryJSX = (cost, index) => {
    return (
      <div key={index} className={styles.category}>
        <div className={styles.name}>{cost.name}</div>
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
          {filterCategories(costsListProp, "basic").map(categoryJSX)}
        </div>
        <div className={styles.column}>
          <h3>Luxuries</h3>
          {filterCategories(costsListProp, "luxury").map(categoryJSX)}
        </div>
      </div>
    </React.Fragment>
  );
}

export default CostsList;
