import { Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage/HomePage";
import AlchemyReagentsPage from "./components/AlchemyReagentsPage/AlchemyReagentsPage";
import AlchemyRecipesPage from "./components/AlchemyRecipesPage/AlchemyRecipesPage";
import MagicSpellsPage from "./components/Magic/MagicSpellsPage";
import MagicPotionsPage from "./components/Magic/MagicPotionsPage";
import MagicEnchantingPage from "./components/Magic/MagicEnchantingPage";
import CostsPage from "./components/CostsPage/CostsPage";
import AnimalCompanionsPage from "./components/Animals and Gadgets/AnimalCompanionsPage";
import GadgetsPage from "./components/Animals and Gadgets/GadgetsPage";

const allRoutes = [
  {
    navLabel: "Home",
    path: "/",
    element: <Route key="0" path="/" element={<HomePage />} />,
    subRouteOf: [],
  },
  {
    navLabel: "Alchemy",
    path: "/alchemyrecipes",
    element: <Route key="0" path="/alchemyrecipes" element={<AlchemyRecipesPage />} />,
  },
  {
    navLabel: "Alchemy Recipes",
    path: "/alchemyrecipes",
    element: <Route key="0" path="/alchemyrecipes" element={<AlchemyRecipesPage />} />,
    subRouteOf: ["/alchemyrecipes", "/alchemyreagents"],
  },
  {
    navLabel: "Alchemy Reagents",
    path: "/alchemyreagents",
    element: <Route key="0" path="/alchemyreagents" element={<AlchemyReagentsPage />} />,
    subRouteOf: ["/alchemyrecipes", "/alchemyreagents"],
  },
  {
    navLabel: "Magic",
    path: "/magic-spells",
    element: <Route key="0" path="/magic-spells" element={<MagicSpellsPage />} />,
  },
  {
    navLabel: "Spells",
    path: "/magic-spells",
    element: <Route key="0" path="/magic-spells" element={<MagicSpellsPage />} />,
    subRouteOf: ["/magic-spells", "/magic-potions", "/magic-enchanting"],
  },
  {
    navLabel: "Potions",
    path: "/magic-potions",
    element: <Route key="0" path="/magic-potions" element={<MagicPotionsPage />} />,
    subRouteOf: ["/magic-spells", "/magic-potions", "/magic-enchanting"],
  },
  {
    navLabel: "Enchanting",
    path: "/magic-enchanting",
    element: <Route key="0" path="/magic-enchanting" element={<MagicEnchantingPage />} />,
    subRouteOf: ["/magic-spells", "/magic-potions", "/magic-enchanting"],
  },
  {
    navLabel: "Costs",
    path: "/costs",
    element: <Route key="0" path="/costs" element={<CostsPage />} />,
  },
  {
    navLabel: "Animals & Gadgets",
    path: "/animal-companions",
    element: <Route key="0" path="/animal-companions" element={<AnimalCompanionsPage />} />,
  },
  {
    navLabel: "Animal Companions",
    path: "/animal-companions",
    element: <Route key="0" path="/animal-companions" element={<AnimalCompanionsPage />} />,
    subRouteOf: ["/animal-companions", "/gadgets"],
  },
  {
    navLabel: "Gadgets",
    path: "/gadgets",
    element: <Route key="0" path="/gadgets" element={<GadgetsPage />} />,
    subRouteOf: ["/animal-companions", "/gadgets"],
  },
];

export function RouteDefinitions() {
  return allRoutes;
}

export function MainNavRouteDefinitions() {
  return allRoutes.filter((routeDef) => !routeDef.subRouteOf);
}
