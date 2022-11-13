import React from "react";
import Header from "../Header/Header";
import { animal_companion_moves } from "../../assets/data/animal_companion_moves";
import Listing from "../Listings/Listing";
import ListingTitle from "../Listings/ListingTitle";
import ListingWrapper from "../Listings/ListingWrapper";

function AnimalCompanionsPage() {
  return (
    <React.Fragment>
      <Header />
      <h2>Animal Companions</h2>
      <ListingWrapper>
        {animal_companion_moves.map((move, index) => {
          return (
            <Listing key={index}>
              <ListingTitle>{move.name}</ListingTitle>
              <div className="effect">{move.type}</div>
              <div className="effect">{move.effect}</div>
            </Listing>
          );
        })}
      </ListingWrapper>
    </React.Fragment>
  );
}

export default AnimalCompanionsPage;
