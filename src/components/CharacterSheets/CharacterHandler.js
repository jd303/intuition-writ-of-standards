import { prepareName } from '../../utils/prepareName';

export class CharacterObject {

	baseCharacterPoints = 30; // How many you start with at Session 0
	baseVerve = 20; // How many Verve you start with
	baseMana = 3; // How many Mana you start with
	basePsi = 3; // How many Stamina you start with

	characterTemplate = {
		"id": "",
		"name": "New Character",
		"sessions": 0,
		"race": "Human",
		"movesq": 5,
		"racial_modifiers": {
			"primary": "",
			"secondary": "",
			"stature": ""
		},
		"buffs": [
			//{ "effect": "STR Moves +2", "source": "Belt" }
		],
		"resistances": {
			"universal": 0,
			"physical": 0,
			"magic": 0,
			"poisons": 0,
			"acids": 0,
			"pyral": 0,
			"cryo": 0,
			"electric": 0,
			"zephyr": 0,
			"umbral": 0,
			"luminal": 0,
			"sonic": 0
		},
		"statuses": {
			//"Paralyzed"
		},
		"known_languages": ["2d0b7484"],
		"bonusPoints": 0,
		"current_verve": '',
		"bonus_verve": 0,
		"current_mana": this.baseMana,
		"bonus_mana": 0,
		"current_psi": this.basePsi,
		"purchases": { "spentPoints":0,"attributes":{"str":0,"con":0,"dex":0,"int":0,"wis":0,"cha":0},"verve":0,"stamina":0,"known_languages":0,"magical_synergy":{"slot2":0,"slot3":0},"weapon_specialisations":0,"mana":0,"spells":{},"moves":{} },
		"source": "Spring", // Default only
		"magical_synergy": {
			"slot1": '',
			"slot2": '',
			"slot3": '',
		},
		"bonus_damage": "d4",
		"weapon_specialisations": [],
		"armours": [ { "name": "None", "block": 3, "dodge": 3 } ],
		"armour_totals": { "block": '', "dodge": '' },
		"weapons": [],
		"spells": [],
		"inventory": [],
		"notes": [],
		"minimal_mode": {
			"1_on": false,
			"2_social": true,
			"3_stealth": true,
			"4_engineering": true,
			"5_craft": true,
			"6_inner_power": true,
			"7_magic": true,
			"8_psionics": true,
			"9a_inventory": true,
			"9b_notes": true,
		}
	}

	characterData;

	constructor(characterData) {
		if (characterData) this.characterData = { ...this.characterTemplate, ...characterData };
		else this.characterData = this.characterTemplate;
		this.characterData.updated = new Date().getTime();
	}

	getAvailablePoints() {
		return this.getMaxPoints() - this.characterData.purchases.spentPoints;
	}

	getMaxPoints() {
		return this.baseCharacterPoints + this.characterData.sessions + this.characterData.bonusPoints;
	}

