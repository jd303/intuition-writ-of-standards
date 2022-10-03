import Nav from "./Nav";
import styles from "./HeaderStyle.module.scss";
import logo from "../assets/images/lg.intuition.svg";
import React from "react";

function Header(props) {
  return (
    <React.Fragment>
      <div className={styles.header}>
        <div className={styles.site}>
          <img className={styles.logo} src={logo} />
        </div>
        <Nav styleProp="regular" />
      </div>
    </React.Fragment>
  );
}

export default Header;
