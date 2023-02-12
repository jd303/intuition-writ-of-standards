import PropTypes from "prop-types";
import styles from "./CircledText.module.scss";

CircledText.propTypes = {
  text: PropTypes.string.isRequired,
};

function CircledText(props) {
  const { text } = props;

  return <div className={styles.container}>{text}</div>;
}

export default CircledText;
