import React from "react";
import Header from "../Components/Header/Header";
import ListingWrapper from "../Listings/ListingWrapper";
import Listing from "../Listings/Listing";

import { gadgets } from "../../assets/data/gadgets";

function GadgetsPage() {
  return (
    <React.Fragment>
      <Header />
      <h1>Gadgets</h1>
      <ListingWrapper>
        {gadgets.map((gadget, index) => {
          return <Listing key={index}>{gadget.name}</Listing>;
        })}
      </ListingWrapper>
    </React.Fragment>
  );
}

export default GadgetsPage;
