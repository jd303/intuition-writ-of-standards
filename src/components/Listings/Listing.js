import React from "react";
import styles from "./Listings.module.scss";

function Listing(props) {
  return <div className={styles.listing}>{props.children}</div>;
}

export default Listing;
