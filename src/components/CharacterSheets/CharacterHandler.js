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
		"racial_modifiers": [
			/*"Breathing",
			"Listening",
			"Eating"*/
		],
		"buffs": [
			//{ "effect": "STR Moves +2", "source": "Belt" }
		],
		"statuses": {
			//"Paralyzed"
		},
		"current_verve": this.baseVerve,
		"current_mana": this.baseMana,
		"current_psi": this.basePsi,
		"purchases": { "spentPoints":0,"abilities":{"str":0,"con":0,"dex":0,"int":0,"wis":0,"cha":0},"verve":0,"stamina":0,"source":1,"synergy":{"slot1":1,"slot2":0,"slot3":0},"mana":0,"spells":{},"moves":{} },
		"source": "",
		"magical_synergy": {
			"slot1": '',
			"slot2": '',
			"slot3": '',
		},
		"bonus_damage": { "melee": "d4", "ranged": "d4" },
		"armours": [ { "name": "None", "block": 3, "dodge": 3, "disadvantages": "" } ],
		"weapons": [],
		"inventory": [],
		"notes": []
	}

	characterData;

	constructor(characterData) {
		if (characterData) this.characterData = { ...this.characterTemplate, ...characterData };
		else this.characterData = this.characterTemplate;
	}

	getAvailablePoints() {
		return this.getMaxPoints() - this.characterData.purchases.spentPoints;
	}

	getMaxPoints() {
		return this.baseCharacterPoints + this.characterData.sessions;
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
					if (this.characterData.purchases.abilities[moveOrKeyName] < 6) {
						this.characterData.purchases.abilities[moveOrKeyName] += 1;
						validAdjustment = true;
					}
				} else if (!adding) {
					if (this.characterData.purchases.abilities[moveOrKeyName] > 0) {
						this.characterData.purchases.abilities[moveOrKeyName] -= 1;
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
					if (this.characterData.purchases.stamina < 3) {
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

	getMovePurchase(moveName) {
		if (this.characterData.purchases.moves) {
			const moveKey = prepareName(moveName);
			return this.characterData.purchases.moves[moveKey];
		} else return {};
	}
}