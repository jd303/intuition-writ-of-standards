import { RouteDefinitions, MainNavRouteDefinitions } from "../../Routes";
import { NavLink, useLocation } from "react-router-dom";
import styles from "./NavStyle.module.scss";

function Nav(props) {
  const location = useLocation();
  const subRoutes = RouteDefinitions().filter((route) => route.subRouteOf?.includes(location.pathname));

  return (
    <div className={styles.nav}>
      <ol className={styles[props.styleProp]}>
        {MainNavRouteDefinitions().map((rt, index) => (
          <li key={index} className={styles.routeLink}>
            <NavLink to={rt.path} className={({ isActive }) => (isActive ? styles.activeLink : "")}>
              {rt.navLabel}
            </NavLink>
          </li>
        ))}
      </ol>
      <ol className={styles[props.styleProp]}>
        {subRoutes?.map((rt, index) => (
          <li key={index} className={styles.subRouteLink}>
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
