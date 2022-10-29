import React from "react";
import Header from "../Header";
import CostsList from "./CostsList";
import { Costs } from "../../assets/data/costs_data";

function CostsPage() {
  return (
    <React.Fragment>
      <Header />
      <h2>Costs</h2>
      <p>
        Costs are in{" "}
        <strong>
          <em>Standards</em>
        </strong>
        , a coin which is accepted in most nations of the world. The coin has developed a number of colloquial names, such as Stans and Newies.
      </p>
      <p>These costs are indicative of standards across the Civil Holds. Market forces may apply pressure to these prices.</p>
      <CostsList costsListProp={Costs} />
    </React.Fragment>
  );
}

export default CostsPage;
