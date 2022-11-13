import { PropTypes } from "prop-types";
import { RouteDefinitions, MainNavRouteDefinitions } from "../../Routes";
import { NavLink, useLocation } from "react-router-dom";
import styles from "./NavStyle.module.scss";

Nav.propTypes = {
  style: PropTypes.string.isRequired,
};

function Nav(props) {
  const { style } = props;
  const location = useLocation();
  const subRoutes = RouteDefinitions().filter((route) => route.subRouteOf?.includes(location.pathname));

  return (
    <div className={styles.nav}>
      <ol className={styles[style]}>
        {MainNavRouteDefinitions().map((rt, index) => (
          <li key={index} className={styles.routeLink}>
            <NavLink to={rt.path} className={({ isActive }) => (isActive ? styles.activeLink : "")}>
              {rt.navLabel}
            </NavLink>
          </li>
        ))}
      </ol>
      <ol className={styles[style]}>
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
