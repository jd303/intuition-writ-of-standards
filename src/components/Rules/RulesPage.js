import React from "react";
import Header from "../Components/Header/Header";
import { PageTitle } from "../Components/PageTitle/PageTitle";
import { Footer } from "../../components/Components/Footer/Footer";

import styles from "./RulesPage.module.scss";

function RulesPage() {

	return (
		<React.Fragment>
			<Header colour='silver' />
			<PageTitle colour='silver'>Rules Overview</PageTitle>
			<div className={styles.rulesLayout + " mainContent"}>
				<div className={styles.column1}>
					<a className={styles.scrollerButton}>Intro</a>
					<a className={styles.scrollerButton}>Moves</a>
					<a className={styles.scrollerButton}>Dice & Rolling</a>
					<a className={styles.scrollerButton}>Statistics</a>
					<a className={styles.scrollerButton}>Mods</a>
					<a className={styles.scrollerButton}>Actions</a>
					<a className={styles.scrollerButton}>Combat</a>
					<a className={styles.scrollerButton}>World Changer</a>
				</div>
				<div className={styles.column2}>
					<section className={styles.column}>
						<p>Intuition is a Point-buy system that gives you the freedom to create a character your way.  Instead of designing classes, each character can invest points in whichever Move or Mods they choose, designing the perfect character.</p>
						<p>The system has some core concepts:</p>
					</section>
					<section className={styles.column}>
						<h2>Moves</h2>
						<p>These are motions you make that rely on skill or chance, or which another character may resist.  When you swing an axe, Summon the power of Flow to your whims, talk down a rampaging Orc, or paint a picturesque landscape, you are using a Move.</p>
						<h3>Move Bonuses</h3>
						<p>No bonuses from stats.  Bonuses from magic and items</p>
						<h3>Preparing Moves</h3>
						<p>You may elect a Move and a Mod, and set a Trigger condition.  If this condition occurs, you act at the same time as the Triggering action (before or after, whichever makes the most sense and that you have the capacity to achieve).</p>
						<p>If your Trigger was for an ally and the condition does not occur, you may change your Primary Action after everyone has taken their turn.  If your Trigger was for an opponent&apos;s action and it does not occur, you lose your Primary Action that turn.</p>
					</section>
					<section className={styles.column}>
						<h2>Dice & Rolling</h2>
						<p>Describe rolls.  Describe bonuses (no stats, just skill points and magic bonuses).</p>
						<p>Describe Raw Rolls</p>
					</section>
					<section className={styles.column}>
						<h2>Statistics</h2>
						<p>Your core attributes.  Statistics come in 6 different forms:</p>
						<ul>
							<li>Strength: your brute force and capability to perform acts of muscle.  Each point increases your Melee Base Damage, and allows you to purchase 2 additional points in STR-based Moves</li>
							<li>Constitution: your vitality and well-being.  Each point increases the number of HP you gain per point in HP, and allows you to purchase 2 additional points in CON-based Moves</li>
							<li>Dexterity: your litheness and agility.  Each point increases your Ranged Base Damage, and allows you to purchase 2 additional points in DEX-based Moves</li>
							<li>Intelligence: your reasoning and intellect.  Each point increases your Spell Base Damage, and allows you to purchase 2 additional points in INT-based Moves</li>
							<li>Wisdom: your experiences and world-knowledge.  Each point increases your Psi Base Damage, and allows you to purchase 2 additional points in WIS-based Moves</li>
							<li>Charisma: your relatability and personality.  Each point [has effect]], and allows you to purchase 2 additional points in CHA-based Moves</li>
						</ul>
					</section>
					<section className={styles.column}>
						<h2>Mods</h2>
						<p>Each Move has multiple Mods that make your application of a Move unique.  Anyone can Swing a Sword, but can they do it while leaping down from a higher vantage point?  Novice Channelers can create dancing lights, but only those trained in the body as well as the mind can leap metres forward into battle with a spell ready to place directly on their enemy&lsquo;s chest.</p>
					</section>
					<section className={styles.column}>
						<h2>Actions</h2>
						<p>Each player has a number of actions available to them in any turn of combat.  You may use each type of Action once per turn, if they are available to you.  These are:</p>
						<ol>
							<li><strong>Primary Action</strong>: You resolve a Primary Move, such as Combat or Cast a Spell</li>
							<li><strong>Relocate Action</strong>: You use the Relocate Move, or use a Move Mod which resolves using your Relocate Action</li>
							<li><strong>Quick Action</strong>: You use a Move Mod which resolves as a Quick Action instead of a Primary Action.</li>
							<li><strong>Free Action</strong>: A rare move type, granted by certain skills and conditions.  Players have an infinite number of Free Actions.  When choosing to use a Free Action, this may only occur on your turn.  When told to resolve it by a Move or Rule, it occurs immediately.</li>
						</ol>
					</section>
					<section className={styles.column}>
						<h2>Combat</h2>
						<p>Rules here</p>
					</section>
					<section className={styles.column}>
						<h2>World Changers</h2>
						<p>When one or more players roll 2x20 (positive) or 2x1 (negative) on subsequent D20, a World Changing event occurs.</p>
						<p>When positive, all involved players request of the DM an event or bonus that relates to the events that triggered the 20s, that could occur within the next short while.</p>
						<p>When negative, the DM will apply a negative event or bonus that relates to the events that triggered the 1s, that usually occurs within the next short while.</p>
					</section>
				</div>
			</div>
			<Footer />
		</React.Fragment>
	);
}

export default RulesPage;
