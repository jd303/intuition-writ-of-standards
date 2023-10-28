import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { AppShell } from "./app/AppShell";
import { BrowserRouter, Routes } from "react-router-dom";
import { RouteDefinitions } from "./Routes";
import './firebase.js';
import store from "./app/store";
import reportWebVitals from "./reportWebVitals";
import "./index.scss";

// Initialise React
const root = ReactDOM.createRoot(document.getElementById("root"));
const allRouteDefinitions = [];
RouteDefinitions().forEach((routeDef) => {
	allRouteDefinitions.push(routeDef);
	routeDef.subRoutes?.forEach((subRouteDef) => allRouteDefinitions.push(subRouteDef));
});
root.render(
	<Provider store={store}>
		<React.StrictMode>
			<AppShell>
				<BrowserRouter>
					<Routes>{allRouteDefinitions.map((rt) => rt.element)}</Routes>
				</BrowserRouter>
			</AppShell>
		</React.StrictMode>
	</Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();