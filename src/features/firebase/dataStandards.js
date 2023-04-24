// MOVED TO FIREBASE
/*const dataStandards = {
	"DamageStandards-DR1": "d4",
	"DamageStandards-DR2": "d6",
	"DamageStandards-DR3": "d8",
	"DamageStandards-DR4": "d10",
	"DamageStandards-DR5": "d12",
	"DamageStandards-DR6": "2d8",

	"MoveModRanks-Rank1": "Rank1",
	"MoveModRanks-Rank2": "Rank2",
	"MoveModRanks-Rank3": "Rank3",

	"MagicSchools-Evocation": "Evocation",
	"MagicSchools-Necromancy": "Necromancy",
	"MagicSchools-Illusion": "Illusion",
	"MagicSchools-Enchantment": "Enchantment",
	"MagicSchools-Restoration": "Restoration",

	"MagicCosts-CR1": 2,
	"MagicCosts-CR2": 4,
	"MagicCosts-CR3": 6,
	"MagicCosts-CR4": 8,
	"MagicCosts-CR5": 10,

	"MagicChallengeTypes-None": "None",
	"MagicChallengeTypes-Targeted": "Targeted",
	"MagicChallengeTypes-Resist_will": "Resist_will",

	"MagicRanges-Touch": "Touch",
	"MagicRanges-Short": "10sq",

	"MagicDurations-Instant": "Instant",
	"MagicDurations-Short": "3 Rounds",
	"MagicDurations-Medium": "1 Min",
}*/

/**
 * Converts strings in payloads according to Data Standards
 * */
export const convertDataStandards = function (payload, standards) {
	let data = JSON.stringify(payload);

	Object.keys(standards).forEach(standard => {
		const pattern = `#${standard}`;
		data = data.replace(new RegExp(pattern, 'g'), standards[standard]);
	});

	return JSON.parse(data);
}