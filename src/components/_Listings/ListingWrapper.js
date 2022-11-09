import React from "react";
import styles from "./ListingWrapper.module.scss";

function ListingWrapper(props) {
  return <div className={styles.listingsWrapper}>{props.children}</div>;
}

export default ListingWrapper;
