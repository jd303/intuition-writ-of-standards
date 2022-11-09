import React from "react";
import Header from "../Header";
import ListingWrapper from "../_Listings/ListingWrapper";
import Listing from "../_Listings/Listing";

import { gadgets } from "../../assets/data/gadgets";

function GadgetsPage() {
  return (
    <React.Fragment>
      <Header />
      <h2>Gadgets</h2>
      <ListingWrapper>
        {gadgets.map((gadget) => {
          return <Listing>{gadget.name}</Listing>;
        })}
      </ListingWrapper>
    </React.Fragment>
  );
}

export default GadgetsPage;
