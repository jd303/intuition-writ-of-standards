import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AlchemyPage from "./pages/AlchemyPage";

function RouteDefinitions() {
  return [
    {
      navLabel: "Home",
      path: "/",
      element: <Route key="0" path="/" element={<HomePage />} />,
    },
    {
      navLabel: "Alchemy",
      path: "/alchemy",
      element: <Route key="0" path="/alchemy" element={<AlchemyPage />} />,
    },
  ];
}

export default RouteDefinitions;
