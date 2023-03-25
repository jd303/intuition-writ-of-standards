import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectViewMode, toggleViewMode } from "../../../features/viewMode/viewModeSlice";

import st from "./ViewModeToggler.module.scss";

export function ViewModeToggler() {
  /**
   * Redux State: viewMode
   * */
  const viewMode = useSelector(selectViewMode);
  const dispatch = useDispatch();
  const toggleView = () => dispatch(toggleViewMode());

  /**
   * Component
   * */
  return (
    <React.Fragment>
      <button onClick={toggleView} className={st.button}>
        View: {viewMode}
      </button>
    </React.Fragment>
  );
}
