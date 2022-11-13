import { PropTypes } from "prop-types";

AlchemyType.propTypes = {
  type: PropTypes.string.isRequired,
};

function AlchemyType(props) {
  const { type } = props;

  return <div>{type}</div>;
}

export default AlchemyType;
