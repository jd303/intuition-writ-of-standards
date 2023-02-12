import React from "react";
import { NavHome } from "../Nav/Nav";

import logo from "../../assets/images/lg.intuition.svg";
import styles from "./HomePageStyle.module.scss";

function HomePage() {
  return (
    <React.Fragment>
      <div className={styles.header}>
        <img className={styles.logo} src={logo} />
      </div>
      <NavHome style="home"></NavHome>
    </React.Fragment>
  );
}

export default HomePage;
