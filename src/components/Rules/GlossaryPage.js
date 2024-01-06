import React from "react";
import Header from "../Components/Header/Header";
import { PageTitle } from "../Components/PageTitle/PageTitle";
import { Footer } from "../../components/Components/Footer/Footer";

import styles from "./GlossaryPage.module.scss";

function GlossaryPage() {

	return (
		<React.Fragment>
			<Header colour='silver' />
			<PageTitle colour='silver'>Glossary of Terms</PageTitle>
			<div className={styles.glossaryLayout + " mainContent"}>
				<h1>Standard Terms</h1>
				<ol>
					<li><span className={styles.termName}>Gaining HP</span>: You restore HP, and any HP that exceeds your total becomes temporary HP.</li>
					<li><span className={styles.termName}>Restoring HP</span>: You restore HP, and any HP that exceeds your total are lost.</li>
					<li><span className={styles.termName}>World Changing Effect</span>: Rolling 2 20s or 2 1s results in a World Changing Effect.</li>
					<li><span className={styles.termName}>Raw Roll</span>: The exact number shown on the dice you rolled.</li>
					<li><span className={styles.termName}>DC Penalty</span>: The DC of your Roll is more difficult, as stated by the Penalty&apos;s terms.</li>
				</ol>
				<h1>Wellness Terms</h1>
				<ol>
					<li><span className={styles.termName}>UDR</span>: Universal Damage Resistance, a reduction to any kind of damage that you take.</li>
					<li>
						<span className={styles.termName}>Base Damage</span>: The Damage you deal with various Moves. Comes in 3 flavours:
						<ul>
							<li>Melee Based Damage: Equal to 1 plus your STR bonus, your weapon&apos;s Damage, plus any buffs you have to Melee Base Damage.</li>
							<li>Ranged Based Damage: Equal to 1 plus your DEX bonus, your weapon&apos;s Damage, plus any buffs you have to Ranged Base Damage.</li>
							<li>Spell Based Damage: Equal to 1 plus your INT bonus, your Spell&apos;s Damage plus any buffs you have to Spell Base Damage.</li>
							<li>Psi Based Damage: Equal to 1 plus your WIS bonus, plus any buffs you have to Psi Base Damage.</li>
						</ul>
					</li>
					<li><span className={styles.termName}>Bonus Damage Dice</span>: Some Moves allow you to roll an additional dice for damage.  When you are asked to, roll this dice and add it to your Base Damage.  Characters start with a bonus dice of d4.  Each time your Bonus Damage Dice improves a rank, it improves by a single class, incrementing the size of the dice (e.g. d6, d8, d10, etc).  The maximum Bonus Damage Dice is d12.</li>
					<li><span className={styles.termName}>UDR</span>: Universal Damage Resistance, a reduction to any kind of damage that you take.</li>
					<li><span className={styles.termName}>PDR</span>: Physical Damage Resistance, a reduction to physical damage that you take.</li>
					<li><span className={styles.termName}>MDR</span>: Magical Damage Resistance, a reduction to magial damage that you take.</li>
					<li><span className={styles.termName}>DR</span>: An opponents Defensive Rating.  An opponent may Dodge or Block or have another more interesting Defense, but each must be overcome by the attacking player the same way.</li>
					<li><span className={styles.termName}>Grappled</span>: 2 or more characters are locked in a state of Grapple.  The one who is Grappling may release the Grapple as a Free Action, or may attempt a single Basic Attack against them.  The one who is Grappled may attempt to break free, or may attempt a single Basic Attack against the Grappler.</li>
				</ol>
				<h1>Combat Terms</h1>
				<ol>
					<li><span className={styles.termName}>Threatened Area / Threatened Range</span>: Squares that your melee weapon can reach.  For most, this is 1 adjacent square, but some increase this to 2 squares.</li>
					<li><span className={styles.termName}>Stagger</span>: A measurement of how unbalanced a target is.  Each point in Stagger reduces the requirement for a successful Roll to Trip, Grapple and Disarm a target.</li>
					<li><span className={styles.termName}>NAME</span>: Effect.</li>
				</ol>
			</div>
			<Footer />
		</React.Fragment>
	);
}

export default GlossaryPage;
