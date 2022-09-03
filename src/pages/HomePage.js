import React from "react";
import Nav from "../components/Nav";

import logo from "../assets/images/lg.intuition.svg";
import styles from "./HomePageStyle.module.scss";

function HomePage() {
  return (
    <React.Fragment>
      <div className={styles.header}>
        <img className={styles.logo} src={logo} />
      </div>
      <Nav styleProp="home"></Nav>
    </React.Fragment>
  );
}

export default HomePage;
