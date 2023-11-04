const AnimalCompanionTypes = {
	standard: "Standard",
	advanced: "Advanced",
};

class AnimalCompanion {
	name;
	type;
	description;
	abilities;

	constructor({ name, type, description, abilities }) {
		this.name = name;
		this.type = type;
		this.description = description;
		this.abilities = abilities;
	}
}

/**
 * Animal Companions:
 * */
export const animal_companions = [
	new AnimalCompanion({
		name: "Lithe Animal",
		type: AnimalCompanionTypes.standard,
		description: "A lithe animal, such as a cat or a stoat.",
		abilities: [
			"Running",
			"Climbing"
		]
	}),
	new AnimalCompanion({
		name: "Flying Animal",
		type: AnimalCompanionTypes.standard,
		description: "A flying animal, such as an eagle or a bat.",
		abilities: [
			"Flying",
			"Climbing"
		]
	})
];


/**
 * Animal Companion Move:
 * - name
 * - type: Basic, Advanced
 * - effect: What effect the Move has
 * */
const AnimalCompanionMoveTypes = {
	basic: "Basic",
	advanced: "Advanced",
};

export const animal_companion_moves = [
	{
		name: "Guard",
		type: AnimalCompanionMoveTypes.basic,
		effect: "Your companion will guard an area, making a noise if someone they don't recognise enters.",
	},
	{
		name: "Attack",
		type: AnimalCompanionMoveTypes.basic,
		effect:
			"Your companion will attack a target you specify.  Once given the attack command, your companion will continue attacking until there are no combatants remaining.",
	},
	{
		name: "Fetch",
		type: AnimalCompanionMoveTypes.basic,
		effect: "Your companion will attempt to fetch an unguarded item.",
	},
	{
		name: "Scout",
		type: AnimalCompanionMoveTypes.basic,
		effect:
			"Your companion will travel up to 10 minutes from you to see if there is any movement.  You can instruct them to either return and alert you, or alert when they see something.",
	},
	{
		name: "Find",
		type: AnimalCompanionMoveTypes.basic,
		effect:
			"If you show or let your companion smell something, they can search for more within 5 minutes travel of you.  Roll a Search Move using their Mental Bonus.",
	},
	{
		name: "Sprint",
		type: AnimalCompanionMoveTypes.basic,
		effect: "Your companion moves its speed again.",
	},
	{
		name: "Message",
		type: AnimalCompanionMoveTypes.basic,
		effect:
			"Your companion finds one of your allies within 10 minutes of you and makes a noise.  You can impart information based on this noise if you've agreed on it beforehand.",
	},
	{
		name: "Special Attack",
		type: AnimalCompanionMoveTypes.basic,
		effect: "Your companion uses their Special Attack, if it has one.",
	},
	{
		name: "Aide",
		type: AnimalCompanionMoveTypes.basic,
		effect: "If doing a task that is not dangerous, your companion can reduce the time by 15%.",
	},
	{
		name: "Rest",
		type: AnimalCompanionMoveTypes.advanced,
		effect: "Your companion Heals 3 HP.",
	},
	{
		name: "Rush",
		type: AnimalCompanionMoveTypes.advanced,
		effect: "Your companion uses their Attack Move, and may move both before and after the attack.",
	},
	{
		name: "Deliver",
		type: AnimalCompanionMoveTypes.advanced,
		effect: "Your companion delivers an item to a companion, or to an obvious location of your choice.",
	},
	{
		name: "Springboard",
		type: AnimalCompanionMoveTypes.advanced,
		effect: "If nearby, and if strong enough, your companion increases your Speed by 1 square, or your Jump distance and Climb Speed by 3 squares.",
	},
	{
		name: "Defend",
		type: AnimalCompanionMoveTypes.advanced,
		effect: "Your companion takes a Basic or Quick Attack that was not targeting them, from an enemy within range.",
	},
	{
		name: "Bond",
		type: AnimalCompanionMoveTypes.advanced,
		effect: "Your companion can deliver a spell with a range of Touch to an opponent.",
	},
];

