import React from "react";
import styles from "./Listings.module.scss";

function ListingTitle(props) {
  return <div className={styles.listingTitle}>{props.children}</div>;
}

export default ListingTitle;
