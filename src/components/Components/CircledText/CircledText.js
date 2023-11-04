import PropTypes from "prop-types";
import styles from "./CircledText.module.scss";

CircledText.propTypes = {
  text: PropTypes.string.isRequired,
  colour: PropTypes.string,
};

function CircledText(props) {
  const { text, colour } = props;

  return <div className={styles.container + ' ' + styles[colour]}>{text}</div>;
}

export default CircledText;
