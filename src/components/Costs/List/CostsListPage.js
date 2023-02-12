import React from "react";
import Header from "../../Components/Header/Header";
import CostsList from "./CostsList";
import { Costs } from "../../../assets/data/costs_data";

function CostsListPage() {
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
      <p>The below are indicative of typical prices across the Civil Holds. Market forces may apply pressure to prices.</p>
      <CostsList costsList={Costs} />
    </React.Fragment>
  );
}

export default CostsListPage;
