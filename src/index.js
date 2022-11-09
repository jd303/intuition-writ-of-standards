import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes } from "react-router-dom";
import { RouteDefinitions } from "./Routes";
import "./index.scss";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
const allRouteDefinitions = [];
RouteDefinitions().forEach((routeDef) => {
  allRouteDefinitions.push(routeDef);
  routeDef.subRoutes?.forEach((subRouteDef) => allRouteDefinitions.push(subRouteDef));
});
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>{allRouteDefinitions.map((rt) => rt.element)}</Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