	adjustPoint(adding, type, moveOrKeyName, modName) {
		let moveKey = prepareName(moveOrKeyName);
		let modKey = prepareName(modName);
		let validAdjustment = false;

		// Setup basic moves
		if (!this.characterData.purchases.moves) this.characterData.purchases.moves = {};

		switch (type) {
			case "ability":
				if (adding) {
					if (this.characterData.purchases.attributes[moveOrKeyName] < 5) {
						this.characterData.purchases.attributes[moveOrKeyName] += 1;
						validAdjustment = true;
					}
				} else if (!adding) {
					if (this.characterData.purchases.attributes[moveOrKeyName] > 0) {
						this.characterData.purchases.attributes[moveOrKeyName] -= 1;
						validAdjustment = true;
					}
				}
			break;

			case "verve":
				if (adding) {
					if (this.characterData.purchases.verve < 45) {
						this.characterData.purchases.verve += 1;
						validAdjustment = true;
					}
				} else if (!adding) {
					if (this.characterData.purchases.verve > 0) {
						this.characterData.purchases.verve -= 1;
						validAdjustment = true;
					}
				}
			break;

			case "stamina":
				if (adding) {
					if (this.characterData.purchases.stamina < 3) {
						this.characterData.purchases.stamina += 1;
						validAdjustment = true;
					}
				} else if (!adding) {
					if (this.characterData.purchases.stamina > 0) {
						this.characterData.purchases.stamina -= 1;
						validAdjustment = true;
					}
				}
			break;
			
			// CONSIDER DROPPING THIS
			case "armour":
				if (adding) {
					if (this.characterData.purchases.armour[moveOrKeyName] < 1) {
						this.characterData.purchases.armour[moveOrKeyName] = 1;
						validAdjustment = true;
					}
				} else if (!adding) {
					if (this.characterData.purchases.armour[moveOrKeyName] > 0) {
						this.characterData.purchases.armour[moveOrKeyName] = 0;
						validAdjustment = true;
					}
				}
			break;
				
			case "mana":
				if (adding) {
					if (this.characterData.purchases.mana < 30) {
						this.characterData.purchases.mana += 1;
						validAdjustment = true;
					}
				} else if (!adding) {
					if (this.characterData.purchases.mana > 0) {
						this.characterData.purchases.mana -= 1;
						validAdjustment = true;
					}
				}
			break;
				
			case "spell":
				console.log("Not implemented spells purcahse yet");
			break;

			case "move":
				if (!this.characterData.purchases.moves[moveKey]) {
					this.characterData.purchases.moves[moveKey] = { points: 0, mods: [] };
				}
				
				if (adding) {
					if (this.characterData.purchases.moves[moveKey].points < 12) {
						this.characterData.purchases.moves[moveKey].points += 1;
						validAdjustment = true;
					}
				} else if (!adding) {
					if (this.characterData.purchases.moves[moveKey].points > 0) {
						this.characterData.purchases.moves[moveKey].points -= 1;
						validAdjustment = true;
					}
				}
			break;

			case "mod":
				if (!this.characterData.purchases.moves[moveKey]) {
					this.characterData.purchases.moves[moveKey] = { points: 0, mods: [] };
				}

				if (!this.characterData.purchases.moves[moveKey].mods || !this.characterData.purchases.moves[moveKey].mods.length) this.characterData.purchases.moves[moveKey].mods = [];
				
				if (adding) {
					if (!this.characterData.purchases.moves[moveKey].mods.find(i => i == modKey)) { // Can't buy mod again
						// Consider limiting purchasing mods if you don't have the Move points, but with the Racial bonus it's hard to know.
						this.characterData.purchases.moves[moveKey].mods.push(modKey);
						validAdjustment = true;
					}
				} else if (!adding) {
					if (this.characterData.purchases.moves[moveKey].mods.find(i => i == modKey)) { // Can only remove if exists
						// Consider limiting purchasing mods if you don't have the Move points, but with the Racial bonus it's hard to know.
						this.characterData.purchases.moves[moveKey].mods = this.characterData.purchases.moves[moveKey].mods.filter(mod => mod != modKey);
						validAdjustment = true;
					}
				}
			break;
				
			case "magical_synergy":
				if (adding) {
					if (this.characterData.purchases.magical_synergy[moveOrKeyName] < 1) {
						this.characterData.purchases.magical_synergy[moveOrKeyName] = 1;
						validAdjustment = true;
					}
				} else if (!adding) {
					if (this.characterData.purchases.magical_synergy[moveOrKeyName] == 1) {
						this.characterData.purchases.magical_synergy[moveOrKeyName] = 0;
						validAdjustment = true;
					}
				}
			break;
				
			case "weapon_specialisations":
				if (adding) {
					if (this.characterData.purchases.weapon_specialisations < 3) {
						this.characterData.purchases.weapon_specialisations += 1;
						validAdjustment = true;
					}
				} else if (!adding) {
					if (this.characterData.purchases.weapon_specialisations > 0) {
						this.characterData.purchases.weapon_specialisations -= 1;
						validAdjustment = true;
					}
				}
			break;
				
			case "known_languages":
				if (adding) {
					if (this.characterData.purchases.known_languages < 3) {
						this.characterData.purchases.known_languages += 1;
						validAdjustment = true;
					}
				} else if (!adding) {
					if (this.characterData.purchases.known_languages > 0) {
						this.characterData.purchases.known_languages -= 1;
						validAdjustment = true;
					}
				}
			break;
		}

		if (validAdjustment) {
			if (adding) {
				this.characterData.purchases.spentPoints += 1;
			} else if (!adding) {
				this.characterData.purchases.spentPoints -= 1;
			}

			return true;
		} else {
			return false;
		}
	}

	adjustCircleStatus(statusKey, statusValue) {
		if (!this.characterData.statuses) this.characterData.statuses = {};
		this.characterData.statuses[statusKey] = statusValue;

		if (this.characterData.statuses[statusKey] == statusValue) return true;
		return false;
	}

	adjustSpells(id, addMode) {
		if (addMode) this.characterData.spells.push(id);
		else this.characterData.spells = this.characterData.spells.filter(spell => spell !== id);

		return true;
	}

	adjustMinimalMode(key, value) {
		this.characterData.minimal_mode[key] = value;
		return true;
	}

	getMovePurchase(moveID) {
		if (this.characterData.purchases.moves && this.characterData.purchases.moves[moveID]) {
			return this.characterData.purchases.moves[moveID];
		} else return { points: 0 };
	}
}