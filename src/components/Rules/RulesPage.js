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
					<a className={styles.scrollerButton} href="#intro">Intro</a>
					<a className={styles.scrollerButton} href="#characters">Characters</a>
					<a className={styles.scrollerButton} href="#moves">Skills &amp; Moves</a>
					<a className={styles.scrollerButton} href="#mods">Mods</a>
					<a className={styles.scrollerButton} href="#dice">Dice & Rolling</a>
					<a className={styles.scrollerButton} href="#actions">Actions</a>
					<a className={styles.scrollerButton} href="#combat">Combat</a>
					<a className={styles.scrollerButton} href="#magic">Magic</a>
					<a className={styles.scrollerButton} href="#worldchangers">World Changers</a>
				</div>
				<div className={styles.column2}>
					<section className={styles.column} id="intro">
						<p>Intuition is a Point-buy system that gives you the freedom to create a character your way.  Instead of designing classes, each character can invest points in whichever Move or Mods they choose, designing the perfect character.</p>
						<p>The system has some core concepts:</p>
					</section>
					<section className={styles.column} id="characters">
						<h2>Characters</h2>
						<p>Advancement Points, often just called points, are earned at the start of each Session and....</p>
						<p>Whenever you earn an Advancement Point you may spend it immediately, or you may hold it for the duration of the session.  If you spend it during the session on a Move or purchase that you use immediately, it is a Cinematic Spend.  Cinematic Spends on Moves grant you a +1 Bonus to your Move Roll.</p>
						<h3>Attributes</h3>
						<p>Players have 6 values that define their physical and mental attributes.  Attributes act as 1 limiter to the number of points that can be spent in Moves; each point in an attribute alleviates a limitation on a Move by 3 points (for example with 2 Strength, the spend on Strength-based moves up to 6 points is not limited by attributes, but may still be limited by the session count). Alongside that, players also gain the following benefits:</p>
						<ul>
							<li>Strength: You Melee Weapon Damage is improved, and your Maximum Block is improved by half of your Strength.</li>
							<li>Dexterity: You Ranged Weapon Damage is improved, and your Maximum Dodge is improved by half of your Strength.</li>
							<li>Constitution: You gain additional Total Verve based on your Constitution Bonus.</li>
							<li>Intelligence: Your Spell Damage is improved.</li>
							<li>Wisdom: </li>
							<li>Charisma: </li>
						</ul>
						<h3>Move Purchases</h3>
						<p>Players cannot purchase Move Points unfettered.  Moves are limites, the rules of which are as follows:</p>
						<ul>
							<li>You cannot purchase Moves to a greater level than twice your value of the Attribute it is related to.  That is, if you wish to purchase the 10th rank of Rest, you must have 5 Constitution to do so</li>
							<li>The maximum number of points that you may spend in any Move is equal to 2 + 1 every 8 sessions.  That is, at session 1 you may have a maximum of 2 points in each Move.  At session 9, that raises to 3, and again at 17, 24, 33, and so on.</li>
						</ul>
					</section>
					<section className={styles.column} id="moves">
						<h2>Skills</h2>
						<p>Characters advance by progressing in Skills.  A skill is a category of Moves that you can choose to make when you choose your actions in and out of combat.  For example, the Athletics Skill has the Relocate and Jump Moves, amongst others.</p>
						<h2>Moves</h2>
						<p>These are motions you make that rely on your expertise or chance, or which another character may resist.  When you swing an axe, Summon the power of Flow to your whims, talk down a rampaging Orc, or paint a picturesque landscape, you are using a Move.</p>
						<h3>Resolving Moves</h3>
						<p>When asked to resolve a Move, you roll a d20 and add the number of points that you have spent on its parent Skill, and then finaly add any bonuses you get from magic, abilities and items.  Your DM will tell you if it is successful or unsuccessful.</p>
						<h3>Preparing Moves</h3>
						<p>You may elect a Move and a Mod, and set a Trigger condition.  If this condition occurs, you act at the same time as the Triggering action (before or after, whichever makes the most sense and that you have the capacity to achieve).</p>
						<p>If your Trigger was for an ally and the condition does not occur, you may change your Primary Action after everyone has taken their turn.  If your Trigger was for an opponent&apos;s action and it does not occur, you lose your Primary Action that turn.</p>
					</section>
					<section className={styles.column} id="mods">
						<h2>Mods</h2>
						<p>Each Move has multiple Mods that make your application of a Move unique.  Anyone can Swing a Sword, but can they do it while leaping down from a higher vantage point?  Novice Channelers can create dancing lights, but only those trained in the body as well as the mind can leap metres forward into battle with a spell ready to place directly on their enemy&lsquo;s chest.</p>
					</section>
					<section className={styles.column} id="dice">
						<h2>Dice & Rolling</h2>
						<p>Describe rolls.  Describe bonuses (no stats, just skill points and magic bonuses).</p>
						<p>Describe Raw Rolls</p>
						<p>Describe Move Rolls</p>
						<p>Describe rerolls</p>
					</section>
					<section className={styles.column} id="actions">
						<h2>Actions</h2>
						<p>Each player has a number of actions available to them in any turn of combat.  You may use each type of Action once per turn, if they are available to you.  These are:</p>
						<ol>
							<li><strong>Primary Action</strong>: You resolve a Primary Move, such as Combat or Cast a Spell</li>
							<li><strong>Relocate Action</strong>: You use the Relocate Move, or use a Move Mod which resolves using your Relocate Action</li>
							<li><strong>Quick Action</strong>: You use a Move Mod which resolves as a Quick Action instead of a Primary Action.</li>
							<li><strong>Free Action</strong>: A rare move type, granted by certain skills and conditions.  Players have an infinite number of Free Actions.  When choosing to use a Free Action, this may only occur on your turn.  When told to resolve it by a Move or Rule, it occurs immediately.</li>
						</ol>
					</section>
					<section className={styles.column} id="combat">
						<h2>Combat</h2>
						<p>Rules here</p>
					</section>
					<section className={styles.column} id="magic">
						<h2>Magic</h2>
						<h3>The Choice</h3>
						<p>A strange thing happens to about 5% of the population of Alhember: they dream of complex and confrontational emotional events that may or may not have happened, and are offered a Choice.  Most know that they are being offered a Choice, though most do not really know what they are Choosing.  Those that agree to The Choice awaken with the ability to shape Magics and Cast Spells.</p>
						<p>One who has agreed to the Choice is considered awakened, cursed, troubled, sage or empowered, depending on who you ask.  One who denies The Choice is saved, powerless, enlightened, or feebled - but are otherwise not really affected.  Most receive The Dream of Choosing in their teens, though extremely rare cases arise of those in later, or even younger years.</p>
						<h3>Sources</h3>
						<p>Every sentient creature on Alhember, save the monstrous, undead, demonic or abberative, are born with a Source.  Researchers, such as the Heirs of the True Source, are unable to determine predictable patterns as to which Source a person develops, though those who match the season that they are born in tend to achieve grander feats of magic.</p>
						<ul>
							<li>
								<strong>Summer: Innate and Bright</strong><br />
								Those with the Summer Source tend to have a strong will and inner power, and their magics and spells reflect this.  The Summer Source is known for bright magics.
							</li>
							<li>
								<strong>Autumn: Life and Passing</strong><br />
								Those with the Autumn Source draw from the inevitable end of things, both within and without, and their spells reflect this.  The Autumn Source is known for subtle and decaying magics.
							</li>
							<li>
								<strong>Winter: Tapped and Emotional</strong><br />
								Winter Source mages use the lingering energies of all magical things.  Winter magics are subtle and cold.
							</li>
							<li>
								<strong>Spring: Growth and Yearning</strong><br />
								Surrounding themselves with things that yearn to grow enables Spring Mages to weave their magics.  The Spring Source is known for natural and empowering magics.
							</li>
						</ul>
					</section>
					<section className={styles.column} id="worldchangers">
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
