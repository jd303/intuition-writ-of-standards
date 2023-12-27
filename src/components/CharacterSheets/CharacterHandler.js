
class CharacterHandler {

	characterTemplate = {
		spentPoints: 0,

		abilities: {
			str: 0,
			con: 0,
			dex: 0,
			int: 0,
			wis: 0,
			cha: 0,
		},
		verve: 0,
		stamina: 0,
		armour: {
			light: 0,
			heavy: 0,
			shield: 0,
		},
		mana: 0,
		spells: {},
		moves: {}
	}

	purchases;

	statuses = [];

	constructor(purchasesOptional) {
		console.log("TODO: CONSIDER REMOVING ARMOUR FROM CHARACTERHANDLER OPTIONS AND POINTABLE PURCHASEMENTISATION");
		if (purchasesOptional) this.purchases = purchasesOptional;
	}

	getMoveName(moveName) {
		return moveName?.replace(/ /g, "_").toLowerCase();
	}

	getModName(modName) {
		return modName?.replace(/ /g, "_").toLowerCase();
	}

	adjustPoint(adding, type, moveOrKeyName, modName) {
		let moveKey = this.getMoveName(moveOrKeyName);
		let modKey = this.getModName(modName);
		let validAdjustment = false;

		switch (type) {
			case "ability":
				if (adding) {
					if (this.purchases.abilities[moveOrKeyName] < 6) {
						this.purchases.abilities[moveOrKeyName] += 1;
						validAdjustment = true;
					}
				} else if (!adding) {
					if (this.purchases.abilities[moveOrKeyName] > 0) {
						this.purchases.abilities[moveOrKeyName] -= 1;
						validAdjustment = true;
					}
				}
			break;

			case "verve":
				if (adding) {
					if (this.purchases.verve < 45) {
						this.purchases.verve += 1;
						validAdjustment = true;
					}
				} else if (!adding) {
					if (this.purchases.verve > 0) {
						this.purchases.verve -= 1;
						validAdjustment = true;
					}
				}
			break;

			case "stamina":
				if (adding) {
					if (this.purchases.stamina < 3) {
						this.purchases.stamina += 1;
						validAdjustment = true;
					}
				} else if (!adding) {
					if (this.purchases.stamina < 3) {
						this.purchases.stamina -= 1;
						validAdjustment = true;
					}
				}
			break;
			
			// CONSIDER DROPPING THIS
			case "armour":
				if (adding) {
					if (this.purchases.armour[moveOrKeyName] < 1) {
						this.purchases.armour[moveOrKeyName] = 1;
						validAdjustment = true;
					}
				} else if (!adding) {
					if (this.purchases.armour[moveOrKeyName] > 0) {
						this.purchases.armour[moveOrKeyName] = 0;
						validAdjustment = true;
					}
				}
			break;
				
			case "mana":
				if (adding) {
					if (this.purchases.mana < 30) {
						this.purchases.mana += 1;
						validAdjustment = true;
					}
				} else if (!adding) {
					if (this.purchases.mana > 0) {
						this.purchases.mana -= 1;
						validAdjustment = true;
					}
				}
			break;
				
			case "spell":
				console.log("Not implemented spells purcahse yet");
			break;

			case "move":
				if (!this.purchases.moves[moveKey]) {
					this.purchases.moves[moveKey] = { points: 0, mods: [] };
				}
				
				if (adding) {
					if (this.purchases.moves[moveKey].points < 12) {
						this.purchases.moves[moveKey].points += 1;
						validAdjustment = true;
					}
				} else if (!adding) {
					if (this.purchases.moves[moveKey].points > 0) {
						this.purchases.moves[moveKey].points -= 1;
						validAdjustment = true;
					}
				}
			break;

			case "mod":
				if (this.purchases.moves[moveKey]) {
					if (adding) {
						if (!this.purchases.moves[moveKey].mods.find(modKey)) { // Can't buy mod again
							// Consider limiting purchasing mods if you don't have the Move points, but with the Racial bonus it's hard to know.
							this.purchases.moves[moveKey].mods.push(modKey);
							validAdjustment = true;
						}
					} else if (!adding) {
						if (this.purchases.moves[moveKey].mods.find(modKey)) { // Can't buy mod again
							// Consider limiting purchasing mods if you don't have the Move points, but with the Racial bonus it's hard to know.
							this.purchases.moves[moveKey].mods = this.purchases.moves[moveKey].mods.filter(mod => mod != modKey);
							validAdjustment = true;
						}
					}
				}
			break;
		}

		if (validAdjustment) {
			if (adding) {
				this.purchases.spentPoints += 1;
			} else if (!adding) {
				this.purchases.spentPoints -= 1;
			}

			this.saveCharacter();
		}
	}

	removePoint() {

	}

	loadCharacter() {
		const characterData = localStorage.getItem('character');
		let character = characterData && JSON.parse(characterData) || this.characterTemplate;
		this.purchases = character;
		return this;
	}

	saveCharacter() {
		console.log('saving character');
		localStorage.setItem('character', JSON.stringify(this.purchases));
	}

	getMovePurchase(moveName) {
		const moveKey = this.getMoveName(moveName);
		return this.purchases.moves[moveKey];
	}
}

export default CharacterHandler;