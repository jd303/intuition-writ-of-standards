import React from "react";
import { PropTypes } from "prop-types";

import st from "./PageTitle.module.scss";

PageTitle.propTypes = {
  children: PropTypes.string,
};

/**
 * Export Component Function
 * */

export function PageTitle({ children }) {
  return <h1 className={st.title}>{children}</h1>;
}
