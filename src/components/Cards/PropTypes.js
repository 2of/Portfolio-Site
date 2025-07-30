// components/Card/Card.types.js
import PropTypes from "prop-types";

export const cardPropShape = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.string),
  onClick: PropTypes.func,
};