import PropTypes from "prop-types";
import st from "./StaminaIcon.module.scss";

StaminaIcon.propTypes = {
  on: PropTypes.bool.isRequired,
};

function StaminaIcon(props) {
  const { on } = props;

  return <div className={st.container + " " + st[on]}></div>;
}

export default StaminaIcon;
