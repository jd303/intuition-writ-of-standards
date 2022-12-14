import { NavLink } from "react-router-dom";
import Nav from "../Nav/Nav";
import styles from "./HeaderStyle.module.scss";
import logo from "../../assets/images/lg.intuition.svg";
import React from "react";

function Header() {
  return (
    <React.Fragment>
      <div className={styles.header}>
        <div className={styles.site}>
          <NavLink to="/">
            <img className={styles.logo} src={logo} />
          </NavLink>
        </div>
        <Nav style="regular" />
      </div>
    </React.Fragment>
  );
}

export default Header;
