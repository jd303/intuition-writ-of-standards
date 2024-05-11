import React from "react";
import Header from "../../Components/Header/Header";
import st from "./MagicConsumablesPage.module.scss";
import potionIcon from "../../../assets/images/icons/ico.potion.svg";
import scrollIcon from "../../../assets/images/icons/ico.scroll.svg";
import runeIcon from "../../../assets/images/icons/ico.rune.svg";
import { Footer } from "../../../components/Components/Footer/Footer";
import { PageTitle } from "../../Components/PageTitle/PageTitle";

function MagicConsumablesPage() {

	return (
		<React.Fragment>
			<Header colour="purple" />
			<PageTitle colour="purple">Potions</PageTitle>
			<div className="mainContent">
				<section>
					<h1>Magical Consumables</h1>
					<p>In the world of Alhember, The Flow can be distilled and captured temporarily in items that let even those who have not experienced The Choice a little touch of magic.</p>
					<p>Magical Consumables come in various forms:</p>
				</section>
				<section className={st.section}>
					<img className={st.accompanyingIcon} src={potionIcon} alt="Potion" />
					<div>
						<h2>Potions</h2>
						<p>Magical Potions replicate the effects of a Standard Spell Effect, though the Spell Effect applies to the imbiber only, and can be created from Spell Effects marked as Potable.</p>
					</div>
				</section>
				<section className={st.section}>
					<img className={st.accompanyingIcon} src={scrollIcon} alt="Scroll" />
					<div>
						<h2>Scrolls</h2>
						<p>A Magical Scroll is a single-use distillation of knowledge that can be employed by a Magic User to Cast a Spell.  While a scroll still requires the user to use their own Mana, a scroll can increase the repertoire of Spells that the user knows, even if only for a single Casting.</p>
					</div>
				</section>
				<section className={st.section}>
					<img className={st.accompanyingIcon} src={runeIcon} alt="Runic Seal" />
					<div>
						<h2>Runic Seals</h2>
						<p>A Runic Seal is an infusing of The Flow into a single-user consumable item that is useable by anyone.  When activated, the activator acts as the Caster and determines the positioning of the Spell.</p>
						<p>Runic Seals have a downside; whe created, they permanently reduce the creator&apos;s Mana - at least until the Seal is expended.</p>
					</div>
				</section>
			</div>
			<Footer />
		</React.Fragment >
	);
}

export default MagicConsumablesPage;
