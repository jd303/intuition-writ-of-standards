import React from "react";
import Header from "../Components/Header/Header";
import { PageTitle } from "../Components/PageTitle/PageTitle";

import styles from "./RulesPage.module.scss";

function RulesPage() {

	return (
		<React.Fragment>
			<Header colour='silver' />
			<PageTitle colour='silver'>Rules Overview</PageTitle>
			<section className={styles.column}>
				<p>Intuition is a Point-buy system that gives you the freedom to create a character your way.  Instead of designing classes, each character can invest points in whichever Move or Mods they choose, designing the perfect character.</p>
				<p>The system has some core concepts:</p>
				
				<h2>Moves</h2>
				<p>These are motions you make that rely on skill or chance, or which another character may resist.  When you swing an axe, Summon the power of Flow to your whims, talk down a rampaging Orc, or paint a picturesque landscape, you are using a Move.</p>
				
				<h2>Mods</h2>
				<p>Each Move has multiple Mods that make your application of a Move unique.  Anyone can Swing a Sword, but can they do it while leaping down from a higher vantage point?  Novice Channelers can create dancing lights, but only those trained in the body as well as the mind can leap metres forward into battle with a spell ready to place directly on their enemy&lsquo;s chest.</p>
				
				<h2>Actions</h2>
				<p>Each player has a number of actions available to them in any turn of combat.  You may use each type of Action once per turn, if they are available to you.  These are:</p>
				<ol>
					<li><strong>Primary Action</strong>: You resolve a Primary Move, such as Combat or Cast a Spell</li>
					<li><strong>Relocate Action</strong>: You use the Relocate Move, or use a Move Mod which resolves using your Relocate Action</li>
					<li><strong>Quick Action</strong>: You use a Move Mod which resolves as a Quick Action instead of a Primary Action.</li>
				</ol>
			</section>
		</React.Fragment>
	);
}

export default RulesPage;
