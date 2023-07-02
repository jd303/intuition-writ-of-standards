import { Route } from "react-router-dom";
import HomePage from "./components/Home/HomePage";
import RulesPage from "./components/Rules/RulesPage";
import MovesAndModsPage from "./components/MovesMods/MovesAndModsPage";
import AlchemyReagentsPage from "./components/Alchemy/AlchemyReagentsPage/AlchemyReagentsPage";
import AlchemyRecipesPage from "./components/Alchemy/AlchemyRecipesPage/AlchemyRecipesPage";
import MagicSpellsPage from "./components/Magic/Spells/MagicSpellsPage";
import MagicPotionsPage from "./components/Magic/Potions/MagicPotionsPage";
import MagicEnchantingPage from "./components/Magic/Enchanting/MagicEnchantingPage";
import PsionicsGuidePage from "./components/Psionics/Guide/PsionicsGuidePage";
import PsionicsKineticsPage from "./components/Psionics/Kinetics/PsionicsKineticsPage";
import PsionicsTelepathyPage from "./components/Psionics/Telepathy/PsionicsTelepathyPage";
import PsionicsClairvoyancePage from "./components/Psionics/Clairvoyance/PsionicsClairvoyancePage";
import PsionicsPsychometabolismPage from "./components/Psionics/Psychometabolism/PsionicsPsychometabolismPage";
import CostsListPage from "./components/Costs/List/CostsListPage";
import CostsScalePage from "./components/Costs/Scale/CostsScalePage";
import AnimalCompanionsPage from "./components/Companions/AnimalCompanionsPage";
import GadgetsPage from "./components/Gadgetry/GadgetsPage";
import AlchemyGuidePage from "./components/Alchemy/AlchemyGuidePage/AlchemyGuidePage";
import MenageriePage from "./components/Menagerie/MengeriePage";

export const routeSections = [
	{
		navLabel: "Overview",
		path: "/overview",
	},
	{
		navLabel: "Moves & Mods",
		path: "/moves-and-mods",
	},
	{
		navLabel: "Magic",
		path: "/magic-spells",
	},
	{
		navLabel: "Psionics",
		path: "/psionics-guide",
	},
	{
		navLabel: "Alchemy",
		path: "/alchemy-guide",
	},
	{
		navLabel: "Costs",
		path: "/costs-list",
	},
	{
		navLabel: "Companions",
		path: "/companion-guide",
	},
	{
		navLabel: "Gadgetry",
		path: "/gadgetry-guide",
	},
	{
		navLabel: "Menagerie",
		path: "/menagerie",
	},
];

const routes = [
	{
		navLabel: "Home",
		path: "/",
		element: <Route key="0" path="/" element={<HomePage />} />,
	},

	{
		navLabel: "Overview",
		path: "/overview",
		element: <Route key="0" path="/overview" element={<RulesPage />} />,
		parent: "Overview",
	},

	{
		navLabel: "Moves & Mods",
		path: "/moves-and-mods",
		element: <Route key="0" path="/moves-and-mods" element={<MovesAndModsPage />} />,
		parent: "Moves & Mods",
	},

	{
		navLabel: "Guide",
		path: "/alchemy-guide",
		element: <Route key="0" path="/alchemy-guide" element={<AlchemyGuidePage />} />,
		parent: "Alchemy",
	},
	{
		navLabel: "Recipes",
		path: "/alchemy-recipes",
		element: <Route key="0" path="/alchemy-recipes" element={<AlchemyRecipesPage />} />,
		parent: "Alchemy",
	},
	{
		navLabel: "Reagents",
		path: "/alchemy-reagents",
		element: <Route key="0" path="/alchemy-reagents" element={<AlchemyReagentsPage />} />,
		parent: "Alchemy",
	},

	{
		navLabel: "Spells",
		path: "/magic-spells",
		element: <Route key="0" path="/magic-spells" element={<MagicSpellsPage />} />,
		parent: "Magic",
	},
	{
		navLabel: "Potions",
		path: "/magic-potions",
		element: <Route key="0" path="/magic-potions" element={<MagicPotionsPage />} />,
		parent: "Magic",
	},
	{
		navLabel: "Enchanting",
		path: "/magic-enchanting",
		element: <Route key="0" path="/magic-enchanting" element={<MagicEnchantingPage />} />,
		parent: "Magic",
	},

	{
		navLabel: "Guide",
		path: "/psionics-guide",
		element: <Route key="0" path="/psionics-guide" element={<PsionicsGuidePage />} />,
		parent: "Psionics",
	},
	{
		navLabel: "Kinetics",
		path: "/psionics-kinetics",
		element: <Route key="0" path="/psionics-kinetics" element={<PsionicsKineticsPage />} />,
		parent: "Psionics",
	},
	{
		navLabel: "Telepathy",
		path: "/psionics-telepathy",
		element: <Route key="0" path="/psionics-telepathy" element={<PsionicsTelepathyPage />} />,
		parent: "Psionics",
	},
	{
		navLabel: "Clairvoyance",
		path: "/psionics-clairvoyance",
		element: <Route key="0" path="/psionics-clairvoyance" element={<PsionicsClairvoyancePage />} />,
		parent: "Psionics",
	},
	{
		navLabel: "Psychmetabolism",
		path: "/psionics-psychometabolism",
		element: <Route key="0" path="/psionics-psychometabolism" element={<PsionicsPsychometabolismPage />} />,
		parent: "Psionics",
	},

	{
		navLabel: "Animal Companions",
		path: "/companion-guide",
		element: <Route key="0" path="/companion-guide" element={<AnimalCompanionsPage />} />,
		parent: "Companions",
	},

	{
		navLabel: "Gadgets",
		path: "/gadgetry-guide",
		element: <Route key="0" path="/gadgetry-guide" element={<GadgetsPage />} />,
		parent: "Gadgetry",
	},

	{
		navLabel: "Costs List",
		path: "/costs-list",
		element: <Route key="0" path="/costs-list" element={<CostsListPage />} />,
		parent: "Costs",
	},
	{
		navLabel: "Costs Scale",
		path: "/costs-scale",
		element: <Route key="0" path="/costs-scale" element={<CostsScalePage />} />,
		parent: "Costs",
	},

	{
		navLabel: "Menagerie",
		path: "/menagerie",
		element: <Route key="0" path="/menagerie" element={<MenageriePage />} />,
		parent: "Menagerie",
	},
];

export function RouteDefinitions() {
	return routes;
}
