import RouteDefinitions from "../Routes";
import { NavLink } from "react-router-dom";
import styles from "./NavStyle.module.scss";

function Nav(props) {
  return (
    <div className={styles.nav}>
      <ol className={styles[props.styleProp]}>
        {RouteDefinitions().map((rt, index) => (
          <li key={index}>
            <NavLink to={rt.path} className={({ isActive }) => (isActive ? styles.activeLink : "")}>
              {rt.navLabel}
            </NavLink>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default Nav;
