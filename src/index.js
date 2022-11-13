import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes } from "react-router-dom";
import { RouteDefinitions } from "./Routes";
import "./index.scss";
import reportWebVitals from "./reportWebVitals";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDw49Vc8fMGWi_K1wm6Rat_xzpvP_LjUjM",
  authDomain: "intuition-writ-of-persona.firebaseapp.com",
  projectId: "intuition-writ-of-persona",
  storageBucket: "intuition-writ-of-persona.appspot.com",
  messagingSenderId: "643365001756",
  appId: "1:643365001756:web:5416fab9c2886536209dd9",
  measurementId: "G-M1VWN9YHMG", // Optional
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
/*const analytics = */ getAnalytics(app);

// Initialise React
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
