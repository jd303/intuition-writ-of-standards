import Nav from "./Nav";
import styles from "./HeaderStyle.module.scss";
import logo from "../assets/images/lg.intuition.svg";

function Header() {
  return (
    <div className={styles.header}>
      <div className={styles.site}>
        <img className={styles.logo} src={logo} />
      </div>
      <Nav styleProp="regular" />
    </div>
  );
}

export default Header;
