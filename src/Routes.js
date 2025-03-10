import { Route } from "react-router-dom";
import HomePage from "./components/Home/HomePage";
import RulesPage from "./components/Rules/RulesPage";
import GlossaryPage from "./components/Rules/GlossaryPage";
import MovesAndModsGuidePage from "./components/MovesMods/MovesAndModsGuidePage";
import MovesAndModsPage from "./components/MovesMods/MovesAndModsPage";
import AlchemyReagentsPage from "./components/Alchemy/AlchemyReagentsPage/AlchemyReagentsPage";
import AlchemyRecipesPage from "./components/Alchemy/AlchemyRecipesPage/AlchemyRecipesPage";
import MagicGuidePage from "./components/Magic/Guide/MagicGuidePage";
import MagicSpellsPage from "./components/Magic/Spells/MagicSpellsPage";
import MagicConsumablesPage from "./components/Magic/Consumables/MagicConsumablesPage";
import MagicEnchantingPage from "./components/Magic/Enchanting/MagicEnchantingPage";
import PsionicsGuidePage from "./components/Psionics/Guide/PsionicsGuidePage";
import PsionicsKineticsPage from "./components/Psionics/Kinetics/PsionicsKineticsPage";
import PsionicsTelepathyPage from "./components/Psionics/Telepathy/PsionicsTelepathyPage";
import PsionicsClairvoyancePage from "./components/Psionics/Clairvoyance/PsionicsClairvoyancePage";
import PsionicsPsychometabolismPage from "./components/Psionics/Psychometabolism/PsionicsPsychometabolismPage";
import EquipmentPage from "./components/Equipment/EquipmentPage";
import AnimalCompanionsGuidePage from "./components/Companions/AnimalCompanionsGuidePage";
import AnimalCompanionsPage from "./components/Companions/AnimalCompanionsPage";
import AnimalCompanionMovesPage from "./components/Companions/AnimalCompanionMovesPage";
import GadgetsGuidePage from "./components/Gadgetry/GadgetsGuidePage";
import GadgetsPage from "./components/Gadgetry/GadgetsPage";
import AlchemyGuidePage from "./components/Alchemy/AlchemyGuidePage/AlchemyGuidePage";
import DMToolsPage from "./components/DMTools/DMTools/DMToolsPage";
import MenageriePage from "./components/DMTools/Menagerie/MengeriePage";
import CombatPage from "./components/DMTools/Combat/CombatPage";
import CharacterListPage from "./components/CharacterSheets/CharacterListPage";
import CharacterSheetPage from "./components/CharacterSheets/CharacterSheetPage";
import AccountPage from "./components/Account/AccountPage";

export const routeSections = [
	{
		id: "account",
		navLabel: "Account",
		path: "/account",
	},
	{
		id: "characters",
		navLabel: "Characters",
		path: "/characters",
	},
	{
		id: "rules",
		navLabel: "Rules",
		path: "/rules",
	},
	{
		id: "moves",
		navLabel: "Moves & Mods",
		path: "/moves-and-mods-guide",
	},
	{
		id: "magic",
		navLabel: "Magic",
		path: "/magic-guide",
	},
	{
		id: "psionics",
		navLabel: "Psionics",
		path: "/psionics-guide",
	},
	{
		id: "alchemy",
		navLabel: "Alchemy",
		path: "/alchemy-guide",
	},
	{
		id: "gadgetry",
		navLabel: "Gadgetry",
		path: "/gadgetry-guide",
	},
	{
		id: "companions",
		navLabel: "Companions",
		path: "/companion-guide",
	},
	{
		id: "equipment",
		navLabel: "Equipment",
		path: "/equipment",
	},
	{
		id: "dm_tools",
		navLabel: "DM Tools",
		path: "/dm_tools",
		requiresAdmin: true,
	},
];

