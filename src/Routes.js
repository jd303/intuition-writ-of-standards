import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AlchemyReagentsPage from "./pages/AlchemyReagentsPage";
import AlchemyRecipesPage from "./pages/AlchemyRecipesPage";

function RouteDefinitions() {
  return [
    {
      navLabel: "Home",
      path: "/",
      element: <Route key="0" path="/" element={<HomePage />} />,
    },
    {
      navLabel: "Alchemy Reagents",
      path: "/alchemyreagents",
      element: <Route key="0" path="/alchemyreagents" element={<AlchemyReagentsPage />} />,
    },
    {
      navLabel: "Alchemy Recipes",
      path: "/alchemyrecipes",
      element: <Route key="0" path="/alchemyrecipes" element={<AlchemyRecipesPage />} />,
    },
  ];
}

export default RouteDefinitions;