const routes = [
	{
		navLabel: "Home",
		path: "/",
		element: <Route key="0" path="/" element={<HomePage />} />,
	},

	{
		navLabel: "Rules",
		path: "/rules",
		element: <Route key="0" path="/rules" element={<RulesPage />} />,
		parent: "Rules",
	},
	{
		navLabel: "Glossary",
		path: "/glossary",
		element: <Route key="0" path="/glossary" element={<GlossaryPage />} />,
		parent: "Rules",
	},

	{
		navLabel: "Guide",
		path: "/moves-and-mods-guide",
		element: <Route key="0" path="/moves-and-mods-guide" element={<MovesAndModsGuidePage />} />,
		parent: "Moves & Mods",
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
		navLabel: "Guide",
		path: "/magic-guide",
		element: <Route key="0" path="/magic-guide" element={<MagicGuidePage />} />,
		parent: "Magic",
	},
	{
		navLabel: "Spells",
		path: "/magic-spells",
		element: <Route key="0" path="/magic-spells" element={<MagicSpellsPage />} />,
		parent: "Magic",
	},
	{
		navLabel: "Consumables",
		path: "/magic-consumables",
		element: <Route key="0" path="/magic-consumables" element={<MagicConsumablesPage />} />,
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
		navLabel: "Psychometabolism",
		path: "/psionics-psychometabolism",
		element: <Route key="0" path="/psionics-psychometabolism" element={<PsionicsPsychometabolismPage />} />,
		parent: "Psionics",
	},

	{
		navLabel: "Guide",
		path: "/companion-guide",
		element: <Route key="0" path="/companion-guide" element={<AnimalCompanionsGuidePage />} />,
		parent: "Companions",
	},
	{
		navLabel: "Animal Companions",
		path: "/companions",
		element: <Route key="0" path="/companions" element={<AnimalCompanionsPage />} />,
		parent: "Companions",
	},
	{
		navLabel: "Companion Moves",
		path: "/companion-moves",
		element: <Route key="0" path="/companion-moves" element={<AnimalCompanionMovesPage />} />,
		parent: "Companions",
	},

	{
		navLabel: "Guide",
		path: "/gadgetry-guide",
		element: <Route key="0" path="/gadgetry-guide" element={<GadgetsGuidePage />} />,
		parent: "Gadgetry",
	},
	{
		navLabel: "Gadgets",
		path: "/gadgetry",
		element: <Route key="0" path="/gadgetry" element={<GadgetsPage />} />,
		parent: "Gadgetry",
	},

	{
		navLabel: "Equipment",
		path: "/equipment",
		element: <Route key="0" path="/equipment" element={<EquipmentPage />} />,
		parent: "Equipment",
	},

	{
		navLabel: "Characters",
		path: "/characters",
		element: <Route key="0" path="/characters" element={<CharacterListPage />} />,
		parent: "Characters",
	},
	{
		navLabel: "Character Sheet",
		path: "/characters/:id",
		element: <Route key="0" path="/characters/:id" element={<CharacterSheetPage />} />,
		parent: "Characters",
		hide: true
	},

	{
		navLabel: "Account",
		path: "/account",
		element: <Route key="0" path="/account" element={<AccountPage />} />,
		parent: "Account",
	},

	{
		navLabel: "DM Tools",
		path: "/dm_tools",
		element: <Route key="0" path="/dm_tools" element={<DMToolsPage />} />,
		parent: "DM Tools",
		requiresAdmin: true
	},
	{
		navLabel: "Menagerie",
		path: "/menagerie",
		element: <Route key="0" path="/menagerie" element={<MenageriePage />} />,
		parent: "DM Tools",
		requiresAdmin: true
	},
	{
		navLabel: "Combat",
		path: "/combat",
		element: <Route key="0" path="/combat" element={<CombatPage />} />,
		parent: "DM Tools",
		requiresAdmin: true
	},
];

export function RouteDefinitions() {
	return routes;
}
